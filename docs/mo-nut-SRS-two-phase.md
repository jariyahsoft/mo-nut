# SOFTWARE REQUIREMENTS SPECIFICATION

# หมอนัด — Mo-nut

**ระบบผู้ช่วยดูแลสุขภาพสำหรับผู้ป่วยโรคเรื้อรัง ผู้ดูแล และบุคลากรทางการแพทย์**

---

## ข้อมูลเอกสาร

| รายการ | รายละเอียด |
| --- | --- |
| ชื่อระบบ | หมอนัด (Mo-nut) |
| ประเภทเอกสาร | Software Requirements Specification (SRS) |
| เอกสารต้นทาง | PRD เวอร์ชัน 1.2 — Two-phase Product Delivery |
| เวอร์ชัน SRS | 1.0 |
| วันที่จัดทำ | 24 มิถุนายน 2026 |
| Phase 1 | Mobile-first Progressive Web App (PWA) |
| Phase 2 | Cross-platform Mobile App สำหรับ Android/iOS พร้อม Web Portal เดิม |
| Backend เริ่มต้น | Firebase-based Backend โดยมี Application/API Layer คั่นกลาง |
| หลักการข้อมูล | Database-agnostic และรองรับการย้ายไป PostgreSQL หรือ MongoDB |
| ภาษาเริ่มต้น | ภาษาไทย |
| ระดับความลับ | ข้อมูลภายในโครงการและข้อมูลสุขภาพส่วนบุคคล |

## ประวัติการแก้ไข

| เวอร์ชัน | วันที่ | รายละเอียด | ผู้จัดทำ |
| --- | --- | --- | --- |
| 1.0 | 2026-06-24 | จัดทำ SRS ฉบับสมบูรณ์จาก PRD แบบ 2 เฟส | ทีมผลิตภัณฑ์/สถาปัตยกรรม |

## สารบัญ

> เอกสาร Markdown นี้ใช้หัวข้อแบบลำดับชั้น สามารถสร้างสารบัญอัตโนมัติด้วยเครื่องมือเอกสารหรือระบบ Git Repository ได้

---

# 1. บทนำ

## 1.1 วัตถุประสงค์

เอกสารนี้กำหนดข้อกำหนดซอฟต์แวร์ของระบบหมอนัด เพื่อเป็นข้อตกลงร่วมระหว่างเจ้าของผลิตภัณฑ์ ลูกค้า นักลงทุน นักออกแบบ นักพัฒนา ผู้ทดสอบ ผู้ดูแลระบบ และผู้ประเมินด้านความปลอดภัย โดยแปลงความต้องการระดับผลิตภัณฑ์จาก PRD ให้เป็นข้อกำหนดที่สามารถออกแบบ พัฒนา ทดสอบ ส่งมอบ และตรวจรับได้

SRS นี้ครอบคลุมการพัฒนา 2 เฟส โดยกำหนดให้ Phase 2 ต่อเนื่องจาก Phase 1 และใช้บัญชีผู้ใช้ Backend API กฎธุรกิจ Permission Model Consent Model Audit Log และข้อมูลชุดเดียวกัน

## 1.2 ขอบเขตระบบ

หมอนัดเป็น Health Companion และ Chronic Care Management Platform สำหรับช่วยผู้ป่วยจัดการนัดหมาย ตารางยา ข้อมูลสุขภาพ เอกสาร คำแนะนำจากแพทย์ เช็กลิสต์ คำถามก่อนพบแพทย์ การแชร์ข้อมูลกับผู้ดูแล และการขอความช่วยเหลือฉุกเฉิน

ระบบไม่ใช่เครื่องมือวินิจฉัยโรค ไม่ใช่อุปกรณ์การแพทย์โดยอัตโนมัติ ไม่สั่งยา ไม่เปลี่ยนยา และไม่รับประกันการส่งความช่วยเหลือฉุกเฉิน

## 1.3 ขอบเขตตามเฟส

| ประเด็น | Phase 1 — Mobile-first PWA | Phase 2 — Cross-platform Mobile App |
| --- | --- | --- |
| เป้าหมาย | เปิดใช้งานจริงเร็ว พิสูจน์ Core Journey และ Product–Market Fit | เพิ่ม Notification/Offline Reliability และความสามารถระดับอุปกรณ์ |
| Client หลัก | PWA บน Smartphone; Responsive บน Tablet/Desktop | Android/iOS Cross-platform App; คง PWA/Web Portal |
| การแจ้งเตือน | In-app, Web Push และช่องทางสำรองตามความสามารถ | Native Push, Local Notification และ Background Task |
| Offline | อ่าน Cache ที่อนุญาตและคิวคำสั่งพื้นฐาน | Offline-first พร้อม Local Database เข้ารหัสและ Conflict Handling |
| Device Integration | Camera, Microphone, File, Geolocation, Web Share | Biometric, Secure Storage, Widget, Deep Link, HealthKit/Health Connect, Bluetooth |
| ข้อมูล | Backend/API กลาง | ใช้ Backend/API และข้อมูลเดิมจาก Phase 1 |

## 1.4 กลุ่มผู้อ่าน

* Product Owner และ Business Analyst
* UX/UI Designer และ Accessibility Specialist
* Frontend PWA Team
* Mobile Application Team
* Backend/API Team
* Data/AI Integration Team
* QA, Security, DevOps และ Support Team
* ผู้แทนสถานพยาบาล ผู้ดูแล และผู้ประเมินด้านกฎหมาย/ความเป็นส่วนตัว

## 1.5 เอกสารอ้างอิง

* PRODUCT REQUIREMENTS DOCUMENT: หมอนัด — Mo-nut, Version 1.2 — Two-phase Product Delivery
* API Specification ของโครงการ ซึ่งต้องจัดทำในรูป OpenAPI 3.1 หรือมาตรฐานเทียบเท่า
* Data Dictionary, Threat Model, Privacy Impact Assessment และ Test Plan ที่จัดทำต่อจาก SRS นี้

## 1.6 คำศัพท์และคำย่อ

| คำ | ความหมาย |
| --- | --- |
| PWA | Progressive Web Application |
| PHI | ข้อมูลสุขภาพที่สามารถเชื่อมโยงกับบุคคล |
| PII | ข้อมูลส่วนบุคคลที่ระบุตัวบุคคลได้ |
| RBAC | Role-Based Access Control |
| ABAC | Attribute-Based Access Control |
| OCR | Optical Character Recognition |
| STT | Speech-to-Text |
| FCM | Firebase Cloud Messaging |
| RPO | ระยะเวลาข้อมูลที่ยอมให้สูญหายได้เมื่อกู้คืน |
| RTO | เวลาที่ต้องใช้เพื่อกู้บริการกลับมา |
| Idempotency | การส่งคำสั่งซ้ำแล้วไม่สร้างผลลัพธ์ซ้ำ |
| Canonical Model | แบบจำลองข้อมูลกลางที่ไม่ผูกกับฐานข้อมูลเฉพาะ |
| Doctor Lite | การเข้าถึงข้อมูลสรุปของผู้ป่วยตาม Consent โดยไม่ใช่ระบบ HIS เต็มรูปแบบ |

# 2. ภาพรวมระบบ

## 2.1 มุมมองผลิตภัณฑ์

ระบบประกอบด้วย Client Applications, API/Application Services, Domain Services, Integration Adapters และ Data Stores โดย Client ห้ามเข้าถึงฐานข้อมูลสำคัญโดยตรง ยกเว้นกรณีที่ผ่าน Security Rules และได้รับอนุมัติเป็นลายลักษณ์อักษรสำหรับข้อมูลที่มีความเสี่ยงต่ำ

Business Rule สำคัญ เช่น สิทธิ์การแชร์ การยืนยันยา การเลื่อนนัด การส่งแจ้งเตือนผู้ดูแล การสร้างลิงก์แชร์ และการบันทึก Audit Log ต้องทำงานใน Server-side Application Layer เพื่อให้ PWA และ Mobile App ใช้กฎเดียวกัน

## 2.2 ผู้ใช้งานและบทบาท

| บทบาท | คำอธิบาย | ขอบเขตหลัก |
| --- | --- | --- |
| Patient | เจ้าของข้อมูลสุขภาพ | จัดการข้อมูลตนเอง นัด ยา สุขภาพ เอกสาร Consent และ SOS |
| Caregiver | ผู้ดูแลที่ได้รับเชิญ | ดู/ช่วยบันทึกตามสิทธิ์ รับแจ้งเตือน และดูแลหลายผู้ป่วย |
| Clinician | แพทย์หรือบุคลากรทางการแพทย์ | เข้าถึงข้อมูลที่ผู้ป่วยอนุญาต บันทึกคำแนะนำ/เป้าหมายตามขอบเขต |
| Organization Staff | เจ้าหน้าที่สถานพยาบาล/โครงการนำร่อง | จัดการผู้ป่วยในองค์กรตามบทบาทและข้อตกลง |
| System Administrator | ผู้ดูแลแพลตฟอร์ม | ดูแลระบบ องค์กร เนื้อหา Incident และ Audit ตามสิทธิ์จำกัด |
| Support Operator | เจ้าหน้าที่ช่วยเหลือ | เข้าถึงข้อมูลขั้นต่ำตาม Ticket และต้องมี Audit/Approval |
| Service Account | บัญชีระบบ | ประมวลผลงาน Background, Notification, OCR และ Integration |

## 2.3 สมมติฐาน

* ผู้ใช้มี Smartphone หรือเข้าถึง Browser ที่รองรับขั้นต่ำตาม Support Matrix
* การแจ้งเตือนขึ้นกับสิทธิ์ของผู้ใช้ ระบบปฏิบัติการ Browser ผู้ให้บริการ Push และเครือข่าย
* OCR/STT/AI อาจผิดพลาด ผู้ใช้ต้องตรวจสอบข้อมูลก่อนยืนยัน
* ผู้ป่วยเป็นเจ้าของข้อมูลและเป็นผู้ให้/ถอน Consent เว้นแต่กฎหมายหรือผู้แทนโดยชอบธรรมกำหนดเป็นอย่างอื่น
* การโทรฉุกเฉินและการแชร์ตำแหน่งขึ้นกับอุปกรณ์ เครือข่าย และ Permission

## 2.4 ข้อจำกัด

* Phase 1 ไม่รับประกัน Web Push หรือ Background Sync บนทุก Browser/OS
* Phase 1 ไม่รวม Native App บน App Store/Google Play
* Phase 2 ต้องใช้ API Version ที่รองรับข้อมูลเดิมและห้ามบังคับผู้ใช้สร้างบัญชีใหม่
* ระบบต้องไม่วินิจฉัยโรคหรือแก้ไขคำสั่งแพทย์อัตโนมัติ
* การเชื่อม HIS, e-Prescription, Insurance Claim และ National Health Platform เป็น Backlog/โครงการแยก

## 2.5 หลักการออกแบบ

1. Mobile-first และ Elderly-friendly
2. Privacy by Design และ Least Privilege
3. Human Confirmation สำหรับข้อมูลจาก AI/OCR/STT
4. API-first และ Contract-first Development
5. Database-agnostic Domain Model
6. Offline-aware และ Idempotent Operation
7. Auditability สำหรับข้อมูลสุขภาพและสิทธิ์การเข้าถึง
8. Progressive Enhancement ใน PWA และ Graceful Degradation เมื่อ Device Capability ไม่พร้อม
9. Separation of Concerns เพื่อให้ Frontend/Backend/Mobile พัฒนาขนานกันได้

# 3. สถาปัตยกรรมระบบ

## 3.1 Logical Architecture

```text
PWA / Web Portal / Android-iOS App
            | HTTPS + OAuth/OIDC Token
        API Gateway / BFF
            |
 Application Services / Use Cases
            |
 Domain Model + Policy + Validation
            |
 Repositories / Integration Ports
     |          |          |
 Firebase   AI/OCR/STT   Map/Push/Email/SMS
 Adapters      Adapters        Adapters
```

Client ต้องพึ่งพา API Contract ไม่พึ่งพา Firestore Document Shape โดยตรง เพื่อให้สามารถเปลี่ยน Storage Adapter เป็น PostgreSQL หรือ MongoDB ได้

## 3.2 เทคโนโลยีอ้างอิงระยะแรก

