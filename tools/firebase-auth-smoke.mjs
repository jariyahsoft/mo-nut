import { readFile } from "node:fs/promises";

const authHost = process.env.FIREBASE_AUTH_EMULATOR_HOST ?? "127.0.0.1:9099";
const projectId = process.env.GCLOUD_PROJECT ?? "demo-mo-nut-local";
const apiKey = "fake-api-key";
const baseUrl = `http://${authHost}/identitytoolkit.googleapis.com/v1`;
const seed = JSON.parse(
  await readFile(new URL("../infra/firebase/emulator-data/seed-users.json", import.meta.url)),
);

async function postJson(endpoint, body) {
  const response = await fetch(`${baseUrl}/${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Auth emulator request failed: ${endpoint}`);
  }

  return payload;
}

async function clearAccounts() {
  const response = await fetch(
    `http://${authHost}/emulator/v1/projects/${projectId}/accounts`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error("Unable to clear Auth emulator accounts");
  }
}

async function main() {
  await clearAccounts();

  const signUp = await postJson("accounts:signUp", {
    email: seed.patient.email,
    password: seed.patient.password,
    displayName: seed.patient.display_name,
    returnSecureToken: true,
  });

  if (!signUp.idToken) {
    throw new Error("Email/password sign-up did not return an ID token");
  }

  const signIn = await postJson("accounts:signInWithPassword", {
    email: seed.patient.email,
    password: seed.patient.password,
    returnSecureToken: true,
  });

  if (signIn.localId !== signUp.localId) {
    throw new Error("Email/password sign-in did not return the created account");
  }

  const verifyEmail = await postJson("accounts:sendOobCode", {
    requestType: "VERIFY_EMAIL",
    idToken: signIn.idToken,
  });
  if (verifyEmail.email !== seed.patient.email) {
    throw new Error("Email verification flow was not testable in the emulator");
  }

  const passwordReset = await postJson("accounts:sendOobCode", {
    requestType: "PASSWORD_RESET",
    email: seed.patient.email,
  });
  if (passwordReset.email !== seed.patient.email) {
    throw new Error("Password recovery flow was not testable in the emulator");
  }

  const idpSignIn = await postJson("accounts:signInWithIdp", {
    requestUri: "http://localhost",
    postBody: `id_token=${encodeURIComponent(
      JSON.stringify({
        sub: seed.caregiver_google.subject,
        email: seed.caregiver_google.email,
        email_verified: true,
        name: seed.caregiver_google.display_name,
      }),
    )}&providerId=${seed.caregiver_google.provider_id}`,
    returnSecureToken: true,
    returnIdpCredential: true,
  });

  if (!idpSignIn.federatedId || !idpSignIn.email) {
    throw new Error("Google sign-in flow was not testable in the Auth emulator");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
