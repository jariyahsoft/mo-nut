# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

# หมอนัด — Mo-nut

**ระบบผู้ช่วยดูแลสุขภาพสำหรับผู้ป่วยโรคเรื้อรัง ผู้ดูแล และบุคลากรทางการแพทย์**  
**MVP: Web Application แบบ Mobile-first Progressive Web App (PWA)**

---

## ข้อมูลเอกสาร

| รายการ | รายละเอียด |
|---|---|
| ชื่อเอกสาร | Software Requirements Specification — Mo-nut |
| ชื่อผลิตภัณฑ์ | หมอนัด (Mo-nut) |
| เอกสารต้นทาง | Product Requirements Document เวอร์ชัน 1.1 — MVP Mobile-first PWA |
| ประเภทระบบ | Health Companion & Chronic Care Management Platform |
| แพลตฟอร์ม MVP | Web App แบบ Mobile-first PWA |
| เทคโนโลยี Backend หลัก | Firebase |
| รูปแบบสถาปัตยกรรม | Modular, API-first, Domain-oriented, Cloud-native |
| ภาษาเริ่มต้น | ภาษาไทย |
| เวอร์ชัน SRS | 1.0 |
| สถานะ | ฉบับสมบูรณ์สำหรับออกแบบ พัฒนา ทดสอบ และประมาณการโครงการ |
| วันที่จัดทำ | 24 มิถุนายน 2026 |
| เจ้าของผลิตภัณฑ์ | Mo-nut Product Team |

---

## ประวัติการแก้ไข

| เวอร์ชัน | วันที่ | รายละเอียด |
|---|---|---|
| 1.0 | 24 มิถุนายน 2026 | จัดทำ SRS ฉบับสมบูรณ์จาก PRD Mobile-first PWA โดยกำหนด Firebase, API Contract, Offline/PWA, Security, Data Model และแนวทางย้ายฐานข้อมูล |

---

# 1. บทนำ

## 1.1 วัตถุประสงค์ของเอกสาร

เอกสารนี้กำหนดข้อกำหนดซอฟต์แวร์สำหรับระบบหมอนัดในระยะ MVP เพื่อใช้เป็นข้อตกลงร่วมระหว่างเจ้าของผลิตภัณฑ์ ทีม UX/UI ทีม Frontend ทีม Backend ทีม QA ทีม DevOps ทีม Security และผู้มีส่วนได้ส่วนเสียอื่น

เอกสารครอบคลุม

- ขอบเขตระบบและบทบาทผู้ใช้งาน
- ข้อกำหนดเชิงฟังก์ชัน
- ข้อกำหนดที่ไม่ใช่ฟังก์ชัน
- สถาปัตยกรรมระบบ
- โครงสร้างข้อมูล
- API Contract
- การทำงานแบบ PWA และ Offline
- ความปลอดภัยและความเป็นส่วนตัวของข้อมูลสุขภาพ
- การใช้ OCR, Speech-to-Text และ AI อย่างปลอดภัย
- การทดสอบและเกณฑ์ยอมรับระบบ
- แนวทางให้ Frontend และ Backend ทำงานขนานกัน
- แนวทางลดการผูกติด Firebase และเตรียมย้ายไป PostgreSQL หรือ MongoDB

## 1.2 ขอบเขตผลิตภัณฑ์

MVP เป็น Web Application แบบ Mobile-first PWA ใช้งานผ่าน Browser และสามารถเพิ่มไว้บนหน้าจอโฮมของสมาร์ตโฟนได้ โดยมีผู้ป่วยเป็นผู้ควบคุมข้อมูลและสิทธิ์การแชร์

ระบบต้องช่วยผู้ใช้ในกิจกรรมสำคัญ ได้แก่

1. จัดการและแจ้งเตือนนัดหมาย
2. จัดการยาและบันทึกสถานะการรับประทานยา
3. เชื่อมผู้ป่วยกับผู้ดูแล
4. บันทึกค่าข้อมูลสุขภาพ
5. เก็บเอกสารและใช้ OCR ช่วยกรอกข้อมูล
6. บันทึกเสียงและแปลงเป็นข้อความ
7. บันทึกคำแนะนำและเช็กลิสต์
8. เตรียมคำถามก่อนพบแพทย์
9. สร้างรายงานสุขภาพและแชร์แบบควบคุมสิทธิ์
10. เปิดแผนที่ ติดต่อผู้ดูแล และใช้งาน SOS
11. ทำงานพื้นฐานได้เมื่อเครือข่ายขาดหาย

## 1.3 วัตถุประสงค์ของ MVP

- พิสูจน์ว่าผู้ใช้สามารถสร้างนัด เพิ่มยา และเชิญผู้ดูแลได้จริง
- ลดความเสี่ยงการพลาดนัดและพลาดยา
- ประเมินความเหมาะสมของ PWA สำหรับผู้สูงอายุและผู้ดูแล
- ทดสอบ OCR และ Speech-to-Text ในบริบทเอกสารและภาษาไทย
- ทดสอบรูปแบบการแชร์ข้อมูลสุขภาพโดยผู้ป่วยเป็นผู้กำหนดสิทธิ์
- เก็บข้อมูลการใช้งานเพื่อวางแผน Native App และ Doctor Portal ระยะถัดไป

## 1.4 เอกสารอ้างอิง

- PRD หมอนัด เวอร์ชัน 1.1 — MVP Mobile-first PWA
- นโยบายความเป็นส่วนตัวและเอกสารความยินยอมของโครงการ
- แนวทางออกแบบ UX/UI และ Design System ของ Mo-nut
- API Specification ที่สร้างจาก SRS ฉบับนี้
- Test Plan, Security Test Plan และ Deployment Runbook ที่จะจัดทำต่อเนื่อง

## 1.5 คำสำคัญ

| คำ | ความหมาย |
|---|---|
| PWA | Progressive Web App ที่ติดตั้งบนหน้าจอโฮมและรองรับ Offline บางส่วน |
| Patient | ผู้ป่วยและเจ้าของข้อมูลสุขภาพ |
| Caregiver | ผู้ดูแลที่ได้รับสิทธิ์จากผู้ป่วย |
| Doctor Lite Portal | Web Portal แบบจำกัดสำหรับแพทย์หรือโครงการนำร่อง |
| PHI | ข้อมูลสุขภาพที่ระบุตัวบุคคลได้ |
| OCR | การอ่านข้อความจากภาพเอกสาร |
| STT | Speech-to-Text หรือการแปลงเสียงเป็นข้อความ |
| Dose Event | เหตุการณ์ยาหนึ่งรอบ เช่น รอกิน กินแล้ว ข้าม หรือพลาด |
| Sync Queue | คิวข้อมูลในอุปกรณ์ที่รอส่งขึ้น Server |
| Audit Log | ประวัติการเข้าถึงหรือเปลี่ยนแปลงข้อมูลสำคัญ |
| Soft Delete | การทำเครื่องหมายว่าลบโดยยังเก็บข้อมูลเพื่อการตรวจสอบตามนโยบาย |

---

# 2. ภาพรวมระบบ

## 2.1 ผู้ใช้งานระบบ

1. **ผู้ป่วย** — เจ้าของข้อมูล จัดการนัด ยา ค่าสุขภาพ เอกสาร และสิทธิ์ผู้ดูแล
2. **ผู้ดูแล** — ดูหรือช่วยจัดการข้อมูลตามสิทธิ์ที่ผู้ป่วยอนุญาต
3. **แพทย์/บุคลากรทางการแพทย์** — เข้าถึงรายงาน ลิงก์แชร์ หรือ Doctor Lite Portal ตามความยินยอม
4. **ผู้ดูแลระบบ** — ดูแลระบบ ผู้ใช้งาน เหตุการณ์ความปลอดภัย และ Audit Log ตามสิทธิ์
5. **ระบบภายนอก** — OCR, STT, แผนที่, Web Push, อีเมล และบริการสร้าง PDF

## 2.2 บริบทการทำงาน

- Smartphone เป็นอุปกรณ์หลัก
- Tablet และ Desktop เป็นอุปกรณ์รอง
- ระบบต้องรองรับ Touch, กล้อง, ไมโครโฟน, Geolocation และ Web Share ตามความสามารถของ Browser
- ความสามารถที่ Browser ไม่รองรับต้องมี Fallback ที่ชัดเจน
- ผู้ป่วยเป็นผู้ควบคุมการแชร์ข้อมูลและสามารถเพิกถอนสิทธิ์ได้
- ข้อมูลที่ AI/OCR/STT สร้างต้องไม่กลายเป็นข้อมูลยืนยันจนกว่าผู้ใช้ตรวจสอบ

## 2.3 ข้อจำกัดของ MVP

- ไม่พัฒนา Native Android หรือ Native iOS
- ไม่รับประกันว่า Web Push และ Background Sync ทำงานเหมือนกันทุก Browser
- ไม่วินิจฉัยโรคหรือปรับยา
- ไม่เชื่อม Hospital Information System ใน MVP
- ไม่รับประกันว่าการกด “กินแล้ว” หมายถึงผู้ป่วยรับประทานยาจริง
- SOS ไม่ใช่บริการการแพทย์ฉุกเฉินและไม่รับประกันการตอบสนอง

## 2.4 สมมติฐาน

- ผู้ใช้มีสมาร์ตโฟนที่เปิด Browser รุ่นที่ยังได้รับการสนับสนุน
- ผู้ใช้อนุญาต Notification, Camera, Microphone หรือ Location ตามความจำเป็น
- ผู้ดูแลมีบัญชีของตนเองก่อนเข้าถึงข้อมูลผู้ป่วย
- การบันทึกเสียงทำเมื่อได้รับอนุญาตจากผู้พูด
- ระบบใช้ Firebase เป็นโครงสร้างพื้นฐาน MVP แต่ Domain Model และ API ต้องไม่ผูกกับ Firestore โดยตรง

---

# 3. สถาปัตยกรรมระบบ

## 3.1 หลักการสถาปัตยกรรม

ระบบต้องใช้หลักการต่อไปนี้

- Mobile-first และ Progressive Enhancement
- API-first
- Separation of Concerns
- Domain-oriented Modules
- Least Privilege
- Privacy by Design
- Secure by Default
- Offline-aware
- Idempotent Operations
- Observable and Auditable
- Database Portability

## 3.2 Logical Architecture

```text
[PWA Web Client]
  ├─ Presentation / Design System
  ├─ Client Application Services
  ├─ Offline Store + Sync Queue
  ├─ PWA Service Worker
  └─ API Client generated from OpenAPI
             │ HTTPS / JSON
             ▼
[Backend API / Cloud Functions]
  ├─ Authentication & Authorization
  ├─ Patient & Caregiver Domain
  ├─ Appointment Domain
  ├─ Medication Domain
  ├─ Health Measurement Domain
  ├─ Document / OCR Domain
  ├─ Recording / STT Domain
  ├─ Checklist & Question Domain
  ├─ Reporting & Sharing Domain
  ├─ Notification Domain
  ├─ SOS Domain
  ├─ Consent & Audit Domain
  └─ Admin / Doctor Lite Domain
             │
             ├─ Repository Interfaces
             ├─ Event / Job Queue
             └─ External Provider Adapters
                         │
                         ▼
[Firebase Infrastructure]
  ├─ Firebase Authentication
  ├─ Cloud Firestore
  ├─ Cloud Storage
  ├─ Cloud Functions / Cloud Run as needed
  ├─ Firebase Cloud Messaging
  ├─ Cloud Tasks / Scheduler / Pub/Sub
  ├─ App Check
  └─ Monitoring / Logging
```

## 3.3 เทคโนโลยีอ้างอิงสำหรับ MVP

| Layer | เทคโนโลยีอ้างอิง |
|---|---|
| Frontend | TypeScript, React/Next.js หรือ Framework เทียบเท่า |
| UI | Responsive Design System, Accessible Components |
| PWA | Web App Manifest, Service Worker, IndexedDB |
| API | HTTPS REST/JSON, OpenAPI 3.x |
| Authentication | Firebase Authentication |
| Primary Database | Cloud Firestore |
| File Storage | Firebase/Google Cloud Storage |
| Backend Compute | Firebase Cloud Functions หรือ Cloud Run |
| Notification | Firebase Cloud Messaging สำหรับ Web Push และ In-app Notification |
| Scheduled Jobs | Cloud Scheduler และ Cloud Tasks/Pub/Sub |
| Observability | Cloud Logging, Error Reporting, Metrics, Alerting |
| CI/CD | Automated lint, test, build, security scan และ deployment |

เทคโนโลยีระดับ Framework สามารถเปลี่ยนได้หากยังรักษา Contract และข้อกำหนดในเอกสารนี้

## 3.4 การแยก Frontend และ Backend เพื่อทำงานขนานกัน

