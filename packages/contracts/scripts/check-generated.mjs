import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const contractsDir = path.resolve(currentDir, "..");
const workspaceRoot = path.resolve(contractsDir, "..", "..");
const generatedClientDir = path.join(
  workspaceRoot,
  "packages",
  "generated-client",
);

async function hashDirectory(rootDir) {
  const hash = createHash("sha256");

  async function visit(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(rootDir, fullPath);
      hash.update(relPath);
      hash.update("\n");

      if (entry.isDirectory()) {
        await visit(fullPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      hash.update(await readFile(fullPath));
      hash.update("\n");
    }
  }

  await visit(rootDir);
  return hash.digest("hex");
}

async function main() {
  const before = await hashDirectory(generatedClientDir);
  await execFileAsync("node", [path.join(currentDir, "generate-client.mjs")], {
    cwd: contractsDir,
  });
  const after = await hashDirectory(generatedClientDir);

  if (before !== after) {
    throw new Error(
      "Generated client changed after regeneration. Run pnpm api:generate and commit the generated package updates.",
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
