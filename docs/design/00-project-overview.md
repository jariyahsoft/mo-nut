# 00 — Project Overview

**Project:** หมอนัด (Mo-nut)  
**Source:** PRD Mo-nut v1.0 และ SRS Mo-nut v1.0

## Vision

ทำให้ผู้ป่วยไม่พลาดนัด ไม่พลาดยา และมีผู้ดูแลช่วยติดตามอย่างเหมาะสม โดยรวมข้อมูลที่จำเป็นต่อการรักษาไว้ในระบบเดียวและให้ผู้ป่วยควบคุมสิทธิ์ข้อมูลของตนเอง

## Problem Statement

ผู้ป่วยโรคเรื้อรังและผู้สูงอายุมักมีนัดหลายครั้ง ใช้ยาหลายชนิด จำคำแนะนำได้ไม่ครบ และมีข้อมูลสุขภาพกระจัดกระจาย ผู้ดูแลไม่สามารถติดตามได้ทันเวลา ขณะที่แพทย์ได้รับข้อมูลย้อนหลังไม่ครบถ้วน

## Product Goals

1. ลดการพลาดนัดและการไปสาย
2. เพิ่มความสม่ำเสมอในการใช้ยา
3. จัดเก็บใบนัด ยา ค่าสุขภาพ และคำแนะนำอย่างเป็นระบบ
4. เชื่อมผู้ป่วยกับผู้ดูแลโดยใช้ permission ที่เพิกถอนได้
5. ช่วยเตรียมข้อมูลและคำถามก่อนพบแพทย์
6. รองรับการใช้งานของผู้สูงอายุและการทำงานแบบ Offline
7. เตรียมสถาปัตยกรรมสำหรับ B2B และการเชื่อมสถานพยาบาล

## Non-goals

- วินิจฉัยโรค
- ปรับ เพิ่ม ลด หรือหยุดยาอัตโนมัติ
- รับประกันว่าผู้ใช้กินยาจริงจากการกดปุ่ม
- ทำหน้าที่เป็นศูนย์แพทย์ฉุกเฉิน
- เชื่อมต่อทุกโรงพยาบาลใน MVP
- Telemedicine เต็มรูปแบบใน MVP

## Target Personas

### P1 — ผู้ป่วยโรคเรื้อรัง
ต้องการเตือนนัด ยา และบันทึกค่าความดัน/น้ำตาล ใช้โทรศัพท์เป็นหลัก

### P2 — ผู้สูงอายุ
ต้องการ UI เรียบง่าย ตัวอักษรใหญ่ ปุ่มใหญ่ และผู้ดูแลช่วยตั้งค่าได้

### P3 — ผู้ดูแล
ต้องติดตามผู้ป่วยหนึ่งคนหรือหลายคน รับแจ้งเตือนพลาดยา นัดหมาย และ SOS

### P4 — แพทย์/บุคลากรทางการแพทย์
ต้องการดูรายงานที่ผู้ป่วยอนุญาตและติดตามข้อมูลระหว่างนัดโดยไม่เพิ่มภาระมากเกินไป

### P5 — ผู้ดูแลระบบ/องค์กร
ต้องจัดการองค์กร การเข้าถึง ระบบความปลอดภัย และสถานะการให้บริการ

## Roles and Permission Summary

| Role | Capability Summary |
|---|---|
| PATIENT | เจ้าของข้อมูล สร้างและแชร์ข้อมูล กำหนดสิทธิ์ |
| CAREGIVER | เข้าถึงตาม scope ที่ผู้ป่วยอนุญาต |
| DOCTOR | ดูหรือเพิ่มข้อมูลตาม consent และ organization scope |
| ORGANIZATION_ADMIN | จัดการสมาชิกองค์กร ไม่ได้สิทธิ์อ่านข้อมูลสุขภาพโดยอัตโนมัติ |
| SYSTEM_ADMIN | ดูแลระบบภายใต้ privileged-access workflow |
| SUPPORT | แก้ปัญหาเชิงบัญชีโดยไม่เปิดข้อมูลสุขภาพเกินจำเป็น |
| AUDITOR | อ่าน Audit Log ตามสิทธิ์ |

