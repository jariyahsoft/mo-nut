import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import SwaggerParser from "@apidevtools/swagger-parser";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const contractsDir = path.resolve(currentDir, "..");
const specPath = path.join(contractsDir, "openapi", "openapi.yaml");

function compileRoute(pathTemplate) {
  const names = [];
  const pattern = pathTemplate.replace(/\{([^}]+)\}/g, (_, name) => {
    names.push(name);
    return "([^/]+)";
  });

  return {
    names,
    regex: new RegExp(`^${pattern}$`),
  };
}

function normalizeResponseExamples(mediaType) {
  const examples = [];

  if (mediaType?.example !== undefined) {
    examples.push({ name: "default", value: mediaType.example });
  }

  for (const [name, example] of Object.entries(mediaType?.examples ?? {})) {
    if (example?.value !== undefined) {
      examples.push({ name, value: example.value });
    }
  }

  if (examples.length === 0 && mediaType?.schema?.example !== undefined) {
    examples.push({ name: "schema_example", value: mediaType.schema.example });
  }

  return examples;
}

function buildRoutes(api) {
  const routes = [];

  for (const [pathName, pathItem] of Object.entries(api.paths ?? {})) {
    const matcher = compileRoute(pathName);

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

      const responses = [];
      for (const [status, response] of Object.entries(operation.responses ?? {})) {
        const mediaType = response.content?.["application/json"];
        const examples = normalizeResponseExamples(mediaType);
        responses.push({
          status,
          description: response.description ?? "",
          examples,
        });
      }

      routes.push({
        method: method.toUpperCase(),
        pathName,
        matcher,
        operationId: operation.operationId ?? `${method}_${pathName}`,
        responses,
      });
    }
  }

  return routes;
}

function chooseResponse(route, requestUrl, requestHeaders) {
  const requestedStatus =
    requestUrl.searchParams.get("__status") ??
    requestHeaders["x-mock-response-status"];
  const requestedExample =
    requestUrl.searchParams.get("__example") ?? requestHeaders["x-mock-example"];

  let response =
    route.responses.find((entry) => entry.status === requestedStatus) ??
    route.responses.find((entry) => entry.status.startsWith("2")) ??
    route.responses[0];

  if (!response) {
    return {
      status: 204,
      payload: null,
    };
  }

  const example =
    response.examples.find((entry) => entry.name === requestedExample) ??
    response.examples[0] ??
    null;

  return {
    status: Number(response.status),
    payload:
      example?.value ?? {
        data: null,
        meta: { mocked: true },
        error: null,
      },
  };
}

export async function createMockServer({ port = 0 } = {}) {
  const api = await SwaggerParser.dereference(specPath);
  const routes = buildRoutes(api);

  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");

    if (requestUrl.pathname === "/__health") {
      response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ status: "ok" }));
      return;
    }

    if (requestUrl.pathname === "/__routes") {
      response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      response.end(
        JSON.stringify(
          routes.map((route) => ({
            method: route.method,
            path: route.pathName,
            operation_id: route.operationId,
            statuses: route.responses.map((entry) => entry.status),
          })),
        ),
      );
      return;
    }

    const matchedRoute = routes.find(
      (route) =>
        route.method === (request.method ?? "GET").toUpperCase() &&
        route.matcher.regex.test(requestUrl.pathname),
    );

    if (!matchedRoute) {
      response.writeHead(404, { "content-type": "application/json; charset=utf-8" });
      response.end(
        JSON.stringify({
          data: null,
          meta: { mocked: true },
          error: {
            code: "RESOURCE_NOT_FOUND",
            message: "No mock route matched the request.",
            fields: [],
          },
        }),
      );
      return;
    }

    const result = chooseResponse(matchedRoute, requestUrl, request.headers);
    response.writeHead(result.status, {
      "content-type": "application/json; charset=utf-8",
      "x-mock-operation-id": matchedRoute.operationId,
    });
    response.end(JSON.stringify(result.payload));
  });

  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Unable to determine mock server address");
  }

  return {
    server,
    port: address.port,
  };
}