1. Backend ต้องเผยแพร่ OpenAPI Specification เป็นแหล่งอ้างอิงเดียวของ API
2. Frontend ใช้ Mock Server ที่สร้างจาก OpenAPI ได้ตั้งแต่เริ่มโครงการ
3. ทุก Endpoint ต้องมี Request/Response Schema, Error Schema และตัวอย่างข้อมูล
4. Shared Types ต้องสร้างจาก Contract ไม่แชร์ Entity ของ Firestore โดยตรง
5. Frontend ห้ามอ่านหรือเขียน Firestore Collection หลักโดยตรง
6. Backend ต้องมี Repository Interface สำหรับทุก Aggregate หลัก
7. ทีมต้องกำหนด API version เช่น `/api/v1`
8. การเปลี่ยน Contract ที่กระทบ Compatibility ต้องใช้ Change Request และ Versioning
9. Feature แต่ละรายการต้องมี Definition of Ready ก่อนเริ่มพัฒนา
10. CI ต้องตรวจว่า API Implementation สอดคล้องกับ OpenAPI

## 3.5 แนวทางลดการผูกติด Firebase

- ใช้ Application-generated ID เช่น UUIDv7 หรือรูปแบบมาตรฐานที่ไม่ขึ้นกับฐานข้อมูล
- ใช้ ISO 8601 UTC สำหรับ API และแปลงเป็น Database Timestamp ภายใน Adapter
- ห้ามส่ง Firestore DocumentReference, GeoPoint หรือ Sentinel Value ผ่าน API
- แยก Domain Entity, API DTO และ Persistence Model
- ใช้ Repository Pattern และ Unit of Work เชิงตรรกะ
- เก็บความสัมพันธ์หลายต่อหลายผ่าน Entity กลาง แทนการฝัง Array ขนาดใหญ่
- หลีกเลี่ยง Business Logic ใน Firestore Security Rules; Logic สำคัญต้องอยู่ Backend
- ใช้ Soft Delete และ Version Field สำหรับข้อมูลสำคัญ
- เก็บ Event/Outbox สำหรับงานแจ้งเตือนและ Integration
- มี Export Format เป็น JSON Lines หรือ CSV พร้อม Schema Version

## 3.6 Deployment Environments

- `local` — Emulator และ Mock Providers
- `development` — สำหรับรวมงานทีม
- `staging` — ใกล้เคียง Production และใช้ UAT
- `production` — ข้อมูลผู้ใช้จริง

แต่ละ Environment ต้องแยก Firebase Project, Storage Bucket, Secret, Domain และข้อมูลอย่างชัดเจน

---

# 4. บทบาทและสิทธิ์

## 4.1 บทบาทหลัก

| บทบาท | ขอบเขต |
|---|---|
| Patient | เจ้าของข้อมูลสุขภาพและผู้กำหนดสิทธิ์ |
| Caregiver | ผู้ได้รับสิทธิ์ตามความสัมพันธ์กับผู้ป่วย |
| Doctor Lite | ผู้เข้าถึงข้อมูลที่ผู้ป่วยแชร์เฉพาะช่วงเวลาและขอบเขต |
| Organization Staff | บุคลากรโครงการนำร่องตาม Tenant |
| System Admin | ผู้ดูแลระบบด้านปฏิบัติการ |
| Security Auditor | ผู้ตรวจสอบ Log โดยไม่แก้ข้อมูลสุขภาพ |
| Support Agent | ช่วยเหลือผู้ใช้โดยเข้าถึงข้อมูลขั้นต่ำ |

## 4.2 หลักการ Authorization

- ใช้ RBAC ร่วมกับ Relationship-based Access Control
- การเป็น Caregiver ไม่ได้ให้สิทธิ์ทุกหมวดโดยอัตโนมัติ
- ทุกคำขอเข้าถึงข้อมูลผู้ป่วยต้องตรวจ `actor`, `patient`, `relationship`, `permission`, `status`, `expiry`
- ผู้ป่วยสามารถเพิกถอนสิทธิ์ได้ทันที
- การเข้าถึงผ่าน Share Link ต้องตรวจ Scope, Expiry, Revocation และจำนวนครั้งถ้ากำหนด
- Admin ไม่มีสิทธิ์เปิดข้อมูลสุขภาพโดยค่าเริ่มต้น เว้นแต่มีเหตุผลและ Audit

## 4.3 สิทธิ์พื้นฐานของผู้ดูแล

- `appointments.read`
- `appointments.write`
- `medications.read`
- `medications.write`
- `medication_events.read`
- `medication_events.write_on_behalf`
- `health_measurements.read`
- `health_measurements.write`
- `documents.read`
- `recordings.read`
- `checklists.read`
- `checklists.write`
- `reports.generate`
- `reports.read`
- `sos.receive`
- `emergency_profile.read`

---

# 5. ข้อกำหนดเชิงฟังก์ชัน

> ระดับความสำคัญ: **MUST** = จำเป็นต่อ MVP, **SHOULD** = ควรมีถ้ากรอบเวลาอนุญาต, **COULD** = พิจารณาภายหลัง

## 5.1 การสมัคร เข้าสู่ระบบ และ Session

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-AUTH-001 | ระบบต้องรองรับการสมัครด้วยอีเมลและรหัสผ่าน | MUST |
| FR-AUTH-002 | ระบบต้องรองรับ Google Sign-In | MUST |
| FR-AUTH-003 | ระบบต้องรองรับการสมัคร/เข้าสู่ระบบด้วยหมายเลขโทรศัพท์และ OTP เมื่อเปิดใช้ Provider | SHOULD |
| FR-AUTH-004 | ระบบต้องยืนยันอีเมลหรือหมายเลขโทรศัพท์ตามวิธีสมัคร | MUST |
| FR-AUTH-005 | ระบบต้องรองรับการกู้คืนบัญชี | MUST |
| FR-AUTH-006 | ระบบต้องแสดงและบังคับยอมรับ Terms, Privacy Notice และ Consent ที่จำเป็น | MUST |
| FR-AUTH-007 | ระบบต้องรองรับหนึ่งบัญชีมีหลายบทบาท | MUST |
| FR-AUTH-008 | ระบบต้องออกจากระบบทุกอุปกรณ์ได้ | SHOULD |
| FR-AUTH-009 | ระบบต้องเพิกถอน Session เมื่อบัญชีถูกระงับหรือมีเหตุความปลอดภัย | MUST |
| FR-AUTH-010 | ระบบต้องป้องกัน Brute Force, Credential Stuffing และ OTP Abuse | MUST |
| FR-AUTH-011 | ระบบต้องบันทึก Login Success/Failure ที่สำคัญใน Security Log | MUST |
| FR-AUTH-012 | ระบบต้องรองรับ MFA สำหรับ Admin และบัญชีสิทธิ์สูง | MUST |

### เกณฑ์ยอมรับ

- ผู้ใช้ใหม่สร้างบัญชีและเข้าสู่ Dashboard ได้โดยไม่ต้องใช้ Native App
- Consent ที่บังคับต้องมีเวอร์ชันและเวลายอมรับ
- Session ที่ถูกเพิกถอนไม่สามารถเรียก API สำคัญได้

## 5.2 Onboarding และโปรไฟล์ผู้ป่วย

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-PROFILE-001 | ระบบต้องให้ผู้ใช้เลือกบทบาทเริ่มต้นเป็นผู้ป่วยหรือผู้ดูแล | MUST |
| FR-PROFILE-002 | ผู้ป่วยต้องสร้างโปรไฟล์ชื่อ วันเกิด โทรศัพท์ และภาษาได้ | MUST |
| FR-PROFILE-003 | ผู้ป่วยต้องบันทึกโรคประจำตัวได้หลายรายการ | MUST |
| FR-PROFILE-004 | ผู้ป่วยต้องบันทึกประวัติแพ้ยาและแพ้อาหารได้ | MUST |
| FR-PROFILE-005 | ผู้ป่วยต้องบันทึกโรงพยาบาล หมายเลขผู้ป่วย และสิทธิการรักษาได้ | MUST |
| FR-PROFILE-006 | ผู้ป่วยต้องเพิ่มผู้ติดต่อฉุกเฉินได้หลายคนและจัดลำดับได้ | MUST |
| FR-PROFILE-007 | ผู้ใช้ต้องตั้งขนาดตัวอักษรและโหมดผู้สูงอายุได้ | MUST |
| FR-PROFILE-008 | ระบบต้องแยกข้อมูลบัญชีออกจากข้อมูลผู้ป่วย เพื่อรองรับผู้ดูแลจัดการหลายคน | MUST |
| FR-PROFILE-009 | ผู้ป่วยต้องดาวน์โหลดข้อมูลของตนได้ | SHOULD |
| FR-PROFILE-010 | ผู้ป่วยต้องร้องขอลบบัญชีและข้อมูลตามนโยบายได้ | MUST |

## 5.3 ผู้ดูแลและการแชร์สิทธิ์

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-CARE-001 | ผู้ป่วยต้องเชิญผู้ดูแลผ่านอีเมล หมายเลขโทรศัพท์ หรือลิงก์ได้ | MUST |
| FR-CARE-002 | คำเชิญต้องมีวันหมดอายุและใช้ซ้ำไม่ได้หลังยอมรับ | MUST |
| FR-CARE-003 | ผู้ดูแลต้องยอมรับคำเชิญก่อนเข้าถึงข้อมูล | MUST |
| FR-CARE-004 | ผู้ป่วยต้องกำหนดสิทธิ์แยกตามหมวดข้อมูลได้ | MUST |
| FR-CARE-005 | ผู้ป่วยต้องกำหนดผู้ดูแลหลักและสำรองได้ | MUST |
| FR-CARE-006 | ผู้ป่วยต้องเพิกถอนหรือระงับผู้ดูแลได้ทันที | MUST |
| FR-CARE-007 | ผู้ดูแลต้องดูแลผู้ป่วยหลายคนจากบัญชีเดียวได้ | MUST |
| FR-CARE-008 | ระบบต้องบันทึกการสร้าง แก้ไข และเพิกถอนความสัมพันธ์ | MUST |
| FR-CARE-009 | ระบบต้องแจ้งผู้ป่วยเมื่อมีการเปลี่ยนสิทธิ์สำคัญ | SHOULD |
| FR-CARE-010 | สิทธิ์ต้องมีวันหมดอายุแบบเลือกกำหนดได้ | SHOULD |

## 5.4 นัดหมายและเอกสารใบนัด

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-APT-001 | ผู้ใช้ต้องสร้าง แก้ไข เลื่อน ยกเลิก และลบนัดแบบ Soft Delete ได้ | MUST |
| FR-APT-002 | นัดต้องเก็บวันเวลา Time Zone สถานพยาบาล แผนก แพทย์ วัตถุประสงค์ และหมายเหตุ | MUST |
| FR-APT-003 | นัดต้องเก็บสิ่งที่ต้องเตรียม เอกสาร และข้อกำหนดงดน้ำ/อาหารได้ | MUST |
| FR-APT-004 | ผู้ใช้ต้องแนบภาพใบนัดจากกล้องหรือไฟล์ได้ | MUST |
| FR-APT-005 | ระบบต้องสร้าง OCR Job และเสนอวันที่ เวลา สถานที่ และแผนกจากภาพ | MUST |
| FR-APT-006 | ข้อมูล OCR ต้องอยู่ในสถานะ Draft จนผู้ใช้ยืนยัน | MUST |
| FR-APT-007 | ระบบต้องเก็บภาพต้นฉบับและค่าความมั่นใจของ OCR | MUST |
| FR-APT-008 | ผู้ใช้ต้องกำหนดผู้ดูแลที่รับผิดชอบนัดได้ | MUST |
| FR-APT-009 | ผู้ใช้ต้องกำหนดการเตือนหลายเวลาได้ | MUST |
| FR-APT-010 | ระบบต้องแสดงสถานะนัดและประวัติการเปลี่ยนสถานะ | MUST |
| FR-APT-011 | ผู้ใช้ต้องบันทึกผลหลังพบแพทย์และเชื่อมเอกสาร/เสียง/คำถามกับนัดได้ | MUST |
| FR-APT-012 | ระบบต้องตรวจนัดซ้ำที่มีเวลาและสถานที่ใกล้เคียงและเตือนผู้ใช้ | SHOULD |
| FR-APT-013 | ระบบต้องแสดงนัดถัดไปบน Dashboard | MUST |
| FR-APT-014 | ระบบต้องสร้างลิงก์เปิดแผนที่จากสถานที่นัด | MUST |
| FR-APT-015 | ระบบต้องเพิ่มนัดใหม่จาก Doctor Visit Mode ได้ | MUST |

