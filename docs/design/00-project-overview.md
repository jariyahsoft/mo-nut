# 00 — Project Overview

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Product summary

**หมอนัด (Mo-nut)** เป็น Health Companion และ Chronic Care Management Platform สำหรับการนัดหมาย ยา ข้อมูลสุขภาพ คำแนะนำจากแพทย์ ผู้ดูแล และข้อมูลฉุกเฉิน โดยเน้นผู้สูงอายุและผู้ป่วยโรคเรื้อรัง

## 2. Vision

> ทำให้ผู้ป่วยไม่พลาดนัด ไม่พลาดยา และมีผู้ดูแลช่วยติดตามอย่างเหมาะสม โดยผู้ป่วยยังควบคุมข้อมูลของตนเอง

## 3. Problem statement

- ผู้ป่วยลืมนัด ทำใบนัดหาย หรือเตรียมตัวไม่ครบ
- ผู้ป่วยลืมยา จำไม่ได้ว่ากินแล้วหรือยัง และผู้ดูแลไม่เห็นสถานะ
- ข้อมูลสุขภาพ เอกสาร และคำแนะนำกระจัดกระจาย
- ผู้ป่วยจำคำถามหรือคำแนะนำหลังพบแพทย์ไม่ได้
- การแชร์ข้อมูลกับผู้ดูแลหรือบุคลากรทางการแพทย์ขาดขอบเขตและหลักฐาน Consent
- PWA มีข้อจำกัดด้าน background notification/offline จึงต้องวางทางต่อยอด Mobile App โดยไม่สร้างระบบใหม่

## 4. Goals

1. ส่งมอบ Core Journey บน Mobile-first PWA ได้เร็วและปลอดภัย
2. ลดความเสี่ยงการพลาดนัดและพลาดยาด้วย reminder/escalation ที่ตรวจสอบได้
3. ทำให้ข้อมูลสุขภาพและเอกสารอยู่ในโครงสร้างเดียวกัน
4. ให้ผู้ป่วยกำหนดและถอนสิทธิ์การแชร์ได้
5. รองรับ Android/iOS ใน Phase 2 ด้วยบัญชีและข้อมูลเดิม
6. ทำให้ Frontend, Backend และ Mobile พัฒนาขนานกันด้วย API contract
7. ลด vendor lock-in ด้วย Canonical Model และ Repository Adapter

## 5. Non-goals

- วินิจฉัยโรค สั่งยา หรือเปลี่ยนยาอัตโนมัติ
- รับประกันการส่งความช่วยเหลือฉุกเฉิน
- ระบบ HIS/EMR/EHR, e-Prescription, Insurance Claim หรือ National Health Platform เต็มรูปแบบ
- Telemedicine/Video consultation เต็มรูปแบบ
- Medical-device certification จนกว่า scope/regulatory assessment จะเปลี่ยน
- Bluetooth integration ใน Phase 1

## 6. Target users and personas

| Persona | Need | Risk to design for |
|---|---|---|
| ผู้ป่วยสูงอายุ | งานวันนี้ นัด ยา ปุ่มใหญ่ ภาษาง่าย | กดผิด อ่านยาก ลืมขั้นตอน |
| ผู้ป่วยโรคเรื้อรัง | ติดตามยา นัด ค่าสุขภาพ และรายงาน | ข้อมูลจำนวนมากและ time zone |
| ผู้ดูแล | ดูหลายผู้ป่วยและรับ escalation | บันทึกผิดคน/เห็นเกินสิทธิ์ |
| Clinician/Doctor Lite | ดูข้อมูลสรุปที่ผู้ป่วยอนุญาต | Consent หมดอายุ/ความเข้าใจว่าเป็น HIS |
| Admin/Support | ดูแลระบบโดยข้อมูลขั้นต่ำ | Privilege abuse และ audit gap |

## 7. Roles and permission summary

| Role | Own data | View delegated data | Edit delegated data | Admin scope |
|---|---:|---:|---:|---:|
| Patient | Yes | N/A | Yes | No |
| Caregiver | No | ตาม Consent | ตาม Permission | No |
| Clinician | No | ตาม Consent/Organization | เฉพาะ action ที่อนุมัติ | No |
| Organization Staff | No | ตาม Organization policy | ตาม role | จำกัดองค์กร |
| System Administrator | No | เฉพาะเหตุจำเป็น | ไม่ควรแก้ clinical data | Platform |
| Support Operator | No | Minimum necessary + ticket | จำกัดมาก | Support only |

