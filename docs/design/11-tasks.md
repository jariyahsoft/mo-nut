# 11 — Implementation Task Plan

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## Status legend

```text
[ ] todo
[/] in progress
[x] done
[!] blocked
```

## 1. Current phase

**Sprint 0 / Architecture Foundation for Phase 1 PWA**

## 2. Required decisions before coding
- [!] Framework PWA และ Cross-platform Mobile App
- [!] Firebase Functions เทียบกับ Cloud Run สำหรับแต่ละ Service
- [!] OCR/STT Provider, Region, Data Retention และ Cost
- [!] Map Provider และรูปแบบค่าใช้จ่าย
- [!] ช่องทางสำรอง SMS/Email/LINE และผู้รับผิดชอบค่าใช้จ่าย
- [!] Browser/OS Version ขั้นต่ำ
- [!] Retention Period ของเสียง เอกสาร Audit และ Notification Log
- [!] Threshold/ข้อความเตือนที่ต้องผ่านผู้เชี่ยวชาญทางการแพทย์
- [!] Legal basis/Consent flow สำหรับผู้เยาว์หรือผู้แทนโดยชอบธรรม
- [!] SLA ของการถอนสิทธิ์ Data Export และ Account Deletion
- [!] รายการ Health/Bluetooth Device ที่อนุมัติใน Phase 2

## 3. Sprint 0 — Repository and contracts

- [ ] Confirm monorepo/repository layout and package manager
- [ ] Create apps/services/packages/infra structure
- [ ] Add lint, format, typecheck, unit, contract and build commands
- [ ] Create `.env.example` and secret-management policy
- [ ] Configure dev/staging/prod Firebase projects and emulators
- [ ] Define OpenAPI 3.1 base, standard envelope and error schemas
- [ ] Define canonical IDs, timestamps, enums and common audit fields
- [ ] Generate typed mock client and start mock server
- [ ] Create CI with secret/dependency scan
- [ ] Create threat-model workshop and detailed permission matrix
- [ ] Define synthetic fixtures; prohibit real PHI in non-production

Verification:
- [ ] Fresh clone can install, lint, test and build
- [ ] Mock API supports success, validation, denied, conflict and pending
- [ ] Environment separation and no production credential verified

## 4. Phase 1 foundation

### IAM and patient context
- [ ] Implement identity token exchange/session claims
- [ ] Phone OTP/email/Google; Apple when applicable
- [ ] Multi-role and active patient context
- [ ] Device/session list and revoke
- [ ] Login/OTP rate limiting and security audit events

### Consent and authorization
- [ ] Implement consent/permission canonical models
- [ ] Server authorization middleware/policy engine
- [ ] Caregiver invite/accept/expire/revoke
- [ ] Access history and share artifact revocation
- [ ] Automated IDOR/policy test matrix

### Core domain/data
- [ ] Repository ports and Firestore adapters
- [ ] Appointment and event state machine
- [ ] Medication schedule/dose generation/state machine
- [ ] Measurement append/trend queries
- [ ] Audit event append path
- [ ] Firestore indexes and emulator tests

## 5. Phase 1 feature modules

### Appointment/OCR/Visit
- [ ] Appointment CRUD and reschedule history
- [ ] Quick Capture/file upload
- [ ] OCR async jobs, confidence and review
- [ ] Reminder offsets and Doctor Visit Mode
- [ ] Calendar/map external opening

### Medication/notification
- [ ] Medication/schedule editor
- [ ] Dose occurrence generator
- [ ] Taken/snooze/skip/issue response with idempotency
- [ ] Missed/grace-period caregiver escalation
- [ ] In-app notification center and web-push capability handling

### Health/checklist/audio
- [ ] Measurement form/trends and approved threshold messages
- [ ] Checklist/occurrence/progress
- [ ] Doctor questions linked to appointment
- [ ] Audio consent/recording/upload/STT review

### Report/share/SOS/Doctor Lite
- [ ] Report async generation and selected scopes
- [ ] Expiring/revocable share link
- [ ] SOS hold/confirm, direct-call fallback and per-channel status
- [ ] Emergency card/QR privacy settings
- [ ] Doctor Lite consent-scoped summary

### Dashboard/admin/content
- [ ] Patient and caregiver dashboards/read models
- [ ] Clinician dashboard
- [ ] Admin/system health/incident minimum
- [ ] Reviewed health content workflow

## 6. Offline and sync

- [ ] Define operation envelope and dependency ordering
- [ ] PWA IndexedDB/outbox for approved commands
- [ ] `/sync/batch` and `/sync/changes`
- [ ] Dedup/idempotency and conflict response
- [ ] Offline banner, last synced and conflict UI
- [ ] Logout/revoke local-data clearing

## 7. Quality and release

- [ ] Core E2E journeys automated
- [ ] Accessibility audit and elderly usability test
- [ ] Security test/penetration review
- [ ] Performance baseline and queue/load tests
- [ ] Backup/restore and rollback drill
- [ ] Privacy notice/consent text/notification templates reviewed
- [ ] Phase 1 acceptance criteria signed off
- [ ] Pilot rollout, support channel and monitoring dashboards

## 8. Phase 2 preparation and delivery

- [ ] Validate Phase 2 entry gate
- [ ] Select Flutter or React Native through ADR/spike
- [ ] Define minimum Android/iOS support and store checklist
- [ ] Implement generated API client and encrypted local database
- [ ] Native push/local notification/background constraints
- [ ] Biometric unlock and secure storage
- [ ] Deep links/share/camera/microphone on real devices
- [ ] Cross-channel sync and PWA-account migration tests
- [ ] HealthKit/Health Connect consent/import if approved
- [ ] Approved Bluetooth device integration if approved
- [ ] TestFlight/closed beta/staged rollout and rollback

## 9. Dependencies

| Task area | Depends on |
|---|---|
| UI implementation | API schema, mock, UI guide |
| Backend module | canonical entity, permission rule, state machine |
| OCR/STT | provider/region/retention/cost decision |
| Notification | provider, privacy template, fallback decision |
| Phase 2 local DB | mobile framework and encryption decision |
| Health/Bluetooth | approved device/scope and consent/legal review |

## 10. Definition of Done

- Requirement and source traceability
- Contract/schema published and compatibility tested
- Permission/privacy/audit implemented
- Unit/integration/contract/E2E tests pass as applicable
- Accessibility/offline/error states implemented
- Observability and rollback documented
- No unresolved Critical/High issue without formal acceptance

## 11. Deployment checklist

- [ ] Build/version/artifact signed
- [ ] Migration backward-compatible and rehearsed
- [ ] Feature flags/defaults reviewed
- [ ] Secrets/permissions reviewed
- [ ] Smoke/E2E and monitoring alerts pass
- [ ] Rollback command/process verified
- [ ] Support/incident owner on call
- [ ] Release notes and privacy/store disclosures current

## 12. Notes for AI agents

- Read `00-project-overview.md`, `01-architecture.md`, `02-coding-rules.md`, `04-api-standard.md`, `07-security-rules.md` and relevant backlog before coding
- Never invent medical behavior or silently choose an Open Decision
- Do not use real PII/PHI in fixtures
- Update ADR, API schema, tests and task status in the same change
- Stop and mark `[!] blocked` for legal/medical/security decisions requiring owner approval