## Core Modules

1. Identity and Access
2. Patient Profile
3. Caregiver Relationships and Consent
4. Appointments and OCR
5. Medication and Adherence
6. Health Measurements
7. Doctor Visit Mode
8. Audio, Transcript and AI Drafts
9. Checklists
10. Questions for Doctor
11. Map and Travel
12. SOS and Emergency Profile
13. Reports and Sharing
14. Notifications
15. Admin and Audit

## MVP Scope

- Cross-platform Android, iOS และ Web/PWA
- Firebase Authentication, Firestore, Storage และ FCM
- Appointment CRUD, OCR review และ reminders
- Medication CRUD, schedules, reminders และ caregiver escalation
- น้ำหนัก ส่วนสูง ความดัน ชีพจร และน้ำตาล
- Audio recording และ Speech-to-Text
- Doctor checklist และ questions
- Navigation deep link และ travel-time estimate
- Basic SOS และ Emergency Profile
- PDF reports และ expiring share links
- Offline cache/sync สำหรับ workflow หลัก
- Basic audit and consent records

## Out of Scope for MVP

- Live traffic monitoring แบบต่อเนื่อง
- Full doctor portal และ hospital workflow
- Bluetooth medical devices
- Apple Health / Health Connect
- LINE/SMS escalation
- FHIR integration
- Insurance and payment

## Product Roadmap

### Phase 0 — Discovery and Foundation
Architecture, contracts, design system, prototype, security review และ Firebase environments

### Phase 1 — MVP
Patient/Caregiver flows, appointments, medication, measurements, audio, checklist, map, SOS และ reports

### Phase 2 — Pilot
Doctor Lite Portal, live traffic, AI summary, LINE/SMS, device integration และ clinic pilot

### Phase 3 — Scale
Hospital integration, FHIR, remote monitoring, B2B dashboard และ white-label

## Success Metrics

- ผู้ใช้สร้างนัดแรกและตารางยาแรกได้ภายใน 5 นาที
- Notification delivery success มากกว่า 95%
- ผู้ใช้เปิด notification อย่างน้อย 70%
- ผู้ป่วยเชิญผู้ดูแลอย่างน้อย 40%
- อัตราพลาดนัดและพลาดยาของกลุ่ม Pilot ลดลง
- Crash-free sessions ตามเกณฑ์ Production
- คะแนน usability ของผู้สูงอายุไม่น้อยกว่า 4/5

## Major Risks

| Risk | Mitigation |
|---|---|
| OCR/STT ผิด | เก็บต้นฉบับ แสดง confidence และให้ผู้ใช้ยืนยัน |
| Push ไม่ทำงาน | Local notification, permission health check, retry |
| Data leakage | API authorization, App Check, encryption, audit |
| ผู้สูงอายุใช้ยาก | Elderly mode, usability test, caregiver-assisted setup |
| Vendor lock-in | Repository pattern, provider abstraction, portable IDs |
| SOS ถูกเข้าใจผิด | คำเตือนชัดเจน โทรตรงได้ และไม่อ้างเป็น emergency service |

## Assumptions

- UI ภาษาไทยเป็นหลักและเก็บเวลาใน UTC
- Firebase เป็น infrastructure เริ่มต้น ไม่ใช่ domain boundary
- AI outputs เป็น Draft เท่านั้นจนกว่าผู้ใช้จะยืนยัน

## Open Questions

1. MVP จะเปิดให้แพทย์มีบัญชีจริง หรือใช้รายงาน/ลิงก์แชร์ก่อน
2. ประเทศแรกและหมายเลขฉุกเฉินที่ต้องรองรับ
3. Retention period ของเสียง เอกสาร และ audit logs
4. Business plan และ quota ของ OCR/STT
5. ต้องรองรับข้อมูลบัตรประชาชนหรือไม่ — ไม่ควรเก็บถ้าไม่จำเป็น
