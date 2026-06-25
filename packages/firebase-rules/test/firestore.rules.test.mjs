import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";

const projectId = "demo-mo-nut-local";
const rules = await readFile(
  new URL("../../../infra/firebase/firestore.rules", import.meta.url),
  "utf8",
);

const testEnv = await initializeTestEnvironment({
  projectId,
  firestore: {
    rules,
    host: "127.0.0.1",
    port: 8081,
  },
});

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
    await db.doc("patients/patient-a/measurements/measurement-1").set({
      value: 120,
      unit: "mmHg",
    });
    await db.doc("appointments/appointment-1").set({
      patientId: "patient-a",
      status: "confirmed",
      scheduledAt: "2026-06-24T10:00:00Z",
    });
    await db.doc("health_measurements/measurement-1").set({
      patientId: "patient-a",
      type: "blood_pressure",
      measuredAt: "2026-06-24T09:00:00Z",
    });
    await db.doc("document_assets/asset-1").set({
      patientId: "patient-a",
      mimeType: "application/pdf",
      status: "uploaded",
    });
    await db.doc("processing_jobs/job-1").set({
      status: "queued",
      createdAt: "2026-06-24T08:00:00Z",
    });
    await db.doc("audit_events/audit-1").set({
      actorId: "owner-a",
      action: "patient.read",
      occurredAt: "2026-06-24T07:00:00Z",
    });
  });

  const ownerDb = testEnv.authenticatedContext("owner-a").firestore();
  const caregiverDb =
    testEnv.authenticatedContext("caregiver-a").firestore();
  const intruderDb = testEnv.authenticatedContext("intruder").firestore();

  await assertSucceeds(ownerDb.doc("patients/patient-a").get());
  await assertSucceeds(caregiverDb.doc("patients/patient-a").get());
  await assertFails(ownerDb.doc("patients/patient-b").get());
  await assertFails(intruderDb.doc("patients/patient-a").get());
  await assertSucceeds(ownerDb.doc("patients/patient-a/caregiverAccess/caregiver-a").get());
  await assertSucceeds(caregiverDb.doc("patients/patient-a/caregiverAccess/caregiver-a").get());
  await assertFails(caregiverDb.doc("patients/patient-b/caregiverAccess/caregiver-b").get());
  await assertFails(ownerDb.doc("patients/patient-a/measurements/measurement-1").get());
  await assertFails(ownerDb.collection("appointments").get());
  await assertFails(ownerDb.doc("appointments/appointment-1").get());
  await assertFails(caregiverDb.doc("health_measurements/measurement-1").get());
  await assertFails(ownerDb.doc("document_assets/asset-1").get());
  await assertFails(ownerDb.doc("processing_jobs/job-1").get());
  await assertFails(ownerDb.doc("audit_events/audit-1").get());

  const ownerCreate = testEnv.authenticatedContext("owner-c").firestore();
  await assertSucceeds(
    ownerCreate.doc("patients/patient-c").set({
      accountOwnerUserId: "owner-c",
      displayName: "New Owner",
    }),
  );

  const forgedOwner = testEnv.authenticatedContext("owner-z").firestore();
  await assertFails(
    forgedOwner.doc("patients/patient-z").set({
      accountOwnerUserId: "owner-y",
      displayName: "Forged Owner",
    }),
  );

  await assertFails(
    ownerDb.doc("appointments/appointment-2").set({
      patientId: "patient-a",
      status: "confirmed",
      scheduledAt: "2026-06-25T10:00:00Z",
    }),
  );

  // Cross-patient access denial tests
  await assertFails(intruderDb.doc("patients/patient-a/measurements/measurement-1").get());
  await assertFails(intruderDb.doc("patients/patient-b/measurements/measurement-2").get());
  // Note: reading non-existent documents succeeds with null, so we only test existing paths

  // Restricted health collections denial - even owner cannot directly read
  await assertFails(ownerDb.doc("patients/patient-a/measurements/measurement-1").get());
  await assertFails(ownerDb.doc("patients/patient-a/medications/medication-1").get());
  await assertFails(ownerDb.doc("patients/patient-a/documentAssets/asset-1").get());
  await assertFails(caregiverDb.doc("patients/patient-a/measurements/measurement-1").get());

  // Top-level restricted collections - backend only
  await assertFails(ownerDb.doc("medications/medication-1").get());
  await assertFails(ownerDb.doc("dose_occurrences/dose-1").get());
  await assertFails(ownerDb.doc("consent_grants/grant-1").get());
  await assertFails(caregiverDb.doc("health_measurements/measurement-1").get());
  await assertFails(intruderDb.doc("processing_jobs/job-1").get());

  // Verify cross-patient write denial
  await assertFails(
    caregiverDb.doc("patients/patient-b/caregiverAccess/caregiver-a").set({
      accessStatus: "active",
      scopes: ["patient.read"],
    })
  );

  // User can only access their own user document
  await assertSucceeds(ownerDb.doc("users/owner-a").set({ displayName: "Owner A" }));
  await assertFails(ownerDb.doc("users/owner-b").get());
  await assertFails(intruderDb.doc("users/owner-a").get());
} finally {
  await testEnv.cleanup();
}

assert.ok(true);
