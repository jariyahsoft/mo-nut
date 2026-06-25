import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const packageDir = path.resolve(currentDir, "..");
const workspaceRoot = path.resolve(packageDir, "..", "..");

async function main() {
  await execFileAsync(
    "npx",
    [
      "firebase",
      "emulators:exec",
      "--config",
      path.join(workspaceRoot, "infra", "firebase", "firebase.json"),
      "--project",
      "demo-mo-nut-local",
      "--only",
      "firestore,storage",
      "node --test ./test/scaffold.test.mjs ./test/firestore.rules.test.mjs ./test/storage.rules.test.mjs",
    ],
    {
      cwd: packageDir,
      env: {
        ...process.env,
        FIRESTORE_EMULATOR_HOST: "127.0.0.1:8081",
        FIREBASE_STORAGE_EMULATOR_HOST: "127.0.0.1:9199",
        GCLOUD_PROJECT: "demo-mo-nut-local",
      },
    },
  );
}

main().catch((error) => {
  console.error("Test execution failed:");
  console.error(error.stdout || "");
  console.error(error.stderr || "");
  console.error(error.message);
  process.exit(1);
});
