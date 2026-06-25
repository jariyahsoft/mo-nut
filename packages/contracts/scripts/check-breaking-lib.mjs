function resolveJsonPointer(document, ref) {
  if (!ref.startsWith("#/")) {
    throw new Error(`Unsupported $ref: ${ref}`);
  }

  return ref
    .slice(2)
    .split("/")
    .reduce((value, segment) => {
      const key = segment.replace(/~1/g, "/").replace(/~0/g, "~");
      return value?.[key];
    }, document);
}

function normalizeSchema(document, schema) {
  if (!schema || typeof schema !== "object") {
    return {};
  }

  if ("$ref" in schema && typeof schema.$ref === "string") {
    const resolved = resolveJsonPointer(document, schema.$ref);
    return normalizeSchema(document, resolved);
  }

  if (Array.isArray(schema.allOf)) {
    return schema.allOf
      .map((entry) => normalizeSchema(document, entry))
      .reduce(
        (merged, entry) => ({
          ...merged,
          ...entry,
          properties: {
            ...(merged.properties ?? {}),
            ...(entry.properties ?? {}),
          },
          required: [
            ...new Set([...(merged.required ?? []), ...(entry.required ?? [])]),
          ],
        }),
        {},
      );
  }

  return schema;
}

function schemaKind(schema) {
  if (schema.type) {
    return schema.type;
  }

  if (schema.properties) {
    return "object";
  }

  if (schema.items) {
    return "array";
  }

  return "unknown";
}

function compareSchemas(document, baselineSchema, currentSchema, location) {
  const baseline = normalizeSchema(document, baselineSchema);
  const current = normalizeSchema(document, currentSchema);
  const baselineKind = schemaKind(baseline);
  const currentKind = schemaKind(current);

  if (baselineKind !== "unknown" && currentKind !== "unknown") {
    if (baselineKind !== currentKind) {
      throw new Error(
        `${location} changed type from ${baselineKind} to ${currentKind}`,
      );
    }
  }

  if (Array.isArray(baseline.enum)) {
    const currentEnum = new Set(current.enum ?? []);
    for (const value of baseline.enum) {
      if (!currentEnum.has(value)) {
        throw new Error(`${location} removed enum value ${String(value)}`);
      }
    }
  }

  if (baselineKind === "object") {
    const baselineProperties = baseline.properties ?? {};
    const currentProperties = current.properties ?? {};

    for (const [propertyName, propertySchema] of Object.entries(
      baselineProperties,
    )) {
      if (!(propertyName in currentProperties)) {
        throw new Error(`${location} removed property ${propertyName}`);
      }

      compareSchemas(
        document,
        propertySchema,
        currentProperties[propertyName],
        `${location}.${propertyName}`,
      );
    }

    const baselineRequired = new Set(baseline.required ?? []);
    const currentRequired = new Set(current.required ?? []);

    for (const propertyName of baselineRequired) {
      if (!currentRequired.has(propertyName)) {
        throw new Error(
          `${location} changed required property ${propertyName} to optional`,
        );
      }
    }

    for (const propertyName of currentRequired) {
      if (!baselineRequired.has(propertyName)) {
        throw new Error(
          `${location} added new required property ${propertyName}`,
        );
      }
    }
  }

  if (baselineKind === "array" && baseline.items) {
    compareSchemas(
      document,
      baseline.items,
      current.items,
      `${location}[]`,
    );
  }
}

function collectParameters(pathItem, operation) {
  return [...(pathItem?.parameters ?? []), ...(operation?.parameters ?? [])];
}

function expandParameter(document, parameter) {
  if (!parameter) {
    return {};
  }

  if ("$ref" in parameter && typeof parameter.$ref === "string") {
    return expandParameter(document, resolveJsonPointer(document, parameter.$ref));
  }

  return parameter;
}

