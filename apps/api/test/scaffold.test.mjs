import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url)),
);
assert.equal(packageJson.name, "@mo-nut/api");
assert.equal(typeof packageJson.scripts.dev, "string");
