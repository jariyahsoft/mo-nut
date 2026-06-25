import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import SwaggerParser from "@apidevtools/swagger-parser";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(currentDir, "..");
const specPath = path.join(packageDir, "openapi", "openapi.yaml");

function parseName() {
  const nameIndex = process.argv.indexOf("--name");
  if (nameIndex === -1 || !process.argv[nameIndex + 1]) {
    throw new Error("Missing required --name argument");
  }
  return process.argv[nameIndex + 1];
}

async function main() {
  const name = parseName();
  const bundledApi = await SwaggerParser.bundle(specPath);
  const baselineDir = path.join(packageDir, "baselines");
  await mkdir(baselineDir, { recursive: true });
  const baselinePath = path.join(baselineDir, `${name}.json`);
  await writeFile(
    baselinePath,
    `${JSON.stringify(bundledApi, null, 2)}\n`,
    "utf8",
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
