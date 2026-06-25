import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredScripts = ["build", "lint", "typecheck", "test"];

async function collectWorkspacePackages() {
  const packageRoots = ["apps", "packages"];
  const packageDirs = [];

  for (const packageRoot of packageRoots) {
    const rootDir = path.join(root, packageRoot);
    const entries = await readdir(rootDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      packageDirs.push(path.join(packageRoot, entry.name));
    }
  }

  return packageDirs;
}

async function main() {
  const packages = await collectWorkspacePackages();
  for (const rel of packages) {
    const packageJsonPath = path.join(root, rel, "package.json");
    const text = await readFile(packageJsonPath, "utf8");
    const pkg = JSON.parse(text);
    for (const script of requiredScripts) {
      if (
        typeof pkg.scripts?.[script] !== "string" ||
        pkg.scripts[script].length === 0
      ) {
        throw new Error(`${rel} is missing script: ${script}`);
      }
    }
  }

  const forbiddenPatterns = [/TODO/g, /FIXME/g];
  const sourceFiles = [
    "apps/web/src/app/page.tsx",
    "apps/web/src/app/layout.tsx",
    "apps/api/src/main.ts",
    "apps/api/src/app.controller.ts",
    "packages/contracts/src/index.ts",
    "packages/generated-client/src/index.ts",
  ];

  for (const rel of sourceFiles) {
    const text = await readFile(path.join(root, rel), "utf8");
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(text)) {
        throw new Error(`forbidden marker found in ${rel}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
