# หมอนัด — Mo-nut

ผู้ช่วยดูแลสุขภาพสำหรับผู้ป่วยโรคเรื้อรัง ผู้ดูแล และบุคลากรทางการแพทย์ พัฒนาเป็น 2 เฟส: **Mobile-first PWA** และ **Cross-platform Mobile App** โดยใช้ Backend/API และข้อมูลชุดเดียวกัน

> **Source of truth:** `mo-nut-SRS-two-phase.md` Version 1.0 (2026-06-24)

## Overview

Mo-nut ช่วยลดการพลาดนัด พลาดยา และการสูญหายของข้อมูลสุขภาพ ด้วยระบบนัดหมาย ตารางยา ข้อมูลสุขภาพ OCR/STT เช็กลิสต์ ผู้ดูแล รายงาน การแชร์แบบมี Consent และ SOS โดยระบบไม่วินิจฉัยโรค ไม่สั่งยา และไม่ใช้แทนบริการฉุกเฉิน

## Delivery phases

| Phase | Client | เป้าหมาย |
|---|---|---|
| Phase 1 | Mobile-first PWA + Responsive Web | พิสูจน์ Core Journey และ Product–Market Fit |
| Phase 2 | Android/iOS Cross-platform App + PWA เดิม | เพิ่ม Native Notification, Offline-first, Biometric, Secure Storage และ Device Integration |

## Target users

- ผู้ป่วยโรคเรื้อรังและผู้สูงอายุ
- ผู้ดูแลหรือสมาชิกครอบครัว
- แพทย์และบุคลากรทางการแพทย์ในโหมด Doctor Lite
- เจ้าหน้าที่องค์กร ผู้ดูแลระบบ และ Support ที่ได้รับสิทธิ์

## Core modules

Identity & Access, Patient Profile, Appointment, Medication, Health Record, Caregiver & Consent, Document/OCR, Audio/STT, Checklist & Questions, Notification, Map & Travel, SOS, Report & Share, Clinician Access, Dashboard, Offline Sync, CMS, Audit และ Administration

## Architecture summary

```text
PWA / Web Portal / Android-iOS App
              |
       Versioned HTTPS API
              |
 Application Services + Domain Policies
              |
 Repository / Integration Ports
       |            |             |
 Firebase Adapter  OCR/STT       Push/Map/Email/SMS
```

Client ต้องพึ่งพา API Contract ไม่พึ่ง Firestore document shape โดยตรง กฎสิทธิ์ Consent การยืนยันยา การเปลี่ยนสถานะ และ Audit ต้องบังคับใช้ฝั่ง Server

## Technology status

| Area | Current direction | Status |
|---|---|---|
| PWA | TypeScript framework ที่รองรับ PWA/Accessibility/Responsive | Framework TBD |
| Mobile | Flutter หรือ React Native | TBD ก่อน Phase 2 |
| Identity | Firebase Authentication หรือ OIDC-compatible IdP | Reference architecture |
| API/Compute | Cloud Functions/Cloud Run หรือเทียบเท่า | Service-by-service decision |
| Primary store | Cloud Firestore ผ่าน Repository Adapter | Initial infrastructure |
| Object files | Firebase Storage/Object Storage | Initial infrastructure |
| Contract | OpenAPI 3.1 + JSON Schema + generated client | Required |
| Messaging | FCM/Web Push + fallback adapter | Required by capability |

## Proposed repository structure

```text
apps/
  pwa/                  # Phase 1 client
  mobile/               # Phase 2 client
services/
  api/                  # API/BFF and application services
  workers/              # OCR/STT, notification, report jobs
packages/
  contracts/            # OpenAPI, JSON Schema, shared enums
  domain/               # Framework-independent rules and state machines
  ui/                   # Shared tokens/components where feasible
  test-fixtures/        # Synthetic data only
infra/
  firebase/
  deployment/
docs/design/            # Initial project files 00–12
```