## 5.5 การแจ้งเตือนนัดหมาย

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-APTN-001 | ระบบต้องสร้าง Notification Schedule จากเวลานัดและการตั้งค่า | MUST |
| FR-APTN-002 | ระบบต้องรองรับ Web Push เมื่อ Browser/OS รองรับ | MUST |
| FR-APTN-003 | ระบบต้องมี In-app Notification เป็นช่องทางพื้นฐาน | MUST |
| FR-APTN-004 | ระบบต้องแสดงสถานะการอนุญาต Notification และวิธีแก้ไข | MUST |
| FR-APTN-005 | ผู้ใช้ต้องกดยืนยันว่าจะไป เตือนภายหลัง เปิดแผนที่ หรือติดต่อผู้ดูแลได้ | MUST |
| FR-APTN-006 | หากผู้ป่วยไม่ยืนยัน ระบบต้องแจ้งผู้ดูแลตามกติกาที่ตั้งไว้ | SHOULD |
| FR-APTN-007 | การเลื่อนหรือยกเลิกนัดต้องยกเลิก Notification เดิมและสร้างใหม่อย่าง Idempotent | MUST |
| FR-APTN-008 | ระบบต้องบันทึกสถานะ Created, Sent, Delivered/Unknown, Opened, Failed เท่าที่ Provider ให้ข้อมูล | MUST |

## 5.6 การจัดการยาและตารางยา

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-MED-001 | ผู้ใช้ต้องเพิ่มยาโดยกรอกเองหรือจากภาพฉลาก/ใบสั่งยาได้ | MUST |
| FR-MED-002 | ยาต้องเก็บชื่อยา รูปยา ขนาดยา จำนวน วิธีใช้ และช่วงเวลา | MUST |
| FR-MED-003 | ผู้ใช้ต้องกำหนดก่อนอาหาร หลังอาหาร พร้อมอาหาร หรือคำแนะนำอื่นได้ | MUST |
| FR-MED-004 | ระบบต้องรองรับตารางทุกวัน หลายครั้งต่อวัน บางวัน วันเว้นวัน และตามช่วงวันที่ | MUST |
| FR-MED-005 | ระบบต้องสร้าง Dose Event ล่วงหน้าตามช่วงเวลาที่กำหนด | MUST |
| FR-MED-006 | ผู้ใช้ต้องเลือก กินแล้ว ข้าม เตือนภายหลัง หรือรายงานปัญหาได้ | MUST |
| FR-MED-007 | ระบบต้องเก็บเวลาที่ควรกินและเวลาที่บันทึกจริง | MUST |
| FR-MED-008 | ระบบต้องไม่บันทึกว่ากินยาแล้วอัตโนมัติเมื่อไม่ตอบ | MUST |
| FR-MED-009 | เมื่อเกิน Grace Period ระบบต้องเปลี่ยนเป็นพลาด/ยังไม่ยืนยันตามกติกา | MUST |
| FR-MED-010 | ระบบต้องแจ้งผู้ดูแลเมื่อพลาดยาตามสิทธิ์และการตั้งค่า | MUST |
| FR-MED-011 | ระบบต้องป้องกันการยืนยัน Dose Event เดิมซ้ำด้วย Idempotency Key | MUST |
| FR-MED-012 | ผู้ดูแลที่มีสิทธิ์ต้องบันทึกแทนผู้ป่วยได้และระบบต้องระบุผู้บันทึก | MUST |
| FR-MED-013 | การแก้ตารางยาต้องไม่ทำลายประวัติ Dose Event ที่เกิดขึ้นแล้ว | MUST |
| FR-MED-014 | ผู้ใช้ต้องพักหรือสิ้นสุดรายการยาโดยระบุวันที่ได้ | MUST |
| FR-MED-015 | OCR ยาต้องเป็น Draft และผู้ใช้ต้องยืนยันก่อนสร้างตาราง | MUST |
| FR-MED-016 | ระบบควรคำนวณความสม่ำเสมอการรับประทานยาแบบพื้นฐาน | SHOULD |

## 5.7 ข้อมูลสุขภาพและกราฟ

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-HEALTH-001 | ผู้ใช้ต้องบันทึกน้ำหนัก ส่วนสูง ความดัน ชีพจร และน้ำตาลได้ | MUST |
| FR-HEALTH-002 | ระบบต้องรองรับหน่วยมาตรฐานและตรวจสอบค่าที่เป็นไปได้ | MUST |
| FR-HEALTH-003 | ผู้ใช้ต้องระบุบริบท เช่น ก่อนอาหาร หลังอาหาร หรือวัดที่บ้านได้ | MUST |
| FR-HEALTH-004 | ระบบต้องเก็บผู้บันทึก อุปกรณ์ เวลา และแหล่งข้อมูล | MUST |
| FR-HEALTH-005 | ระบบต้องแสดงรายการย้อนหลังและกราฟรายวัน/สัปดาห์/เดือนได้ | MUST |
| FR-HEALTH-006 | ระบบต้องคำนวณ BMI เมื่อมีส่วนสูงและน้ำหนัก | MUST |
| FR-HEALTH-007 | ผู้ใช้ต้องแก้ไขหรือ Soft Delete ค่าที่กรอกผิดได้ | MUST |
| FR-HEALTH-008 | ระบบต้องเก็บประวัติแก้ไขค่าที่สำคัญ | MUST |
| FR-HEALTH-009 | ระบบอาจแจ้งให้วัดซ้ำเมื่อค่านอกช่วงที่ตั้งไว้ โดยห้ามวินิจฉัย | SHOULD |
| FR-HEALTH-010 | ผู้ดูแลที่มีสิทธิ์ต้องบันทึกแทนได้ | MUST |

## 5.8 บันทึกเสียงและ Speech-to-Text

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-REC-001 | ระบบต้องแสดงข้อความยืนยันการได้รับอนุญาตก่อนบันทึกเสียง | MUST |
| FR-REC-002 | ผู้ใช้ต้องเริ่ม หยุดชั่วคราว ทำต่อ และหยุดบันทึกได้เมื่อ Browser รองรับ | MUST |
| FR-REC-003 | หาก Browser ไม่รองรับ ต้องให้อัปโหลดไฟล์เสียงแทนได้ | MUST |
| FR-REC-004 | ผู้ใช้ต้องตั้งชื่อ เพิ่มหมายเหตุ และเชื่อมเสียงกับนัดหรือยาได้ | MUST |
| FR-REC-005 | ระบบต้องอัปโหลดไฟล์แบบทนต่อเครือข่ายขาดหายและแสดง Progress | MUST |
| FR-REC-006 | ระบบต้องสร้าง STT Job และแสดงสถานะประมวลผล | MUST |
| FR-REC-007 | ข้อความถอดเสียงต้องแก้ไขได้และเก็บไฟล์ต้นฉบับ | MUST |
| FR-REC-008 | ระบบต้องระบุว่า Transcript สร้างโดย AI และยังไม่ยืนยัน | MUST |
| FR-REC-009 | ผู้ใช้ต้องยืนยัน Transcript ก่อนนำไปสร้างนัด ยา หรือเช็กลิสต์ | MUST |
| FR-REC-010 | ผู้ใช้ต้องค้นหาคำใน Transcript ได้ | SHOULD |

## 5.9 Quick Capture

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-QC-001 | Quick Capture ต้องเปิดจาก Dashboard ได้ภายในหนึ่งการกด | MUST |
| FR-QC-002 | ต้องรองรับถ่ายรูปใบนัด ถ่ายรูปยา บันทึกเสียง บันทึกความดัน น้ำหนัก น้ำตาล อาการ นัด คำถาม และเช็กลิสต์ | MUST |
| FR-QC-003 | ระบบต้องจำบริบทผู้ป่วยที่กำลังจัดการและแสดงให้ชัดเจน | MUST |
| FR-QC-004 | รายการ Offline ต้องเข้า Sync Queue และแสดงสถานะ | MUST |
| FR-QC-005 | ก่อนออกจากฟอร์มที่ยังไม่บันทึก ระบบต้องเตือนผู้ใช้ | MUST |

## 5.10 เช็กลิสต์และเป้าหมาย

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-CHK-001 | ผู้ใช้ต้องสร้างเช็กลิสต์แบบครั้งเดียว รายวัน หรือรายสัปดาห์ได้ | MUST |
| FR-CHK-002 | เช็กลิสต์ต้องรองรับเป้าหมายจำนวนครั้ง วัน นาที ระยะทาง ก้าว หรือค่าที่วัด | MUST |
| FR-CHK-003 | ผู้ใช้ต้องทำเครื่องหมายเสร็จ ไม่ได้ทำ และเพิ่มหมายเหตุได้ | MUST |
| FR-CHK-004 | ระบบต้องแสดงความคืบหน้ารายวันและรายสัปดาห์ | MUST |
| FR-CHK-005 | เช็กลิสต์ต้องเชื่อมกับนัด คำแนะนำ หรือ Transcript ได้ | MUST |
| FR-CHK-006 | ผู้ดูแลที่มีสิทธิ์ต้องดูและช่วยบันทึกได้ | MUST |
| FR-CHK-007 | ระบบต้องไม่แก้ข้อความคำแนะนำแพทย์เอง | MUST |
| FR-CHK-008 | เช็กลิสต์ที่ AI เสนอต้องเป็น Draft และรอผู้ใช้ยืนยัน | MUST |

## 5.11 คำถามสำหรับแพทย์

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-QUES-001 | ผู้ใช้ต้องเพิ่มคำถามด้วยข้อความ เสียง หรือภาพได้ | MUST |
| FR-QUES-002 | คำถามต้องเชื่อมกับนัดและมีหมวด/ความสำคัญได้ | MUST |
| FR-QUES-003 | ระบบต้องแสดงคำถามทั้งหมดใน Doctor Visit Mode | MUST |
| FR-QUES-004 | ผู้ใช้ต้องทำเครื่องหมายว่าถามแล้วและบันทึกคำตอบได้ | MUST |
| FR-QUES-005 | ผู้ใช้ต้องแนบเสียงหรือเอกสารกับคำตอบได้ | MUST |
| FR-QUES-006 | ระบบต้องเตือนให้ทบทวนคำถามก่อนวันนัด | SHOULD |

## 5.12 Doctor Visit Mode

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-VISIT-001 | ระบบต้องรวมข้อมูลนัด สิ่งที่ต้องเตรียม คำถาม ยา และข้อมูลล่าสุดในหน้าจอเดียว | MUST |
| FR-VISIT-002 | ผู้ใช้ต้องบันทึกผลตรวจ เสียง เอกสาร และการเปลี่ยนแปลงยาได้ | MUST |
| FR-VISIT-003 | ผู้ใช้ต้องสร้างนัดครั้งถัดไปได้ | MUST |
| FR-VISIT-004 | ระบบต้องเชื่อมข้อมูลที่สร้างกับ Visit เดียวกัน | MUST |
| FR-VISIT-005 | หน้าจอต้องใช้งานง่าย ตัวอักษรใหญ่ และไม่ซ่อนข้อมูลสำคัญหลายชั้น | MUST |

## 5.13 แผนที่และการเดินทาง

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-MAP-001 | ระบบต้องเปิดพิกัดหรือที่อยู่ในผู้ให้บริการแผนที่ภายนอกได้ | MUST |
| FR-MAP-002 | ระบบต้องขอ Geolocation เฉพาะเมื่อผู้ใช้ร้องขอ | MUST |
| FR-MAP-003 | ระบบต้องแสดงเวลาเดินทางโดยประมาณเมื่อ Provider รองรับ | MUST |
| FR-MAP-004 | หากเข้าถึงตำแหน่งไม่ได้ ต้องให้ผู้ใช้กรอกจุดเริ่มต้นหรือเปิดแผนที่โดยตรง | MUST |
| FR-MAP-005 | ระบบต้องไม่ติดตามตำแหน่งต่อเนื่องนอกเหตุ SOS ใน MVP | MUST |

## 5.14 SOS และข้อมูลฉุกเฉิน

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-SOS-001 | ปุ่ม SOS ต้องเข้าถึงได้จาก Dashboard และหน้าสำคัญ | MUST |
| FR-SOS-002 | ระบบต้องใช้การกดค้างหรือหน้าต่างยืนยันเพื่อป้องกันการกดผิด | MUST |
| FR-SOS-003 | ระบบต้องเสนอการโทรหาผู้ดูแลหลักหรือหมายเลขฉุกเฉิน | MUST |
| FR-SOS-004 | ระบบต้องขอตำแหน่งและส่งให้ผู้ดูแลเมื่อผู้ใช้ยินยอม | MUST |
| FR-SOS-005 | ระบบต้องสร้าง SOS Event พร้อมเวลา ผู้เริ่ม และสถานะ | MUST |
| FR-SOS-006 | ผู้ดูแลที่มีสิทธิ์ต้องได้รับ In-app/Web Push ตามความพร้อม | MUST |
| FR-SOS-007 | ผู้ใช้ต้องยุติเหตุการณ์และระบุว่าปลอดภัยแล้วได้ | MUST |
| FR-SOS-008 | ระบบต้องแสดงชัดเจนว่าไม่ใช่บริการฉุกเฉิน | MUST |
| FR-SOS-009 | หน้าข้อมูลฉุกเฉินต้องแสดงเฉพาะข้อมูลที่ผู้ป่วยอนุญาต | MUST |
| FR-SOS-010 | ระบบต้องสร้าง QR/ลิงก์ข้อมูลฉุกเฉินแบบ Scope จำกัดได้ | SHOULD |

