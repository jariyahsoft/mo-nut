import assert from "node:assert/strict";
import { createMockServer } from "../scripts/mock-server-lib.mjs";

const { server, port } = await createMockServer({ port: 0 });

try {
  const success = await fetch(`http://127.0.0.1:${port}/me`);
  assert.equal(success.status, 200);
  const successBody = await success.json();
  assert.equal(typeof successBody.data.user_id, "string");

  const error = await fetch(
    `http://127.0.0.1:${port}/share-links/public/shr_01JY5Q00A9TQ6B2VMP3N2X5GH9?__status=410`,
  );
  assert.equal(error.status, 410);
  const errorBody = await error.json();
  assert.equal(errorBody.error.code, "SHARE_EXPIRED");
} finally {
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}