| Layer | เทคโนโลยีอ้างอิง | ข้อกำหนด |
| --- | --- | --- |
| PWA/Web | Framework ที่รองรับ TypeScript, SSR/SPA, PWA และ Accessibility | Mobile-first, Service Worker, Responsive และไม่ฝัง Business Rule สำคัญใน UI |
| Mobile Phase 2 | Flutter หรือ React Native หรือ Framework ที่ผ่าน Architecture Review | Android/iOS Codebase ร่วม และ Native Bridge เท่าที่จำเป็น |
| Authentication | Firebase Authentication หรือ Identity Provider ที่รองรับ OIDC | Phone OTP, Email, Google, Apple, MFA ตามนโยบาย |
| API/Compute | Cloud Functions/Cloud Run หรือบริการเทียบเท่า | Stateless, Versioned, Observable และแยก Domain Module |
| Primary Store | Cloud Firestore ระยะแรก | เข้าถึงผ่าน Repository Adapter และ Canonical Schema |
| Object Storage | Cloud Storage for Firebase หรือ Object Storage เทียบเท่า | รูปภาพ เสียง PDF และต้นฉบับ OCR |
| Messaging | FCM, Web Push, Email/SMS/LINE Adapter ตาม Scope | มี Delivery Log และ Retry Policy |
| Monitoring | Cloud Logging, Error Reporting, Analytics, Crashlytics | ห้ามบันทึก PHI เกินจำเป็น |
| Security | App Check, IAM, Secret Manager, WAF/Rate Limit ตามความเหมาะสม | Environment แยกและ Secret Rotation |

## 3.3 โมดูลระบบ

| รหัส | โมดูล | ความรับผิดชอบ |
| --- | --- | --- |
| MOD-IAM | Identity & Access | Authentication, Session, Role, Permission, Device และ MFA |
| MOD-PAT | Patient Profile | ข้อมูลผู้ป่วย โรคประจำตัว แพ้ยา ผู้ติดต่อฉุกเฉิน |
| MOD-APT | Appointment | นัดหมาย สถานะ การเตรียมตัว และ Doctor Visit Mode |
| MOD-MED | Medication | รายการยา ตารางยา การยืนยัน และยาคงเหลือ |
| MOD-HLT | Health Record | ค่าสุขภาพ อาการ แนวโน้ม และ Threshold |
| MOD-CAR | Caregiver & Sharing | คำเชิญ Permission Consent และผู้ดูแลหลายคน |
| MOD-DOC | Document & Capture | ภาพเอกสาร OCR Audio STT และ Quick Capture |
| MOD-CHK | Checklist & Questions | คำแนะนำ งานติดตาม เป้าหมาย และคำถามแพทย์ |
| MOD-NOT | Notification | Schedule, Delivery, Escalation และ Preference |
| MOD-MAP | Map & Travel | สถานที่ เส้นทาง เวลาเดินทาง และ External Map |
| MOD-SOS | Emergency | SOS, Emergency Card, Contact และ Location Sharing |
| MOD-RPT | Report & Share | PDF, QR, Expiring Link และ Export |
| MOD-CMS | Health Content | บทความ แหล่งอ้างอิง การอนุมัติ และเผยแพร่ |
| MOD-AUDIT | Audit & Compliance | Audit Trail, Consent Evidence และ Data Request |
| MOD-ADM | Administration | ผู้ใช้ องค์กร Feature Flag Incident และ System Health |
| MOD-CLN | Clinician Access | Doctor Lite, Clinical Review และคำแนะนำตาม Consent |
| MOD-DASH | Dashboard & Read Model | สรุปข้อมูลตามบทบาทโดยไม่สร้าง Source of Truth ซ้ำ |
| MOD-SYN | Offline & Sync | Outbox, Retry, Conflict และ Reconciliation |

## 3.4 การแยก Environment

* Local/Developer: Emulator หรือ Sandbox Data เท่านั้น
* Development: สำหรับ Integration รายวัน
* Staging/UAT: Configuration ใกล้ Production และใช้ข้อมูลทดสอบที่ไม่ใช่ข้อมูลจริง
* Production: ข้อมูลจริง สิทธิ์จำกัด Monitoring และ Backup เต็มรูปแบบ
* แต่ละ Environment ต้องมี Project/Database/Bucket/Secret แยกกัน และห้ามใช้ Production Credential ในเครื่องนักพัฒนา

## 3.5 API Versioning

* Base path แนะนำ: `/api/v1`
* Breaking Change ต้องออก Major Version ใหม่หรือมี Compatibility Layer
* Mobile App ต้องส่ง `appVersion`, `platform`, `deviceId` แบบ Pseudonymous และ `apiVersion`
* API Deprecation ต้องประกาศล่วงหน้าและรองรับอย่างน้อยตาม Mobile Support Policy
* Response Error ต้องมี `code`, `message`, `correlationId`, `details` ที่ไม่เปิดเผยข้อมูลอ่อนไหว

# 4. ข้อกำหนดส่วนติดต่อภายนอก

## 4.1 User Interface

* Mobile-first Layout; ความกว้างอ้างอิงเริ่มต้น 360–430 CSS px
* Touch Target ไม่น้อยกว่า 44×44 CSS px หรือมาตรฐาน Accessibility ที่เข้มกว่า
* รองรับ Safe Area, Dynamic Text, Screen Reader, Keyboard Navigation และ Reduced Motion
* หน้าหลักต้องแสดงยารอบถัดไป นัดครั้งถัดไป งานวันนี้ Quick Capture และ SOS
* การกระทำที่เสี่ยง เช่น ลบข้อมูล ถอน Consent หยุดแชร์ หรือส่ง SOS ต้องมี Confirmation
* ข้อมูลจาก AI ต้องมีป้ายกำกับและหน้าตรวจสอบก่อนบันทึก

## 4.2 Device Interface

| ความสามารถ | Phase 1 | Phase 2 |
| --- | --- | --- |
| Camera/File | Web API + File Picker | Native Camera/File Picker |
| Microphone | MediaRecorder เมื่อรองรับ | Native Audio Recording |
| Location | Browser Geolocation แบบ Foreground | Foreground/Background ตาม Consent และ OS Policy |
| Notification | Web Push/In-app | Native Push + Local Notification |
| Authentication Device | Web Credential ตาม Browser | Biometric + Secure Storage |
| Health Platform | ไม่บังคับ | HealthKit/Health Connect ตาม Scope |
| Bluetooth | ไม่รวม | รองรับอุปกรณ์ที่อนุมัติตาม Scope |

## 4.3 External Services

* Identity Provider: Phone OTP, Email, Google, Apple
* OCR Provider และ Speech-to-Text Provider ผ่าน Adapter
* Map/Direction Provider ผ่าน Adapter
* Push, Email, SMS หรือ Messaging Provider ผ่าน Notification Adapter
* PDF/QR Generation Service
* HealthKit/Health Connect และ Bluetooth Device SDK ใน Phase 2
* ทุก Integration ต้องมี Timeout, Retry, Circuit Breaker หรือ Fallback ตามความสำคัญ

# 5. ข้อกำหนดเชิงฟังก์ชัน

รหัสข้อกำหนดใช้รูปแบบ `FR-<MODULE>-<NUMBER>` โดยระบุเฟสและลำดับความสำคัญ: Must, Should, Could

## 5.1 การสมัคร เข้าสู่ระบบ และ Session

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-AUTH-001 | ทั้งสอง | Must | ระบบต้องให้สมัคร/เข้าสู่ระบบด้วยหมายเลขโทรศัพท์และ OTP |
| FR-AUTH-002 | ทั้งสอง | Must | ระบบต้องรองรับอีเมลและรหัสผ่านหรือ Passwordless ตามนโยบาย |
| FR-AUTH-003 | ทั้งสอง | Must | ระบบต้องรองรับ Google Sign-In |
| FR-AUTH-004 | ทั้งสอง | Must | ระบบต้องรองรับ Sign in with Apple เมื่อใช้งานบน iOS หรือเมื่อข้อกำหนด Store บังคับ |
| FR-AUTH-005 | ทั้งสอง | Must | หนึ่งบัญชีต้องถือหลายบทบาทได้โดยแยกสิทธิ์ตามบริบท |
| FR-AUTH-006 | ทั้งสอง | Must | ระบบต้องตรวจสอบ Token และสถานะ Session ทุกคำขอที่ต้องยืนยันตัวตน |
| FR-AUTH-007 | ทั้งสอง | Must | ผู้ใช้ต้องสามารถออกจากระบบทุกอุปกรณ์หรือเพิกถอน Session รายอุปกรณ์ได้ |
| FR-AUTH-008 | Phase 2 | Must | Mobile App ต้องรองรับ Biometric Unlock โดยไม่ใช้ Biometric เป็น Credential หลักบน Server |
| FR-AUTH-009 | ทั้งสอง | Should | ระบบต้องรองรับ MFA สำหรับบัญชีเสี่ยงสูง ผู้ดูแลระบบ และบุคลากรองค์กร |
| FR-AUTH-010 | ทั้งสอง | Must | ระบบต้อง Rate Limit OTP/Login และป้องกัน Account Enumeration |
| FR-AUTH-011 | ทั้งสอง | Must | ระบบต้องบันทึก Security Event เช่น Login ล้มเหลว อุปกรณ์ใหม่ และการเพิกถอน Session |
| FR-AUTH-012 | ทั้งสอง | Must | ระบบต้องมี Account Recovery ที่ยืนยันตัวตนตามระดับความเสี่ยง |

## 5.2 โปรไฟล์ผู้ป่วยและข้อมูลฉุกเฉิน

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-PROF-001 | ทั้งสอง | Must | ผู้ป่วยต้องสร้างและแก้ไขโปรไฟล์พื้นฐานได้ |
| FR-PROF-002 | ทั้งสอง | Must | ระบบต้องเก็บโรคประจำตัว ประวัติแพ้ยา แพ้อาหาร กรุ๊ปเลือด และผู้ติดต่อฉุกเฉิน |
| FR-PROF-003 | ทั้งสอง | Must | ผู้ป่วยหนึ่งคนต้องเชื่อมหลายสถานพยาบาลและหมายเลขผู้ป่วยได้ |
| FR-PROF-004 | ทั้งสอง | Must | ผู้ใช้ต้องเลือกภาษา ขนาดตัวอักษร และ Accessibility Preference ได้ |
| FR-PROF-005 | ทั้งสอง | Must | ข้อมูลอายุที่แสดงต้องคำนวณจากวันเกิดและไม่เก็บเป็นแหล่งความจริงซ้ำซ้อน |
| FR-PROF-006 | ทั้งสอง | Must | ผู้ใช้ต้องเลือกข้อมูลที่เปิดเผยใน Emergency Card/QR ได้ |
| FR-PROF-007 | ทั้งสอง | Should | ระบบต้องรองรับผู้แทนโดยชอบธรรมและความสัมพันธ์ตามนโยบายองค์กร |
| FR-PROF-008 | ทั้งสอง | Must | ทุกการเปลี่ยนข้อมูลสำคัญต้องบันทึกผู้แก้ไข เวลา และแหล่งที่มา |

## 5.3 นัดหมายและโหมดไปพบแพทย์

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-APT-001 | ทั้งสอง | Must | ผู้ใช้ต้องสร้าง แก้ไข เลื่อน ยกเลิก และดูนัดหมายได้ |
| FR-APT-002 | ทั้งสอง | Must | นัดหมายต้องรองรับวันเวลา Time Zone สถานพยาบาล แผนก อาคาร ห้อง แพทย์ และหมายเหตุ |
| FR-APT-003 | ทั้งสอง | Must | ระบบต้องรองรับสถานะ upcoming, confirmed, traveling, arrived, waiting, completed, rescheduled, cancelled, missed |
| FR-APT-004 | ทั้งสอง | Must | ผู้ใช้ต้องกำหนดสิ่งที่ต้องเตรียม เอกสาร และการงดน้ำ/อาหารได้ |
| FR-APT-005 | ทั้งสอง | Must | ผู้ใช้ต้องเชื่อมผู้ดูแลที่รับผิดชอบการเดินทางกับนัดได้ |
| FR-APT-006 | ทั้งสอง | Must | ระบบต้องกำหนด Reminder หลายเวลาและช่องทางได้ |
| FR-APT-007 | ทั้งสอง | Must | ระบบต้องมี Doctor Visit Mode ที่รวมข้อมูลนัด คำถาม ยา รายงาน และ Quick Capture |
| FR-APT-008 | ทั้งสอง | Must | ข้อมูลหลังพบแพทย์ต้องเชื่อมกับ Appointment/Visit เดียวกัน |
| FR-APT-009 | ทั้งสอง | Should | ระบบต้องเพิ่มนัดลงปฏิทินอุปกรณ์เมื่อผู้ใช้อนุญาต |
| FR-APT-010 | ทั้งสอง | Must | การแก้ไขเวลานัดต้องสร้าง Notification Reschedule และ Audit Log |
| FR-APT-011 | ทั้งสอง | Must | ห้ามแก้ไขนัดจากผล OCR โดยไม่ผ่านการยืนยันของผู้ใช้ |
| FR-APT-012 | ทั้งสอง | Should | ระบบต้องตรวจจับนัดซ้ำและเตือนก่อนสร้างโดยไม่บล็อกกรณีที่ผู้ใช้ยืนยัน |

