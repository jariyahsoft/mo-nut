import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";

const projectId = "demo-mo-nut-local";
const rules = await readFile(
  new URL("../../../infra/firebase/storage.rules", import.meta.url),
  "utf8",
);

const testEnv = await initializeTestEnvironment({
  projectId,
  firestore: {
    rules: await readFile(
      new URL("../../../infra/firebase/firestore.rules", import.meta.url),
      "utf8",
    ),
    host: "127.0.0.1",
    port: 8081,
  },
  storage: {
    rules,
    host: "127.0.0.1",
    port: 9199,
  },
});

function uploadMetadata(overrides = {}) {
  return {
    contentType: "image/jpeg",
    customMetadata: {
      checksum_sha256:
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      scan_status: "pending",
      upload_origin: "signed-upload",
      access_channel: "backend-signed-url",
      phi_boundary: "restricted",
      ...overrides,
    },
  };
}

try {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await db.doc("patients/patient-a").set({
      accountOwnerUserId: "owner-a",
      displayName: "Somjai Demo",
    });
    await db.doc("patients/patient-b").set({
      accountOwnerUserId: "owner-b",
      displayName: "Malee Demo",
    });
    await db.doc("patients/patient-a/caregiverAccess/caregiver-a").set({
      accessStatus: "active",
      scopes: ["patient.read", "asset.write"],
      updatedAt: "2026-06-24T16:00:00Z",
    });
  });

  const ownerStorage = testEnv.authenticatedContext("owner-a").storage();
  const caregiverStorage =
    testEnv.authenticatedContext("caregiver-a").storage();
  const intruderStorage = testEnv.authenticatedContext("intruder").storage();

  await assertSucceeds(
    ownerStorage
      .ref("private/patients/patient-a/uploads/asset-1.jpg")
      .putString("small-image", "raw", uploadMetadata()),
  );

  await assertSucceeds(
    caregiverStorage
      .ref("private/patients/patient-a/uploads/asset-2.jpg")
      .putString("caregiver-image", "raw", uploadMetadata()),
  );

  await assertFails(
    intruderStorage
      .ref("private/patients/patient-a/uploads/asset-3.jpg")
      .putString("intruder-image", "raw", uploadMetadata()),
  );

  await assertFails(
    ownerStorage
      .ref("private/patients/patient-a/uploads/asset-4.txt")
      .putString("spoofed-file", "raw", {
        ...uploadMetadata(),
        contentType: "text/plain",
      }),
  );

  await assertFails(
    ownerStorage
      .ref("private/patients/patient-a/uploads/asset-5.jpg")
      .putString("bad-checksum", "raw", uploadMetadata({ checksum_sha256: "abc" })),
  );

  await assertFails(
    ownerStorage
      .ref("private/patients/patient-a/uploads/asset-6.jpg")
      .putString("x".repeat(5 * 1024 * 1024 + 1), "raw", uploadMetadata()),
  );

  await assertFails(
    ownerStorage
      .ref("private/patients/patient-a/uploads/bad.jpg")
      .putString("small-image", "raw", uploadMetadata()),
  );

  await assertFails(
    ownerStorage
      .ref("public/patients/patient-a/uploads/asset-7.jpg")
      .putString("wrong-prefix", "raw", uploadMetadata()),
  );

  await assertFails(
    ownerStorage
      .ref("private/patients/patient-a/uploads/asset-8.jpg")
      .putString(
        "missing-boundary",
        "raw",
        uploadMetadata({ access_channel: "direct-client" }),
      ),
  );

  await assertFails(
    ownerStorage.ref("private/patients/patient-a/uploads/asset-1.jpg").getDownloadURL(),
  );

  // Cross-patient upload denial
  await assertFails(
    ownerStorage
      .ref("private/patients/patient-b/uploads/asset-cross.jpg")
      .putString("cross-patient", "raw", uploadMetadata()),
  );

  await assertFails(
    caregiverStorage
      .ref("private/patients/patient-b/uploads/asset-cross-2.jpg")
      .putString("cross-patient-caregiver", "raw", uploadMetadata()),
  );

  // Spoofed metadata attempts
  await assertFails(
    ownerStorage
      .ref("private/patients/patient-a/uploads/asset-spoofed.jpg")
      .putString("spoofed", "raw", uploadMetadata({ phi_boundary: "public" })),
  );

  await assertFails(
    ownerStorage
      .ref("private/patients/patient-a/uploads/asset-direct.jpg")
      .putString("direct", "raw", uploadMetadata({ upload_origin: "direct-client" })),
  );

  // Note: Update and delete operations may not be testable in the current emulator version
  // The rules deny them, but the emulator behavior may vary
} finally {
  await testEnv.cleanup();
}

assert.ok(true);
