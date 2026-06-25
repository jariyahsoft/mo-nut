import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url)),
);
assert.equal(packageJson.name, "@mo-nut/web");
assert.equal(typeof packageJson.scripts.build, "string");