## 5.4 เอกสาร OCR และ Quick Capture

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-OCR-001 | ทั้งสอง | Must | ผู้ใช้ต้องถ่ายหรืออัปโหลดใบนัด ฉลากยา ใบสั่งยา ผลตรวจ และเอกสารสุขภาพได้ |
| FR-OCR-002 | ทั้งสอง | Must | ระบบต้องเก็บไฟล์ต้นฉบับและ Metadata ของเอกสาร |
| FR-OCR-003 | ทั้งสอง | Must | ระบบต้องส่งงาน OCR แบบ Asynchronous และแสดงสถานะ queued, processing, review, completed, failed |
| FR-OCR-004 | ทั้งสอง | Must | ผล OCR ต้องแสดง Field Confidence และให้ผู้ใช้แก้ไข/ยืนยัน |
| FR-OCR-005 | ทั้งสอง | Must | ระบบห้ามสร้างหรือแก้ไขนัด/ยาโดยอัตโนมัติก่อนผู้ใช้ยืนยัน |
| FR-OCR-006 | ทั้งสอง | Must | Quick Capture ต้องเข้าถึงจากหน้าหลักภายในหนึ่งการกระทำ |
| FR-OCR-007 | ทั้งสอง | Should | ระบบต้องลดขนาด/ปรับคุณภาพภาพก่อน Upload โดยรักษาความอ่านได้ |
| FR-OCR-008 | ทั้งสอง | Must | ไฟล์ชั่วคราวที่ยังไม่ยืนยันต้องมี Retention Policy และลบตามกำหนด |
| FR-OCR-009 | ทั้งสอง | Must | ผู้ใช้ต้อง Retry OCR หรือกรอกเองเมื่อ Provider ขัดข้อง |
| FR-OCR-010 | ทั้งสอง | Must | ต้องบันทึก Provider, Model/Version, เวลา และผลการยืนยันโดยไม่เก็บ Prompt ที่มี PHI เกินจำเป็น |

## 5.5 ผู้ดูแล Consent และการแชร์สิทธิ์

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-CAR-001 | ทั้งสอง | Must | ผู้ป่วยต้องเชิญผู้ดูแลด้วยโทรศัพท์ อีเมล QR หรือลิงก์ได้ตามช่องทางที่เปิดใช้ |
| FR-CAR-002 | ทั้งสอง | Must | คำเชิญต้องมีวันหมดอายุ ใช้ซ้ำไม่ได้หลังยอมรับ และเพิกถอนได้ |
| FR-CAR-003 | ทั้งสอง | Must | ผู้ป่วยต้องกำหนด Permission แยกตามหมวดข้อมูลและการกระทำ |
| FR-CAR-004 | ทั้งสอง | Must | ผู้ป่วยต้องกำหนดผู้ดูแลหลัก/สำรองและผู้ดูแลหลายคนได้ |
| FR-CAR-005 | ทั้งสอง | Must | ผู้ป่วยต้องระงับ ถอน หรือกำหนดวันหมดอายุสิทธิ์ได้ทันที |
| FR-CAR-006 | ทั้งสอง | Must | ระบบต้องบังคับ Permission ที่ Server ทุกครั้ง ไม่พึ่งการซ่อนปุ่มใน UI |
| FR-CAR-007 | ทั้งสอง | Must | ผู้ป่วยต้องดูประวัติการเข้าถึง ดาวน์โหลด แชร์ และแก้ไขข้อมูลได้ |
| FR-CAR-008 | ทั้งสอง | Must | Consent ต้องบันทึกเวอร์ชันข้อความ วัตถุประสงค์ เวลา ช่องทาง และหลักฐานการยอมรับ |
| FR-CAR-009 | ทั้งสอง | Must | เมื่อถอนสิทธิ์ Token/Link/Session ที่เกี่ยวข้องต้องถูกเพิกถอนตาม SLA |
| FR-CAR-010 | ทั้งสอง | Should | ผู้ดูแลต้องสลับผู้ป่วยที่ตนดูแลได้โดยมี Context ชัดเจนเพื่อป้องกันบันทึกผิดบุคคล |

## 5.6 ยา ตารางยา และ Medication Adherence

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-MED-001 | ทั้งสอง | Must | ผู้ใช้ต้องเพิ่มยาโดยกรอกเอง ถ่ายรูป หรือยืนยันจาก OCR ได้ |
| FR-MED-002 | ทั้งสอง | Must | รายการยาต้องรองรับชื่อยา ชื่อสามัญ รูป ลักษณะ ขนาด วิธีใช้ ช่วงเวลา และแหล่งที่มา |
| FR-MED-003 | ทั้งสอง | Must | ตารางยาต้องรองรับรายวัน หลายครั้งต่อวัน บางวัน ทุก N ชั่วโมง รายสัปดาห์ รายเดือน และตามอาการ |
| FR-MED-004 | ทั้งสอง | Must | ระบบต้องสร้าง Dose Occurrence จาก Schedule อย่างสม่ำเสมอและรองรับ Time Zone/DST |
| FR-MED-005 | ทั้งสอง | Must | ผู้ใช้ต้องตอบ กินแล้ว เตือนภายหลัง ข้าม หรือมีปัญหา/ผลข้างเคียง |
| FR-MED-006 | ทั้งสอง | Must | ระบบต้องบันทึกเวลาที่ควรกิน เวลาที่ตอบ สถานะ เหตุผล และผู้บันทึก |
| FR-MED-007 | ทั้งสอง | Must | ระบบห้ามเปลี่ยนสถานะเป็นกินแล้วอัตโนมัติเมื่อผู้ใช้ไม่ตอบ |
| FR-MED-008 | ทั้งสอง | Must | ระบบต้องป้องกัน Double Submission ด้วย Idempotency Key และ Dose Version |
| FR-MED-009 | ทั้งสอง | Must | เมื่อเกิน Grace Period ระบบต้อง Escalate ไปผู้ดูแลตาม Preference/Consent |
| FR-MED-010 | ทั้งสอง | Must | การเปลี่ยนตารางยาต้องไม่แก้ประวัติ Dose ที่เกิดขึ้นแล้วแบบเงียบ |
| FR-MED-011 | ทั้งสอง | Should | ระบบต้องคำนวณยาคงเหลือโดยประมาณและแจ้งเตือนยาใกล้หมด |
| FR-MED-012 | ทั้งสอง | Must | รายการยาต้องมีสถานะ active, paused, completed, cancelled และเหตุผลการเปลี่ยน |
| FR-MED-013 | ทั้งสอง | Must | ต้องแสดงคำเตือนว่าผู้ใช้ไม่ควรปรับยาโดยไม่ปรึกษาผู้เชี่ยวชาญ |
| FR-MED-014 | Phase 2 | Must | Local Notification ต้องทำงานสำหรับ Dose ที่ซิงก์แล้วตามข้อจำกัด OS |

## 5.7 ข้อมูลสุขภาพ อาการ และแนวโน้ม

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-HLT-001 | ทั้งสอง | Must | ผู้ใช้ต้องบันทึกน้ำหนัก ส่วนสูง ความดัน ชีพจร น้ำตาล อุณหภูมิ SpO2 รอบเอว และอาการได้ |
| FR-HLT-002 | ทั้งสอง | Must | Measurement ต้องเก็บค่า หน่วย เวลา Time Zone แหล่งที่มา บริบท และผู้บันทึก |
| FR-HLT-003 | ทั้งสอง | Must | ระบบต้องตรวจ Validation Range เพื่อป้องกันข้อมูลผิดรูปแบบ แต่ไม่วินิจฉัย |
| FR-HLT-004 | ทั้งสอง | Must | ระบบต้องแสดงรายการย้อนหลัง กราฟรายวัน/สัปดาห์/เดือน ค่าเฉลี่ย และแนวโน้ม |
| FR-HLT-005 | ทั้งสอง | Must | ผู้ใช้หรือบุคลากรที่ได้รับสิทธิ์ต้องกำหนด Threshold สำหรับแจ้งเตือนได้ |
| FR-HLT-006 | ทั้งสอง | Must | เมื่อค่าอยู่นอก Threshold ระบบต้องแนะนำให้วัดซ้ำ/ติดต่อผู้ดูแลหรือสถานพยาบาลตามข้อความที่อนุมัติ |
| FR-HLT-007 | ทั้งสอง | Must | ระบบห้ามวินิจฉัย เพิ่ม ลด หรือหยุดยาอัตโนมัติ |
| FR-HLT-008 | Phase 2 | Should | ระบบต้องนำเข้าข้อมูลจาก HealthKit/Health Connect เมื่อผู้ใช้ให้ Consent |
| FR-HLT-009 | Phase 2 | Could | ระบบต้องรองรับอุปกรณ์ Bluetooth ที่อยู่ใน Approved Device List |
| FR-HLT-010 | ทั้งสอง | Must | ข้อมูลนำเข้าต้องเก็บ Source, Device และ Deduplication Key |

## 5.8 เสียง Speech-to-Text และคำแนะนำ

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-STT-001 | ทั้งสอง | Must | ก่อนบันทึกเสียงต้องแสดงข้อความให้ผู้ใช้ยืนยันว่าได้รับอนุญาตจากผู้พูด |
| FR-STT-002 | ทั้งสอง | Must | ผู้ใช้ต้องเริ่ม หยุดชั่วคราว หยุด ตั้งชื่อ และเชื่อมเสียงกับนัด/ยาได้ |
| FR-STT-003 | ทั้งสอง | Must | ระบบต้องอัปโหลดและประมวลผล STT แบบ Asynchronous พร้อม Progress/Retry |
| FR-STT-004 | ทั้งสอง | Must | ระบบต้องเก็บเสียงต้นฉบับตาม Retention/Consent และให้ผู้ใช้ลบได้ |
| FR-STT-005 | ทั้งสอง | Must | ข้อความ STT ต้องแก้ไข ค้นหา และอ้างอิง Timestamp ในเสียงได้เมื่อ Provider รองรับ |
| FR-STT-006 | ทั้งสอง | Should | ระบบอาจสรุปประเด็น สร้าง Checklist และตรวจจับวันนัด/ยา |
| FR-STT-007 | ทั้งสอง | Must | ผลที่กระทบนัดหรือยาต้องผ่าน Human Confirmation ก่อนบันทึก |
| FR-STT-008 | ทั้งสอง | Must | ระบบต้องแสดงว่าข้อความหรือสรุปสร้างจาก AI และอาจมีข้อผิดพลาด |

## 5.9 เช็กลิสต์และคำถามสำหรับแพทย์

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-CHK-001 | ทั้งสอง | Must | ผู้ใช้ต้องสร้าง Checklist จากการกรอกเอง OCR หรือ STT ได้ |
| FR-CHK-002 | ทั้งสอง | Must | Checklist ต้องรองรับความถี่ วันเวลา เป้าหมาย วันเริ่ม/สิ้นสุด และผู้สร้าง |
| FR-CHK-003 | ทั้งสอง | Must | ผู้ใช้ต้องทำเครื่องหมายสำเร็จ ไม่สำเร็จ เหตุผล หมายเหตุ และแนบรูปได้ |
| FR-CHK-004 | ทั้งสอง | Must | ระบบต้องแสดงความคืบหน้า Streak และอัตราความสำเร็จโดยไม่ตีความเป็นผลการรักษา |
| FR-CHK-005 | ทั้งสอง | Must | ระบบห้ามแก้ไขคำแนะนำของแพทย์โดยอัตโนมัติ |
| FR-CHK-006 | ทั้งสอง | Must | ผู้ใช้ต้องบันทึกคำถามด้วยข้อความ เสียง รูป หรือจากเหตุการณ์สุขภาพได้ |
| FR-CHK-007 | ทั้งสอง | Must | คำถามต้องเชื่อมกับนัด จัดหมวด ความสำคัญ สถานะถามแล้ว และคำตอบ |
| FR-CHK-008 | ทั้งสอง | Must | วันนัดต้องแสดงคำถามทั้งหมดในมุมมองเดียวตามลำดับความสำคัญ |