## 5.15 Dashboard

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-DASH-001 | Dashboard ผู้ป่วยต้องแสดงยารอบถัดไป นัดถัดไป งานวันนี้ ค่าล่าสุด Quick Capture และ SOS | MUST |
| FR-DASH-002 | Dashboard ผู้ดูแลต้องเลือกผู้ป่วยและดูนัด พลาดยา งานค้าง และ SOS ได้ | MUST |
| FR-DASH-003 | Dashboard ต้องแสดงสถานะ Offline และรายการรอ Sync | MUST |
| FR-DASH-004 | ข้อมูลต้องเรียงตามความเร่งด่วนและไม่แสดง PHI เกินจำเป็น | MUST |
| FR-DASH-005 | Dashboard ต้องรองรับโหมดตัวอักษรใหญ่ | MUST |

## 5.16 รายงานและการแชร์

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-RPT-001 | ผู้ใช้ต้องสร้างรายงานช่วง 7 วัน 30 วัน 3 เดือน หรือกำหนดเองได้ | MUST |
| FR-RPT-002 | ผู้ใช้ต้องเลือกหมวดข้อมูลที่จะรวมในรายงาน | MUST |
| FR-RPT-003 | ระบบต้องสร้าง PDF ที่อ่านได้บนมือถือและพิมพ์ได้ | MUST |
| FR-RPT-004 | รายงานต้องระบุเวลาสร้าง ช่วงข้อมูล และผู้สร้าง | MUST |
| FR-RPT-005 | ผู้ใช้ต้องสร้าง Share Link ที่มีวันหมดอายุและ Scope ได้ | MUST |
| FR-RPT-006 | ผู้ใช้ต้องเพิกถอน Share Link ได้ทันที | MUST |
| FR-RPT-007 | ระบบต้อง Audit การเปิด ดาวน์โหลด และเพิกถอน Share Link | MUST |
| FR-RPT-008 | ระบบต้องป้องกันการเดา Token และไม่เก็บ Token แบบ Plain Text | MUST |
| FR-RPT-009 | ระบบควรสร้าง QR Code จาก Share Link ได้ | SHOULD |

## 5.17 Consent, Privacy และ Audit

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-CONSENT-001 | ระบบต้องเก็บ Consent แยกตามวัตถุประสงค์และเวอร์ชัน | MUST |
| FR-CONSENT-002 | ผู้ใช้ต้องถอน Consent ที่ถอนได้โดยไม่กระทบข้อกำหนดทางกฎหมาย | MUST |
| FR-CONSENT-003 | ระบบต้องเก็บประวัติ Consent แบบแก้ย้อนหลังไม่ได้ | MUST |
| FR-AUDIT-001 | ระบบต้องบันทึกการอ่าน แก้ไข ดาวน์โหลด แชร์ และลบข้อมูลสำคัญ | MUST |
| FR-AUDIT-002 | Audit Log ต้องมี Actor, Action, Resource, Patient, Timestamp, Result และ Metadata ที่จำเป็น | MUST |
| FR-AUDIT-003 | Audit Log ต้องไม่เก็บข้อมูลสุขภาพละเอียดเกินจำเป็น | MUST |
| FR-AUDIT-004 | ผู้ป่วยควรดูประวัติการเข้าถึงข้อมูลของผู้ดูแลและ Share Link ได้ | SHOULD |
| FR-AUDIT-005 | Audit Log ต้องป้องกันการแก้ไขโดยผู้ใช้ทั่วไป | MUST |

## 5.18 AI, OCR และ Background Jobs

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-AI-001 | ทุกงาน AI ต้องมี Job ID, Type, Status, Provider, Model/Version, Created At และ Error | MUST |
| FR-AI-002 | สถานะ Job ต้องรองรับ queued, processing, needs_review, completed, failed, cancelled | MUST |
| FR-AI-003 | ระบบต้องลบหรือปกปิดข้อมูลที่ไม่จำเป็นก่อนส่ง Provider เมื่อทำได้ | MUST |
| FR-AI-004 | ระบบต้องไม่ใช้ข้อมูลผู้ใช้ฝึกโมเดลโดยไม่มี Consent | MUST |
| FR-AI-005 | ผล AI ต้องระบุแหล่งที่มาและระดับความมั่นใจถ้ามี | MUST |
| FR-AI-006 | ผล AI ที่เปลี่ยนข้อมูลทางการแพทย์ต้องผ่าน Human Confirmation | MUST |
| FR-AI-007 | ระบบต้องรองรับ Retry แบบจำกัดและ Dead-letter Handling | MUST |
| FR-AI-008 | Provider Failure ต้องไม่ทำให้ข้อมูลต้นฉบับสูญหาย | MUST |

## 5.19 Doctor Lite Portal

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-DOC-001 | แพทย์ต้องเข้าถึงข้อมูลเฉพาะผู้ป่วยที่แชร์หรืออยู่ในโครงการที่อนุญาต | MUST |
| FR-DOC-002 | Portal ต้องแสดงรายงาน ค่าข้อมูลสุขภาพ ยา เช็กลิสต์ และคำถามตาม Scope | MUST |
| FR-DOC-003 | การเข้าถึงต้องมี MFA หรือมาตรการเทียบเท่า | MUST |
| FR-DOC-004 | ทุกการเปิดข้อมูลผู้ป่วยต้องมี Audit Log | MUST |
| FR-DOC-005 | Doctor Lite Portal ไม่ต้องรองรับการสั่งยาอิเล็กทรอนิกส์ใน MVP | MUST |

## 5.20 Admin และ Support

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-ADMIN-001 | Admin ต้องค้นหาบัญชีด้วยข้อมูลขั้นต่ำและไม่เห็น PHI โดยอัตโนมัติ | MUST |
| FR-ADMIN-002 | Admin ต้องระงับบัญชี เพิกถอน Session และดูสถานะระบบได้ | MUST |
| FR-ADMIN-003 | Security Auditor ต้องค้น Audit Log ตามช่วงเวลา Actor และ Resource ได้ | MUST |
| FR-ADMIN-004 | การเข้าถึงข้อมูลเพื่อ Support ต้องใช้ Break-glass Process และบันทึกเหตุผล | SHOULD |
| FR-ADMIN-005 | ระบบต้องแยกสิทธิ์ Admin, Support และ Auditor | MUST |

## 5.21 PWA, Offline และ Sync

| ID | ข้อกำหนด | Priority |
|---|---|---|
| FR-PWA-001 | ระบบต้องมี Web App Manifest ที่ถูกต้อง | MUST |
| FR-PWA-002 | ระบบต้องมี Service Worker และ Offline Fallback | MUST |
| FR-PWA-003 | ระบบต้องรองรับการติดตั้ง PWA เมื่อ Browser รองรับ | MUST |
| FR-PWA-004 | ระบบต้อง Cache เฉพาะ App Shell และข้อมูลที่ผ่านนโยบาย | MUST |
| FR-PWA-005 | ระบบต้องใช้ IndexedDB สำหรับ Offline Store และ Sync Queue | MUST |
| FR-PWA-006 | ระบบต้องแสดง Online/Offline/Syncing/Sync Failed | MUST |
| FR-PWA-007 | Offline Action ต้องมี Client Mutation ID เพื่อป้องกันข้อมูลซ้ำ | MUST |
| FR-PWA-008 | ระบบต้อง Sync อัตโนมัติเมื่อกลับ Online เมื่อทำได้ และมีปุ่ม Sync เอง | MUST |
| FR-PWA-009 | ระบบต้องจัดการ Conflict ตามกติกาของแต่ละ Entity | MUST |
| FR-PWA-010 | Logout ต้องล้างข้อมูล Offline ที่ผูกกับบัญชีตามนโยบาย | MUST |
| FR-PWA-011 | ข้อมูลฉุกเฉิน Offline ต้องเป็น Opt-in และมีการป้องกันเหมาะสม | MUST |
| FR-PWA-012 | ระบบต้องเตือนผู้ใช้หาก Notification หรือ Background Capability ไม่พร้อม | MUST |

---

# 6. กฎทางธุรกิจ

| ID | กฎ |
|---|---|
| BR-001 | ผู้ป่วยเป็นเจ้าของข้อมูลสุขภาพของตน |
| BR-002 | Caregiver เข้าถึงข้อมูลได้เฉพาะ Permission ที่ Active และไม่หมดอายุ |
| BR-003 | ข้อมูลจาก OCR/STT/AI เป็น Draft จนได้รับการยืนยัน |
| BR-004 | การกด “กินแล้ว” เป็นข้อมูลรายงานโดยผู้ใช้ ไม่ใช่หลักฐานทางการแพทย์ |
| BR-005 | ระบบห้ามวินิจฉัย ปรับยา หรือสร้างคำสั่งรักษาใหม่ |
| BR-006 | การแก้ตารางยาไม่แก้ประวัติ Dose Event ที่เกิดแล้ว |
| BR-007 | นัดที่ยกเลิกต้องไม่ส่ง Notification ใหม่ แต่ต้องเก็บประวัติ |
| BR-008 | Share Link ต้องหมดอายุหรือถูกเพิกถอนได้ |
| BR-009 | SOS ต้องมีการยืนยันเพื่อลดการกดผิด เว้นแต่มีโหมด Accessibility ที่อนุมัติ |
| BR-010 | ข้อมูล Offline ต้องแยกตามบัญชีและผู้ป่วย |
| BR-011 | Server Time เป็นเวลามาตรฐานสำหรับ Audit และการตัดสินสถานะ |
| BR-012 | API Mutation สำคัญต้องรองรับ Idempotency |
| BR-013 | การลบข้อมูลสุขภาพใช้ Soft Delete ก่อน Physical Deletion ตาม Retention Policy |
| BR-014 | Admin Access ข้อมูลสุขภาพต้องเป็นเหตุพิเศษและตรวจสอบย้อนหลังได้ |
| BR-015 | การส่งข้อมูลไป Provider ภายนอกต้องอยู่ภายใต้ Consent และ Data Processing Agreement |

---

# 7. State Machines

## 7.1 Appointment Status

```text
DRAFT → UPCOMING → CONFIRMED → TRAVELLING → ARRIVED → WAITING → COMPLETED
               └→ RESCHEDULED
               └→ CANCELLED
UPCOMING/CONFIRMED → MISSED
```

กติกา

- `RESCHEDULED` ต้องเชื่อมกับนัดใหม่หรือ Revision ใหม่
- `CANCELLED`, `COMPLETED`, `MISSED` เป็น Terminal State สำหรับรอบนั้น
- การเปลี่ยนสถานะต้องเก็บผู้ดำเนินการและเวลา

## 7.2 Dose Event Status

```text
SCHEDULED → DUE → TAKEN
               ├→ SNOOZED → DUE
               ├→ SKIPPED
               ├→ MISSED
               └→ REPORTED_ISSUE
```

กติกา

- Dose Event หนึ่งรายการต้องมี Final Status ได้หนึ่งค่า
- การเรียกซ้ำด้วย Idempotency Key เดิมต้องคืนผลเดิม
- การแก้ไขหลัง Final Status ต้องเป็น Correction Event พร้อม Audit

## 7.3 AI Job Status

```text
QUEUED → PROCESSING → NEEDS_REVIEW → COMPLETED
                   └→ FAILED → RETRYING → PROCESSING
QUEUED/PROCESSING → CANCELLED
```

## 7.4 Share Link Status

```text
ACTIVE → EXPIRED
      └→ REVOKED
      └→ MAX_USAGE_REACHED
```

## 7.5 SOS Event Status

```text
INITIATED → CONFIRMED → NOTIFYING → ACTIVE → RESOLVED
                         └→ PARTIAL_FAILURE
INITIATED → CANCELLED
```

---

# 8. ข้อกำหนดข้อมูล

## 8.1 หลักการ Data Model

- ใช้ Application-generated ID
- ทุก Entity มี `id`, `schema_version`, `created_at`, `updated_at`, `created_by`, `updated_by`
- Entity สำคัญมี `version` สำหรับ Optimistic Concurrency
- ข้อมูลที่ลบมี `deleted_at`, `deleted_by`, `delete_reason`
- เวลาใน API ใช้ ISO 8601 UTC พร้อมเก็บ Time Zone ต้นทางเมื่อเกี่ยวข้อง
- Enum ต้องกำหนดใน Contract และรองรับค่า `unknown` เมื่ออ่านข้อมูลเวอร์ชันใหม่
- หลีกเลี่ยง Nested Object ลึกและ Array ที่เติบโตไม่จำกัด
- ความสัมพันธ์หลายต่อหลายใช้ Collection/Entity กลาง

