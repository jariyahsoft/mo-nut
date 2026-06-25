# Firebase Environments

This directory defines the environment-safe Firebase workflow for Mo-nut.

## Environments

- `local` uses the demo project `demo-mo-nut-local` and must run against emulators only.
- `development`, `staging`, and `production` each map to distinct Firebase projects and storage buckets.
- `pnpm firebase:validate` fails when the requested environment does not match the configured project or when a local/demo safeguard is violated.

## Auth policy

- Email/password is required in every environment.
- Google sign-in is required in every environment and must be testable against the local Auth emulator.
- Phone OTP remains feature-flagged through `ENABLE_PHONE_OTP` and is disabled by default in local development.
- Privileged roles such as `admin`, `auditor`, and `support` require MFA when `REQUIRE_PRIVILEGED_MFA=true`.

## Emulator workflow

- `pnpm firebase:auth:smoke` starts the local Auth emulator and verifies email/password sign-up, sign-in, email verification, password reset, and a synthetic Google sign-in flow.
- `pnpm firebase:rules:test` starts the Firestore and Storage emulators, then runs denial/allow-list tests against the committed rules.
- Firestore and Storage are client-deny by default for protected health data, while file downloads must go through short-lived backend-issued signed URLs instead of direct client reads.
- Protected Firestore collections such as `health_measurements`, `medications`, `document_assets`, `processing_jobs`, `notification_deliveries`, `audit_events`, and `sync_operations` are indexed for backend workflows but remain client-denied by security rules.
- Private uploads are restricted to `private/patients/{patientId}/uploads/{assetId}` and require signed-upload metadata, MIME allow-listing, SHA-256 checksum metadata, size limits, and a malware-scan pending boundary before backend processing.
- Functions emulator ports are reserved in `firebase.json` so later tasks can layer worker flows onto the same project contract.
- All seed data under `emulator-data/` is synthetic and must remain free of real patient or caregiver data.