> โครงสร้างนี้เป็น **Assumption สำหรับการเริ่มต้น** และต้องยืนยันใน ADR ก่อนสร้าง production code

## Getting started

1. อ่าน [Project overview](docs/design/00-project-overview.md) และ [Architecture](docs/design/01-architecture.md)
2. ปิด Open Decisions ใน [Decision log](docs/design/05-decisions.md)
3. เลือก PWA framework และกำหนด package manager
4. สร้าง `.env.example` จากรายการ Environment Variables ด้านล่าง โดยห้ามใส่ค่าจริง
5. เริ่ม Sprint 0 ตาม [Task plan](docs/design/11-tasks.md)
6. เผยแพร่ OpenAPI/JSON Schema และ Mock Server ก่อนเริ่ม UI module แรก

## Environment variables

ชื่อจริงอาจเปลี่ยนหลังเลือก stack แต่ต้องใช้หลักการต่อไปนี้:

```dotenv
APP_ENV=development
PUBLIC_APP_NAME=Mo-nut
PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
FIREBASE_PROJECT_ID=replace-with-dev-project
FIREBASE_STORAGE_BUCKET=replace-with-dev-bucket
OIDC_AUDIENCE=replace-with-audience
OCR_PROVIDER=disabled
STT_PROVIDER=disabled
MAP_PROVIDER=disabled
NOTIFICATION_PROVIDER=emulator
LOG_LEVEL=info
```

ห้ามเก็บ API key, service-account JSON, private key, production token หรือ PHI ใน repository

## Common commands

คำสั่งมาตรฐานที่ทุก implementation ต้อง expose หลังเลือก stack:

```bash
<package-manager> install
<package-manager> lint
<package-manager> typecheck
<package-manager> test
<package-manager> test:contract
<package-manager> test:e2e
<package-manager> build
<package-manager> dev
```

ชื่อ `<package-manager>` เป็น Open Decision; ห้ามเริ่ม CI จริงจนกว่าจะเลือกและบันทึกใน ADR

## Development workflow

- Contract-first: OpenAPI/JSON Schema ก่อน implementation
- Frontend/Mobile พัฒนาด้วย Mock Server และ generated client
- Backend ใช้ Repository/Provider adapters
- Pull request ต้องผ่าน lint, typecheck, unit, contract, secret scan และ dependency scan
- Schema change ใช้ Expand–Migrate–Contract และ backward compatibility
- Feature เสี่ยงสูงต้องอยู่หลัง Feature Flag

## Testing

ดู [Testing guide](docs/design/09-testing-guide.md) โดย Core Journey ต้องครอบคลุม Auth, Appointment/OCR, Medication Dose, Caregiver Consent, Health Measurement, Doctor Visit Mode, SOS, Report/Share และ Offline Sync

## Deployment

- แยก Local, Development, Staging/UAT และ Production
- PWA ใช้ controlled service-worker rollout และ cache compatibility
- Mobile ใช้ Internal Test → Closed Beta/TestFlight → Staged Rollout
- Production ต้องมี manual approval, migration check และ rollback plan

## Documentation

- [00 Project overview](docs/design/00-project-overview.md)
- [01 Architecture](docs/design/01-architecture.md)
- [02 Coding rules](docs/design/02-coding-rules.md)
- [03 Database design](docs/design/03-database-design.md)
- [04 API standard](docs/design/04-api-standard.md)
- [05 Decisions](docs/design/05-decisions.md)
- [06 Backlog](docs/design/06-backlog.md)
- [07 Security rules](docs/design/07-security-rules.md)
- [08 UI guide](docs/design/08-ui-guide.md)
- [09 Testing guide](docs/design/09-testing-guide.md)
- [10 Glossary](docs/design/10-glossary.md)
- [11 Tasks](docs/design/11-tasks.md)
- [12 UI image prompts](docs/design/12-ui-image-prompts.md)

## License

TBD โดยเจ้าของโครงการก่อนเผยแพร่ repository ภายนอกองค์กร
