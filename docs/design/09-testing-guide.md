# 09 — Testing Guide

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Test strategy

```text
Many: unit/domain/policy tests
Some: repository/API/contract/component tests
Few but critical: E2E/device/usability/security journeys
```

## 2. Quality gates

- Pull request: lint, static analysis, unit, schema/contract check, secret/dependency scan
- Main: integration, adapter emulator, consumer contract and build
- Staging: smoke, E2E, accessibility, security regression and migration checks
- Release: browser/device matrix, performance, restore/rollback and acceptance criteria

## 3. Unit test scope

- Appointment/Dose/Consent/Processing/Sync state transitions
- Effective-date schedule behavior and time zone/DST
- Permission policy combinations
- Idempotency and optimistic version handling
- Health value format/unit validation without diagnosis
- Share token/expiry rules
- Notification escalation calculation
- Data mapping between provider/Firestore and canonical model

## 4. Integration tests

- Auth token exchange and session/device revoke
- Firestore repository transactions and index-backed queries
- Storage signed upload and object metadata
- OCR/STT async job lifecycle and manual fallback
- FCM/Web Push provider sandbox behavior
- Consent revoke invalidates share/access
- Report generation and expiring asset
- Audit record creation for high-risk actions

## 5. API contract tests

- OpenAPI request/response schema
- Generated client compatibility
- Standard error envelope
- Pagination/cursor stability
- Idempotency same/different payload behavior
- `If-Match`/version conflict
- Unknown enum/future field handling
- Consumer-driven tests for PWA and Mobile

## 6. Frontend/component tests

- Loading, empty, success, error, offline, denied and conflict states
- Form validation and focus management
- Active patient context indicator
- OCR confidence/review controls
- Dose actions and confirmation
- Consent scope/expiry review
- SOS hold/confirm and delivery status
- Responsive navigation and dynamic text

## 7. Critical E2E journeys

| Journey | Minimum assertions |
|---|---|
| Sign-up/profile | OTP rate/error, profile created, accessibility preference saved |
| Appointment from image | upload → processing → review → confirm → reminders; no auto-apply |
| Medication dose | schedule → due → taken/snooze/skip/issue; no duplicate submission |
| Caregiver share | invite → scoped consent → access → revoke → immediate denial |
| Health measurement | append → trend → threshold message without diagnosis |
| Doctor Visit Mode | questions/medications/report/capture linked to visit |
| SOS | confirmation, call/message/location attempts, per-channel status, close |
| Report/share | selected scopes, expiring link, revoke and access audit |
| Offline sync | queue, reconnect, idempotent result, strict conflict resolution |
| PWA→Mobile migration | same account/data, cross-channel sync, no duplicate |

## 8. Security tests

- Automated authorization matrix and IDOR fuzzing
- Token issuer/audience/expiry/revoke
- OTP/account enumeration and brute-force controls
- Injection/XSS/CSRF/CORS as architecture applies
- Signed URL/token entropy and expiry
- File upload type/size/malware and content sniffing
- Admin/support least privilege and purpose/ticket audit
- Log/analytics/notification data leakage
- Local storage/session wipe

## 9. Accessibility tests

- Automated accessibility scanner as baseline
- Keyboard-only web flow
- Screen reader on supported mobile/web platforms
- Dynamic type/zoom to required level
- Contrast/focus/reduced motion
- Chart text alternative
- Usability sessions with elderly/patient/caregiver cohorts

## 10. Performance and resilience

Test targets must be finalized from NFR, but coverage includes:

- API p50/p95/p99 for core reads/writes
- dashboard read-model load
- notification batch throughput and retry age
- OCR/STT queue latency and provider outage
- report generation time/size
- sync batch size and reconnect storm
- cold start/service-worker update/mobile startup
- degraded network and dependency circuit breaker

## 11. Offline/time/device matrix

- Online, slow, intermittent, offline and reconnect
- Time-zone change, cross-midnight, DST, wrong device clock
- Notification permission allow/deny/revoke/OS restricted
- Camera/mic/location allow/deny/deny permanently
- Chrome Android, Safari iOS, desktop Chrome/Edge plus approved matrix
- Phase 2 minimum/current Android and iOS on mid-range devices

## 12. Test data

- Synthetic Thai names/phone numbers only
- No production screenshots, documents, audio or identifiers
- Fixtures for elderly settings, multiple caregivers/patients, expired consent and conflicts
- Deterministic clock/UUID for domain tests
- Separate provider sandbox accounts per environment

## 13. Coverage targets — proposed

- Domain/policy/state machine: ≥90% branch coverage
- Application services/security-sensitive utilities: ≥80% branch coverage
- UI components: critical states covered rather than raw percentage only
- 100% of P1/P2 acceptance criteria mapped to at least one test

