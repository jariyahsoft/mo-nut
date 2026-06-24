# 10 — Glossary

**Source:** PRD/SRS Mo-nut v1.0

| Term | Meaning | Notes |
|---|---|---|
| Mo-nut / หมอนัด | ชื่อผลิตภัณฑ์ | Health companion platform |
| Patient | ผู้ป่วยและเจ้าของข้อมูล | `PATIENT` |
| Caregiver | ผู้ดูแล | เข้าถึงตาม permission |
| Doctor | แพทย์/บุคลากรทางการแพทย์ | ต้องมี consent |
| Appointment | นัดหมาย | ผูก hospital, date/time, preparation |
| Visit Record | บันทึกการไปพบแพทย์หนึ่งครั้ง | รวม measurement, audio, next appointment |
| Medication | รายการยา | แยกจาก schedule/event |
| Medication Schedule | กติกาเวลาและขนาดยา | สร้าง occurrences |
| Medication Event | เหตุการณ์ยารอบหนึ่ง | TAKEN/SNOOZED/SKIPPED ฯลฯ |
| Adherence | ความสม่ำเสมอในการใช้ยา | คำนวณจาก events |
| Health Measurement | ค่าสุขภาพ | BP, weight, glucose ฯลฯ |
| Checklist | คำแนะนำ/เป้าหมายจากแพทย์ | template/goal |
| Checklist Occurrence | งานหนึ่งรอบตาม checklist | complete/skip |
| Question | คำถามเตรียมพบแพทย์ | ผูก appointment |
| OCR | อ่านข้อความจากภาพ | ต้อง review |
| STT | Speech-to-Text | ต้อง review |
| AI Draft | ผลลัพธ์จาก AI ที่ยังไม่ยืนยัน | ห้ามเปลี่ยนข้อมูลสำคัญอัตโนมัติ |
| Emergency Profile | ข้อมูลฉุกเฉินที่ผู้ใช้เลือกเปิดเผย | offline/QR ได้ |
| SOS Event | เหตุการณ์ขอความช่วยเหลือ | ไม่ใช่บริการฉุกเฉิน |
| Consent | ความยินยอมตาม purpose/scope | withdraw ได้ |
| Permission Scope | สิทธิ์ละเอียด | เช่น `medication.read` |
| Relationship | ความสัมพันธ์ patient-caregiver | status/expiry/permission |
| Domain ID | ID ภายในระบบ | UUIDv7/ULID |
| Firebase UID | ID จาก Firebase Auth | external identity เท่านั้น |
| Repository | interface สำหรับเข้าถึงข้อมูล | adapter เปลี่ยน DB ได้ |
| DTO | รูปข้อมูลผ่าน API | ไม่มี Firebase type |
| Outbox Event | event ที่รอ worker publish/process | reliability pattern |
| Idempotency Key | key ป้องกัน mutation ซ้ำ | selected endpoints |
| Optimistic Concurrency | ป้องกัน overwrite ด้วย version | `version`/`If-Match` |
| PHI | ข้อมูลสุขภาพระบุตัวบุคคล | Restricted Health |
| PII | ข้อมูลระบุตัวบุคคล | email, phone ฯลฯ |
| PDPA | กฎหมายคุ้มครองข้อมูลส่วนบุคคลไทย | legal baseline |
| PWA | Progressive Web App | web install/offline capability |
| FCM | Firebase Cloud Messaging | push notification |
| App Check | กลไกตรวจ app/client | ลด abuse |
| RBAC | Role-based Access Control | ต้องรวม ownership/consent |
| MVP | Minimum Viable Product | Phase 1 |
| Pilot | ทดสอบกับผู้ใช้/สถานพยาบาลจริงขนาดจำกัด | Phase 2 |

## Permission Names

| Permission | Meaning |
|---|---|
| appointment.read | ดูนัด |
| appointment.write | สร้าง/แก้ไขนัด |
| medication.read | ดูยา |
| medication.write | แก้ไขยา |
| medication.alert.receive | รับแจ้งเตือนพลาดยา |
| health.read | ดูค่าสุขภาพ |
| health.write | บันทึกค่าสุขภาพ |
| document.read | ดูเอกสาร |
| audio.read | ฟังเสียง/อ่าน transcript |
| checklist.read | ดู checklist |
| checklist.write | แก้ checklist/ความคืบหน้า |
| report.download | ดาวน์โหลดรายงาน |
| sos.receive | รับ SOS |

## Event Names

- `APPOINTMENT_CREATED`
- `APPOINTMENT_REMINDER_DUE`
- `MEDICATION_EVENT_DUE`
- `MEDICATION_EVENT_MISSED`
- `HEALTH_MEASUREMENT_RECORDED`
- `CAREGIVER_ACCESS_REVOKED`
- `OCR_COMPLETED`
- `TRANSCRIPTION_COMPLETED`
- `SOS_STARTED`
- `SOS_RESOLVED`
- `REPORT_READY`

## Common Error Codes

- `VALIDATION_ERROR`
- `AUTH_REQUIRED`
- `PERMISSION_DENIED`
- `CONSENT_REQUIRED`
- `RESOURCE_NOT_FOUND`
- `RESOURCE_CONFLICT`
- `BUSINESS_RULE_VIOLATION`
- `RATE_LIMITED`
- `PROVIDER_FAILED`
- `SERVICE_UNAVAILABLE`
