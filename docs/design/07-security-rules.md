# 07 — Security and Privacy Rules

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Security objectives

- Prevent cross-patient data access and privilege escalation
- Preserve medication, appointment and consent integrity
- Minimize PII/PHI exposure in client, logs, notification and third parties
- Make high-risk actions attributable and auditable
- Support revocation, deletion, incident response and recovery

## 2. Threat model summary

| Threat | Example | Required controls |
|---|---|---|
| IDOR | caregiver changes patient ID in URL | server resource authorization and scoped query |
| Token/session theft | lost phone or leaked token | short-lived token, secure storage, device revoke |
| Consent bypass | stale share link after revoke | token hash, expiry, revoke check, no cache |
| OCR/STT corruption | wrong medication/date | draft state, confidence, human confirmation |
| Offline replay | repeated dose/measurement | idempotency key, baseVersion, operation log |
| Admin abuse | broad support access | purpose/ticket, least privilege, immutable audit |
| File leakage | public document URL | signed URL, malware/type validation, no public cache |
| Notification privacy | diagnosis on lock screen | minimal template and privacy setting |
| Provider leakage | PHI retained by AI vendor | DPA/region/retention review, minimization |

## 3. Authentication model

- Phone OTP, email, Google and Apple as specified
- Rate limit OTP/login and prevent account enumeration
- MFA for admin/high-risk/organization accounts according to policy
- Biometric in Phase 2 unlocks local credential only
- Account recovery uses risk-based identity verification
- New device, failed login and revocation create security events

## 4. Role matrix

| Capability | Patient | Caregiver | Clinician | Org Staff | Admin | Support |
|---|---:|---:|---:|---:|---:|---:|
| Own profile/data | CRUD | No | No | No | No | No |
| Delegated patient read | N/A | Scoped consent | Scoped consent | Org policy + consent | Exceptional | Ticket + minimum |
| Medication/appointment edit | Own | Explicit scope | Approved clinician action | Role policy | No routine edit | No routine edit |
| Consent grant/revoke | Owner/representative | No | No | No | No | Assist workflow only |
| Audit/system admin | Own access history | Own actions | Own actions | Org subset | Platform scope | Ticket subset |
| Content publish | No | No | Reviewer if assigned | Assigned | Role-based | No |

## 5. Resource access policy

Authorization decision requires all applicable checks:

```text
authenticated
AND account/device/session active
AND role allows action
AND resource belongs to active patient/context
AND consent/purpose/scope is active and unexpired
AND organization constraint is satisfied
AND resource status permits action
AND high-risk re-authentication completed when required
```

UI visibility is never an authorization control.

## 6. Permission naming

Use `resource.action` with optional constraints, for example:

- `appointment.read`, `appointment.write`
- `medication.read`, `medication.write`, `dose.respond`
- `measurement.read`, `measurement.create`
- `document.read`, `transcript.read`
- `checklist.read`, `checklist.complete`
- `report.create`, `share.create`
- `sos.receive`

## 7. Data classification

| Class | Examples | Baseline |
|---|---|---|
| Public | approved health articles | integrity/review required |
| Internal | feature config, non-sensitive ops metrics | authenticated staff |
| Confidential PII | name, phone, DOB, facility/HN | encryption, minimum access |
| Restricted PHI | medication, measurement, documents, transcript | strict consent, audit, no public cache |
| Secret | token, OTP secret, provider key | secret manager only |

## 8. PDPA/privacy requirements

- Document purpose, lawful basis/consent and policy version
- Data minimization and purpose limitation
- Access/export/correction/deletion workflow and SLA
- Consent withdrawal must be as usable as grant
- Retention and legal hold documented by category
- Third-party processor region/retention/security reviewed
- Privacy notice and store disclosure must match actual collection
- Do not claim HIPAA/GDPR/SOC2 compliance unless formally assessed; design should remain compatible where applicable

## 9. Firebase/adapter rule pseudocode

Critical writes should pass API rather than direct client rules. Defense-in-depth rules:

```text
allow read: if authenticated
            && resource.patientId in authorizedPatientIds(request.auth)
            && hasActiveScope(request.auth, resource, "read");

allow write: if false; // critical collections are server-only by default
```

Server service account access is constrained by IAM; application authorization still executes before repository calls.

## 10. Secrets and key management

- Secret Manager per environment
- Rotation owner and interval for provider keys
- No secret in mobile/PWA bundle except explicitly public client configuration
- Service account uses workload identity where available
- Signed URL keys and share tokens are rotated/revocable

## 11. Audit requirements

Audit at minimum:

- authentication/security events and device revocation
- consent grant/suspend/revoke/expiry
- caregiver/clinician/admin/support access
- appointment and medication/schedule/dose correction
- report/export/share-link creation and access
- OCR/STT draft confirmation/application
- SOS initiation/close and location share status
- account deletion/data request/legal hold

Audit record must be append-only through normal application channels.

## 12. Abuse and rate controls

- OTP/login attempts per account/device/IP risk
- invite/share-link/report/OCR/STT quotas
- SOS abuse detection without blocking direct emergency call
- notification resend and SMS cost limits
- file upload size/type/count and malware scan

## 13. Notification privacy

- Lock-screen text defaults to minimal information
- User chooses privacy level where practical
- No full medication/diagnosis/document content in notification payload
- Payload should contain reference IDs and fetch authorized details after open

## 14. Local data security

### PWA

- Limit IndexedDB/cache to approved data
- Do not cache share/report pages by default
- Clear local PHI/token on logout and revoke sync

### Mobile

- OS secure storage for tokens
- Encrypted local database for PHI
- Screenshot/background preview protection considered for sensitive screens
- Remote device/session revoke triggers local wipe on next connectivity

## 15. Security test checklist

- [ ] IDOR for every patient-scoped endpoint
- [ ] role/scope/expiry/revoke negative cases
- [ ] session fixation/replay/revocation
- [ ] OTP enumeration/rate limit
- [ ] file MIME/extension/malware/signed URL
- [ ] idempotency replay and payload mismatch
- [ ] sync conflict and stale base version
- [ ] share token entropy, expiry and revoke
- [ ] logs/analytics/notification PHI leakage
- [ ] dependency/secret/SAST/DAST scanning
- [ ] admin/support purpose and audit enforcement

## 16. Incident response minimum

Detect → contain → revoke → preserve evidence → assess affected data/users → notify according to policy/law → recover → post-incident actions. Operational runbook remains a required follow-up document.