Targets are assumptions requiring engineering approval.

## 14. CI commands

Final commands depend on selected stack. CI must expose logical jobs: `lint`, `typecheck`, `test:unit`, `test:integration`, `test:contract`, `test:e2e`, `test:a11y`, `test:security`, `build`.

## 15. Manual QA checklist

- [ ] Thai copy readable and consistent
- [ ] large text does not clip
- [ ] active patient context clear
- [ ] notification privacy acceptable
- [ ] offline/last synced visible
- [ ] OCR/STT cannot apply without confirmation
- [ ] dose cannot double-submit
- [ ] consent revoke takes effect
- [ ] SOS does not claim success incorrectly
- [ ] logout/device revoke clears local sensitive data

## 16. Acceptance traceability

| ID | Acceptance criterion | Required test class |
|---|---|---|
| `AC-P1-001` | ผู้ป่วยสมัคร เข้าสู่ระบบ และสร้างโปรไฟล์ได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-002` | สร้างนัดจากรูปและยืนยัน OCR ก่อนบันทึกได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-003` | ตั้ง Reminder และรับ In-app/Web Push หรือ Fallback ที่กำหนดได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-004` | เพิ่มยา ตารางยา และตอบสถานะ Dose ได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-005` | ผู้ดูแลได้รับ Escalation เมื่อพลาดยาตาม Permission | E2E + integration + security/accessibility as applicable |
| `AC-P1-006` | บันทึกและดูกราฟข้อมูลสุขภาพพื้นฐานได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-007` | บันทึกเสียง ทำ STT และแก้ไขก่อนนำไปใช้ได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-008` | สร้าง Checklist และคำถามแพทย์ได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-009` | เปิดแผนที่และใช้ Doctor Visit Mode ได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-010` | SOS โทร/ส่งตำแหน่งตาม Permission พร้อมแสดงผลส่งได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-011` | ผู้ป่วยให้ ถอน และตรวจประวัติการแชร์ได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-012` | สร้าง PDF/Expiring Share Link และเพิกถอนได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-013` | คำสั่ง Offline ที่กำหนดเข้าคิวและซิงก์โดยไม่ซ้ำได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-013A` | Doctor Lite แสดงข้อมูลตาม Consent และหยุดเข้าถึงเมื่อถอนสิทธิ์ได้ | E2E + integration + security/accessibility as applicable |
| `AC-P1-014` | ผ่าน Security, Privacy, Accessibility และ Usability Gate | E2E + integration + security/accessibility as applicable |
| `AC-P1-015` | ไม่มี Critical Data Loss, Cross-patient Access หรือ Medication/Appointment Corruption | E2E + integration + security/accessibility as applicable |
| `AC-P2-001` | Android/iOS รองรับ Core Journey ที่อนุมัติ | E2E + integration + security/accessibility as applicable |
| `AC-P2-002` | ผู้ใช้ PWA เข้าด้วยบัญชีเดิมและเห็นข้อมูลเดิมครบ | E2E + integration + security/accessibility as applicable |
| `AC-P2-003` | PWA/Mobile ซิงก์ข้ามช่องทางโดยไม่สร้างข้อมูลซ้ำ | E2E + integration + security/accessibility as applicable |
| `AC-P2-004` | Native Push/Local Notification ผ่าน Device/OS Test Matrix | E2E + integration + security/accessibility as applicable |
| `AC-P2-005` | แอปแนะนำเมื่อ Notification/Background ถูกจำกัด | E2E + integration + security/accessibility as applicable |
| `AC-P2-006` | Biometric, Secure Storage และ Encrypted Local DB ผ่าน Security Test | E2E + integration + security/accessibility as applicable |
| `AC-P2-007` | Offline Core Journey และ Conflict Handling ผ่าน | E2E + integration + security/accessibility as applicable |
| `AC-P2-008` | Camera, Microphone, Share, Deep Link ทำงานบนอุปกรณ์จริง | E2E + integration + security/accessibility as applicable |
| `AC-P2-009` | Health/Bluetooth/Location ขอ Consent ตามบริบทและเพิกถอนได้ | E2E + integration + security/accessibility as applicable |
| `AC-P2-010` | Crash Reporting, Monitoring, Release Tracking และ Incident Process พร้อม | E2E + integration + security/accessibility as applicable |
| `AC-P2-011` | ไม่มี Critical Crash, Data Loss หรือ Permission Escalation | E2E + integration + security/accessibility as applicable |
| `AC-P2-012` | PWA/Web Portal และ Doctor Lite ยังคงทำงานร่วมกับ Mobile App | E2E + integration + security/accessibility as applicable |
| `AC-P2-013` | Store Disclosure, Privacy Policy, Support และเอกสารผู้ใช้พร้อม | E2E + integration + security/accessibility as applicable |
