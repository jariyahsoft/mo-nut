# Mo-nut (หมอนัด)

> Cross-platform health companion สำหรับผู้ป่วยโรคเรื้อรัง ผู้ดูแล และบุคลากรทางการแพทย์ เพื่อช่วยไม่ให้พลาดนัด พลาดยา และพลาดคำแนะนำสำคัญ

**Source:** SRS Mo-nut v1.0 และ PRD Mo-nut ที่ได้รับการยืนยันในโครงการ

## Overview

Mo-nut ช่วยจัดการวงจรการดูแลผู้ป่วยตั้งแต่ก่อนพบแพทย์ ระหว่างพบแพทย์ หลังกลับบ้าน และการติดตามต่อเนื่อง ได้แก่ นัดหมาย ยา ค่าสุขภาพ เช็กลิสต์ คำถามสำหรับแพทย์ บันทึกเสียง การเดินทาง และ SOS

## Target Users

- ผู้ป่วยโรคเรื้อรังและผู้สูงอายุ
- ผู้ดูแลหรือสมาชิกครอบครัว
- แพทย์และบุคลากรทางการแพทย์
- ผู้ดูแลสถานพยาบาลและผู้ดูแลระบบ

## Core Features

- Appointment และ OCR ใบนัด
- Medication schedule, reminder และ adherence
- Health measurements และกราฟ
- Caregiver sharing และ permission scopes
- Audio recording, Speech-to-Text และ AI-assisted summary
- Doctor recommendation checklist
- Questions for doctor
- Map, travel-time estimate และ navigation
- SOS และ Emergency Profile
- PDF report และ expiring share link
- Offline-first สำหรับ workflow สำคัญ

## Proposed Tech Stack

| Layer | Technology |
|---|---|
| Mobile/Web client | Flutter + Dart |
| State management | Riverpod หรือ Bloc — ตัดสินใจใน ADR ก่อน implement |
| Local database | Drift/SQLite |
| Backend API | NestJS + TypeScript |
| API contract | OpenAPI 3.1 |
| Authentication | Firebase Authentication |
| Primary database | Cloud Firestore |
| File storage | Firebase/Google Cloud Storage |
| Notifications | FCM + Local Notifications |
| Backend runtime | Cloud Run หรือ Firebase Functions Gen 2 |
| Monitoring | Cloud Logging/Monitoring + Crashlytics |
| CI/CD | GitHub Actions |

## Architecture Summary

- API-first และ Contract-first
- Frontend ไม่เข้าถึงข้อมูลสุขภาพหลักใน Firestore โดยตรง
- Business logic อยู่ใน Domain/Application layer
- Database access ผ่าน Repository interfaces
- Firestore เป็น Infrastructure adapter ที่เปลี่ยนเป็น PostgreSQL หรือ MongoDB ได้
- ใช้ UUIDv7 หรือ ULID เป็น Domain ID
- ใช้ top-level collections และ string foreign IDs
- ใช้ Outbox pattern สำหรับงาน notification และ background processing

อ่านรายละเอียดที่ [01-architecture.md](01-architecture.md)

## Repository Structure

```text
mo-nut/
├── apps/
│   ├── mobile/
│   ├── doctor-portal/
│   ├── admin-portal/
│   └── backend/
├── packages/
│   ├── api-contract/
│   ├── design-system/
│   ├── test-fixtures/
│   └── shared-utils/
├── infrastructure/
│   ├── firebase/
│   ├── scripts/
│   └── monitoring/
└── docs/
```

## Getting Started

> Repo scaffold ยังไม่ถูกสร้างจริง ขั้นตอนด้านล่างเป็น baseline ที่ task แรกต้องทำให้ใช้งานได้

### Prerequisites

- Flutter stable
- Dart SDK ที่มากับ Flutter
- Node.js LTS
- pnpm
- Firebase CLI
- Java/Android SDK สำหรับ Android
- Xcode สำหรับ iOS บน macOS

### Local Services

```bash
firebase emulators:start
pnpm --dir apps/backend dev
flutter run --dart-define=APP_ENV=local
```

### Common Commands

```bash
# Backend
pnpm --dir apps/backend lint
pnpm --dir apps/backend test
pnpm --dir apps/backend build

# Flutter
flutter analyze
flutter test
flutter run

# Contract
pnpm api:validate
pnpm api:mock
pnpm api:generate
```

## Environment Variables

สร้าง `.env.example` โดยห้ามใส่ secret จริง

```env
APP_ENV=local
API_BASE_URL=http://localhost:8080/api/v1
FIREBASE_PROJECT_ID=demo-mo-nut
FIREBASE_STORAGE_BUCKET=demo-mo-nut.appspot.com
GOOGLE_MAPS_API_KEY=
OCR_PROVIDER=mock
STT_PROVIDER=mock
AI_SUMMARY_PROVIDER=disabled
```

Secrets ฝั่ง server ต้องเก็บใน Secret Manager ไม่เก็บใน source code

## Development Workflow

1. สร้างหรือแก้ User Story ใน [06-backlog.md](06-backlog.md)
2. อนุมัติ API contract ก่อนเริ่ม integration
3. Frontend ใช้ generated client และ mock server
4. Backend implement ตาม contract และผ่าน contract test
5. QA ใช้ test fixtures ชุดเดียวกัน
6. Merge เมื่อผ่าน Definition of Done ใน [02-coding-rules.md](02-coding-rules.md)

## Documentation

- [00-project-overview.md](00-project-overview.md)
- [01-architecture.md](01-architecture.md)
- [02-coding-rules.md](02-coding-rules.md)
- [03-database-design.md](03-database-design.md)
- [04-api-standard.md](04-api-standard.md)
- [05-decisions.md](05-decisions.md)
- [06-backlog.md](06-backlog.md)
- [07-security-rules.md](07-security-rules.md)
- [08-ui-guide.md](08-ui-guide.md)
- [09-testing-guide.md](09-testing-guide.md)
- [10-glossary.md](10-glossary.md)
- [11-tasks.md](11-tasks.md)
- [12-ui-image-prompts.md](12-ui-image-prompts.md)

## Testing

ใช้ Unit, Integration, Contract, E2E, Security และ Accessibility tests ตาม [09-testing-guide.md](09-testing-guide.md)

## Deployment

Environment ต้องแยก Local, Development, Staging และ Production โดยใช้ Firebase project แยกกัน Production deployment ต้องมี approval และ rollback plan

## License

TBD — ต้องยืนยันก่อนเปิด repository สู่สาธารณะ

## Assumptions

- Flutter เป็น client framework หลักตาม SRS
- Backend ใช้ TypeScript/NestJS
- ภาษา UI เริ่มต้นเป็นภาษาไทย

## Open Questions

- เลือก Riverpod หรือ Bloc
- เลือก Cloud Run หรือ Functions Gen 2 เป็น runtime หลัก
- ขอบเขต Doctor Lite Portal ใน MVP
- OCR/STT provider สำหรับ Production
