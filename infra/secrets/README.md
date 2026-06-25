# Secrets Management

## Overview

This document defines the secret boundaries, service accounts, and rotation policies for the Mo-nut application. All production credentials use Google Cloud Secret Manager with least-privilege access.

## Secret Categories

### Application Secrets

| Secret Name | Purpose | Rotation Owner | Rotation Interval | Access Scope |
|-------------|---------|----------------|-------------------|--------------|
| `firebase-admin-key` | Backend Firebase Admin SDK | Platform Team | 90 days | API service account only |
| `fcm-server-key` | FCM push notifications | Platform Team | 90 days | Notification service |
| `recaptcha-secret-key` | App Check validation | Platform Team | 180 days | API service account |
| `jwt-signing-key` | Application session tokens | Security Team | 30 days | Auth service |

### Provider Integration Secrets

| Secret Name | Purpose | Rotation Owner | Rotation Interval | Access Scope |
|-------------|---------|----------------|-------------------|--------------|
| `ocr-provider-api-key` | Document OCR processing | Integration Team | 90 days | Worker service account |
| `stt-provider-api-key` | Speech-to-text processing | Integration Team | 90 days | Worker service account |
| `map-provider-api-key` | Location and map services | Integration Team | 180 days | API service account |
| `sms-provider-api-key` | SMS notification fallback | Integration Team | 90 days | Notification service |

### Storage Access Keys

| Secret Name | Purpose | Rotation Owner | Rotation Interval | Access Scope |
|-------------|---------|----------------|-------------------|--------------|
| `storage-signed-url-key` | Generate signed upload URLs | Platform Team | 60 days | API service account |
| `backup-encryption-key` | Encrypt database backups | Platform Team | 365 days | Backup service account |

## Service Account Boundaries

### API Service Account

**Identity:** `api-service@{project-id}.iam.gserviceaccount.com`

**Permissions:**
- Firestore: Read/Write on approved collections
- Storage: Generate signed URLs for private uploads
- Secret Manager: Read application and provider secrets
- Cloud Logging: Write logs
- Cloud Trace: Write traces

**Restrictions:**
- Cannot delete Firestore collections
- Cannot modify IAM policies
- Cannot access backup encryption keys

### Worker Service Account

**Identity:** `worker-service@{project-id}.iam.gserviceaccount.com`

**Permissions:**
- Firestore: Read/Write processing jobs and drafts
- Storage: Read uploaded assets
- Secret Manager: Read OCR/STT provider secrets
- Cloud Tasks: Acknowledge tasks
- Cloud Logging: Write logs

**Restrictions:**
- Cannot access user/patient data directly
- Cannot generate signed URLs
- Cannot modify storage rules

### Notification Service Account

**Identity:** `notification-service@{project-id}.iam.gserviceaccount.com`

**Permissions:**
- Firestore: Read notification delivery records
- Secret Manager: Read FCM and SMS provider secrets
- Cloud Logging: Write logs

**Restrictions:**
- Cannot access full patient data
- Cannot modify Firestore outside notification collections

### Backup Service Account

**Identity:** `backup-service@{project-id}.iam.gserviceaccount.com`

**Permissions:**
- Firestore: Read-only export
- Storage: Write to backup bucket
- Secret Manager: Read backup encryption key
- Cloud Logging: Write logs

**Restrictions:**
- Cannot write to operational database
- Cannot access application secrets

## Secret Manager Configuration

### Structure

```
projects/{project-id}/secrets/{secret-name}/versions/{version}
```

### Versioning Policy

- All secrets support versioning
- New versions are enabled before old versions are disabled
- Rollback window: 7 days
- After rotation, old version is destroyed after 30 days

### Access Control

- Service accounts granted `roles/secretmanager.secretAccessor` per secret
- Human access requires MFA and audit logging
- No secret can be accessed by multiple service account types

## Local Development

### Emulator Secrets

Local development uses `.env.local` (gitignored) with fake/demo values:

```bash
# Firebase Admin (uses emulator)
FIREBASE_ADMIN_PROJECT_ID=demo-mo-nut-local
FIREBASE_ADMIN_CLIENT_EMAIL=fake@demo.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="fake-key-for-emulator"

# Provider APIs (disabled or mock)
OCR_PROVIDER_API_KEY=disabled
STT_PROVIDER_API_KEY=disabled
MAP_PROVIDER_API_KEY=disabled
SMS_PROVIDER_API_KEY=disabled
```

### Debug Tokens

- Firebase App Check debug tokens are registered per developer
- Debug tokens expire after 30 days
- Production credentials NEVER used in local development

## Rotation Procedures

### Routine Rotation

1. Generate new secret version in Secret Manager
2. Deploy application with dual-read support (old + new)
3. Verify new version works in staging
4. Enable new version in production
5. Monitor for errors for 24 hours
6. Disable old version
7. Destroy old version after 30 days

### Emergency Rotation

1. Immediately disable compromised secret
2. Generate new secret version
3. Deploy with emergency priority
4. Verify critical paths work
5. Monitor for errors
6. Post-incident review

## Secret Scanning

### Pre-commit

- Local git hooks scan for patterns matching API keys, tokens, private keys
- Reject commits containing secret-like patterns

### CI/CD

- GitHub Advanced Security secret scanning (or equivalent)
- Fail build if secrets detected in code or config

### Runtime

- No secrets logged in application logs
- No secrets in error messages or stack traces
- No secrets in client bundles (verified in build)

## Audit Requirements

All secret access is logged with:
- Service account identity
- Secret name (not value)
- Access timestamp
- Purpose/correlation ID
- Success/failure status

## Compliance Notes

- Secrets containing PHI/PII are encrypted at rest (Secret Manager default)
- Backup encryption keys have 365-day rotation to balance security and recovery
- Provider API keys subject to provider DPA and region requirements
- No secret can be read by end users or client applications

## Open Decisions

- [ ] SMS provider selection and API key structure
- [ ] Map provider API key quotas and billing alerts
- [ ] OCR/STT provider region restrictions
- [ ] Key management service (KMS) for additional encryption layers