## 8. Core modules
- **การสมัคร เข้าสู่ระบบ และ Session** — 12 functional requirements
- **โปรไฟล์ผู้ป่วยและข้อมูลฉุกเฉิน** — 8 functional requirements
- **นัดหมายและโหมดไปพบแพทย์** — 12 functional requirements
- **เอกสาร OCR และ Quick Capture** — 10 functional requirements
- **ผู้ดูแล Consent และการแชร์สิทธิ์** — 10 functional requirements
- **ยา ตารางยา และ Medication Adherence** — 14 functional requirements
- **ข้อมูลสุขภาพ อาการ และแนวโน้ม** — 10 functional requirements
- **เสียง Speech-to-Text และคำแนะนำ** — 8 functional requirements
- **เช็กลิสต์และคำถามสำหรับแพทย์** — 8 functional requirements
- **การแจ้งเตือนและ Escalation** — 10 functional requirements
- **แผนที่ การเดินทาง และสถานที่** — 7 functional requirements
- **SOS และข้อมูลฉุกเฉิน** — 8 functional requirements
- **รายงาน การส่งออก และลิงก์แชร์** — 8 functional requirements
- **เนื้อหาความรู้** — 5 functional requirements
- **ระบบผู้ดูแลและองค์กร** — 7 functional requirements
- **Offline และการซิงก์** — 10 functional requirements
- **AI Governance และ Human Confirmation** — 7 functional requirements
- **บุคลากรทางการแพทย์และ Doctor Lite** — 10 functional requirements
- **Dashboard และ Read Model ตามบทบาท** — 8 functional requirements

## 9. Phase scope

### Phase 1 — Mobile-first PWA

- Auth, profile, appointment, OCR, medication, health measurement
- Caregiver/consent, checklist/questions, notification/escalation
- Doctor Visit Mode, Doctor Lite, reports/share links, SOS
- Responsive web, web push/in-app notification และ offline outbox แบบจำกัด

### Phase 2 — Cross-platform Mobile App

- Core Journey เทียบเท่า Phase 1
- Native push/local notification, background task
- Biometric unlock, secure storage, encrypted local database
- Deep link, widget, HealthKit/Health Connect และ approved Bluetooth devices ตาม scope

## 10. Roadmap gates

1. **Discovery/Architecture Gate:** ปิด Open Decisions ที่บล็อก Sprint 0
2. **Contract Gate:** API v1, schemas, permission matrix และ mock server พร้อม
3. **Phase 1 Pilot Gate:** Core Journey ผ่าน Security/Accessibility/Usability
4. **Phase 2 Entry Gate:** Pilot usage, no critical integrity issue, migration test และ support policy พร้อม
5. **Phase 2 Release Gate:** Cross-channel sync, native notification และ store compliance ผ่าน

## 11. Success metrics

SRS ไม่กำหนดตัวเลขธุรกิจสุดท้าย จึงต้องยืนยัน target กับ Product Owner ก่อนใช้งานจริง ตัวชี้วัดที่ต้องเก็บ ได้แก่:

- อัตราสร้างนัดและรับ reminder สำเร็จ
- อัตราตอบ Dose และอัตรา escalation ที่ส่งสำเร็จ
- OCR/STT confirmation/correction rate
- Consent grant/revoke completion time
- Core Journey completion และ usability error ของผู้สูงอายุ
- API latency/error, crash-free session, sync conflict และ notification delivery
- Cross-patient access incident ต้องเป็นศูนย์

## 12. Risks

| Risk | Control |
|---|---|
| Web push ไม่สม่ำเสมอ | capability check, in-app list, fallback และวัด delivery |
| OCR/STT ผิด | original asset, confidence, review และ human confirmation |
| Firestore coupling | API-only client, repository adapter, canonical schema |
| Offline duplicate/conflict | UUID/ULID, idempotency, version และ conflict UI |
| Permission error | server authorization, policy tests, audit และ threat model |
| Cloud/AI cost | quota, async queue, compression, budget alert, feature flag |
| ผู้สูงอายุใช้ยาก | elderly mode, usability test, caregiver-assisted onboarding |
| SOS ถูกเข้าใจผิด | disclaimer, explicit delivery status และ direct-call fallback |

## 13. Assumptions

- ผู้ใช้มี smartphone/browser ที่อยู่ใน support matrix
- ผู้ป่วยเป็นเจ้าของข้อมูล เว้นแต่มีผู้แทนโดยชอบธรรมตามนโยบาย
- OCR/STT/AI เป็นเพียง proposed data จนผู้ใช้ยืนยัน
- Notification, location และ emergency action ขึ้นกับ permission/OS/network
- Repository layout ใน README เป็นข้อเสนอเริ่มต้น ไม่ใช่ requirement จาก SRS

## 14. Open questions
- [ ] Framework PWA และ Cross-platform Mobile App
- [ ] Firebase Functions เทียบกับ Cloud Run สำหรับแต่ละ Service
- [ ] OCR/STT Provider, Region, Data Retention และ Cost
- [ ] Map Provider และรูปแบบค่าใช้จ่าย
- [ ] ช่องทางสำรอง SMS/Email/LINE และผู้รับผิดชอบค่าใช้จ่าย
- [ ] Browser/OS Version ขั้นต่ำ
- [ ] Retention Period ของเสียง เอกสาร Audit และ Notification Log
- [ ] Threshold/ข้อความเตือนที่ต้องผ่านผู้เชี่ยวชาญทางการแพทย์
- [ ] Legal basis/Consent flow สำหรับผู้เยาว์หรือผู้แทนโดยชอบธรรม
- [ ] SLA ของการถอนสิทธิ์ Data Export และ Account Deletion
- [ ] รายการ Health/Bluetooth Device ที่อนุมัติใน Phase 2
