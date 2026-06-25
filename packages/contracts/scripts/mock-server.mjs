import { createMockServer } from "./mock-server-lib.mjs";

const port = Number(process.env.MO_NUT_MOCK_PORT ?? 4010);

const { server, port: listeningPort } = await createMockServer({ port });

console.log(`Mo-nut mock server listening on http://127.0.0.1:${listeningPort}`);

process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