## 5.10 การแจ้งเตือนและ Escalation

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-NOT-001 | ทั้งสอง | Must | ระบบต้องรองรับ Reminder นัด ยา Checklist ยาใกล้หมด และ Threshold |
| FR-NOT-002 | ทั้งสอง | Must | ผู้ใช้ต้องกำหนดช่องทาง เวลา Quiet Hours และระดับการเปิดเผยข้อความบน Lock Screen |
| FR-NOT-003 | ทั้งสอง | Must | ระบบต้องบันทึก scheduled, sent, delivered เมื่อทราบ, opened, actioned, failed และ suppressed |
| FR-NOT-004 | ทั้งสอง | Must | การส่งซ้ำต้องมี Deduplication และ Retry ด้วย Backoff |
| FR-NOT-005 | ทั้งสอง | Must | ระบบต้อง Escalate ไปผู้ดูแลเฉพาะเมื่อมี Permission และกติกาที่ผู้ป่วยกำหนด |
| FR-NOT-006 | Phase 1 | Must | PWA ต้องตรวจความสามารถ Web Push และแสดง Fallback เมื่อไม่รองรับ |
| FR-NOT-007 | Phase 2 | Must | Mobile App ต้องรองรับ Native Push และ Local Notification |
| FR-NOT-008 | Phase 2 | Must | Mobile App ต้องแจ้งผู้ใช้เมื่อ Notification ถูกปิดหรือ OS จำกัด Background |
| FR-NOT-009 | ทั้งสอง | Must | ระบบห้ามรับประกัน Delivery 100% และต้องมี In-app Upcoming List เป็นแหล่งสำรอง |
| FR-NOT-010 | ทั้งสอง | Should | ช่องทางสำรอง Email/SMS/LINE ต้องเปิดผ่าน Feature Flag และ Cost Control |

## 5.11 แผนที่ การเดินทาง และสถานที่

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-MAP-001 | ทั้งสอง | Must | ผู้ใช้ต้องเปิดตำแหน่งสถานพยาบาลและนำทางด้วย External Map ได้ |
| FR-MAP-002 | ทั้งสอง | Must | ระบบต้องเก็บพิกัด ที่อยู่ อาคาร ห้อง จุดจอดรถ และหมายเหตุการเดินทางได้ |
| FR-MAP-003 | ทั้งสอง | Should | ระบบต้องคำนวณเวลาแนะนำให้ออกเดินทางจากเวลานัด เวลาเดินทาง และ Buffer |
| FR-MAP-004 | ทั้งสอง | Should | ระบบต้องแสดงระยะทาง เวลาเดินทาง และรูปแบบการเดินทางเมื่อ Provider รองรับ |
| FR-MAP-005 | ทั้งสอง | Must | Location Permission ต้องขอเมื่อใช้ฟังก์ชันและอธิบายวัตถุประสงค์ |
| FR-MAP-006 | Phase 2 | Could | ระบบอาจรองรับ Background Location/Geofencing เมื่อผ่าน Privacy Review |
| FR-MAP-007 | ทั้งสอง | Must | ระบบต้องมี Fallback ให้เปิดแผนที่ภายนอกหรือโทรสถานพยาบาลเมื่อ Map API ขัดข้อง |

## 5.12 SOS และข้อมูลฉุกเฉิน

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-SOS-001 | ทั้งสอง | Must | ปุ่ม SOS ต้องเข้าถึงง่ายและใช้การกดค้างหรือยืนยันเพื่อป้องกันการกดผิด |
| FR-SOS-002 | ทั้งสอง | Must | ผู้ใช้ต้องเลือกโทรผู้ดูแล หมายเลขฉุกเฉิน ส่งข้อความ และส่งตำแหน่งตามความสามารถ |
| FR-SOS-003 | ทั้งสอง | Must | ระบบต้องแสดงสถานะการส่งสำเร็จ/ล้มเหลวและทางเลือกโทรโดยตรง |
| FR-SOS-004 | ทั้งสอง | Must | Emergency Payload ต้องมีเฉพาะข้อมูลที่ผู้ใช้อนุญาต |
| FR-SOS-005 | ทั้งสอง | Must | ระบบต้องบันทึกเหตุการณ์ SOS การยกเลิก และการแจ้งว่าปลอดภัยแล้ว |
| FR-SOS-006 | ทั้งสอง | Must | ระบบต้องแสดงชัดเจนว่า Mo-nut ไม่ใช่บริการการแพทย์ฉุกเฉิน |
| FR-SOS-007 | Phase 2 | Should | Mobile App อาจแชร์ตำแหน่งต่อเนื่องตามระยะเวลาที่ผู้ใช้กำหนดและ OS Policy |
| FR-SOS-008 | ทั้งสอง | Must | การยกเลิก SOS ต้องไม่ลบ Audit Log ของเหตุการณ์ |

## 5.13 รายงาน การส่งออก และลิงก์แชร์

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-RPT-001 | ทั้งสอง | Must | ผู้ใช้ต้องสร้างรายงาน 7 วัน 30 วัน 3 เดือน หรือช่วงกำหนดเองได้ |
| FR-RPT-002 | ทั้งสอง | Must | ผู้ใช้ต้องเลือกหมวดข้อมูลที่จะรวมในรายงาน |
| FR-RPT-003 | ทั้งสอง | Must | ระบบต้องสร้าง PDF ที่อ่านง่าย มีวันที่สร้าง Time Zone และ Disclaimer |
| FR-RPT-004 | ทั้งสอง | Must | ลิงก์แชร์ต้องมี Token แบบสุ่ม วันหมดอายุ Scope และเพิกถอนได้ |
| FR-RPT-005 | ทั้งสอง | Must | การเปิดลิงก์ ดาวน์โหลด และเพิกถอนต้องมี Audit Log |
| FR-RPT-006 | ทั้งสอง | Must | QR Code ต้องอ้างอิงลิงก์ที่ควบคุมสิทธิ์ ไม่ฝังข้อมูลสุขภาพจำนวนมากโดยตรง |
| FR-RPT-007 | ทั้งสอง | Must | ผู้ใช้ต้องร้องขอ Export ข้อมูลส่วนบุคคลในรูปแบบที่อ่านได้และ Machine-readable ตามนโยบาย |
| FR-RPT-008 | ทั้งสอง | Must | ระบบต้องป้องกัน Search Engine Indexing ของลิงก์แชร์และตั้ง Security Header ที่เหมาะสม |

## 5.14 เนื้อหาความรู้

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-CMS-001 | ทั้งสอง | Should | ระบบต้องแสดงบทความ/สื่อสุขภาพที่ผ่านการอนุมัติ |
| FR-CMS-002 | ทั้งสอง | Must | เนื้อหาทางการแพทย์ต้องมีผู้ตรวจ แหล่งที่มา วันที่ทบทวน และเวอร์ชัน |
| FR-CMS-003 | ทั้งสอง | Must | ระบบต้องรองรับ draft, review, approved, published, archived |
| FR-CMS-004 | ทั้งสอง | Must | เนื้อหาต้องแยกจากคำแนะนำเฉพาะบุคคลและมี Disclaimer |
| FR-CMS-005 | ทั้งสอง | Should | Admin ต้องกำหนดกลุ่มเป้าหมาย ภาษา และช่วงเวลาเผยแพร่ได้ |

## 5.15 ระบบผู้ดูแลและองค์กร

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-ADM-001 | ทั้งสอง | Must | Admin ต้องจัดการบัญชี สถานะผู้ใช้ องค์กร และบทบาทได้ตาม Least Privilege |
| FR-ADM-002 | ทั้งสอง | Must | การเข้าถึงข้อมูลผู้ป่วยโดย Admin/Support ต้องมีเหตุผล Ticket และ Audit |
| FR-ADM-003 | ทั้งสอง | Must | ระบบต้องรองรับ Feature Flag และ Configuration แยก Environment |
| FR-ADM-004 | ทั้งสอง | Must | Admin ต้องตรวจ Notification Failure, OCR Failure, Sync Failure และ Service Health ได้ |
| FR-ADM-005 | ทั้งสอง | Must | ระบบต้องรองรับ Incident Record และการเชื่อม Correlation ID |
| FR-ADM-006 | ทั้งสอง | Should | องค์กรต้องกำหนด Staff Role และขอบเขตผู้ป่วยตามโครงการนำร่องได้ |
| FR-ADM-007 | ทั้งสอง | Must | ห้าม Admin แก้ข้อมูลสุขภาพโดยตรงโดยไม่มี Use Case และ Audit ที่อนุมัติ |

## 5.16 Offline และการซิงก์

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-SYNC-001 | ทั้งสอง | Must | Client ต้องสร้าง Client-generated UUID และ Idempotency Key สำหรับคำสั่ง Offline ที่อนุญาต |
| FR-SYNC-002 | ทั้งสอง | Must | ระบบต้องมี Outbox Queue พร้อมสถานะ pending, syncing, synced, failed, conflict |
| FR-SYNC-003 | ทั้งสอง | Must | Server ต้องตรวจ Version/ETag/updatedAt ก่อนแก้ไขข้อมูลที่มีความเสี่ยง |
| FR-SYNC-004 | ทั้งสอง | Must | ข้อมูลนัด ยา Consent และ Permission ต้องไม่ใช้ Last-write-wins แบบเงียบเมื่อ Conflict |
| FR-SYNC-005 | ทั้งสอง | Must | ระบบต้องแสดง Conflict ให้ผู้ใช้เลือกหรือใช้กฎ Merge ที่อนุมัติราย Entity |
| FR-SYNC-006 | ทั้งสอง | Must | Retry ต้องใช้ Exponential Backoff และไม่สร้างข้อมูลซ้ำ |
| FR-SYNC-007 | Phase 1 | Must | PWA ต้อง Cache เฉพาะข้อมูลที่อนุมัติและมี Offline Fallback |
| FR-SYNC-008 | Phase 2 | Must | Mobile App ต้องใช้ Local Database เข้ารหัสและล้างข้อมูลเมื่อ Logout/Revoke ตาม Policy |
| FR-SYNC-009 | ทั้งสอง | Must | ระบบต้องแสดง Last Sync Time และจำนวนรายการรอซิงก์ |
| FR-SYNC-010 | ทั้งสอง | Must | ทุก Conflict Resolution ต้องมี Audit Log |

## 5.17 AI Governance และ Human Confirmation

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-AI-001 | ทั้งสอง | Must | ทุกผลลัพธ์ AI ต้องระบุแหล่งที่มา Provider/Model Version และสถานะการตรวจสอบ |
| FR-AI-002 | ทั้งสอง | Must | ระบบต้องไม่ใช้ AI วินิจฉัยโรค ปรับยา หรือสร้างคำสั่งรักษาใหม่ |
| FR-AI-003 | ทั้งสอง | Must | ระบบต้องเก็บต้นฉบับที่ใช้ตรวจสอบตาม Retention/Consent |
| FR-AI-004 | ทั้งสอง | Must | ข้อมูลต้องไม่ถูกนำไปฝึกโมเดลภายนอกโดยไม่มีฐานกฎหมายและ Consent ที่ชัดเจน |
| FR-AI-005 | ทั้งสอง | Must | Prompt/Response Logging ต้องปิดหรือ Redact PHI ตามนโยบาย |
| FR-AI-006 | ทั้งสอง | Must | เมื่อ AI Provider ขัดข้อง ผู้ใช้ต้องกรอกข้อมูลเองและไม่ถูกบล็อก Core Journey |
| FR-AI-007 | ทั้งสอง | Should | ระบบต้องเก็บ Accuracy Feedback หลังผู้ใช้แก้ผล OCR/STT เพื่อปรับปรุงคุณภาพโดยไม่เปิดเผยตัวตนเกินจำเป็น |

## 5.18 บุคลากรทางการแพทย์และ Doctor Lite

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-CLN-001 | Phase 1 | Must | บุคลากรทางการแพทย์ต้องเข้าถึงข้อมูลผู้ป่วยได้เฉพาะเมื่อมี Consent และ Scope ที่ยังมีผล |
| FR-CLN-002 | Phase 1 | Must | Doctor Lite ต้องแสดงข้อมูลสรุป นัด รายการยา ค่าสุขภาพ เช็กลิสต์ และคำถามตาม Scope ที่ผู้ป่วยอนุญาต |
| FR-CLN-003 | ทั้งสอง | Must | Clinician ต้องไม่เห็นผู้ป่วยนอก Organization/Consent Context ของตน |
| FR-CLN-004 | ทั้งสอง | Must | ระบบต้องบันทึก Audit เมื่อ Clinician เปิดดู ดาวน์โหลด เพิ่มคำแนะนำ หรือแก้ข้อมูลที่ได้รับอนุญาต |
| FR-CLN-005 | ทั้งสอง | Must | Clinician ต้องเพิ่มคำแนะนำ เป้าหมาย เช็กลิสต์ และนัดครั้งถัดไปได้เฉพาะสิทธิ์ที่ได้รับ |
| FR-CLN-006 | ทั้งสอง | Must | ข้อมูลที่ Clinician เพิ่มต้องระบุผู้สร้าง องค์กร ตำแหน่งวิชาชีพ เวลา และสถานะการยืนยัน |
| FR-CLN-007 | ทั้งสอง | Must | การแก้ไขรายการยาหรือคำแนะนำจาก Clinician ต้องมี Version/History และไม่ลบประวัติเดิมแบบเงียบ |
| FR-CLN-008 | Phase 2 | Should | ระบบควรรองรับ Workflow โครงการนำร่องที่ Clinician ดูรายชื่อผู้ป่วยที่อนุญาตและผู้ป่วยที่มีนัดวันนี้ |
| FR-CLN-009 | ทั้งสอง | Must | Doctor Lite ต้องแสดง Disclaimer ว่าไม่ใช่ระบบเวชระเบียนหลักของสถานพยาบาล |
| FR-CLN-010 | ทั้งสอง | Must | เมื่อ Consent หมดอายุหรือถูกถอน Clinician ต้องสูญเสียการเข้าถึงใหม่ตาม SLA และลิงก์/Session ที่เกี่ยวข้องต้องถูกเพิกถอน |

