import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { assertNoBreakingChanges } from "../scripts/check-breaking-lib.mjs";

const baselineApi = JSON.parse(
  await readFile(new URL("../baselines/task-01-openapi-baseline.json", import.meta.url)),
);

const currentApi = structuredClone(baselineApi);
assert.doesNotThrow(() =>
  assertNoBreakingChanges({ baselineApi, currentApi }),
);

const breakingApi = structuredClone(baselineApi);
delete breakingApi.paths["/me"];
assert.throws(
  () => assertNoBreakingChanges({ baselineApi, currentApi: breakingApi }),
  /Removed API path \/me/,
);
