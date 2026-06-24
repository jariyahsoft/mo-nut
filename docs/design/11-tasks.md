# 11 — Implementation Tasks

**Source:** SRS Mo-nut v1.0  
Status: `[ ] todo` `[/] in progress` `[x] done` `[!] blocked`

## Current Phase

Phase 0 — Foundation, Contracts and UX Prototype

## Workstream A — Repository Foundation

- [ ] A01 Create monorepo folders
- [ ] A02 Initialize Flutter app and flavor configuration
- [ ] A03 Initialize NestJS backend
- [ ] A04 Configure pnpm workspace/tooling
- [ ] A05 Add format/lint/typecheck/test/build scripts
- [ ] A06 Create `.env.example`
- [ ] A07 Configure GitHub Actions baseline
- [ ] A08 Add branch/PR templates

Dependencies: none

## Workstream B — API Contract

- [ ] B01 Create OpenAPI root and shared schemas
- [ ] B02 Define auth/me/patient schemas
- [ ] B03 Define caregiver/consent schemas
- [ ] B04 Define appointment/OCR schemas
- [ ] B05 Define medication/event schemas
- [ ] B06 Define health/checklist/question schemas
- [ ] B07 Define audio/job/report/SOS schemas
- [ ] B08 Configure mock server
- [ ] B09 Configure Flutter generated client
- [ ] B10 Add contract compatibility check

Dependencies: A04

## Workstream C — Firebase and Cloud Foundation

- [ ] C01 Create separate Firebase projects for dev/staging/prod
- [ ] C02 Configure Auth providers
- [ ] C03 Configure Firestore indexes and deny-by-default rules
- [ ] C04 Configure private Storage and upload policy
- [ ] C05 Configure FCM and App Check
- [ ] C06 Configure Emulator Suite
- [ ] C07 Configure Secret Manager/service accounts
- [ ] C08 Configure Cloud Logging/Monitoring budgets and alerts

Dependencies: A03

## Workstream D — Domain and Database

- [ ] D01 Implement standard entity metadata and portable ID generator
- [ ] D02 Implement user/patient repositories
- [ ] D03 Implement caregiver/consent repositories
- [ ] D04 Implement appointment repositories and indexes
- [ ] D05 Implement medication/schedule/event repositories
- [ ] D06 Implement health/checklist/question repositories
- [ ] D07 Implement media/report/SOS repositories
- [ ] D08 Implement audit and outbox repositories
- [ ] D09 Build NDJSON export script
- [ ] D10 Add migration dry-run framework

Dependencies: B01–B07, C03

## Workstream E — Design System and Prototype

- [ ] E01 Confirm brand name/logo/color direction
- [ ] E02 Implement typography, spacing, colors and components
- [ ] E03 Build Patient Today prototype
- [ ] E04 Build Appointment scan/OCR prototype
- [ ] E05 Build Medication due prototype
- [ ] E06 Build Health dashboard prototype
- [ ] E07 Build Doctor Visit Mode prototype
- [ ] E08 Build Caregiver dashboard prototype
- [ ] E09 Build SOS prototype
- [ ] E10 Conduct elderly usability test
- [ ] E11 Revise based on client feedback

Use prompts in [12-ui-image-prompts.md](12-ui-image-prompts.md) for concept images before implementation

## Workstream F — MVP Feature Sequence

### Sprint 1 — Identity/Profile/Caregiver

- [ ] F101 Auth and domain-user bootstrap
- [ ] F102 Consent onboarding
- [ ] F103 Patient profile
- [ ] F104 Caregiver invite/accept/revoke
- [ ] F105 Permission matrix integration tests

### Sprint 2 — Appointments/OCR

- [ ] F201 Appointment CRUD
- [ ] F202 Appointment list/detail/calendar
- [ ] F203 Secure upload
- [ ] F204 OCR provider mock and processing jobs
- [ ] F205 OCR review/confirm
- [ ] F206 Appointment reminders

### Sprint 3 — Medication

- [ ] F301 Medication CRUD and image
- [ ] F302 Schedule engine
- [ ] F303 Medication event generation
- [ ] F304 Local notification
- [ ] F305 Taken/snooze/skip offline sync
- [ ] F306 Caregiver escalation

### Sprint 4 — Health/Checklist/Questions

- [ ] F401 Measurement entry/history/charts
- [ ] F402 Checklist template/occurrence/progress
- [ ] F403 Questions and answers
- [ ] F404 Today dashboard aggregation

### Sprint 5 — Visit/Audio/Reports

- [ ] F501 Doctor Visit Mode
- [ ] F502 Audio recording/upload
- [ ] F503 STT processing/review
- [ ] F504 PDF report generation
- [ ] F505 Share links and audit

### Sprint 6 — Map/SOS/Hardening

- [ ] F601 Travel plan and navigation deep link
- [ ] F602 Emergency profile offline
- [ ] F603 Basic SOS and caregiver alert
- [ ] F604 Accessibility hardening
- [ ] F605 Security testing
- [ ] F606 Pilot release checklist

## Cross-cutting Tasks

- [ ] X01 Local database and pending operation queue
- [ ] X02 Sync conflict policies and UI
- [ ] X03 Notification privacy/quiet hours
- [ ] X04 Structured logging and request tracing
- [ ] X05 Analytics event catalog without PHI
- [ ] X06 Backup/export/restore procedures
- [ ] X07 Cost dashboard and quota controls
- [ ] X08 Privacy policy/consent copy legal review

## Definition of Done per Task

- [ ] Acceptance criteria linked
- [ ] Contract updated and validated
- [ ] Unit/integration tests passed
- [ ] Security and accessibility checklist passed
- [ ] Offline/error states handled
- [ ] Logs/audit do not expose PHI
- [ ] Documentation and ADR updated
- [ ] QA verified in staging

## Verification Checklist before Pilot

- [ ] P0 E2E flows pass
- [ ] No Critical/High security issue
- [ ] Production notification configuration tested
- [ ] Data export tested
- [ ] Restore/rollback tested
- [ ] Monitoring alerts tested
- [ ] Store privacy declarations completed
- [ ] SOS disclaimer and emergency numbers verified
- [ ] Pilot support process ready

## Deployment Checklist

- [ ] Approved release version
- [ ] Contract compatibility confirmed
- [ ] Migration/backfill dry run
- [ ] Feature flags set safely
- [ ] Secrets and service-account permissions reviewed
- [ ] Staged rollout enabled
- [ ] Rollback owner identified
- [ ] Post-deploy smoke tests

## Notes for AI Agents

1. อ่าน `00-project-overview.md`, `01-architecture.md`, `02-coding-rules.md` ก่อนเริ่มทุก task
2. ห้ามสร้าง requirement ใหม่; ใส่ Assumption/Open Question
3. ห้าม bypass backend เพื่อเขียน Firestore health data จาก client
4. อัปเดต contract ก่อน endpoint/client changes
5. ทุก AI/OCR result ต้องเป็น Draft จนยืนยัน
6. เมื่อเสร็จ task ให้อัปเดต status, tests และ ADR ที่เกี่ยวข้อง