## 5.19 Dashboard และ Read Model ตามบทบาท

| รหัส | เฟส | ลำดับ | ข้อกำหนด |
| --- | --- | --- | --- |
| FR-DASH-001 | ทั้งสอง | Must | Dashboard ผู้ป่วยต้องแสดงยารอบถัดไป นัดครั้งถัดไป งานวันนี้ ค่าสุขภาพล่าสุด Quick Capture และ SOS |
| FR-DASH-002 | ทั้งสอง | Must | Dashboard ผู้ดูแลต้องแสดงรายชื่อผู้ป่วยที่มีสิทธิ์ นัดใกล้ถึง Dose ที่ยังไม่ยืนยัน ยาใกล้หมด Checklist และ SOS |
| FR-DASH-003 | ทั้งสอง | Must | Dashboard Clinician ต้องแสดงเฉพาะผู้ป่วยและข้อมูลที่มี Consent/Organization Scope |
| FR-DASH-004 | ทั้งสอง | Must | Read Model ของ Dashboard ต้องสร้างจาก Source Entity ที่ระบุชัด และสามารถ Rebuild ได้โดยไม่เป็น Source of Truth ใหม่ |
| FR-DASH-005 | ทั้งสอง | Must | ข้อมูล Dashboard ต้องแสดงเวลาซิงก์ล่าสุดและสถานะข้อมูลเมื่อ Offline หรืออาจล้าสมัย |
| FR-DASH-006 | ทั้งสอง | Must | การ์ดหรือ Action บน Dashboard ต้องเคารพ Permission ฝั่ง Server และไม่อาศัยการซ่อน UI เพียงอย่างเดียว |
| FR-DASH-007 | ทั้งสอง | Should | ผู้ใช้ต้องปรับลำดับการ์ดที่ไม่สำคัญได้ โดยการ์ด SOS และการแจ้งเตือนความเสี่ยงไม่ควรถูกซ่อนโดยไม่เตือน |
| FR-DASH-008 | ทั้งสอง | Must | Dashboard ต้องมี Loading, Empty, Error, Permission Denied และ Offline State ที่เข้าใจง่าย |

# 6. กฎธุรกิจ

| รหัส | กฎธุรกิจ |
| --- | --- |
| BR-001 | ผู้ป่วยเป็นเจ้าของข้อมูลหลักและสามารถให้/ถอนสิทธิ์ได้ตามกฎหมายและข้อผูกพันที่เกี่ยวข้อง |
| BR-002 | บุคคลอื่นเข้าถึงข้อมูลผู้ป่วยได้เฉพาะ Scope ที่มี Consent/Role/Organization Policy ครบถ้วน |
| BR-003 | การถอน Permission มีผลกับการเข้าถึงใหม่ทันที และต้องเพิกถอน Share Link/Session ที่เกี่ยวข้องตาม SLA |
| BR-004 | ผล OCR/STT/AI ต้องอยู่สถานะ proposed จนกว่าผู้ใช้ยืนยัน |
| BR-005 | ระบบไม่เปลี่ยนคำแนะนำแพทย์ รายการยา หรือตารางยาแบบอัตโนมัติจาก AI |
| BR-006 | Dose ที่ไม่ตอบต้องเป็น pending/missed ตามเวลา ไม่ถือว่ากินแล้ว |
| BR-007 | การแก้ Schedule ยาใช้ Effective Date และไม่เขียนทับ Dose History ที่เสร็จสิ้นแล้ว |
| BR-008 | ข้อมูลจาก Health Device ต้องเก็บ Source และไม่เขียนทับข้อมูลที่ผู้ใช้กรอกโดยไม่มีหลักฐานการ Merge |
| BR-009 | ลิงก์แชร์ต้องหมดอายุและเพิกถอนได้ และไม่ให้สิทธิ์มากกว่าที่ผู้ป่วยเลือก |
| BR-010 | SOS ต้องมี Confirmation ยกเว้นการโทรหมายเลขฉุกเฉินโดยตรงที่ผู้ใช้เป็นผู้เริ่ม |
| BR-011 | การลบบัญชีต้องผ่าน Identity Re-verification และ Retention/Legal Hold Check |
| BR-012 | ข้อมูลที่จำเป็นต่อ Audit/Security อาจเก็บตาม Retention Policy แม้บัญชีถูกลบ โดยต้องลดการระบุตัวบุคคล |
| BR-013 | ทุก Timestamp เก็บเป็น UTC และเก็บ Time Zone ที่ใช้แสดง/จัดตารางแยกต่างหาก |
| BR-014 | ทุก Entity ใช้ UUID/ULID ที่ไม่ขึ้นกับ Firestore Document ID ภายใน |
| BR-015 | ระบบต้องแยกข้อมูล Production จาก Non-production อย่างเด็ดขาด |
| BR-016 | การเข้าถึงข้อมูลโดย Support/Admin ต้องมี Purpose, Ticket และ Audit |
| BR-017 | ผู้ดูแลที่ดูหลายผู้ป่วยต้องเลือก Active Patient Context ก่อนสร้างข้อมูลแทน |
| BR-018 | Notification เป็นเครื่องมือช่วยเตือน ไม่ใช่การรับประกันการรับประทานยาหรือการรักษา |

# 7. State Model และ Workflow สำคัญ

## 7.1 Appointment State

```text
upcoming -> confirmed -> traveling -> arrived -> waiting -> completed
    |          |             |
    +------> rescheduled <----+
    +------> cancelled
    +------> missed (ตามกติกาเวลาและการยืนยัน)
```
* การเปลี่ยนสถานะต้องผ่าน Transition Matrix ฝั่ง Server
* rescheduled ต้องสร้าง Revision/History และ Notification ใหม่
* completed ต้องไม่เกิดอัตโนมัติจากการเลยเวลานัด

## 7.2 Medication Dose State

```text
scheduled -> due -> taken
                 -> snoozed -> due
                 -> skipped
                 -> issue_reported
                 -> missed (เมื่อหมด Grace Period)
```
* taken/skipped/issue_reported เป็น Terminal State ของ Dose Occurrence เว้นแต่มี Correction พร้อม Audit
* Correction ต้องเก็บ previousState, newState, actor, reason และ timestamp

## 7.3 OCR/STT Job State

`uploaded -> queued -> processing -> review_required -> confirmed -> applied`

เส้นทางล้มเหลว: `processing -> failed -> retrying` หรือ `manual_entry`

## 7.4 Consent/Share State

`draft -> active -> suspended -> revoked` และ `active -> expired`

การเปลี่ยนเป็น revoked/expired ต้องหยุดการเข้าถึงใหม่และเพิกถอน Token ตามข้อกำหนด

## 7.5 Sync Command State

`pending -> syncing -> synced` หรือ `pending/syncing -> failed -> retrying` หรือ `conflict -> resolved -> synced`

# 8. แบบจำลองข้อมูล

## 8.1 หลักการออกแบบข้อมูลเพื่อรองรับการย้ายฐานข้อมูล

* ใช้ Canonical Entity และ Repository Interface; ห้ามกระจาย Firestore Query ไปทั่ว UI/Domain
* ใช้ ID แบบ UUID/ULID ที่สร้างได้ทั้ง Client/Server และไม่ใช้ Path เป็นความหมายทางธุรกิจ
* เก็บ Relation ด้วย ID ชัดเจน เช่น `patientId`, `appointmentId`, `medicationId`
* หลีกเลี่ยง Nested Document ขนาดใหญ่และ Array ที่เติบโตไม่จำกัด
* เก็บ Event/History เป็น Record แยก ไม่เขียนทับประวัติ
* ทุก Entity มี `id`, `schemaVersion`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `version`, `status` ตามความเหมาะสม
* วันที่เก็บเป็น ISO-8601/UTC; วันที่ไม่มีเวลาเก็บเป็น Local Date ที่ระบุชัด
* Enum ต้องกำหนดใน Shared Contract และมี Unknown/Future Handling
* Firestore Denormalization ทำได้ใน Read Model แต่ Source of Truth ต้องระบุชัดและ Rebuild ได้
* ห้ามใช้ Firebase-specific Timestamp/GeoPoint ใน Public API โดยตรง ให้แปลงเป็นมาตรฐาน JSON

## 8.2 Canonical Entities

| Entity | วัตถุประสงค์ | ฟิลด์สำคัญ |
| --- | --- | --- |
| User | บัญชีและสถานะผู้ใช้ | id, identityRefs, roles, locale, status |
| Device | อุปกรณ์และ Push Token | id, userId, platform, appVersion, pushTokenRef, lastSeenAt |
| PatientProfile | ข้อมูลผู้ป่วย | id, ownerUserId, demographics, conditions, allergies, emergencySettings |
| CareRelationship | ความสัมพันธ์ผู้ป่วย-ผู้ดูแล | id, patientId, caregiverUserId, role, status |
| ConsentGrant | หลักฐาน Consent | id, patientId, granteeId, purposes, scopes, policyVersion, validFrom, expiresAt, revokedAt |
| PermissionGrant | สิทธิ์เชิงปฏิบัติ | id, subjectId, resourceOwnerId, scopes, constraints |
| HealthcareFacility | สถานพยาบาล | id, name, address, geo, contact |
| ProviderProfile | แพทย์/บุคลากร | id, userId, organizationId, profession, verificationStatus |
| Appointment | นัดหมาย | id, patientId, facilityId, providerId, scheduledAt, timezone, status, revision |
| AppointmentEvent | ประวัติสถานะนัด | id, appointmentId, type, oldValue, newValue, actorId, occurredAt |
| VisitRecord | เหตุการณ์พบแพทย์ | id, appointmentId, patientId, summary, completedAt |
| Medication | รายการยา | id, patientId, names, strength, form, images, source, status |
| MedicationSchedule | กติกาตารางยา | id, medicationId, rule, effectiveFrom, effectiveTo, timezone, version |
| DoseOccurrence | รอบยาที่เกิดขึ้น | id, scheduleId, patientId, dueAt, status, respondedAt, actorId |
| MedicationInventory | ยาคงเหลือ | id, medicationId, quantity, unit, estimatedAt |
| HealthMeasurement | ค่าข้อมูลสุขภาพ | id, patientId, type, value, unit, measuredAt, context, source |
| SymptomEntry | อาการ/ผลข้างเคียง | id, patientId, severity, description, occurredAt, relatedMedicationIds |
| DocumentAsset | เอกสารและไฟล์ | id, patientId, objectKey, mimeType, category, checksum, status |
| ProcessingJob | งาน OCR/STT/AI | id, assetId, jobType, provider, modelVersion, status, resultRef |
| ExtractedDraft | ข้อมูลเสนอจาก AI | id, jobId, targetType, payload, confidence, reviewStatus |
| AudioRecord | ไฟล์เสียง | id, patientId, visitId, assetId, consentConfirmedAt |
| Transcript | ข้อความเสียง | id, audioId, text, segments, language, reviewedAt |
| Checklist | ชุดคำแนะนำ | id, patientId, sourceType, sourceId, title, targetRule, status |
| ChecklistOccurrence | รายการที่ต้องทำ | id, checklistId, dueAt, status, completedAt, actorId |
| DoctorQuestion | คำถามแพทย์ | id, patientId, appointmentId, priority, status, answer |
| NotificationRule | กฎแจ้งเตือน | id, ownerId, eventType, channels, offsets, escalation |
| NotificationDelivery | ประวัติส่งแจ้งเตือน | id, ruleId, recipientId, channel, status, providerMessageId |
| EmergencyEvent | เหตุการณ์ SOS | id, patientId, initiatedAt, status, locationRef, closedAt |
| ShareLink | ลิงก์แชร์ | id, ownerId, tokenHash, scopes, expiresAt, revokedAt |
| ReportJob | งานสร้างรายงาน | id, patientId, period, scopes, status, assetId |
| AuditEvent | เหตุการณ์ตรวจสอบ | id, actorId, action, resourceType, resourceId, purpose, occurredAt, correlationId |
| SyncOperation | คำสั่ง Offline | id, userId, entityType, operation, idempotencyKey, status, baseVersion |
| Organization | องค์กร/โครงการ | id, name, type, status, settings |
| ContentArticle | บทความสุขภาพ | id, version, status, reviewerId, references, publishedAt |