export function assertNoBreakingChanges({ baselineApi, currentApi }) {
  for (const [pathName, baselinePathItem] of Object.entries(
    baselineApi.paths ?? {},
  )) {
    const currentPathItem = currentApi.paths?.[pathName];
    if (!currentPathItem) {
      throw new Error(`Removed API path ${pathName}`);
    }

    for (const method of [
      "get",
      "post",
      "patch",
      "put",
      "delete",
      "options",
      "head",
    ]) {
      const baselineOperation = baselinePathItem?.[method];
      if (!baselineOperation) {
        continue;
      }

      const currentOperation = currentPathItem?.[method];
      if (!currentOperation) {
        throw new Error(`Removed API operation ${method.toUpperCase()} ${pathName}`);
      }

      const baselineParameters = collectParameters(
        baselinePathItem,
        baselineOperation,
      ).map((parameter) => expandParameter(baselineApi, parameter));
      const currentParameters = collectParameters(
        currentPathItem,
        currentOperation,
      ).map((parameter) => expandParameter(currentApi, parameter));

      for (const baselineParameter of baselineParameters) {
        const currentParameter = currentParameters.find(
          (parameter) =>
            parameter.in === baselineParameter.in &&
            parameter.name === baselineParameter.name,
        );

        if (!currentParameter) {
          throw new Error(
            `Removed parameter ${baselineParameter.in}:${baselineParameter.name} from ${method.toUpperCase()} ${pathName}`,
          );
        }

        compareSchemas(
          currentApi,
          baselineParameter.schema,
          currentParameter.schema,
          `${method.toUpperCase()} ${pathName} parameter ${baselineParameter.in}:${baselineParameter.name}`,
        );
      }

      for (const currentParameter of currentParameters) {
        const baselineParameter = baselineParameters.find(
          (parameter) =>
            parameter.in === currentParameter.in &&
            parameter.name === currentParameter.name,
        );

        if (!baselineParameter && currentParameter.required) {
          throw new Error(
            `Added required parameter ${currentParameter.in}:${currentParameter.name} to ${method.toUpperCase()} ${pathName}`,
          );
        }
      }

      const baselineRequest = baselineOperation.requestBody;
      const currentRequest = currentOperation.requestBody;

      if (baselineRequest?.required && !currentRequest?.required) {
        throw new Error(
          `Changed required request body to optional for ${method.toUpperCase()} ${pathName}`,
        );
      }

      if (!baselineRequest?.required && currentRequest?.required) {
        throw new Error(
          `Added required request body for ${method.toUpperCase()} ${pathName}`,
        );
      }

      for (const [contentType, baselineMediaType] of Object.entries(
        baselineRequest?.content ?? {},
      )) {
        const currentMediaType = currentRequest?.content?.[contentType];
        if (!currentMediaType) {
          throw new Error(
            `Removed request content type ${contentType} from ${method.toUpperCase()} ${pathName}`,
          );
        }

        compareSchemas(
          currentApi,
          baselineMediaType.schema,
          currentMediaType.schema,
          `${method.toUpperCase()} ${pathName} request ${contentType}`,
        );
      }

      for (const [statusCode, baselineResponse] of Object.entries(
        baselineOperation.responses ?? {},
      )) {
        const currentResponse = currentOperation.responses?.[statusCode];
        if (!currentResponse) {
          throw new Error(
            `Removed response status ${statusCode} from ${method.toUpperCase()} ${pathName}`,
          );
        }

        for (const [contentType, baselineMediaType] of Object.entries(
          baselineResponse.content ?? {},
        )) {
          const currentMediaType = currentResponse.content?.[contentType];
          if (!currentMediaType) {
            throw new Error(
              `Removed response content type ${contentType} from ${method.toUpperCase()} ${pathName} ${statusCode}`,
            );
          }

          compareSchemas(
            currentApi,
            baselineMediaType.schema,
            currentMediaType.schema,
            `${method.toUpperCase()} ${pathName} response ${statusCode} ${contentType}`,
          );
        }
      }
    }
  }
}