## 8.2 Entity หลัก

### 8.2.1 Account และ Profile

| Entity | ฟิลด์สำคัญ |
|---|---|
| users | id, auth_provider_ids, email, phone, status, locale, roles, last_login_at |
| patient_profiles | id, user_id, display_name, birth_date, sex, blood_type, font_scale, elderly_mode |
| patient_conditions | id, patient_id, condition_code, name, note, diagnosed_at, status |
| patient_allergies | id, patient_id, type, substance, reaction, severity, note |
| emergency_contacts | id, patient_id, name, relation, phone, priority, can_receive_sos |
| healthcare_facilities | id, name, address, phone, latitude, longitude |
| patient_facility_profiles | id, patient_id, facility_id, patient_number, care_right, doctor_name |

### 8.2.2 Caregiver

| Entity | ฟิลด์สำคัญ |
|---|---|
| caregiver_invitations | id, patient_id, invited_by, channel, target_hash, token_hash, expires_at, status |
| caregiver_relationships | id, patient_id, caregiver_user_id, status, is_primary, expires_at |
| caregiver_permissions | id, relationship_id, permission_code, allowed |

### 8.2.3 Appointment

| Entity | ฟิลด์สำคัญ |
|---|---|
| appointments | id, patient_id, start_at, timezone, facility_id/name, department, doctor_name, purpose, status, version |
| appointment_preparations | id, appointment_id, text, category, is_completed |
| appointment_documents | id, appointment_id, document_id, type |
| appointment_status_history | id, appointment_id, from_status, to_status, changed_by, changed_at |
| appointment_reminders | id, appointment_id, offset_minutes, channel, status |
| doctor_visits | id, patient_id, appointment_id, started_at, completed_at, summary |

### 8.2.4 Medication

| Entity | ฟิลด์สำคัญ |
|---|---|
| medications | id, patient_id, name, generic_name, dosage_text, route, instruction, start_date, end_date, status |
| medication_images | id, medication_id, document_id, image_type |
| medication_schedules | id, medication_id, schedule_type, timezone, rule_json, effective_from, effective_to, version |
| medication_dose_events | id, patient_id, medication_id, schedule_id, scheduled_at, status, acted_at, acted_by, source |
| medication_event_corrections | id, dose_event_id, old_status, new_status, reason, corrected_by |

### 8.2.5 Health Measurement

| Entity | ฟิลด์สำคัญ |
|---|---|
| health_measurements | id, patient_id, type, value_json, unit, measured_at, context, source, recorded_by, version |
| health_thresholds | id, patient_id, type, lower_bound, upper_bound, set_by, effective_from |

`value_json` ต้องมี Schema ตาม Measurement Type และต้องมี Validator กลาง เพื่อรองรับ PostgreSQL JSONB หรือ MongoDB ในอนาคต

### 8.2.6 Document, Recording และ AI

| Entity | ฟิลด์สำคัญ |
|---|---|
| documents | id, patient_id, storage_key, mime_type, size, checksum, category, encryption_metadata, status |
| recordings | id, patient_id, storage_key, duration_seconds, consent_confirmed_at, related_type, related_id |
| transcripts | id, recording_id, language, text, segments_json, ai_job_id, review_status |
| ai_jobs | id, patient_id, type, provider, model_version, input_refs, status, confidence, error_code |
| extracted_fields | id, ai_job_id, field_name, value_json, confidence, review_status |

### 8.2.7 Checklist และ Question

| Entity | ฟิลด์สำคัญ |
|---|---|
| care_instructions | id, patient_id, source_type, source_id, text, authored_by, verified_by |
| checklists | id, patient_id, title, frequency_type, goal_json, start_date, end_date, status |
| checklist_items | id, checklist_id, text, sort_order |
| checklist_logs | id, checklist_id, item_id, target_date, status, completed_at, note, recorded_by |
| doctor_questions | id, patient_id, appointment_id, text, priority, category, status, answer_text |

### 8.2.8 Report, Share, Consent และ Audit

| Entity | ฟิลด์สำคัญ |
|---|---|
| reports | id, patient_id, period_start, period_end, scope_json, storage_key, status, generated_by |
| share_links | id, patient_id, resource_type, resource_id, token_hash, scope_json, expires_at, revoked_at |
| consents | id, user_id, patient_id, purpose_code, document_version, status, accepted_at, withdrawn_at |
| audit_logs | id, actor_id, patient_id, action, resource_type, resource_id, result, occurred_at, metadata_safe |
| notifications | id, recipient_user_id, patient_id, type, channel, scheduled_at, sent_at, status, payload_safe |
| push_subscriptions | id, user_id, endpoint_hash, encrypted_subscription, browser, status, last_seen_at |
| sos_events | id, patient_id, initiated_by, status, location_json, active_at, resolved_at |

## 8.3 Indexing Requirements

ระบบต้องมีดัชนีสำหรับ Query หลัก เช่น

- appointments: patient_id + start_at + status
- dose_events: patient_id + scheduled_at + status
- health_measurements: patient_id + type + measured_at
- caregiver_relationships: caregiver_user_id + status
- notifications: recipient_user_id + scheduled_at + status
- audit_logs: patient_id + occurred_at และ actor_id + occurred_at
- ai_jobs: status + created_at

ดัชนี Firestore ต้องถูกบันทึกเป็น Infrastructure as Code และมี Mapping สำหรับฐานข้อมูลเป้าหมายในอนาคต

## 8.4 Data Retention

- ข้อมูลสุขภาพเก็บตามนโยบายที่ได้รับอนุมัติและกฎหมายที่เกี่ยวข้อง
- ไฟล์ชั่วคราวจาก Upload/OCR ต้องลบภายในเวลาที่กำหนดเมื่อไม่ถูกผูกกับ Record
- Push Subscription ที่หมดอายุต้องถูกปิดใช้งาน
- Audit Log และ Consent ต้องเก็บตามระยะเวลาที่องค์กรกำหนดและไม่สั้นกว่าความจำเป็นทางกฎหมาย
- เมื่อผู้ใช้ขอลบบัญชี ระบบต้องทำ De-identification หรือ Physical Deletion ตามประเภทข้อมูลและข้อผูกพัน

---

# 9. API Specification ระดับระบบ

## 9.1 หลักการ API

- Base Path: `/api/v1`
- รูปแบบข้อมูล: JSON UTF-8
- Authentication: Bearer Token จาก Firebase Auth
- Authorization: ตรวจบน Server ทุก Request
- Mutation สำคัญใช้ `Idempotency-Key`
- ทุก Response มี `request_id`
- Pagination ใช้ Cursor ไม่ใช้ Offset สำหรับรายการขนาดใหญ่
- Error ใช้โครงสร้างมาตรฐานเดียวกัน
- API ห้ามเปิดเผยโครงสร้าง Firestore

## 9.2 Standard Response

```json
{
  "data": {},
  "meta": {
    "request_id": "req_...",
    "schema_version": 1
  }
}
```

## 9.3 Standard Error

```json
{
  "error": {
    "code": "APPOINTMENT_NOT_FOUND",
    "message": "ไม่พบนัดหมาย",
    "details": {},
    "retryable": false
  },
  "meta": {
    "request_id": "req_..."
  }
}
```

## 9.4 Error Codes กลาง

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `VALIDATION_ERROR`
- `RESOURCE_NOT_FOUND`
- `CONFLICT`
- `VERSION_CONFLICT`
- `IDEMPOTENCY_CONFLICT`
- `RATE_LIMITED`
- `PROVIDER_UNAVAILABLE`
- `UPLOAD_INCOMPLETE`
- `OFFLINE_SYNC_CONFLICT`
- `CONSENT_REQUIRED`
- `ACCOUNT_SUSPENDED`
- `INTERNAL_ERROR`

## 9.5 Endpoint Groups

### Authentication / Session

- `GET /me`
- `POST /sessions/revoke-all`
- `GET /consent-documents/current`
- `POST /consents`
- `POST /consents/{id}/withdraw`

### Patient Profile

- `POST /patients`
- `GET /patients/{patientId}`
- `PATCH /patients/{patientId}`
- `GET /patients/{patientId}/conditions`
- `POST /patients/{patientId}/conditions`
- `GET /patients/{patientId}/allergies`
- `POST /patients/{patientId}/allergies`
- `GET /patients/{patientId}/emergency-contacts`
- `POST /patients/{patientId}/emergency-contacts`

### Caregiver

- `POST /patients/{patientId}/caregiver-invitations`
- `POST /caregiver-invitations/{token}/accept`
- `GET /patients/{patientId}/caregivers`
- `PATCH /patients/{patientId}/caregivers/{relationshipId}`
- `DELETE /patients/{patientId}/caregivers/{relationshipId}`
- `GET /caregiver/patients`

### Appointments

- `GET /patients/{patientId}/appointments`
- `POST /patients/{patientId}/appointments`
- `GET /appointments/{appointmentId}`
- `PATCH /appointments/{appointmentId}`
- `POST /appointments/{appointmentId}/status-transitions`
- `POST /appointments/{appointmentId}/reminders`
- `POST /appointments/{appointmentId}/documents`

### Medications

- `GET /patients/{patientId}/medications`
- `POST /patients/{patientId}/medications`
- `GET /medications/{medicationId}`
- `PATCH /medications/{medicationId}`
- `POST /medications/{medicationId}/schedules`
- `GET /patients/{patientId}/dose-events`
- `POST /dose-events/{doseEventId}/actions`
- `POST /dose-events/{doseEventId}/corrections`

### Health Measurements

- `GET /patients/{patientId}/measurements`
- `POST /patients/{patientId}/measurements`
- `PATCH /measurements/{measurementId}`
- `DELETE /measurements/{measurementId}`
- `GET /patients/{patientId}/measurement-summary`

### Upload, OCR และ STT

- `POST /uploads/initiate`
- `POST /uploads/{uploadId}/complete`
- `POST /patients/{patientId}/ocr-jobs`
- `POST /patients/{patientId}/recordings`
- `POST /recordings/{recordingId}/transcription-jobs`
- `GET /ai-jobs/{jobId}`
- `POST /ai-jobs/{jobId}/review`

### Checklist และ Questions

- `GET /patients/{patientId}/checklists`
- `POST /patients/{patientId}/checklists`
- `PATCH /checklists/{checklistId}`
- `POST /checklists/{checklistId}/logs`
- `GET /patients/{patientId}/questions`
- `POST /patients/{patientId}/questions`
- `PATCH /questions/{questionId}`

### Report และ Sharing

- `POST /patients/{patientId}/reports`
- `GET /reports/{reportId}`
- `POST /reports/{reportId}/share-links`
- `DELETE /share-links/{shareLinkId}`
- `GET /shared/{token}`

### Notification และ PWA

- `POST /push-subscriptions`
- `DELETE /push-subscriptions/{id}`
- `GET /notifications`
- `POST /notifications/{id}/read`
- `POST /sync/batch`

### SOS

- `POST /patients/{patientId}/sos-events`
- `PATCH /sos-events/{sosEventId}`
- `GET /patients/{patientId}/emergency-profile`

## 9.6 Batch Offline Sync

Request ต้องรองรับรายการ Mutation หลายรายการ

```json
{
  "device_id": "dev_...",
  "mutations": [
    {
      "client_mutation_id": "019...",
      "entity_type": "health_measurement",
      "operation": "create",
      "base_version": null,
      "payload": {}
    }
  ]
}
```

Response ต้องคืนผลรายรายการ ไม่ทำให้ Batch ทั้งหมดล้มเหลวเมื่อบางรายการผิด

```json
{
  "results": [
    {
      "client_mutation_id": "019...",
      "status": "applied",
      "server_id": "019...",
      "server_version": 1
    }
  ]
}
```

---

# 10. PWA และ Offline Requirements

## 10.1 Installability

- Manifest ต้องมี name, short_name, icons, theme_color, background_color, start_url, scope และ display
- ต้องรองรับ Safe Area และ Standalone Mode
- ระบบต้องมีหน้าแนะนำติดตั้ง PWA แบบไม่รบกวนผู้ใช้
- iOS ต้องแสดงคำแนะนำ Add to Home Screen เมื่อจำเป็น

## 10.2 Cache Strategy

| ประเภท | Strategy |
|---|---|
| Static App Shell | Cache First พร้อม Versioning |
| API ข้อมูลทั่วไปที่ไม่อ่อนไหว | Network First พร้อมอายุ Cache จำกัด |
| PHI | Network First และ Cache เฉพาะรายการที่จำเป็นตามนโยบาย |
| Image/Audio สุขภาพ | ไม่ Cache แบบสาธารณะ; ใช้ Signed URL อายุสั้นและ Storage ที่ควบคุม |
| Emergency Profile Offline | Opt-in, Minimized, Encrypted/Protected เท่าที่ Browser รองรับ |

## 10.3 Offline Capability Matrix

