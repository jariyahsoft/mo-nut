# 00 — Project Overview

**Project:** หมอนัด (Mo-nut)  
**Source:** `mo-nut-PRD-mobile-first-PWA.md` v1.1 และ `mo-nut-SRS-mobile-first-PWA.md` v1.0 (24 มิถุนายน 2026)

**MVP Platform:** Web Application แบบ Mobile-first Progressive Web App (PWA); Smartphone เป็นอุปกรณ์หลัก และ Tablet/Desktop เป็นอุปกรณ์รอง

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

- Responsive Web Application แบบ Mobile-first PWA ใช้งานผ่าน Browser และเพิ่มไว้บนหน้าจอโฮมได้เมื่อ Browser รองรับ
- TypeScript + React/Next.js (หรือ Framework เทียบเท่า), Web App Manifest, Service Worker และ IndexedDB
- Firebase Authentication, Firestore, Storage, FCM Web Push และ In-app Notification
- Appointment CRUD, OCR review และ reminders
- Medication CRUD, schedules, reminders และ caregiver escalation
- น้ำหนัก ส่วนสูง ความดัน ชีพจร และน้ำตาล
- Audio recording และ Speech-to-Text
- Doctor checklist และ questions
- Web URL/deep link เปิดแผนที่และ travel-time estimate พร้อม fallback
- Basic SOS และ Emergency Profile
- PDF reports และ expiring share links
- Offline App Shell, cache/sync queue สำหรับ workflow หลัก และสถานะ Online/Offline/Syncing/Failed
- Admin account operations, Security Auditor search, basic audit and consent records โดย Admin ไม่เห็น PHI เป็นค่าเริ่มต้น

## Out of Scope for MVP

- Native Android/iOS App, native background service, native widget/shortcut และ biometric login แบบ Native
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
Mobile-first PWA สำหรับ Patient/Caregiver flows, appointments, medication, measurements, audio, checklist, map, SOS, reports, offline queue และ Web Push

### Phase 2 — Pilot
Doctor Lite Portal, live traffic, AI summary, LINE/SMS, native app/device integration และ clinic pilot

### Phase 3 — Scale
Hospital integration, FHIR, remote monitoring, B2B dashboard และ white-label

## Success Metrics

- Activation Rate, First Appointment Time และ First Medication Time
- Caregiver Invitation Rate และ Notification Permission Rate
- Dose Event Response Rate และ Appointment Confirmation Rate
- OCR/STT Success and Correction Rate
- Offline Sync Success Rate
- D7/D30 Retention และ Error-free Session Rate
- ผู้สูงอายุใน UAT ทำงานหลักได้ด้วยตนเองหรือมีความช่วยเหลือเพียงเล็กน้อย

## Major Risks

| Risk | Mitigation |
|---|---|
| OCR/STT ผิด | เก็บต้นฉบับ แสดง confidence และให้ผู้ใช้ยืนยัน |
| Web Push/Background Sync ไม่สม่ำเสมอ | In-app notification, capability/permission check, sync เมื่อเปิดแอป และปุ่ม Sync เอง |
| Data leakage | API authorization, App Check, encryption, audit |
| ผู้สูงอายุใช้ยาก | Elderly mode, usability test, caregiver-assisted setup |
| Vendor lock-in | Repository pattern, provider abstraction, portable IDs |
| SOS ถูกเข้าใจผิด | คำเตือนชัดเจน โทรตรงได้ และไม่อ้างเป็น emergency service |

## Assumptions

- UI ภาษาไทยเป็นหลักและเก็บเวลาใน UTC
- Firebase เป็น infrastructure เริ่มต้น ไม่ใช่ domain boundary
- AI outputs เป็น Draft เท่านั้นจนกว่าผู้ใช้จะยืนยัน
- Browser capability แตกต่างกันได้ ทุกฟีเจอร์ Camera, Microphone, Geolocation, Web Share, Push และ Background Sync ต้องมี capability detection และ fallback

## Open Questions

1. Browser Support Policy แบบระบุเวอร์ชัน
2. Provider OCR/STT, Map และ OTP ที่ผ่านการประเมินภาษาไทย ค่าใช้จ่าย และ PDPA
3. Retention period ของเสียง เอกสาร ตำแหน่ง SOS และ audit logs
4. ข้อมูล Emergency Profile ที่อนุญาตให้เก็บ Offline และการป้องกันบน Browser
5. Doctor Lite Portal และกระบวนการยืนยันตัวบุคลากรใน Pilot
