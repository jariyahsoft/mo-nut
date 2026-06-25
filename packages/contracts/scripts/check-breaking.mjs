import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import SwaggerParser from "@apidevtools/swagger-parser";
import { assertNoBreakingChanges } from "./check-breaking-lib.mjs";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const contractsDir = path.resolve(currentDir, "..");
const specPath = path.join(contractsDir, "openapi", "openapi.yaml");
const defaultBaselinePath = path.join(
  contractsDir,
  "baselines",
  "current-openapi-baseline.json",
);

function parseBaselinePath() {
  const baselineIndex = process.argv.indexOf("--baseline");
  if (baselineIndex === -1) {
    return defaultBaselinePath;
  }

  return path.resolve(process.cwd(), process.argv[baselineIndex + 1]);
}

async function main() {
  const baselinePath = parseBaselinePath();
  const baselineApi = JSON.parse(await readFile(baselinePath, "utf8"));
  const currentApi = await SwaggerParser.bundle(specPath);
  assertNoBreakingChanges({ baselineApi, currentApi });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