| ฟังก์ชัน | Offline |
|---|---|
| เปิด App Shell | รองรับ |
| ดูนัดและยาที่ซิงก์ล่าสุด | รองรับ |
| บันทึกสถานะ Dose Event | รองรับผ่าน Queue |
| บันทึกค่าสุขภาพ | รองรับผ่าน Queue |
| สร้างนัดแบบ Draft | รองรับผ่าน Queue |
| ถ่ายภาพ/บันทึกเสียงชั่วคราว | รองรับเมื่อ Browser อนุญาตและพื้นที่เพียงพอ |
| OCR/STT | ไม่ประมวลผล Offline; Queue เมื่อกลับ Online |
| สร้าง PDF | ไม่รองรับ Offline |
| Web Push | ขึ้นกับ Browser/OS |
| โทรผู้ติดต่อฉุกเฉิน | รองรับผ่าน `tel:` หากอุปกรณ์รองรับ |
| ส่งตำแหน่ง SOS | ต้อง Online เพื่อส่ง; โทรศัพท์ยังใช้ได้แยกจากระบบ |

## 10.4 Conflict Resolution

- Create: ใช้ `client_mutation_id` ป้องกันข้อมูลซ้ำ
- Update Profile/Appointment: Optimistic Concurrency ด้วย `version`
- Dose Event: First valid final action wins; การเปลี่ยนภายหลังเป็น Correction
- Measurement: Create ส่วนใหญ่ไม่มี Conflict; Update ใช้ Version
- Checklist Log: Merge ตาม `target_date + item_id` และเก็บ Correction
- หากแก้อัตโนมัติไม่ได้ ต้องแสดง Conflict UI ให้ผู้ใช้เลือก

## 10.5 Storage Quota

- ระบบต้องตรวจพื้นที่ว่างก่อนเก็บไฟล์ขนาดใหญ่ Offline
- ต้องแจ้งผู้ใช้เมื่อ Storage Quota ใกล้เต็ม
- ต้องล้าง Temporary Upload ที่ Sync สำเร็จแล้ว
- ห้ามล้างรายการที่ยังไม่ Sync โดยไม่แจ้งผู้ใช้

---

# 11. Notification Requirements

## 11.1 ช่องทาง MVP

1. In-app Notification — ช่องทางพื้นฐาน
2. Web Push — เมื่อ Browser/OS และสิทธิ์รองรับ
3. Email — สำหรับคำเชิญและเหตุการณ์บัญชีที่สำคัญ

SMS และ LINE เป็นระยะถัดไป เว้นแต่โครงการนำร่องกำหนดเพิ่มเติม

## 11.2 Scheduling

- เวลาแจ้งเตือนต้องคำนวณจาก Time Zone ของนัดหรือผู้ป่วย
- Scheduler ต้องสร้างงานแบบ Idempotent
- เมื่อข้อมูลต้นทางเปลี่ยน ต้องยกเลิกงานเดิม
- งานที่ส่งไม่สำเร็จต้อง Retry ตามประเภท Error
- ต้องไม่ส่งข้อมูลสุขภาพละเอียดในข้อความ Push บนหน้าจอล็อกโดยค่าเริ่มต้น

## 11.3 Notification Privacy

ค่าเริ่มต้นข้อความ Push ใช้ข้อความทั่วไป เช่น

> “ถึงเวลาตรวจสอบรายการดูแลสุขภาพของคุณ”

ผู้ใช้สามารถเลือกแสดงรายละเอียดเพิ่มเติมได้โดยเข้าใจความเสี่ยง

---

# 12. ความปลอดภัยและความเป็นส่วนตัว

## 12.1 Authentication และ Account Security

- ใช้ Firebase Authentication และตรวจ ID Token บน Backend
- Admin และ Doctor Lite ต้องใช้ MFA
- Token ที่ถูกเพิกถอนต้องถูกปฏิเสธ
- Sensitive Action ต้อง Re-authenticate เมื่อความเสี่ยงสูง
- Password Policy ใช้ความสามารถ Provider และป้องกันรหัสผ่านที่ถูกโจมตีเมื่อทำได้

## 12.2 Authorization

- Default Deny
- ตรวจสิทธิ์ทุก API Request ที่เข้าถึงข้อมูลผู้ป่วย
- ห้ามเชื่อถือ Role หรือ patient_id จาก Client โดยไม่ตรวจ Server
- ใช้ Permission Service กลาง
- เขียน Automated Authorization Tests ครอบคลุม Cross-patient Access

## 12.3 Data Protection

- ใช้ TLS/HTTPS ทุก Environment ที่ให้บริการ
- ข้อมูลใน Firestore และ Storage ใช้ Encryption at Rest ของ Platform
- Field ที่มีความละเอียดอ่อนสูงอาจใช้ Application-level Encryption เพิ่มเติม
- Secret เก็บใน Secret Manager ห้ามอยู่ใน Repository หรือ Frontend Bundle
- Signed URL ต้องมีอายุสั้นและ Scope จำกัด
- Token สำหรับ Invitation และ Share Link ต้องเก็บแบบ Hash

## 12.4 Web Security

- ป้องกัน XSS ด้วย Output Encoding และ Content Security Policy
- ป้องกัน CSRF ตามรูปแบบ Authentication ที่ใช้
- ตั้ง Security Headers เช่น HSTS, CSP, X-Content-Type-Options, Referrer-Policy และ Permissions-Policy
- จำกัด Camera, Microphone และ Geolocation เฉพาะ Origin ที่เชื่อถือ
- ห้ามใส่ PHI ใน URL Query, Analytics Event, Error Message หรือ Log
- ใช้ Dependency Scanning และ Software Bill of Materials

## 12.5 Firebase Security

- Frontend ไม่เข้าถึง Collection หลักโดยตรง หรือถ้าจำเป็นเฉพาะบางกรณีต้องมีกฎแคบและผ่าน Test
- Storage Rules ต้องตรวจ User, Patient Relationship, File Status และ Path
- ใช้ App Check เพื่อช่วยลด Abuse
- IAM ของ Service Account ใช้ Least Privilege
- Production Data Access ต้องจำกัดบุคลากรและมี Audit

## 12.6 PDPA และ Consent

- แจ้งวัตถุประสงค์การเก็บ ใช้ และเปิดเผยข้อมูลอย่างชัดเจน
- Consent แยกจาก Terms และถอนการยินยอมได้เมื่อกฎหมายอนุญาต
- รองรับ Data Access, Export, Correction และ Deletion Request
- Third-party Processor ต้องมี DPA และกำหนด Data Location/Retention
- ห้ามใช้ข้อมูลเพื่อโฆษณาหรือฝึกโมเดลโดยไม่ได้รับความยินยอมเฉพาะ

## 12.7 Audit และ Incident Response

- Security Event ต้องมี Alert ตามระดับความรุนแรง
- มี Incident Runbook สำหรับ Account Takeover, Data Exposure, Provider Breach และ Misconfiguration
- Audit Log ต้องเก็บแยกจาก Log ปฏิบัติการทั่วไป
- ต้องสามารถระบุขอบเขตผู้ได้รับผลกระทบจากเหตุการณ์ได้

---

# 13. ข้อกำหนดที่ไม่ใช่ฟังก์ชัน

## 13.1 Performance

| ID | เป้าหมาย |
|---|---|
| NFR-PERF-001 | หน้า Dashboard แสดง Skeleton ภายใน 1 วินาทีและข้อมูลหลักภายใน 3 วินาทีบนเครือข่ายปกติ |
| NFR-PERF-002 | API Read ทั่วไป P95 ไม่เกิน 800 ms ไม่รวม Provider ภายนอก |
| NFR-PERF-003 | API Mutation ทั่วไป P95 ไม่เกิน 1,000 ms |
| NFR-PERF-004 | การกดสถานะกินยาต้องตอบสนองใน UI ภายใน 300 ms ด้วย Optimistic UI |
| NFR-PERF-005 | รายการ 50 Records แรกต้องโหลดโดยไม่ต้องดึงข้อมูลทั้งหมด |
| NFR-PERF-006 | Upload ต้องรองรับ Resume หรือ Retry ตามขนาดและ Provider |

## 13.2 Availability และ Reliability

| ID | เป้าหมาย |
|---|---|
| NFR-AVL-001 | Availability MVP เป้าหมายไม่น้อยกว่า 99.5% ต่อเดือน |
| NFR-AVL-002 | งาน Notification ต้องไม่สูญหายจากการ Retry หรือ Deploy |
| NFR-AVL-003 | Mutation สำคัญต้อง Idempotent |
| NFR-AVL-004 | ระบบต้อง Graceful Degradation เมื่อ OCR, STT หรือ Map Provider ล่ม |
| NFR-AVL-005 | ข้อมูลต้นฉบับต้องไม่สูญหายแม้งาน AI ล้มเหลว |

## 13.3 Scalability

- สถาปัตยกรรมต้องรองรับ Horizontal Scaling ของ API/Worker
- หลีกเลี่ยง Hot Document และ Counter ที่มีการเขียนพร้อมกันสูง
- Pagination และ Indexing ต้องรองรับข้อมูลผู้ป่วยหลายปี
- Scheduled Jobs ต้องแบ่ง Batch และ Retry ได้
- Multi-tenant Field ต้องเตรียมไว้สำหรับองค์กรในอนาคต

## 13.4 Accessibility

| ID | เป้าหมาย |
|---|---|
| NFR-A11Y-001 | UI เป้าหมายสอดคล้อง WCAG 2.2 ระดับ AA |
| NFR-A11Y-002 | Touch Target ขั้นต่ำประมาณ 44×44 CSS px |
| NFR-A11Y-003 | รองรับ Keyboard Navigation และ Visible Focus |
| NFR-A11Y-004 | รองรับ Screen Reader ด้วย Semantic HTML และ ARIA ที่จำเป็น |
| NFR-A11Y-005 | ไม่ใช้สีเป็นตัวบอกสถานะเพียงอย่างเดียว |
| NFR-A11Y-006 | รองรับ Font Scaling โดยไม่ตัดข้อความสำคัญ |
| NFR-A11Y-007 | ข้อความใช้ภาษาง่ายและมี Confirmation สำหรับงานเสี่ยง |

## 13.5 Compatibility

- รองรับ Browser หลักรุ่นที่กำหนดใน Browser Support Policy
- ทดสอบ Chrome/Android, Safari/iOS, Edge/Desktop และ Firefox/Desktop
- Capability Detection แทน User Agent Detection เมื่อทำได้
- Feature ที่ไม่รองรับต้องมี Fallback หรือข้อความชัดเจน

## 13.6 Maintainability

- Code Coverage ของ Domain Logic เป้าหมายไม่น้อยกว่า 80%
- ทุก Module ต้องมี Owner และ README
- API, Event และ Database Schema ต้องมี Version
- ใช้ Lint, Format, Type Check และ Test ใน CI
- ห้าม Merge เมื่อ Contract Test หรือ Security Test สำคัญล้มเหลว

## 13.7 Observability

- ทุก Request มี Correlation/Request ID
- Log เป็น Structured Log
- ห้าม Log PHI โดยไม่จำเป็น
- มี Metrics: error rate, latency, job backlog, notification failure, sync failure, OCR/STT success
- มี Alert สำหรับ Error Spike, Auth Abuse, Queue Backlog และ Provider Failure
- Dashboard ปฏิบัติการต้องแยก Development/Staging/Production

## 13.8 Localization

- ภาษาเริ่มต้นคือไทย
- ข้อความ UI ห้าม Hard-code ใน Component
- วันที่และเวลาต้องแสดงตาม Locale/Time Zone
- รูปแบบตัวเลขและหน่วยต้องสอดคล้อง Locale
- เตรียมโครงสร้างรองรับภาษาอังกฤษและภาษาระยะถัดไป

---

# 14. UX/UI Requirements

## 14.1 Mobile-first Navigation

Bottom Navigation บนมือถือประกอบด้วย

1. วันนี้
2. นัดหมาย
3. ยา
4. สุขภาพ
5. โปรไฟล์

Quick Capture เป็นปุ่มเด่นที่เข้าถึงง่าย และ SOS ต้องไม่ซ่อนเกินหนึ่งระดับ

## 14.2 Elderly-friendly

- ขนาดตัวอักษรพื้นฐานอ่านง่าย
- ปุ่มและ Form Control มีพื้นที่กดเพียงพอ
- ใช้ข้อความตรงไปตรงมา
- หลีกเลี่ยงเมนูซ้อนลึก
- แสดงผลสำเร็จ/ผิดพลาดทั้งข้อความ ไอคอน และสี
- งานสำคัญมี Confirmation และ Undo เมื่อเหมาะสม
- แสดงชื่อผู้ป่วยที่กำลังจัดการอย่างชัดเจนสำหรับผู้ดูแล

## 14.3 Form Behavior