## 8.3 Firestore Collection Mapping อ้างอิง

การ Mapping ต่อไปนี้เป็นเพียง Infrastructure Design ระยะแรก ไม่ใช่ Public Contract

| Collection | Source Entity | หมายเหตุ |
| --- | --- | --- |
| users | User | PII ขั้นต่ำ; Identity Ref ไม่เก็บ Secret |
| devices | Device | Push token ควรเข้ารหัส/จำกัดสิทธิ์ |
| patients | PatientProfile | Owner และ Profile Summary |
| care_relationships | CareRelationship | Query ตาม patientId/caregiverUserId |
| consent_grants | ConsentGrant | Append/Versioned Evidence |
| permission_grants | PermissionGrant | Server authoritative |
| appointments | Appointment | Snapshot ปัจจุบัน |
| appointment_events | AppointmentEvent | Immutable history |
| medications | Medication | ข้อมูลยาปัจจุบัน |
| medication_schedules | MedicationSchedule | Versioned |
| dose_occurrences | DoseOccurrence | Partition/index ตาม patientId+dueAt |
| health_measurements | HealthMeasurement | Time-series; วาง Archive Strategy |
| document_assets | DocumentAsset | Metadata; Binary อยู่ Object Storage |
| processing_jobs | ProcessingJob | Queue/Async Status |
| checklists | Checklist | Definition |
| checklist_occurrences | ChecklistOccurrence | Time-series |
| notification_deliveries | NotificationDelivery | TTL/Archive ตาม Policy |
| audit_events | AuditEvent | Write-only ผ่าน Server; Immutable |
| sync_operations | SyncOperation | Deduplication/Reconciliation |

## 8.4 Migration Readiness

ก่อนย้ายไป PostgreSQL หรือ MongoDB ต้องมีขั้นตอนดังนี้
1. Export Canonical JSON/NDJSON พร้อม schemaVersion
2. Validate Referential Integrity และ Count/Reconciliation
3. Dual-read หรือ Shadow-read ใน Staging
4. Dual-write เฉพาะช่วง Migration ที่ควบคุมได้และมี Idempotency
5. Backfill Immutable History และ Object Metadata
6. Cutover ด้วย Feature Flag และ Rollback Plan
7. เปรียบเทียบ Hash/Count/Sample Record ก่อนและหลังย้าย
8. เก็บ Firestore Adapter ไว้ชั่วคราวจนผ่าน Observation Window

# 9. API Contract

## 9.1 รูปแบบมาตรฐาน

Request Header ที่สำคัญ:
* `Authorization: Bearer <token>`
* `X-Correlation-Id`
* `Idempotency-Key` สำหรับคำสั่งที่ส่งซ้ำได้
* `If-Match` หรือ `baseVersion` สำหรับ Optimistic Concurrency
* `X-Client-Platform`, `X-App-Version`, `Accept-Language`

Response Envelope อ้างอิง:
```json
{
  "data": {},
  "meta": {"correlationId": "...", "serverTime": "2026-06-24T10:00:00Z"},
  "error": null
}
```

## 9.2 Endpoint Groups อ้างอิง

| Endpoint | หน้าที่ |
| --- | --- |
| POST /auth/session/exchange | แลก Identity Token เป็น Application Session/Claims |
| GET/PATCH /me | ข้อมูลบัญชีและ Preference |
| GET/POST/PATCH /patients | โปรไฟล์ผู้ป่วยตามสิทธิ์ |
| GET/POST /patients/{id}/caregivers | จัดการผู้ดูแลและคำเชิญ |
| GET/POST /patients/{id}/consents | จัดการ Consent/Permission |
| GET/POST/PATCH /patients/{id}/appointments | นัดหมาย |
| POST /appointments/{id}/transition | เปลี่ยนสถานะตาม State Machine |
| GET/POST/PATCH /patients/{id}/medications | รายการยา |
| GET/POST/PATCH /medications/{id}/schedules | ตารางยา |
| GET/PATCH /patients/{id}/doses | Dose Occurrence และการตอบ |
| GET/POST /patients/{id}/measurements | ข้อมูลสุขภาพ |
| POST /patients/{id}/assets | ขอ Signed Upload/สร้าง Metadata |
| POST /assets/{id}/ocr-jobs | เริ่ม OCR |
| POST /assets/{id}/transcription-jobs | เริ่ม STT |
| POST /processing-drafts/{id}/confirm | ยืนยันผล AI/OCR/STT |
| GET/POST /patients/{id}/checklists | Checklist |
| GET/POST /patients/{id}/questions | คำถามแพทย์ |
| GET/PATCH /notification-preferences | Preference แจ้งเตือน |
| POST /patients/{id}/sos | เริ่ม SOS |
| POST /sos/{id}/close | ปิดเหตุการณ์ SOS |
| POST /patients/{id}/reports | สร้างรายงาน |
| POST /patients/{id}/share-links | สร้างลิงก์แชร์ |
| DELETE /share-links/{id} | เพิกถอนลิงก์ |
| POST /sync/batch | ส่งชุดคำสั่ง Offline |
| GET /sync/changes | รับ Delta/Change Feed ตาม Cursor |

## 9.3 Error Codes ขั้นต่ำ

| Code | HTTP | ความหมาย |
| --- | --- | --- |
| AUTH_REQUIRED | 401 | ต้องเข้าสู่ระบบ |
| FORBIDDEN_SCOPE | 403 | ไม่มีสิทธิ์/Consent ไม่เพียงพอ |
| RESOURCE_NOT_FOUND | 404 | ไม่พบทรัพยากรหรือไม่เปิดเผยว่ามีอยู่ |
| VALIDATION_FAILED | 422 | ข้อมูลไม่ผ่าน Validation |
| VERSION_CONFLICT | 409 | ข้อมูลถูกแก้ไขแล้ว ต้อง Resolve Conflict |
| IDEMPOTENCY_CONFLICT | 409 | Key เดิมแต่ Payload ต่างกัน |
| RATE_LIMITED | 429 | เกินอัตราที่กำหนด |
| DEPENDENCY_UNAVAILABLE | 503 | บริการภายนอกขัดข้อง |
| PROCESSING_PENDING | 202 | งาน Asynchronous ยังไม่เสร็จ |

## 9.4 Contract-first เพื่อการพัฒนาขนาน

* Backend ต้องเผยแพร่ OpenAPI และ JSON Schema ก่อนเริ่ม Implementation ของแต่ละ Module
* Frontend/Mobile ใช้ Generated Client หรือ Typed SDK จาก Contract เดียวกัน
* Mock Server ต้องรองรับ Success, Validation Error, Permission Error, Conflict และ Offline Simulation
* Breaking Contract ต้องผ่าน Architecture/Frontend/Mobile Review
* Consumer-driven Contract Test ต้องรันใน CI

# 10. Offline และ Synchronization

## 10.1 ข้อมูลที่อนุญาตให้ใช้งาน Offline

| ข้อมูล/คำสั่ง | Phase 1 | Phase 2 | Conflict Policy |
| --- | --- | --- | --- |
| ดูนัดและยา | Cache ล่าสุด | Local DB | Server version พร้อมแสดง lastSyncedAt |
| ยืนยัน Dose | Outbox | Outbox/Local DB | Idempotent; ห้ามสร้างซ้ำ |
| บันทึก Measurement | Outbox | Outbox/Local DB | Append-only + Dedup Key |
| Checklist Completion | Outbox | Outbox/Local DB | Version check; merge ตาม occurrence |
| แก้ไขนัด | จำกัด/อาจต้องออนไลน์ | รองรับเมื่อ Policy อนุญาต | Strict conflict; user resolution |
| แก้ Permission/Consent | ต้องออนไลน์ | ต้องออนไลน์ | Server authoritative |
| อัปโหลดรูป/เสียง | เก็บชั่วคราวตาม Browser | Encrypted queue | Checksum + resumable upload |
| SOS | โทรโดยตรงได้; ส่งข้อมูลเมื่อออนไลน์ | โทร/ส่งตาม capability | ห้ามค้างแบบผู้ใช้เข้าใจว่าส่งแล้ว |

## 10.2 Sync Protocol

1. Client สร้าง `operationId` และ `idempotencyKey`
2. เก็บคำสั่งใน Outbox พร้อม baseVersion
3. เมื่อออนไลน์ ส่งแบบลำดับตาม Dependency
4. Server ตรวจ Auth, Permission, Schema, Idempotency และ Version
5. Server Commit Transaction และคืน canonical entity/version
6. Client อัปเดต Local Store และลบ/Archive Outbox
7. หาก Conflict ให้หยุดเฉพาะ Entity ที่เกี่ยวข้องและแสดงวิธีแก้

## 10.3 การล้างข้อมูล Local

* Logout ปกติ: ลบ Token และข้อมูล PHI Local ตาม Policy; อาจคง Preference ที่ไม่อ่อนไหว
* Remote Revocation: เมื่อ Client ออนไลน์ต้องลบ Session/Local PHI ภายในรอบ Sync ถัดไป
* Device Lost: ผู้ใช้/Support ต้องเพิกถอน Device Session ได้
* Mobile App ต้องใช้ OS Secure Storage และ Encrypted Database
* PWA ต้องจำกัด Cache, ใช้ IndexedDB อย่างระมัดระวัง และไม่ Cache Share Page/Report ที่มี PHI โดยค่าเริ่มต้น

# 11. ข้อกำหนดที่ไม่ใช่ฟังก์ชัน

## 11.1 Performance

| รหัส | ข้อกำหนด |
| --- | --- |
| NFR-PERF-001 | หน้าหลักต้องแสดงข้อมูลสำคัญภายใน 3 วินาทีที่ p75 บนเครือข่ายมือถือปกติหลัง Authentication |
| NFR-PERF-002 | การกดยืนยัน Dose/Checklist ต้องให้ Visual Feedback ภายใน 100 ms และบันทึก Local/Server ภายใน 2 วินาทีเมื่อออนไลน์ |
| NFR-PERF-003 | API อ่านทั่วไปเป้าหมาย p95 ไม่เกิน 800 ms ไม่รวมบริการภายนอก |
| NFR-PERF-004 | API คำสั่งทั่วไปเป้าหมาย p95 ไม่เกิน 1,500 ms ไม่รวมงาน Async |
| NFR-PERF-005 | งาน OCR/STT/PDF ต้องเป็น Async และแสดง Progress/Status |
| NFR-PERF-006 | รายการ Time-series ต้องใช้ Pagination/Cursor และห้ามโหลดไม่จำกัด |

## 11.2 Availability และ Resilience

| รหัส | ข้อกำหนด |
| --- | --- |
| NFR-AVL-001 | Phase 1 เป้าหมาย Availability ของบริการกลางไม่น้อยกว่า 99.5% ต่อเดือน ยกเว้น Planned Maintenance |
| NFR-AVL-002 | ก่อนขยายองค์กรใน Phase 2 ให้ประเมินเป้าหมาย 99.9% และ SLA ตามงบประมาณ |
| NFR-AVL-003 | Critical API ต้องมี Timeout, Retry เฉพาะคำสั่ง Idempotent และ Circuit Breaker สำหรับ Dependency |
| NFR-AVL-004 | ระบบต้องมี Backup และ Restore Drill ตามรอบที่กำหนด |
| NFR-AVL-005 | RPO เป้าหมายเริ่มต้นไม่เกิน 24 ชั่วโมงสำหรับ Backup และใกล้ศูนย์สำหรับข้อมูล Transactional ที่ Commit แล้วตามบริการที่ใช้ |
| NFR-AVL-006 | RTO เป้าหมายเริ่มต้น 8 ชั่วโมงสำหรับเหตุร้ายแรง และต้องทบทวนก่อน B2B SLA |

## 11.3 Scalability

* Service ต้อง Stateless เท่าที่ทำได้และ Scale แยกตาม Module
* Query ทุกชุดต้องมี Index Plan และ Cost Guardrail
* ไฟล์ Binary ต้องอยู่ Object Storage ไม่เก็บใน Database Document
* Notification/OCR/STT/PDF ใช้ Queue/Async Worker
* ต้องมี Rate Limit แยก User, Device, IP, Organization และ Service Account ตามความเสี่ยง
* ต้องมี Load Test Baseline ก่อน Pilot และก่อน Phase 2 Launch

