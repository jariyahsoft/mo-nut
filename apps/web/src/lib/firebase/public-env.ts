type FirebaseWebEnvironment = {
  appEnv: string;
  useEmulators: boolean;
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  appId: string;
  messagingSenderId: string;
  authEmulatorUrl: string;
  firestoreEmulatorHost: string;
  storageEmulatorHost: string;
  functionsEmulatorOrigin: string;
  phoneOtpEnabled: boolean;
  requirePrivilegedMfa: boolean;
};

export function resolveFirebaseWebEnvironment(
  env: NodeJS.ProcessEnv = process.env,
): FirebaseWebEnvironment {
  const appEnv = env.APP_ENV ?? "local";
  const emulatorHost = env.FIREBASE_EMULATOR_HOST ?? "127.0.0.1";
  const authPort = env.FIREBASE_AUTH_EMULATOR_PORT ?? "9099";
  const firestorePort = env.FIREBASE_FIRESTORE_EMULATOR_PORT ?? "8081";
  const storagePort = env.FIREBASE_STORAGE_EMULATOR_PORT ?? "9199";
  const functionsPort = env.FIREBASE_FUNCTIONS_EMULATOR_PORT ?? "5001";

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
