import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const workspaceRoot = process.cwd();
const firebaseConfigPath = path.join(
  workspaceRoot,
  "infra",
  "firebase",
  "firebase.json",
);

async function main() {
  await execFileAsync(
    "firebase",
    [
      "emulators:exec",
      "--config",
      firebaseConfigPath,
      "--project",
      "demo-mo-nut-local",
      "--only",
      "auth",
      "node tools/firebase-auth-smoke.mjs",
    ],
    {
      cwd: workspaceRoot,
      env: {
        ...process.env,
        FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
        GCLOUD_PROJECT: "demo-mo-nut-local",
      },
    },
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