## 11.4 Accessibility และ Usability

* เป้าหมาย WCAG 2.2 ระดับ AA สำหรับ Web/PWA และมาตรฐานเทียบเท่าสำหรับ Mobile
* รองรับ Screen Reader, Dynamic Text, Contrast, Focus, Keyboard, Error Identification และไม่พึ่งสีอย่างเดียว
* ผู้สูงอายุควรทำ Core Journey ได้ภายใน 3–5 ขั้นตอนเมื่อเหมาะสม
* ข้อความต้องใช้ภาษาไทยเข้าใจง่าย หลีกเลี่ยงศัพท์เทคนิคที่ไม่จำเป็น
* ต้องทดสอบ Usability กับผู้สูงอายุจริงและผู้ดูแล

## 11.5 Compatibility

* PWA: Browser Support Matrix ต้องระบุ Chrome, Safari, Edge, Firefox และเวอร์ชันขั้นต่ำก่อน Release
* Phase 2: Android/iOS Minimum Version ต้องกำหนดจาก Usage Data และ Plugin Support ก่อนเริ่มพัฒนา
* Layout ต้องรองรับ Smartphone, Tablet และ Desktop ตาม Breakpoint ที่ Design System กำหนด
* API ต้องรักษา Compatibility กับ Mobile App เวอร์ชันที่ยังอยู่ใน Support Window

## 11.6 Maintainability

* ใช้ Modular Architecture, Automated Test, Static Analysis และ Code Review
* Domain Module ต้องไม่ Import Firebase SDK โดยตรง
* Infrastructure Adapter ต้องเปลี่ยนได้ผ่าน Interface/Dependency Injection
* Configuration ต้องอยู่ Environment/Secret Management ไม่ Hard-code
* ทุก Module ต้องมี Owner, README, API Contract, Data Dictionary และ Runbook
* Technical Debt ต้องติดตามใน Backlog และมี Quality Gate ก่อน Release

## 11.7 Observability

* ทุก Request มี Correlation ID
* Structured Log ต้องไม่มี Token, OTP, Full PHI หรือไฟล์เอกสาร
* Metrics ขั้นต่ำ: API latency/error, auth failure, notification delivery, OCR/STT job, sync conflict, queue depth, storage error
* Alert ต้องแบ่ง Severity และมี On-call/Incident Procedure
* Mobile Phase 2 ต้องมี Crash Reporting และ Crash-free Session Metric
* Analytics Event ต้องผ่าน Privacy Review และใช้ Pseudonymous ID

# 12. ความปลอดภัย ความเป็นส่วนตัว และการปฏิบัติตามข้อกำหนด

## 12.1 Security Controls

| รหัส | ข้อกำหนด |
| --- | --- |
| SEC-001 | ใช้ TLS สำหรับข้อมูลระหว่างส่งทุก Environment ที่ให้บริการ |
| SEC-002 | เข้ารหัสข้อมูลสำคัญขณะจัดเก็บด้วยบริการ Cloud/KMS และเข้ารหัส Local DB ใน Phase 2 |
| SEC-003 | ใช้ RBAC ร่วมกับ Resource Ownership/Consent Check ที่ Server |
| SEC-004 | ใช้ Firebase App Check หรือกลไก Attestation เทียบเท่าสำหรับ Client ที่รองรับ |
| SEC-005 | Secret ต้องอยู่ Secret Manager และมี Rotation Policy |
| SEC-006 | OTP/Login/Share Link/SOS API ต้องมี Rate Limit และ Abuse Detection |
| SEC-007 | Signed URL ต้องมีอายุสั้น Scope จำกัด และไม่เผย Object Path ที่คาดเดาได้ |
| SEC-008 | Audit Event ต้องป้องกันการแก้ไขและจำกัดสิทธิ์อ่าน |
| SEC-009 | Admin/Support ต้องใช้ MFA และ Privileged Access Review |
| SEC-010 | Dependency, Container และ Mobile Package ต้องสแกนช่องโหว่ใน CI |
| SEC-011 | ต้องทำ Threat Modeling และ Penetration Test ก่อน Pilot/Production ตามระดับความเสี่ยง |
| SEC-012 | ต้องมี Incident Response, Breach Assessment และ Notification Procedure |

## 12.2 Privacy Requirements

| รหัส | ข้อกำหนด |
| --- | --- |
| PRI-001 | เก็บข้อมูลเท่าที่จำเป็นตามวัตถุประสงค์ |
| PRI-002 | Consent แยกตามวัตถุประสงค์และถอนง่ายเท่ากับการให้ |
| PRI-003 | ผู้ใช้ต้องดู ดาวน์โหลด แก้ไข และขอลบบัญชี/ข้อมูลตามสิทธิ์ที่เกี่ยวข้อง |
| PRI-004 | Analytics/AI/Marketing ต้องไม่ใช้ข้อมูลสุขภาพโดยอัตโนมัติหากไม่มีฐานกฎหมายและ Consent |
| PRI-005 | Lock Screen Notification ต้องซ่อนรายละเอียดสุขภาพโดยค่าเริ่มต้น |
| PRI-006 | Share Link ต้องมี Expiry, Revocation, Scope และ Access Log |
| PRI-007 | ต้องมี Data Retention Schedule แยกตามประเภทข้อมูล |
| PRI-008 | ผู้ให้บริการภายนอกต้องผ่าน Vendor Security/Privacy Review และมี Data Processing Terms |
| PRI-009 | การส่งข้อมูลข้ามประเทศต้องประเมินฐานกฎหมายและมาตรการคุ้มครอง |
| PRI-010 | ต้องมี Privacy Notice และข้อความขอ Permission ที่สอดคล้องกับการทำงานจริง |

## 12.3 Audit Events ขั้นต่ำ

* Login, Logout, MFA, Device Registration และ Session Revocation
* ดู/แก้ไข/ดาวน์โหลด/แชร์ข้อมูลสุขภาพ
* ให้ ถอน หมดอายุ หรือเปลี่ยน Consent/Permission
* สร้าง/แก้/ยกเลิกนัดและตารางยา
* การแก้ Correction ของ Dose/Measurement
* OCR/STT/AI Processing และการยืนยันผล
* สร้าง/เปิด/เพิกถอน Share Link
* Admin/Support Access และ Data Export/Delete Request
* Sync Conflict และ Resolution
* SOS Start/Message/Location/Close

# 13. Notification Specification

## 13.1 ประเภทเหตุการณ์

| Event Type | ผู้รับหลัก | ตัวอย่าง |
| --- | --- | --- |
| appointment.reminder | Patient/Caregiver | นัดใน 1 วัน สิ่งที่ต้องเตรียม |
| appointment.rescheduled | Patient/Caregiver | เวลานัดถูกเปลี่ยน |
| medication.due | Patient | ถึงเวลากินยา |
| medication.missed | Patient/Caregiver | ยังไม่ยืนยันหลัง Grace Period |
| medication.low_stock | Patient/Caregiver | ยาใกล้หมด |
| checklist.due | Patient | งานดูแลตนเองถึงกำหนด |
| measurement.out_of_range | Patient/Caregiver | แนะนำวัดซ้ำ/ติดต่อผู้เชี่ยวชาญตามข้อความอนุมัติ |
| share.invitation | Caregiver/Clinician | คำเชิญเข้าถึงข้อมูล |
| sos.started | Emergency Contact | ผู้ป่วยร้องขอความช่วยเหลือ |
| sync.failed | User | ข้อมูลบางรายการยังไม่ซิงก์ |

## 13.2 กติกาการเปิดเผยข้อมูล

* ค่าเริ่มต้น Lock Screen แสดงข้อความทั่วไป เช่น “ถึงเวลาตรวจสอบรายการในหมอนัด”
* ผู้ใช้เลือกแสดงชื่อยา/สถานพยาบาลได้หลังรับทราบความเสี่ยง
* Caregiver Notification ต้องไม่มีข้อมูลเกิน Scope ที่ได้รับ
* Provider Payload ต้องใช้ Reference ID ไม่ส่ง PHI เต็มรูปแบบเมื่อไม่จำเป็น

# 14. รายงานและ Analytics

## 14.1 Product Analytics

Event ขั้นต่ำ: signup_completed, profile_completed, first_appointment_created, first_medication_created, caregiver_invited, dose_actioned, measurement_added, checklist_completed, notification_opened, pwa_installed, mobile_migration_completed

Analytics ต้องไม่บันทึกชื่อยา ค่าตรวจ เนื้อหาเอกสาร หรือข้อความเสียงแบบ Raw

## 14.2 Operational Reports

* Notification delivery/failure แยกช่องทางและ OS/Browser
* OCR/STT latency, failure และ correction rate
* Sync queue, conflict และ data reconciliation
* API availability, latency, error และ cost
* Security Event และ privileged access review
* Data subject request และ deletion/export SLA

# 15. การพัฒนาขนาน Frontend/Backend/Mobile

## 15.1 Workstream

| ทีม | เริ่มทำได้เมื่อ | สิ่งส่งมอบ |
| --- | --- | --- |
| UX/UI | User Flow + Requirement IDs | Design System, Prototype, Accessibility Spec |
| Frontend PWA | OpenAPI/Mock + UI Spec | PWA, Service Worker, Typed Client, E2E |
| Backend/API | Domain Model + Contract | API, Repository, Integration Adapter, Audit |
| Mobile Phase 2 | Stable v1 API + Shared Design | Android/iOS App, Local DB, Native Integration |
| QA | Acceptance Criteria + Mock/Test Data | Test Cases, Automation, Traceability |
| DevOps/Security | Architecture + Environment Matrix | CI/CD, IaC, Secrets, Monitoring, Security Gate |
| AI Integration | Job Contract + Sample Documents | OCR/STT Adapter, Evaluation, Human Review Flow |

## 15.2 Definition of Ready

* Requirement ID และ Acceptance Criteria ชัดเจน
* UI Flow/State ครบ Loading, Empty, Error, Offline, Permission Denied
* API Contract และ Mock พร้อม
* Data Classification และ Permission Rule ผ่าน Review
* Dependency/Feature Flag/Analytics Event ระบุครบ

## 15.3 Definition of Done

* Code Review และ Automated Test ผ่าน
* Contract Test, Security Rule Test และ Migration Test ผ่าน
* Accessibility Check และ Error/Offline State ครบ
* Log/Metric/Alert และ Runbook พร้อม
* Documentation และ Traceability อัปเดต
* ไม่มี Critical/High defect ที่ไม่ได้รับการยอมรับอย่างเป็นทางการ

# 16. แผนการทดสอบ

## 16.1 ระดับการทดสอบ

| ระดับ | ขอบเขต |
| --- | --- |
| Unit Test | Domain Rule, Validation, State Transition, Permission Policy |
| Repository/Adapter Test | Firestore/Storage/Provider Adapter และ Emulator |
| API Integration Test | Auth, Consent, Transaction, Idempotency, Error Mapping |
| Contract Test | OpenAPI Producer/Consumer Compatibility |
| Frontend Component Test | UI State, Accessibility, Form Validation |
| E2E Test | Core Journey บน Browser/Device จริง |
| Offline/Sync Test | Queue, Retry, Duplicate, Conflict, Clock/Timezone |
| Security Test | RBAC/ABAC, IDOR, Injection, Token, Share Link, Rate Limit |
| Performance Test | API, Notification Batch, OCR Queue, Report Generation |
| Migration Test | PWA account/data to Mobile App และ Database Adapter Migration |
| Usability Test | ผู้สูงอายุ ผู้ป่วย ผู้ดูแล และบุคลากรทางการแพทย์ |

## 16.2 Test Matrix ขั้นต่ำ

* Browser: Chrome Android, Safari iOS, Edge/Chrome Desktop และ Browser อื่นตาม Support Matrix
* Mobile Phase 2: Android/iOS รุ่นขั้นต่ำ รุ่นล่าสุด และอุปกรณ์ระดับกลางอย่างน้อย
* Permission: allow, deny, deny permanently, revoke หลังใช้งาน
* Network: online, slow, intermittent, offline, reconnect
* Time: Time Zone เปลี่ยน, DST, เวลาข้ามวัน, Device clock ผิด
* Account: ผู้ป่วยเดี่ยว ผู้ดูแลหลายคน ผู้ดูแลหลายผู้ป่วย Clinician และ Admin
* Data: ไม่มีข้อมูล ปริมาณปกติ ปริมาณมาก ข้อมูลเก่า และข้อมูล Conflict

## 16.3 Security Acceptance

