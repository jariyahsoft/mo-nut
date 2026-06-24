# 09 — Testing Guide

**Source:** SRS Sections 21–25 และ MVP acceptance criteria

## Quality Strategy

ใช้ risk-based test pyramid โดยให้ business/security rules อยู่ใน unit/integration มากที่สุด และ E2E ครอบคลุม critical journeys

```text
        E2E / Accessibility / Security
       Contract and Integration Tests
      Domain/Application Unit Tests
```

## Coverage Targets

- Domain/Application backend: ≥ 80% line coverage และ critical branches 100%
- Permission, consent, medication schedule, sync conflict: scenario coverage 100%
- Flutter business controllers/repositories: ≥ 80%
- UI snapshot/golden ใช้เฉพาะ component สำคัญ ไม่แทน behavior tests

## Unit Test Scope

### Backend

- Appointment status transitions
- Reminder/departure time calculations
- Medication recurrence/occurrence generation
- Adherence calculation
- Checklist goal/progress
- Permission and consent evaluation
- Share expiry/revocation
- Idempotency handling
- Optimistic concurrency

### Frontend

- Form validation
- State transitions loading/error/offline/sync
- Local notification scheduling IDs
- Mapping API DTO ↔ domain/local models
- Accessibility labels where testable

## Integration Tests

ใช้ Firebase Emulator Suite และ mock external providers

- Auth token → domain user resolution
- Firestore repository queries/index assumptions
- Transaction: medication event confirm
- Caregiver invitation accept/revoke
- Storage upload metadata flow
- OCR/STT job lifecycle
- Outbox → notification job
- Report generation metadata/share link
- Audit log creation

## API Contract Tests

- OpenAPI schema validation ใน CI
- Backend responses validate against contract
- Generated Flutter client compiles
- Example payloads เป็น executable fixtures
- Breaking change detector ป้องกัน accidental removal/type change

## E2E Critical Flows

### E2E-AUTH-001
สมัครผ่านโทรศัพท์ → consent → patient profile → home

### E2E-CARE-001
เชิญผู้ดูแล → accept → view allowed appointment → revoke → access denied

### E2E-APT-001
ถ่ายใบนัด → OCR draft → แก้ข้อมูล → confirm → reminder scheduled

### E2E-MED-001
เพิ่มยา → schedule → due notification → taken → adherence update

### E2E-MED-002
ไม่ตอบ reminder → grace period → caregiver alert

### E2E-HLT-001
บันทึกความดัน offline → reconnect → sync once → chart updated

### E2E-VISIT-001
เตรียมคำถาม → Doctor Visit Mode → record audio → transcript review → next appointment

### E2E-CHK-001
สร้าง weekly exercise goal → complete occurrences → weekly progress

### E2E-SOS-001
กดค้าง → confirm → call/share location → caregiver receives → resolve

### E2E-RPT-001
สร้าง PDF → share expiring link → revoke → public access denied

## Offline and Sync Tests

- Kill app after local save before sync
- Duplicate retry with same idempotency key
- Clock/timezone differences
- Edit same record on two devices
- Permission revoked while device offline
- App upgrade with pending operations
- Server returns conflict/version mismatch
- Network switches Wi-Fi/mobile/offline repeatedly

## Notification Tests

- Permission granted/denied/provisional
- App foreground/background/terminated
- Device reboot and local schedule restoration
- Server + local de-duplication
- Quiet hours
- Lock-screen privacy mode
- Timezone change
- DST simulation

## Security Tests

- IDOR every patient-scoped endpoint
- Role/permission matrix
- Expired/revoked consent
- Firebase rules deny-all baseline
- Upload MIME spoof and oversized files
- Signed URL expiry
- Share token brute force/rate limit
- OTP abuse/rate limit
- Admin break-glass audit
- Log/analytics PHI leakage
- Dependency/SAST/secret scan

## Accessibility Tests

- TalkBack and VoiceOver
- Keyboard navigation for Web
- Font scaling up to 200%
- Contrast audit
- Touch target size
- Chart text alternative
- Error association with fields
- SOS accidental activation and clear confirmation

## Performance Tests

- API P95 ≤ 800 ms for non-AI endpoints under agreed load
- Appointment/medication list pagination
- Bulk notification scheduling
- Report queue throughput
- OCR/STT concurrent jobs
- Firestore hot-spot/index behavior
- App startup and dashboard rendering on low-end Android

## Test Data

- Synthetic only
- No real patient names, phone numbers, files หรือ audio
- Stable IDs เพื่อ contract snapshot
- Time-based fixtures use controllable clock
- Include elderly, multiple caregivers, multiple timezones and revoked consent cases

## CI Commands — Target

```bash
flutter analyze
flutter test
pnpm lint
pnpm typecheck
pnpm test
pnpm api:validate
pnpm test:integration
pnpm test:contract
```

## Manual UAT Checklist

- [ ] ผู้สูงอายุสร้างนัดได้โดยความช่วยเหลือน้อย
- [ ] รูปยาเห็นชัดและ action ไม่สับสน
- [ ] ข้อความไม่ตำหนิผู้ป่วย
- [ ] Offline status เข้าใจง่าย
- [ ] Caregiver เข้าใจขอบเขตสิทธิ์
- [ ] OCR/STT review ชัดว่า AI อาจผิด
- [ ] SOS โทรตรงได้และไม่ทำให้เข้าใจว่าแอปเป็นศูนย์ฉุกเฉิน
- [ ] รายงานอ่านง่ายสำหรับแพทย์

## Release Gate

- Critical/High security defects = 0
- P0 acceptance tests ผ่านทั้งหมด
- Crash-free internal beta ตามเกณฑ์ที่กำหนด
- Backup/rollback verified
- Privacy/legal copy approved
- Production monitoring and alerts active