- Validation ต้องแสดงใกล้ช่องข้อมูล
- รองรับ Draft และ Auto-save สำหรับแบบฟอร์มยาวเมื่อเหมาะสม
- ป้องกัน Double Submit
- ระบุหน่วยวัดและตัวอย่างข้อมูล
- วันที่/เวลาต้องรองรับการพิมพ์และเลือกจาก Control

## 14.4 Empty, Loading และ Error States

ทุกหน้าหลักต้องมี

- Loading State
- Empty State พร้อม Call to Action
- Recoverable Error พร้อมปุ่มลองใหม่
- Offline State
- Permission Denied State
- Expired Share Link State

---

# 15. Integration Requirements

## 15.1 OCR Provider

Adapter ต้องรองรับ

- ส่งภาพหรือ Reference ที่มีอายุจำกัด
- ระบุประเภทเอกสารและภาษา
- รับข้อความ Bounding Box และ Confidence เมื่อมี
- Timeout, Retry และ Cancellation
- Mapping ผลลัพธ์เป็น Canonical Extracted Fields

## 15.2 Speech-to-Text Provider

- รองรับภาษาไทย
- รองรับไฟล์เสียงตาม Format ที่กำหนด
- เก็บ Timestamp Segment เมื่อ Provider รองรับ
- มี Dictionary/Prompt สำหรับศัพท์ทางการแพทย์เมื่อเป็นไปได้
- ไม่ลบไฟล์ต้นฉบับเมื่อ Transcription ล้มเหลว

## 15.3 Map Provider

- Geocoding หรือเปิดแผนที่จากที่อยู่
- Directions/Estimated Travel Time ตามขอบเขต Provider
- ห้ามส่งข้อมูลสุขภาพไปกับคำขอ Map
- ต้องมี Fallback เป็น URL เปิดแอปแผนที่

## 15.4 Email/Push Provider

- Template ต้องแยกภาษาและ Version
- ห้ามใส่ PHI รายละเอียดสูงใน Subject หรือ Push Preview
- เก็บ Delivery Status เท่าที่ Provider รองรับ
- Unsubscribe ใช้กับข้อความที่ไม่จำเป็นทางระบบตามกฎหมาย

---

# 16. การจัดการข้อผิดพลาด

## 16.1 หลักการ

- ข้อความสำหรับผู้ใช้ต้องเข้าใจง่ายและไม่เปิดเผยข้อมูลภายใน
- Error ที่ Retry ได้ต้องมีปุ่มลองใหม่
- Validation Error ต้องชี้ช่องข้อมูล
- Provider Error ต้องแจ้งว่าข้อมูลต้นฉบับยังปลอดภัย
- Offline Error ต้องแยกจาก Server Error
- Error ทุกตัวต้องมี Request ID สำหรับ Support

## 16.2 ตัวอย่าง

| สถานการณ์ | พฤติกรรม |
|---|---|
| OCR อ่านไม่สำเร็จ | เก็บภาพไว้ ให้กรอกเอง และลองใหม่ได้ |
| Web Push ถูกปิด | แสดง In-app Reminder และวิธีเปิดสิทธิ์ |
| Sync Conflict | แสดงข้อมูลบนอุปกรณ์และ Server ให้เลือก |
| Share Link หมดอายุ | ไม่แสดงข้อมูลและแนะนำให้ขอลิงก์ใหม่ |
| Permission ถูกเพิกถอน | ปิดการเข้าถึงทันทีและกลับหน้ารายการ |
| Upload ขาดช่วง | Retry/Resume โดยไม่สร้างไฟล์ซ้ำ |

---

# 17. Analytics และ Product Metrics

## 17.1 หลักการ

- Analytics ต้องไม่เก็บ PHI หรือข้อความผู้ใช้
- ใช้ Anonymous/Pseudonymous Identifier เท่าที่จำเป็น
- Event Naming มี Version
- Consent Analytics แยกจาก Consent ด้านการรักษาและบริการหลัก

## 17.2 Event สำคัญ

- `account_created`
- `onboarding_completed`
- `appointment_created_manual`
- `appointment_created_from_ocr`
- `medication_created`
- `dose_event_actioned`
- `caregiver_invited`
- `caregiver_invitation_accepted`
- `measurement_recorded`
- `recording_uploaded`
- `transcription_completed`
- `checklist_completed`
- `report_generated`
- `share_link_created`
- `pwa_installed`
- `notification_permission_result`
- `offline_mutation_queued`
- `offline_sync_completed`
- `sos_initiated`

## 17.3 Metrics

- Activation Rate
- First Appointment Time
- First Medication Time
- Caregiver Invitation Rate
- Notification Permission Rate
- Dose Event Response Rate
- Appointment Confirmation Rate
- OCR Success/Correction Rate
- STT Success/Correction Rate
- Offline Sync Success Rate
- D7/D30 Retention
- Error-free Session Rate

---

# 18. Backup, Recovery และ Business Continuity

## 18.1 Backup

- Firestore ต้องมี Scheduled Export ตามนโยบาย
- Storage ต้องมี Versioning/Lifecycle ตามประเภทไฟล์
- Configuration และ Index ต้องอยู่ใน Version Control
- Secret ต้องสำรองผ่านกลไกที่ปลอดภัยและมี Rotation

## 18.2 Recovery Objectives

| รายการ | เป้าหมาย MVP |
|---|---|
| RPO | ไม่เกิน 24 ชั่วโมงสำหรับ Disaster ระดับ Platform Export; ธุรกรรมปกติใช้ Replication ของ Platform |
| RTO | ไม่เกิน 8 ชั่วโมงสำหรับเหตุร้ายแรงที่ต้องกู้ระบบ |
| Notification Queue | ต้องสามารถ Rebuild จากข้อมูลต้นทางได้ |
| Share Link | ต้องเพิกถอนทั้งหมดฉุกเฉินได้ |

## 18.3 Recovery Test

- ทดสอบ Restore อย่างน้อยทุก 6 เดือนหรือก่อน Pilot สำคัญ
- บันทึกผลและเวลาที่ใช้จริง
- ทดสอบการกู้ Index, Configuration และ Scheduled Jobs ด้วย

---

# 19. Testing Requirements

## 19.1 ระดับการทดสอบ

1. Unit Test
2. Component Test
3. API Integration Test
4. Repository Contract Test
5. Firebase Emulator Test
6. End-to-End Test
7. PWA/Offline Test
8. Browser Compatibility Test
9. Accessibility Test
10. Performance Test
11. Security Test
12. Backup/Restore Test
13. UAT กับผู้ป่วยและผู้ดูแล

## 19.2 Test Coverage สำคัญ

- ผู้ดูแล A ต้องไม่เห็นข้อมูลผู้ป่วย B
- Permission ที่เพิกถอนต้องมีผลทันที
- OCR/STT Result ต้องไม่เปลี่ยนข้อมูลจริงก่อนยืนยัน
- Dose Event ต้องไม่เกิดซ้ำจาก Retry
- การแก้ Schedule ต้องไม่แก้ History
- Offline Queue ต้องไม่สร้าง Measurement ซ้ำ
- Share Link หมดอายุ/เพิกถอนต้องเปิดไม่ได้
- Push Payload ต้องไม่เปิดเผย PHI เกินนโยบาย
- Logout ต้องล้าง Offline Data ตามนโยบาย
- SOS ต้องใช้งานได้แม้ Push บางช่องทางล้มเหลว โดยยังเสนอการโทร

## 19.3 Security Testing

- SAST, Dependency Scan และ Secret Scan ทุก Pull Request
- DAST บน Staging
- Authorization Matrix Test อัตโนมัติ
- Firestore/Storage Rules Test
- Penetration Test ก่อน Pilot ที่ใช้ข้อมูลจริง
- ทดสอบ OWASP Top 10 และ Abuse Cases ที่เกี่ยวข้อง

## 19.4 Accessibility Testing

- Automated Scan เป็น Baseline
- Manual Keyboard Test
- Screen Reader Test อย่างน้อยหนึ่งชุดบน Mobile และ Desktop
- Font Scaling และ Zoom Test
- Contrast และ Touch Target Review
- Usability Test กับผู้สูงอายุจริง

## 19.5 UAT Scenarios หลัก

1. ผู้ป่วยสมัครและสร้างโปรไฟล์
2. ถ่ายรูปใบนัด ตรวจ OCR และตั้งเตือน
3. เพิ่มยาและบันทึกกินแล้ว
4. พลาดยาและผู้ดูแลได้รับแจ้ง
5. บันทึกความดันและดูกราฟ
6. บันทึกเสียงและตรวจ Transcript
7. สร้างเช็กลิสต์และทำรายการ
8. เตรียมคำถามและใช้ Doctor Visit Mode
9. สร้าง PDF และ Share Link
10. ทำงาน Offline แล้ว Sync
11. เริ่มและยุติ SOS
12. เพิกถอนสิทธิ์ผู้ดูแล

---

# 20. DevOps และ CI/CD

## 20.1 Pipeline ขั้นต่ำ

1. Install Dependencies แบบ Lockfile
2. Lint
3. Format Check
4. Type Check
5. Unit Test
6. API Contract Test
7. Firebase Rules Test
8. Build PWA
9. Security/Dependency Scan
10. Deploy Preview หรือ Development
11. E2E บน Staging
12. Manual Approval สำหรับ Production

## 20.2 Deployment

- Production Deployment ต้องมี Release Notes และ Rollback Plan
- Database/Schema Migration ต้อง Backward Compatible เป็นอย่างน้อยหนึ่ง Release
- Feature Flag ใช้กับฟีเจอร์เสี่ยง เช่น OCR Provider ใหม่
- Service Worker Update ต้องไม่ทำให้ผู้ใช้ติด Version เก่าโดยไม่มีทาง Refresh
- Critical Fix ต้องสามารถ Rollback ได้

## 20.3 Configuration

- ใช้ Environment Variables และ Secret Manager
- ห้าม Commit Secret
- Configuration ที่ไม่ลับต้องมี Schema Validation
- Production Build ต้องปิด Debug Mode และ Source Map สาธารณะตามนโยบาย

---

# 21. แนวทางการย้ายฐานข้อมูล

## 21.1 เป้าหมาย

ระบบต้องสามารถย้ายจาก Firestore ไป PostgreSQL หรือ MongoDB โดยลดผลกระทบต่อ Frontend และ Business Logic

## 21.2 ชั้นที่ต้องแยก

```text
Domain Service
    ↓
Repository Interface
    ↓
Firestore Repository Adapter
    ↓
Firestore
```

ในอนาคตเพิ่ม

```text
PostgreSQL Repository Adapter
หรือ
MongoDB Repository Adapter
```

## 21.3 กติกา Portability

- Frontend ติดต่อ API เท่านั้น
- Domain Logic ห้ามใช้ Firestore Query API
- Persistence Mapping อยู่ใน Adapter
- Transaction Boundary ต้องนิยามเชิงธุรกิจ
- Query สำคัญต้องมี Repository Method ที่ชัดเจน
- ใช้ Canonical Schema และ Migration Script ที่ Versioned
- มี Data Export/Import Tool พร้อม Validation และ Reconciliation

## 21.4 Mapping ตัวอย่าง

| Canonical Entity | Firestore | PostgreSQL | MongoDB |
|---|---|---|---|
| appointments | collection | appointments table | appointments collection |
| caregiver_permissions | collection | caregiver_permissions table | embedded หรือ collection แยกตามขนาด |
| measurement value | map | JSONB + indexed columns | subdocument |
| audit_logs | append-only collection | partitioned append-only table | time-series/collection |

## 21.5 Migration Strategy ในอนาคต

1. Freeze Canonical Schema Version
2. Export Firestore เป็น Canonical JSONL
3. Validate Referential Integrity
4. Import ฐานข้อมูลเป้าหมาย
5. Dual-read หรือ Shadow-read เพื่อเปรียบเทียบ
6. Dual-write ชั่วคราวเฉพาะเมื่อจำเป็นและมี Outbox
7. Reconcile Count, Hash และ Sample Records
8. Switch Repository Adapter ผ่าน Feature Flag
9. Monitor และ Rollback ได้
10. ปิด Firestore Write หลังยืนยันเสถียร

---

# 22. Definition of Ready และ Definition of Done

## 22.1 Definition of Ready

Feature พร้อมพัฒนาเมื่อ

- มี Requirement ID
- มี User Flow หรือ Wireframe
- มี Acceptance Criteria
- มี API Contract หรือ Mock
- มี Data Fields และ Validation
- มี Permission Matrix
- มี Error/Empty/Loading/Offline State
- ระบุ Analytics Event
- ระบุ Security/Privacy Impact

## 22.2 Definition of Done

Feature เสร็จเมื่อ

- Code Review ผ่าน
- Unit/Integration/E2E Test ผ่าน
- Accessibility Checklist ผ่าน
- Security Requirement ผ่าน
- API Documentation อัปเดต
- Analytics และ Audit ทำงานตามกำหนด
- Error Handling และ Offline State ครบ
- QA/UAT Acceptance ผ่าน
- Monitoring และ Runbook ที่จำเป็นพร้อม