* ไม่มี Critical/High vulnerability ที่เปิดเผยข้อมูลข้ามผู้ป่วย
* IDOR/Permission Escalation Test ต้องผ่านทุก Resource สำคัญ
* Share Link Token ต้องคาดเดาไม่ได้ หมดอายุ และเพิกถอนทันที
* Production Secret ไม่อยู่ใน Client Bundle/Repository/Log
* Audit Event สำคัญถูกสร้างและแก้ไขย้อนหลังไม่ได้ผ่านช่องทางปกติ

# 17. Deployment และ Release

## 17.1 CI/CD

* Pull Request: lint, typecheck, unit test, secret scan, dependency scan
* Merge to main: build, integration test, contract test, artifact signing
* Staging: deploy อัตโนมัติหรืออนุมัติแบบเบา พร้อม smoke/E2E
* Production: manual approval, change record, migration check, rollback plan
* Database/Schema change ต้อง Backward-compatible และใช้ Expand-Migrate-Contract

## 17.2 Phase 1 Release

* ใช้ PWA Version/Build ID และ Cache Busting ที่ควบคุมได้
* Service Worker Update ต้องไม่ทำให้ Client เก่าใช้ Asset/API ไม่เข้ากัน
* มี Feature Flag สำหรับ OCR/STT/Push/SOS/Share Link
* Pilot rollout เป็นกลุ่มและมี Support Channel

## 17.3 Phase 2 Release

* Internal Test -> Closed Beta/TestFlight -> Staged Production Rollout
* Store Metadata, Privacy Label/Data Safety, Permission Text และ Support URL ต้องพร้อม
* ต้องมี Minimum Supported Version และ Remote Configuration
* Forced Update ใช้เฉพาะ Security/API Compatibility ที่จำเป็น
* PWA ต้องคงใช้งานได้ระหว่าง Rollout และ Rollback

# 18. เกณฑ์การยอมรับระบบ

## 18.1 Phase 1 — Mobile-first PWA

| รหัส | เกณฑ์ |
| --- | --- |
| AC-P1-001 | ผู้ป่วยสมัคร เข้าสู่ระบบ และสร้างโปรไฟล์ได้ |
| AC-P1-002 | สร้างนัดจากรูปและยืนยัน OCR ก่อนบันทึกได้ |
| AC-P1-003 | ตั้ง Reminder และรับ In-app/Web Push หรือ Fallback ที่กำหนดได้ |
| AC-P1-004 | เพิ่มยา ตารางยา และตอบสถานะ Dose ได้ |
| AC-P1-005 | ผู้ดูแลได้รับ Escalation เมื่อพลาดยาตาม Permission |
| AC-P1-006 | บันทึกและดูกราฟข้อมูลสุขภาพพื้นฐานได้ |
| AC-P1-007 | บันทึกเสียง ทำ STT และแก้ไขก่อนนำไปใช้ได้ |
| AC-P1-008 | สร้าง Checklist และคำถามแพทย์ได้ |
| AC-P1-009 | เปิดแผนที่และใช้ Doctor Visit Mode ได้ |
| AC-P1-010 | SOS โทร/ส่งตำแหน่งตาม Permission พร้อมแสดงผลส่งได้ |
| AC-P1-011 | ผู้ป่วยให้ ถอน และตรวจประวัติการแชร์ได้ |
| AC-P1-012 | สร้าง PDF/Expiring Share Link และเพิกถอนได้ |
| AC-P1-013 | คำสั่ง Offline ที่กำหนดเข้าคิวและซิงก์โดยไม่ซ้ำได้ |
| AC-P1-013A | Doctor Lite แสดงข้อมูลตาม Consent และหยุดเข้าถึงเมื่อถอนสิทธิ์ได้ |
| AC-P1-014 | ผ่าน Security, Privacy, Accessibility และ Usability Gate |
| AC-P1-015 | ไม่มี Critical Data Loss, Cross-patient Access หรือ Medication/Appointment Corruption |

## 18.2 Gate ก่อนเริ่ม Phase 2

* Core Journey Phase 1 ผ่าน Acceptance และมีผู้ใช้ Pilot จริง
* มี Baseline ของ Notification, Retention, Offline และข้อจำกัด PWA
* API v1, Permission, Consent, Canonical Data Model และ Migration Test ผ่าน Architecture Review
* ไม่มี Critical Security/Data Integrity Issue ค้าง
* มี Mobile OS Support Policy, Store Compliance Checklist และงบประมาณดูแลระยะยาว

## 18.3 Phase 2 — Cross-platform Mobile App

| รหัส | เกณฑ์ |
| --- | --- |
| AC-P2-001 | Android/iOS รองรับ Core Journey ที่อนุมัติ |
| AC-P2-002 | ผู้ใช้ PWA เข้าด้วยบัญชีเดิมและเห็นข้อมูลเดิมครบ |
| AC-P2-003 | PWA/Mobile ซิงก์ข้ามช่องทางโดยไม่สร้างข้อมูลซ้ำ |
| AC-P2-004 | Native Push/Local Notification ผ่าน Device/OS Test Matrix |
| AC-P2-005 | แอปแนะนำเมื่อ Notification/Background ถูกจำกัด |
| AC-P2-006 | Biometric, Secure Storage และ Encrypted Local DB ผ่าน Security Test |
| AC-P2-007 | Offline Core Journey และ Conflict Handling ผ่าน |
| AC-P2-008 | Camera, Microphone, Share, Deep Link ทำงานบนอุปกรณ์จริง |
| AC-P2-009 | Health/Bluetooth/Location ขอ Consent ตามบริบทและเพิกถอนได้ |
| AC-P2-010 | Crash Reporting, Monitoring, Release Tracking และ Incident Process พร้อม |
| AC-P2-011 | ไม่มี Critical Crash, Data Loss หรือ Permission Escalation |
| AC-P2-012 | PWA/Web Portal และ Doctor Lite ยังคงทำงานร่วมกับ Mobile App |
| AC-P2-013 | Store Disclosure, Privacy Policy, Support และเอกสารผู้ใช้พร้อม |

# 19. Traceability Matrix ระดับโมดูล

| PRD | SRS | โมดูล |
| --- | --- | --- |
| PRD 9.1 | FR-AUTH-* | IAM/Auth |
| PRD 9.2, 9.18 | FR-PROF-* | Patient Profile/Emergency Card |
| PRD 9.3, 9.4, 9.11 | FR-APT-* | Appointment/Visit Mode |
| PRD 9.5, 9.13 | FR-OCR-* | Document/OCR/Quick Capture |
| PRD 9.6 | FR-CAR-* | Caregiver/Consent/Sharing |
| PRD 9.7–9.9 | FR-MED-* | Medication/Dose/Inventory |
| PRD 9.10, 9.21 | FR-HLT-* | Health Measurement/Threshold |
| PRD 9.12 | FR-STT-* | Audio/STT |
| PRD 9.14–9.15 | FR-CHK-* | Checklist/Doctor Questions |
| PRD 9.16 | FR-MAP-* | Map/Travel |
| PRD 9.17–9.18 | FR-SOS-* | SOS/Emergency |
| PRD 9.19 | FR-DASH-* | Dashboard/Read Models |
| PRD 9.20 | FR-RPT-* | Report/Share |
| PRD 6.3, 9.11, 18.2, 19.4 | FR-CLN-* | Clinician/Doctor Lite |
| PRD 9.22 | FR-CMS-* | Health Content |
| PRD 12–13 | FR-SYNC-* + NFR | Platform/Offline/Sync |
| PRD 14 | FR-AI-* | AI Governance |
| PRD 15–16 | SEC/PRI/NFR | Security/Privacy/Quality |
| PRD 18–19 | AC-P1/AC-P2 | Phase Scope/Acceptance |

# 20. Out of Scope และ Backlog

* การวินิจฉัยโรค การสั่งยา การเปลี่ยนยาอัตโนมัติ
* Telemedicine เต็มรูปแบบและ Video Consultation เว้นแต่เป็นโครงการแยก
* การเชื่อม HIS/EMR/EHR, e-Prescription, Claim และ National Health Platform
* Medical Device Certification เว้นแต่ Scope เปลี่ยนและผ่าน Regulatory Assessment
* AI Clinical Decision Support ที่สร้างคำแนะนำการรักษา
* Continuous Background Tracking ใน Phase 1
* Bluetooth Device Integration ใน Phase 1
* Enterprise SLA/SSO/SCIM/Data Warehouse ขั้นสูง เว้นแต่อนุมัติเป็นโครงการองค์กร

# 21. ความเสี่ยงทางเทคนิคและแนวทางควบคุม

| ความเสี่ยง | ผลกระทบ | แนวทางควบคุม |
| --- | --- | --- |
| Web Push ไม่สม่ำเสมอ | พลาด Reminder | Capability Check, In-app List, Fallback Channel, วัด Delivery จริง |
| OCR/STT ผิด | นัด/ยาผิด | Human Confirmation, Original Asset, Confidence, Audit |
| Firestore Coupling | ย้ายฐานข้อมูลยาก | Repository Adapter, Canonical Model, API-only Client |
| Offline Duplicate/Conflict | ข้อมูลซ้ำหรือผิด | UUID, Idempotency, Version, Conflict UI |
| Permission ผิดพลาด | ข้อมูลรั่ว | Server authorization, policy tests, audit, threat model |
| App Store/OS Change | ฟีเจอร์หยุดทำงาน | OS Support Policy, dependency update, staged rollout |
| ข้อมูล Local บนอุปกรณ์สูญหาย | ความเป็นส่วนตัว | Encryption, Secure Storage, logout wipe, device revoke |
| ค่า Cloud/AI เพิ่ม | งบประมาณ | Quota, async queue, compression, cost dashboard, feature flag |
| ผู้สูงอายุใช้ยาก | Adoption ต่ำ | Elderly mode, usability test, caregiver-assisted setup |
| SOS ถูกเข้าใจผิด | ความปลอดภัย | Disclaimer, status, direct-call fallback, no guarantee wording |

# 22. รายการเอกสารต่อเนื่องที่ต้องจัดทำ

1. OpenAPI 3.1 Specification และ Mock Server
2. Data Dictionary และ JSON Schema ของ Canonical Entity
3. RBAC/ABAC Permission Matrix ฉบับละเอียด
4. Firestore Index และ Security Rules Design
5. Threat Model และ Privacy Impact Assessment
6. UX Flow/Wireframe พร้อม State: Loading, Empty, Error, Offline, Permission
7. Notification Matrix และ Message Template ที่ผ่าน Medical/Privacy Review
8. Test Plan, Test Data Strategy และ Browser/Device Matrix
9. Backup/Restore, Incident Response และ Operational Runbook
10. Database Migration Playbook สำหรับ PostgreSQL/MongoDB
11. App Store/Google Play Compliance Checklist สำหรับ Phase 2

# 23. ประเด็นที่ต้องตัดสินใจก่อน Implementation

* Framework PWA และ Cross-platform Mobile App
* Firebase Functions เทียบกับ Cloud Run สำหรับแต่ละ Service
* OCR/STT Provider, Region, Data Retention และ Cost
* Map Provider และรูปแบบค่าใช้จ่าย
* ช่องทางสำรอง SMS/Email/LINE และผู้รับผิดชอบค่าใช้จ่าย
* Browser/OS Version ขั้นต่ำ
* Retention Period ของเสียง เอกสาร Audit และ Notification Log
* Threshold/ข้อความเตือนที่ต้องผ่านผู้เชี่ยวชาญทางการแพทย์
* Legal basis/Consent flow สำหรับผู้เยาว์หรือผู้แทนโดยชอบธรรม
* SLA ของการถอนสิทธิ์ Data Export และ Account Deletion
* รายการ Health/Bluetooth Device ที่อนุมัติใน Phase 2

# 24. บทสรุป

SRS ฉบับนี้กำหนดให้หมอนัดพัฒนาแบบสองเฟสบนสถาปัตยกรรม API-first และ Database-agnostic โดย Phase 1 ใช้ Mobile-first PWA เพื่อพิสูจน์ Core Journey และ Phase 2 เพิ่ม Cross-platform Mobile App สำหรับ Android/iOS โดยใช้บัญชี ข้อมูล กฎธุรกิจ Consent และ Backend เดิม

การใช้ Firebase ในระยะแรกเป็นการเลือก Infrastructure เพื่อเร่งการพัฒนา ไม่ใช่การผูก Domain Model กับ Firebase ระบบต้องใช้ Repository Adapter, Canonical Schema, Versioned API และ Automated Contract/Migration Test เพื่อรองรับการย้ายไป PostgreSQL หรือ MongoDB และทำให้ทีม Frontend, Backend และ Mobile สามารถพัฒนาขนานกันได้อย่างปลอดภัย

---

**สิ้นสุดเอกสาร Software Requirements Specification — Mo-nut Version 1.0**
