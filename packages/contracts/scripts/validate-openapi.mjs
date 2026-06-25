import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import SwaggerParser from "@apidevtools/swagger-parser";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(currentDir, "..");
const specPath = path.join(packageDir, "openapi", "openapi.yaml");
const fixturesDir = path.join(packageDir, "fixtures");
const baselinesDir = path.join(packageDir, "baselines");

const ajv = new Ajv2020({
  allErrors: true,
  strict: false,
});
addFormats(ajv);

async function collectJsonFiles(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(rootDir, entry.name);
      if (entry.isDirectory()) {
        return collectJsonFiles(fullPath);
      }
      return entry.name.endsWith(".json") ? [fullPath] : [];
    }),
  );

  return files.flat();
}

function formatAjvErrors(validate) {
  return (validate.errors ?? [])
    .map(
      (error) =>
        `${error.instancePath || "/"} ${error.message ?? "is invalid"}`,
    )
    .join("; ");
}

function buildOperationIndex(api) {
  const operations = new Map();
  for (const [pathName, pathItem] of Object.entries(api.paths ?? {})) {
    for (const method of [
      "get",
      "post",
      "patch",
      "put",
      "delete",
      "options",
      "head",
    ]) {
      const operation = pathItem?.[method];
      if (operation?.operationId) {
        operations.set(operation.operationId, { method, operation, pathName });
      }
    }
  }
  return operations;
}

function validatePayload(schema, payload, label) {
  const validate = ajv.compile(schema);
  if (!validate(payload)) {
    throw new Error(
      `${label} failed schema validation: ${formatAjvErrors(validate)}`,
    );
  }
}

function validateMediaExamples(schema, mediaType, label) {
  if (!schema || !mediaType) {
    return;
  }

  if (mediaType.example !== undefined) {
    validatePayload(schema, mediaType.example, `${label} example`);
  }

  for (const [exampleName, exampleObject] of Object.entries(
    mediaType.examples ?? {},
  )) {
    if (exampleObject?.value !== undefined) {
      validatePayload(
        schema,
        exampleObject.value,
        `${label} example ${exampleName}`,
      );
    }
  }
}

function validateSchemaExamples(api) {
  for (const [schemaName, schema] of Object.entries(
    api.components?.schemas ?? {},
  )) {
    if (schema?.example !== undefined) {
      validatePayload(
        schema,
        schema.example,
        `components.schemas.${schemaName}`,
      );
    }
  }

  for (const [pathName, pathItem] of Object.entries(api.paths ?? {})) {
    for (const method of [
      "get",
      "post",
      "patch",
      "put",
      "delete",
      "options",
      "head",
    ]) {
      const operation = pathItem?.[method];
      if (!operation) {
        continue;
      }

      for (const [contentType, mediaType] of Object.entries(
        operation.requestBody?.content ?? {},
      )) {
        validateMediaExamples(
          mediaType.schema,
          mediaType,
          `${method.toUpperCase()} ${pathName} request ${contentType}`,
        );
      }

      for (const [status, response] of Object.entries(
        operation.responses ?? {},
      )) {
        for (const [contentType, mediaType] of Object.entries(
          response.content ?? {},
        )) {
          validateMediaExamples(
            mediaType.schema,
            mediaType,
            `${method.toUpperCase()} ${pathName} response ${status} ${contentType}`,
          );
        }
      }
    }
  }
}

async function validateFixtureFiles(api) {
  const files = await collectJsonFiles(fixturesDir);
  const operations = buildOperationIndex(api);

  for (const filePath of files) {
    const fixture = JSON.parse(await readFile(filePath, "utf8"));
    for (const check of fixture.cases ?? []) {
      const operationEntry = operations.get(check.operation_id);
      if (!operationEntry) {
        throw new Error(
          `${path.relative(packageDir, filePath)} references unknown operation ${check.operation_id}`,
        );
      }

      if (check.kind === "request") {
        const mediaType =
          operationEntry.operation.requestBody?.content?.[check.content_type];
        if (!mediaType?.schema) {
          throw new Error(
            `${path.relative(packageDir, filePath)} missing request schema for ${check.operation_id}`,
          );
        }
        validatePayload(
          mediaType.schema,
          check.payload,
          `${path.relative(packageDir, filePath)} case ${check.name}`,
        );
        continue;
      }

      if (check.kind === "response") {
        const response =
          operationEntry.operation.responses?.[String(check.status)];
        const mediaType = response?.content?.[check.content_type];
        if (!mediaType?.schema) {
          throw new Error(
            `${path.relative(packageDir, filePath)} missing response schema for ${check.operation_id} ${check.status}`,
          );
        }
        validatePayload(
          mediaType.schema,
          check.payload,
          `${path.relative(packageDir, filePath)} case ${check.name}`,
        );
        continue;
      }

      throw new Error(
        `${path.relative(packageDir, filePath)} contains unsupported case kind ${check.kind}`,
      );
    }
  }
}

async function validateBaselines() {
  let baselineFiles = [];
  try {
    baselineFiles = await collectJsonFiles(baselinesDir);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return;
    }
    throw error;
  }

  for (const filePath of baselineFiles) {
    const baseline = JSON.parse(await readFile(filePath, "utf8"));
    if (typeof baseline.openapi !== "string" || !baseline.info?.title) {
      throw new Error(
        `${path.relative(packageDir, filePath)} is not a valid OpenAPI baseline`,
      );
    }
  }
}

async function main() {
  await SwaggerParser.validate(specPath);
  const dereferencedApi = await SwaggerParser.dereference(specPath);
  validateSchemaExamples(dereferencedApi);
  await validateFixtureFiles(dereferencedApi);
  await validateBaselines();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