---

# 23. เกณฑ์ยอมรับ MVP ระดับระบบ

MVP ถือว่าพร้อม Pilot เมื่อครบทุกข้อ

1. ผู้ป่วยสมัครและสร้างโปรไฟล์ได้
2. ผู้ป่วยสร้างนัดด้วยตนเองและจาก OCR ได้
3. ข้อมูล OCR ต้องได้รับการยืนยันก่อนบันทึก
4. ระบบแจ้งเตือนนัดผ่าน In-app และ Web Push เมื่อรองรับ
5. ผู้ป่วยเพิ่มยา รูปยา และตารางยาได้
6. ผู้ป่วยบันทึกกินแล้ว ข้าม และเตือนภายหลังได้
7. ผู้ดูแลได้รับแจ้งเหตุพลาดยาตามสิทธิ์
8. ผู้ป่วยบันทึกน้ำหนัก ความดัน ชีพจร และน้ำตาลได้
9. ระบบแสดงกราฟพื้นฐานได้
10. ผู้ป่วยบันทึกเสียง อัปโหลด และตรวจ Transcript ได้
11. ผู้ป่วยสร้างและติดตามเช็กลิสต์ได้
12. ผู้ป่วยบันทึกคำถามและคำตอบจากแพทย์ได้
13. ผู้ใช้เปิดแผนที่และดูเวลาเดินทางโดยประมาณได้ตาม Provider
14. ผู้ใช้เริ่ม SOS โทรผู้ดูแล และส่งตำแหน่งได้เมื่อ Online
15. ผู้ป่วยสร้าง PDF และ Share Link ที่เพิกถอนได้
16. ผู้ป่วยเชิญ กำหนดสิทธิ์ และเพิกถอนผู้ดูแลได้
17. งานหลักที่กำหนดทำ Offline และ Sync ได้โดยไม่สร้างข้อมูลซ้ำ
18. PWA ติดตั้งได้บน Browser ที่รองรับ
19. ระบบผ่าน Authorization Test, Security Test และ Accessibility Test ขั้นพื้นฐาน
20. ระบบมี Backup, Monitoring, Alerting และ Incident Runbook
21. ผู้สูงอายุในกลุ่ม UAT ทำงานหลักได้ด้วยตนเองหรือความช่วยเหลือเพียงเล็กน้อย
22. ไม่พบช่องโหว่ระดับ Critical หรือ High ที่ยังไม่ได้รับการแก้ไขหรือยอมรับความเสี่ยงอย่างเป็นทางการ

---

# 24. Traceability Matrix

| PRD Capability | SRS Sections / Requirement IDs |
|---|---|
| สมัครและเข้าสู่ระบบ | FR-AUTH-* |
| โปรไฟล์ผู้ป่วย | FR-PROFILE-* |
| ผู้ดูแลและสิทธิ์ | FR-CARE-* |
| นัดหมายและ OCR | FR-APT-*, FR-AI-* |
| แจ้งเตือนนัด | FR-APTN-*, Notification Requirements |
| ยาและเตือนยา | FR-MED-* |
| ข้อมูลสุขภาพ | FR-HEALTH-* |
| บันทึกเสียง/STT | FR-REC-*, FR-AI-* |
| Quick Capture | FR-QC-* |
| เช็กลิสต์ | FR-CHK-* |
| คำถามแพทย์ | FR-QUES-* |
| โหมดพบแพทย์ | FR-VISIT-* |
| แผนที่ | FR-MAP-* |
| SOS/ข้อมูลฉุกเฉิน | FR-SOS-* |
| Dashboard | FR-DASH-* |
| รายงาน/แชร์ | FR-RPT-* |
| Consent/Audit | FR-CONSENT-*, FR-AUDIT-* |
| Doctor Lite | FR-DOC-* |
| PWA/Offline | FR-PWA-*, Section 10 |
| Security/Privacy | Section 12 |
| Firebase และการย้าย DB | Sections 3, 8, 21 |
| Frontend/Backend ขนานกัน | Section 3.4, Section 9 |

---

# 25. สิ่งที่ไม่รวมใน MVP

- Native Android App และ Native iOS App
- Biometric Login แบบ Native
- Widget และ Native Shortcut
- Native Background Service
- Bluetooth Medical Devices
- Apple Health และ Android Health Connect
- Real-time Traffic Tracking เต็มรูปแบบ
- Continuous Location Tracking นอก SOS
- Doctor Portal เต็มรูปแบบ
- Hospital Information System / EMR Integration
- FHIR Integration ใช้งานจริง
- Telemedicine
- Electronic Prescription
- AI Diagnosis หรือ Medication Recommendation
- Drug Interaction Checking ที่ใช้แทนเภสัชกร
- Insurance Claim และ Payment
- SMS/LINE Notification เป็นมาตรฐานทั่วไป เว้นแต่เพิ่มใน Pilot

---

# 26. ความเสี่ยงและแนวทางลดความเสี่ยง

| ความเสี่ยง | ผลกระทบ | แนวทางลดความเสี่ยง |
|---|---|---|
| Web Push ไม่สม่ำเสมอ | ผู้ใช้พลาดเตือน | In-app, Permission Check, Fallback และสื่อสารข้อจำกัด |
| Browser จำกัด Background Sync | Sync ช้า | Queue, Auto-sync เมื่อเปิดแอป, ปุ่ม Sync เอง |
| OCR/STT ผิด | ข้อมูลทางการแพทย์คลาดเคลื่อน | Human Review, Confidence, เก็บต้นฉบับ |
| ผู้สูงอายุใช้งานยาก | Adoption ต่ำ | Elderly Mode, Usability Test, Caregiver-assisted Setup |
| Firestore Lock-in | ต้นทุนย้ายระบบ | API-first, Repository, Canonical Schema, Export Tool |
| Permission ผิดพลาด | ข้อมูลรั่วไหล | Central Authorization, Automated Matrix Test, Audit |
| Offline Data บนอุปกรณ์ | ความเป็นส่วนตัว | Minimize, Opt-in, Clear on Logout, Device Guidance |
| Notification ซ้ำ | ผู้ใช้สับสน | Idempotency, Schedule Version, Cancellation Workflow |
| ค่าใช้จ่าย Provider สูง | ต้นทุนเกินแผน | Quota, Rate Limit, Async Job, Cost Metrics |
| SOS ส่งไม่สำเร็จ | ความเสี่ยงด้านความปลอดภัย | แสดงการโทรโดยตรง, Partial Failure UI, ไม่อ้างเป็นศูนย์ฉุกเฉิน |

---

# 27. ประเด็นที่ต้องตัดสินใจก่อนเริ่มพัฒนา

รายการนี้ไม่ขัดขวางการออกแบบระบบ แต่ต้องสรุปก่อน Production

1. Provider OCR และ STT ที่ผ่านการประเมินภาษาไทยและ PDPA
2. ช่องทาง OTP และค่าใช้จ่ายต่อข้อความ
3. Provider แผนที่และ Quota
4. ระยะเวลาเก็บไฟล์เสียง เอกสาร และ Audit Log
5. ข้อความ Consent และ Privacy Notice ฉบับกฎหมาย
6. Browser Support Policy แบบระบุเวอร์ชัน
7. ค่า Grace Period ของ Dose Event
8. รายละเอียดการแจ้งผู้ดูแลเมื่อไม่ยืนยันยา
9. ข้อมูลฉุกเฉินที่อนุญาตให้เก็บ Offline
10. ข้อกำหนด Data Residency ของโครงการนำร่อง
11. รูปแบบ Doctor Lite Portal และกระบวนการยืนยันตัวบุคลากร
12. เพดานขนาดไฟล์ภาพ/เสียงและ Quota ต่อบัญชี

---

# 28. ภาคผนวก A — ตัวอย่าง Acceptance Criteria

## AC-APT-OCR-001: สร้างนัดจากใบนัด

**Given** ผู้ป่วยเข้าสู่ระบบและอนุญาตกล้อง  
**When** ผู้ป่วยถ่ายภาพใบนัดและส่งประมวลผล  
**Then** ระบบต้องเก็บภาพต้นฉบับ สร้าง OCR Job และแสดงข้อมูลที่ตรวจพบในฟอร์ม Draft  
**And** ผู้ป่วยต้องแก้ไขและยืนยันก่อนสร้างนัด  
**And** ระบบต้องไม่สร้างนัดอัตโนมัติเมื่อ OCR เสร็จ

## AC-MED-DOSE-001: ยืนยันการกินยาแบบ Idempotent

**Given** Dose Event อยู่ในสถานะ DUE  
**When** Client ส่งคำขอ TAKEN ซ้ำด้วย Idempotency Key เดิม  
**Then** Server ต้องสร้างผลลัพธ์เพียงหนึ่งรายการ  
**And** คืนสถานะ TAKEN เดิมโดยไม่เพิ่ม Audit ซ้ำโดยไม่จำเป็น

## AC-OFFLINE-001: บันทึกความดัน Offline

**Given** ผู้ใช้ไม่มีอินเทอร์เน็ต  
**When** ผู้ใช้บันทึกความดันและกดบันทึก  
**Then** ระบบต้องแสดงว่าบันทึกไว้ในอุปกรณ์และรอ Sync  
**When** อุปกรณ์กลับ Online  
**Then** ระบบต้อง Sync ไป Server โดยไม่สร้างข้อมูลซ้ำ  
**And** แสดงสถานะสำเร็จ

## AC-CARE-REVOKE-001: เพิกถอนผู้ดูแล

**Given** ผู้ดูแลมีสิทธิ์ดูนัดของผู้ป่วย  
**When** ผู้ป่วยเพิกถอนความสัมพันธ์  
**Then** API Request ถัดไปของผู้ดูแลต้องถูกปฏิเสธ  
**And** Share/Cache ที่ควบคุมโดยระบบต้องหมดสิทธิ์ตามนโยบาย  
**And** ระบบต้องบันทึก Audit Log

## AC-SHARE-001: ลิงก์แชร์หมดอายุ

**Given** รายงานถูกแชร์ด้วยลิงก์หมดอายุ 24 ชั่วโมง  
**When** เปิดหลังเวลาหมดอายุ  
**Then** ระบบต้องไม่แสดงข้อมูลรายงาน  
**And** แสดงข้อความว่าลิงก์หมดอายุโดยไม่เปิดเผยข้อมูลผู้ป่วย

---

# 29. ภาคผนวก B — โครงสร้างโครงการแนะนำ

```text
/apps
  /web-pwa
  /api
  /workers
/packages
  /api-contract
  /domain
  /application
  /repository-interfaces
  /firebase-adapters
  /ui
  /validation
  /observability
  /test-fixtures
/infrastructure
  /firebase
  /indexes
  /security-rules
  /ci
/docs
  /architecture
  /api
  /runbooks
  /security
```

หลักการ

- `/domain` ไม่มี Dependency ต่อ Firebase หรือ Web Framework
- `/api-contract` สร้าง Client Types และ Mock ให้ Frontend
- `/firebase-adapters` เป็นจุดเดียวที่รู้โครงสร้าง Firestore
- `/web-pwa` ใช้ API Client ไม่ใช้ Firestore SDK สำหรับข้อมูล Domain หลัก
- Test Fixtures ใช้ Schema เดียวกับ API Contract

---

# 30. บทสรุป

SRS ฉบับนี้กำหนดให้หมอนัด MVP เป็น Web App แบบ Mobile-first PWA ที่มุ่งเน้นการใช้งานบนสมาร์ตโฟน รองรับผู้ป่วยและผู้ดูแลเป็นหลัก ใช้ Firebase เพื่อเร่งการพัฒนา แต่แยก Domain, API และ Persistence Adapter เพื่อให้ระบบขยายและย้ายไป PostgreSQL หรือ MongoDB ได้

ข้อกำหนดสำคัญที่สุดของระบบ ได้แก่

- ผู้ป่วยควบคุมข้อมูลและสิทธิ์การแชร์
- ข้อมูล OCR/STT/AI ต้องผ่านการตรวจสอบ
- การแจ้งเตือนและ Offline ต้องออกแบบตามข้อจำกัดจริงของ PWA
- Frontend และ Backend ต้องพัฒนาขนานกันผ่าน OpenAPI Contract
- ข้อมูลสุขภาพต้องได้รับการปกป้องด้วย Least Privilege, Audit และ Privacy by Design
- ทุกการทำงานสำคัญต้องทดสอบได้ ตรวจสอบย้อนหลังได้ และรองรับความผิดพลาดของเครือข่ายหรือ Provider ภายนอก

เอกสารนี้สามารถใช้เป็นฐานสำหรับจัดทำ Architecture Decision Records, API Specification, Database Schema, UX/UI Design, Test Plan, Security Plan, Sprint Backlog และเอกสารประมาณการโครงการต่อไป
