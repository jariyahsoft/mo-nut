import { readFile } from "node:fs/promises";
import path from "node:path";

const workspaceRoot = process.cwd();
const firebaseDir = path.join(workspaceRoot, "infra", "firebase");

export async function readFirebaseProjects() {
  return JSON.parse(
    await readFile(path.join(firebaseDir, "projects.json"), "utf8"),
  );
}

export async function readFirebaseProviders() {
  return JSON.parse(
    await readFile(path.join(firebaseDir, "auth-providers.json"), "utf8"),
  );
}

export async function readFirebaseRc() {
  return JSON.parse(await readFile(path.join(firebaseDir, ".firebaserc"), "utf8"));
}

export function isPrivilegedRole(role) {
  return ["admin", "auditor", "support"].includes(role);
}

export function buildFirebaseWebEnvironment({
  appEnv,
  env = process.env,
}) {
  const emulatorHost = env.FIREBASE_EMULATOR_HOST ?? "127.0.0.1";
  const authPort = Number(env.FIREBASE_AUTH_EMULATOR_PORT ?? 9099);
  const firestorePort = Number(env.FIREBASE_FIRESTORE_EMULATOR_PORT ?? 8081);
  const storagePort = Number(env.FIREBASE_STORAGE_EMULATOR_PORT ?? 9199);
  const functionsPort = Number(env.FIREBASE_FUNCTIONS_EMULATOR_PORT ?? 5001);

  return {
    appEnv,
    useEmulators: appEnv === "local",
    apiKey: env.FIREBASE_WEB_API_KEY ?? "fake-api-key",
    authDomain: env.FIREBASE_AUTH_DOMAIN ?? "demo-mo-nut-local.firebaseapp.com",
    projectId: env.FIREBASE_PROJECT_ID ?? "demo-mo-nut-local",
    storageBucket:
      env.FIREBASE_STORAGE_BUCKET ?? "demo-mo-nut-local.appspot.com",
    appId:
      env.FIREBASE_APP_ID ?? "1:000000000000:web:demo000000000000",
    messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID ?? "000000000000",
    authEmulatorUrl: `http://${emulatorHost}:${authPort}`,
    firestoreEmulatorHost: `${emulatorHost}:${firestorePort}`,
    storageEmulatorHost: `${emulatorHost}:${storagePort}`,
    functionsEmulatorOrigin: `http://${emulatorHost}:${functionsPort}`,
    phoneOtpEnabled: env.ENABLE_PHONE_OTP === "true" && appEnv !== "local",
    requirePrivilegedMfa: env.REQUIRE_PRIVILEGED_MFA !== "false",
  };
}

export async function assertFirebaseEnvironment({
  appEnv,
  projectId,
  storageBucket,
  requireLiveMatch = false,
}) {
  const projects = await readFirebaseProjects();
  const providers = await readFirebaseProviders();
  const aliases = await readFirebaseRc();
  const config = projects.environments?.[appEnv];

  if (!config) {
    throw new Error(`Unknown Firebase environment: ${appEnv}`);
  }

  if (aliases.projects?.[appEnv] !== config.project_id) {
    throw new Error(`Alias mismatch for Firebase environment: ${appEnv}`);
  }

  if (config.storage_bucket !== storageBucket) {
    throw new Error(`Storage bucket mismatch for Firebase environment: ${appEnv}`);
  }

  if (appEnv === "local" && !config.project_id.startsWith("demo-")) {
    throw new Error("Local Firebase environment must use a demo project ID");
  }

  if (appEnv !== "local" && config.project_id.startsWith("demo-")) {
    throw new Error(`${appEnv} cannot use a demo Firebase project ID`);
  }

  if (requireLiveMatch && config.project_id !== projectId) {
    throw new Error(`Project mismatch for environment ${appEnv}`);
  }

  if (!providers.email_password?.enabled || !providers.google?.enabled) {
    throw new Error("Email/password and Google sign-in must stay enabled");
  }

  if (providers.phone_otp?.enabled_by_default) {
    throw new Error("Phone OTP must remain feature-flagged by default");
  }
}
