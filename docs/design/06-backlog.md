# 06 — Product Backlog

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Priority model

- **P0:** Required for Phase 1 acceptance, data safety, security or architecture foundation
- **P1:** Important Phase 1 enhancement or Phase 2 mandatory capability
- **P2:** Could/future backlog after gate review

## 2. Epic overview

| Epic | Module | Phase | Primary dependency |
|---|---|---|---|
| EP-01 | การสมัคร เข้าสู่ระบบ และ Session | Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-02 | โปรไฟล์ผู้ป่วยและข้อมูลฉุกเฉิน | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-03 | นัดหมายและโหมดไปพบแพทย์ | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-04 | เอกสาร OCR และ Quick Capture | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-05 | ผู้ดูแล Consent และการแชร์สิทธิ์ | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-06 | ยา ตารางยา และ Medication Adherence | Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-07 | ข้อมูลสุขภาพ อาการ และแนวโน้ม | Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-08 | เสียง Speech-to-Text และคำแนะนำ | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-09 | เช็กลิสต์และคำถามสำหรับแพทย์ | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-10 | การแจ้งเตือนและ Escalation | Phase 1, Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-11 | แผนที่ การเดินทาง และสถานที่ | Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-12 | SOS และข้อมูลฉุกเฉิน | Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-13 | รายงาน การส่งออก และลิงก์แชร์ | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-14 | เนื้อหาความรู้ | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-15 | ระบบผู้ดูแลและองค์กร | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-16 | Offline และการซิงก์ | Phase 1, Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-17 | AI Governance และ Human Confirmation | ทั้งสอง | Contract, IAM/permission as applicable |
| EP-18 | บุคลากรทางการแพทย์และ Doctor Lite | Phase 1, Phase 2, ทั้งสอง | Contract, IAM/permission as applicable |
| EP-19 | Dashboard และ Read Model ตามบทบาท | ทั้งสอง | Contract, IAM/permission as applicable |

## 3. User stories

> Acceptance criteria below are directly derived from the SRS requirement rows. Detailed API/UI/test design remains in the linked design files.

### US-001: การสมัคร เข้าสู่ระบบ และ Session

As a **Patient/User**,  
I want **สมัครและเข้าสู่ระบบอย่างปลอดภัย**,  
so that **เข้าถึงข้อมูลของตนและเพิกถอนอุปกรณ์ได้**.

Priority: **P0**  
Source: SRS §5 — `FR-AUTH-001, FR-AUTH-002, FR-AUTH-003, FR-AUTH-004, FR-AUTH-005, FR-AUTH-006, FR-AUTH-007, FR-AUTH-008, FR-AUTH-009, FR-AUTH-010, FR-AUTH-011, FR-AUTH-012`

Acceptance Criteria:
- [ ] **FR-AUTH-001 (ทั้งสอง/Must)** ระบบต้องให้สมัคร/เข้าสู่ระบบด้วยหมายเลขโทรศัพท์และ OTP
- [ ] **FR-AUTH-002 (ทั้งสอง/Must)** ระบบต้องรองรับอีเมลและรหัสผ่านหรือ Passwordless ตามนโยบาย
- [ ] **FR-AUTH-003 (ทั้งสอง/Must)** ระบบต้องรองรับ Google Sign-In
- [ ] **FR-AUTH-004 (ทั้งสอง/Must)** ระบบต้องรองรับ Sign in with Apple เมื่อใช้งานบน iOS หรือเมื่อข้อกำหนด Store บังคับ
- [ ] **FR-AUTH-005 (ทั้งสอง/Must)** หนึ่งบัญชีต้องถือหลายบทบาทได้โดยแยกสิทธิ์ตามบริบท
- [ ] **FR-AUTH-006 (ทั้งสอง/Must)** ระบบต้องตรวจสอบ Token และสถานะ Session ทุกคำขอที่ต้องยืนยันตัวตน
- [ ] **FR-AUTH-007 (ทั้งสอง/Must)** ผู้ใช้ต้องสามารถออกจากระบบทุกอุปกรณ์หรือเพิกถอน Session รายอุปกรณ์ได้
- [ ] **FR-AUTH-008 (Phase 2/Must)** Mobile App ต้องรองรับ Biometric Unlock โดยไม่ใช้ Biometric เป็น Credential หลักบน Server
- [ ] **FR-AUTH-009 (ทั้งสอง/Should)** ระบบต้องรองรับ MFA สำหรับบัญชีเสี่ยงสูง ผู้ดูแลระบบ และบุคลากรองค์กร
- [ ] **FR-AUTH-010 (ทั้งสอง/Must)** ระบบต้อง Rate Limit OTP/Login และป้องกัน Account Enumeration
- [ ] **FR-AUTH-011 (ทั้งสอง/Must)** ระบบต้องบันทึก Security Event เช่น Login ล้มเหลว อุปกรณ์ใหม่ และการเพิกถอน Session
- [ ] **FR-AUTH-012 (ทั้งสอง/Must)** ระบบต้องมี Account Recovery ที่ยืนยันตัวตนตามระดับความเสี่ยง

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-002: โปรไฟล์ผู้ป่วยและข้อมูลฉุกเฉิน

As a **Patient**,  
I want **จัดการโปรไฟล์และข้อมูลฉุกเฉิน**,  
so that **ข้อมูลสำคัญพร้อมใช้ตามสิทธิ์**.

Priority: **P0**  
Source: SRS §5 — `FR-PROF-001, FR-PROF-002, FR-PROF-003, FR-PROF-004, FR-PROF-005, FR-PROF-006, FR-PROF-007, FR-PROF-008`

Acceptance Criteria:
- [ ] **FR-PROF-001 (ทั้งสอง/Must)** ผู้ป่วยต้องสร้างและแก้ไขโปรไฟล์พื้นฐานได้
- [ ] **FR-PROF-002 (ทั้งสอง/Must)** ระบบต้องเก็บโรคประจำตัว ประวัติแพ้ยา แพ้อาหาร กรุ๊ปเลือด และผู้ติดต่อฉุกเฉิน
- [ ] **FR-PROF-003 (ทั้งสอง/Must)** ผู้ป่วยหนึ่งคนต้องเชื่อมหลายสถานพยาบาลและหมายเลขผู้ป่วยได้
- [ ] **FR-PROF-004 (ทั้งสอง/Must)** ผู้ใช้ต้องเลือกภาษา ขนาดตัวอักษร และ Accessibility Preference ได้
- [ ] **FR-PROF-005 (ทั้งสอง/Must)** ข้อมูลอายุที่แสดงต้องคำนวณจากวันเกิดและไม่เก็บเป็นแหล่งความจริงซ้ำซ้อน
- [ ] **FR-PROF-006 (ทั้งสอง/Must)** ผู้ใช้ต้องเลือกข้อมูลที่เปิดเผยใน Emergency Card/QR ได้
- [ ] **FR-PROF-007 (ทั้งสอง/Should)** ระบบต้องรองรับผู้แทนโดยชอบธรรมและความสัมพันธ์ตามนโยบายองค์กร
- [ ] **FR-PROF-008 (ทั้งสอง/Must)** ทุกการเปลี่ยนข้อมูลสำคัญต้องบันทึกผู้แก้ไข เวลา และแหล่งที่มา

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-003: นัดหมายและโหมดไปพบแพทย์

As a **Patient/Caregiver**,  
I want **จัดการนัดและใช้ Doctor Visit Mode**,  
so that **ไม่พลาดนัดและเตรียมข้อมูลครบ**.

Priority: **P0**  
Source: SRS §5 — `FR-APT-001, FR-APT-002, FR-APT-003, FR-APT-004, FR-APT-005, FR-APT-006, FR-APT-007, FR-APT-008, FR-APT-009, FR-APT-010, FR-APT-011, FR-APT-012`

Acceptance Criteria:
- [ ] **FR-APT-001 (ทั้งสอง/Must)** ผู้ใช้ต้องสร้าง แก้ไข เลื่อน ยกเลิก และดูนัดหมายได้
- [ ] **FR-APT-002 (ทั้งสอง/Must)** นัดหมายต้องรองรับวันเวลา Time Zone สถานพยาบาล แผนก อาคาร ห้อง แพทย์ และหมายเหตุ
- [ ] **FR-APT-003 (ทั้งสอง/Must)** ระบบต้องรองรับสถานะ upcoming, confirmed, traveling, arrived, waiting, completed, rescheduled, cancelled, missed
- [ ] **FR-APT-004 (ทั้งสอง/Must)** ผู้ใช้ต้องกำหนดสิ่งที่ต้องเตรียม เอกสาร และการงดน้ำ/อาหารได้
- [ ] **FR-APT-005 (ทั้งสอง/Must)** ผู้ใช้ต้องเชื่อมผู้ดูแลที่รับผิดชอบการเดินทางกับนัดได้
- [ ] **FR-APT-006 (ทั้งสอง/Must)** ระบบต้องกำหนด Reminder หลายเวลาและช่องทางได้
- [ ] **FR-APT-007 (ทั้งสอง/Must)** ระบบต้องมี Doctor Visit Mode ที่รวมข้อมูลนัด คำถาม ยา รายงาน และ Quick Capture
- [ ] **FR-APT-008 (ทั้งสอง/Must)** ข้อมูลหลังพบแพทย์ต้องเชื่อมกับ Appointment/Visit เดียวกัน
- [ ] **FR-APT-009 (ทั้งสอง/Should)** ระบบต้องเพิ่มนัดลงปฏิทินอุปกรณ์เมื่อผู้ใช้อนุญาต
- [ ] **FR-APT-010 (ทั้งสอง/Must)** การแก้ไขเวลานัดต้องสร้าง Notification Reschedule และ Audit Log
- [ ] **FR-APT-011 (ทั้งสอง/Must)** ห้ามแก้ไขนัดจากผล OCR โดยไม่ผ่านการยืนยันของผู้ใช้
- [ ] **FR-APT-012 (ทั้งสอง/Should)** ระบบต้องตรวจจับนัดซ้ำและเตือนก่อนสร้างโดยไม่บล็อกกรณีที่ผู้ใช้ยืนยัน

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-004: เอกสาร OCR และ Quick Capture

As a **Patient**,  
I want **ถ่ายเอกสารและตรวจผล OCR**,  
so that **ลดการกรอกข้อมูลโดยยังปลอดภัย**.

Priority: **P0**  
Source: SRS §5 — `FR-OCR-001, FR-OCR-002, FR-OCR-003, FR-OCR-004, FR-OCR-005, FR-OCR-006, FR-OCR-007, FR-OCR-008, FR-OCR-009, FR-OCR-010`

Acceptance Criteria:
- [ ] **FR-OCR-001 (ทั้งสอง/Must)** ผู้ใช้ต้องถ่ายหรืออัปโหลดใบนัด ฉลากยา ใบสั่งยา ผลตรวจ และเอกสารสุขภาพได้
- [ ] **FR-OCR-002 (ทั้งสอง/Must)** ระบบต้องเก็บไฟล์ต้นฉบับและ Metadata ของเอกสาร
- [ ] **FR-OCR-003 (ทั้งสอง/Must)** ระบบต้องส่งงาน OCR แบบ Asynchronous และแสดงสถานะ queued, processing, review, completed, failed
- [ ] **FR-OCR-004 (ทั้งสอง/Must)** ผล OCR ต้องแสดง Field Confidence และให้ผู้ใช้แก้ไข/ยืนยัน
- [ ] **FR-OCR-005 (ทั้งสอง/Must)** ระบบห้ามสร้างหรือแก้ไขนัด/ยาโดยอัตโนมัติก่อนผู้ใช้ยืนยัน
- [ ] **FR-OCR-006 (ทั้งสอง/Must)** Quick Capture ต้องเข้าถึงจากหน้าหลักภายในหนึ่งการกระทำ
- [ ] **FR-OCR-007 (ทั้งสอง/Should)** ระบบต้องลดขนาด/ปรับคุณภาพภาพก่อน Upload โดยรักษาความอ่านได้
- [ ] **FR-OCR-008 (ทั้งสอง/Must)** ไฟล์ชั่วคราวที่ยังไม่ยืนยันต้องมี Retention Policy และลบตามกำหนด
- [ ] **FR-OCR-009 (ทั้งสอง/Must)** ผู้ใช้ต้อง Retry OCR หรือกรอกเองเมื่อ Provider ขัดข้อง
- [ ] **FR-OCR-010 (ทั้งสอง/Must)** ต้องบันทึก Provider, Model/Version, เวลา และผลการยืนยันโดยไม่เก็บ Prompt ที่มี PHI เกินจำเป็น

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-005: ผู้ดูแล Consent และการแชร์สิทธิ์

As a **Patient**,  
I want **เชิญผู้ดูแลและกำหนดสิทธิ์**,  
so that **ได้รับความช่วยเหลือโดยควบคุมข้อมูลได้**.

Priority: **P0**  
Source: SRS §5 — `FR-CAR-001, FR-CAR-002, FR-CAR-003, FR-CAR-004, FR-CAR-005, FR-CAR-006, FR-CAR-007, FR-CAR-008, FR-CAR-009, FR-CAR-010`

Acceptance Criteria:
- [ ] **FR-CAR-001 (ทั้งสอง/Must)** ผู้ป่วยต้องเชิญผู้ดูแลด้วยโทรศัพท์ อีเมล QR หรือลิงก์ได้ตามช่องทางที่เปิดใช้
- [ ] **FR-CAR-002 (ทั้งสอง/Must)** คำเชิญต้องมีวันหมดอายุ ใช้ซ้ำไม่ได้หลังยอมรับ และเพิกถอนได้
- [ ] **FR-CAR-003 (ทั้งสอง/Must)** ผู้ป่วยต้องกำหนด Permission แยกตามหมวดข้อมูลและการกระทำ
- [ ] **FR-CAR-004 (ทั้งสอง/Must)** ผู้ป่วยต้องกำหนดผู้ดูแลหลัก/สำรองและผู้ดูแลหลายคนได้
- [ ] **FR-CAR-005 (ทั้งสอง/Must)** ผู้ป่วยต้องระงับ ถอน หรือกำหนดวันหมดอายุสิทธิ์ได้ทันที
- [ ] **FR-CAR-006 (ทั้งสอง/Must)** ระบบต้องบังคับ Permission ที่ Server ทุกครั้ง ไม่พึ่งการซ่อนปุ่มใน UI
- [ ] **FR-CAR-007 (ทั้งสอง/Must)** ผู้ป่วยต้องดูประวัติการเข้าถึง ดาวน์โหลด แชร์ และแก้ไขข้อมูลได้
- [ ] **FR-CAR-008 (ทั้งสอง/Must)** Consent ต้องบันทึกเวอร์ชันข้อความ วัตถุประสงค์ เวลา ช่องทาง และหลักฐานการยอมรับ
- [ ] **FR-CAR-009 (ทั้งสอง/Must)** เมื่อถอนสิทธิ์ Token/Link/Session ที่เกี่ยวข้องต้องถูกเพิกถอนตาม SLA
- [ ] **FR-CAR-010 (ทั้งสอง/Should)** ผู้ดูแลต้องสลับผู้ป่วยที่ตนดูแลได้โดยมี Context ชัดเจนเพื่อป้องกันบันทึกผิดบุคคล

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-006: ยา ตารางยา และ Medication Adherence

As a **Patient/Caregiver**,  
I want **จัดการยาและตอบรอบยา**,  
so that **ติดตามการกินยาโดยไม่บันทึกผิด**.

Priority: **P0**  
Source: SRS §5 — `FR-MED-001, FR-MED-002, FR-MED-003, FR-MED-004, FR-MED-005, FR-MED-006, FR-MED-007, FR-MED-008, FR-MED-009, FR-MED-010, FR-MED-011, FR-MED-012, FR-MED-013, FR-MED-014`

Acceptance Criteria:
- [ ] **FR-MED-001 (ทั้งสอง/Must)** ผู้ใช้ต้องเพิ่มยาโดยกรอกเอง ถ่ายรูป หรือยืนยันจาก OCR ได้
- [ ] **FR-MED-002 (ทั้งสอง/Must)** รายการยาต้องรองรับชื่อยา ชื่อสามัญ รูป ลักษณะ ขนาด วิธีใช้ ช่วงเวลา และแหล่งที่มา
- [ ] **FR-MED-003 (ทั้งสอง/Must)** ตารางยาต้องรองรับรายวัน หลายครั้งต่อวัน บางวัน ทุก N ชั่วโมง รายสัปดาห์ รายเดือน และตามอาการ
- [ ] **FR-MED-004 (ทั้งสอง/Must)** ระบบต้องสร้าง Dose Occurrence จาก Schedule อย่างสม่ำเสมอและรองรับ Time Zone/DST
- [ ] **FR-MED-005 (ทั้งสอง/Must)** ผู้ใช้ต้องตอบ กินแล้ว เตือนภายหลัง ข้าม หรือมีปัญหา/ผลข้างเคียง
- [ ] **FR-MED-006 (ทั้งสอง/Must)** ระบบต้องบันทึกเวลาที่ควรกิน เวลาที่ตอบ สถานะ เหตุผล และผู้บันทึก
- [ ] **FR-MED-007 (ทั้งสอง/Must)** ระบบห้ามเปลี่ยนสถานะเป็นกินแล้วอัตโนมัติเมื่อผู้ใช้ไม่ตอบ
- [ ] **FR-MED-008 (ทั้งสอง/Must)** ระบบต้องป้องกัน Double Submission ด้วย Idempotency Key และ Dose Version
- [ ] **FR-MED-009 (ทั้งสอง/Must)** เมื่อเกิน Grace Period ระบบต้อง Escalate ไปผู้ดูแลตาม Preference/Consent
- [ ] **FR-MED-010 (ทั้งสอง/Must)** การเปลี่ยนตารางยาต้องไม่แก้ประวัติ Dose ที่เกิดขึ้นแล้วแบบเงียบ
- [ ] **FR-MED-011 (ทั้งสอง/Should)** ระบบต้องคำนวณยาคงเหลือโดยประมาณและแจ้งเตือนยาใกล้หมด
- [ ] **FR-MED-012 (ทั้งสอง/Must)** รายการยาต้องมีสถานะ active, paused, completed, cancelled และเหตุผลการเปลี่ยน
- [ ] **FR-MED-013 (ทั้งสอง/Must)** ต้องแสดงคำเตือนว่าผู้ใช้ไม่ควรปรับยาโดยไม่ปรึกษาผู้เชี่ยวชาญ
- [ ] **FR-MED-014 (Phase 2/Must)** Local Notification ต้องทำงานสำหรับ Dose ที่ซิงก์แล้วตามข้อจำกัด OS

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-007: ข้อมูลสุขภาพ อาการ และแนวโน้ม

As a **Patient**,  
I want **บันทึกและดูแนวโน้มสุขภาพ**,  
so that **นำข้อมูลไปประกอบการพบแพทย์**.

Priority: **P0**  
Source: SRS §5 — `FR-HLT-001, FR-HLT-002, FR-HLT-003, FR-HLT-004, FR-HLT-005, FR-HLT-006, FR-HLT-007, FR-HLT-008, FR-HLT-009, FR-HLT-010`

Acceptance Criteria:
- [ ] **FR-HLT-001 (ทั้งสอง/Must)** ผู้ใช้ต้องบันทึกน้ำหนัก ส่วนสูง ความดัน ชีพจร น้ำตาล อุณหภูมิ SpO2 รอบเอว และอาการได้
- [ ] **FR-HLT-002 (ทั้งสอง/Must)** Measurement ต้องเก็บค่า หน่วย เวลา Time Zone แหล่งที่มา บริบท และผู้บันทึก
- [ ] **FR-HLT-003 (ทั้งสอง/Must)** ระบบต้องตรวจ Validation Range เพื่อป้องกันข้อมูลผิดรูปแบบ แต่ไม่วินิจฉัย
- [ ] **FR-HLT-004 (ทั้งสอง/Must)** ระบบต้องแสดงรายการย้อนหลัง กราฟรายวัน/สัปดาห์/เดือน ค่าเฉลี่ย และแนวโน้ม
- [ ] **FR-HLT-005 (ทั้งสอง/Must)** ผู้ใช้หรือบุคลากรที่ได้รับสิทธิ์ต้องกำหนด Threshold สำหรับแจ้งเตือนได้
- [ ] **FR-HLT-006 (ทั้งสอง/Must)** เมื่อค่าอยู่นอก Threshold ระบบต้องแนะนำให้วัดซ้ำ/ติดต่อผู้ดูแลหรือสถานพยาบาลตามข้อความที่อนุมัติ
- [ ] **FR-HLT-007 (ทั้งสอง/Must)** ระบบห้ามวินิจฉัย เพิ่ม ลด หรือหยุดยาอัตโนมัติ
- [ ] **FR-HLT-008 (Phase 2/Should)** ระบบต้องนำเข้าข้อมูลจาก HealthKit/Health Connect เมื่อผู้ใช้ให้ Consent
- [ ] **FR-HLT-009 (Phase 2/Could)** ระบบต้องรองรับอุปกรณ์ Bluetooth ที่อยู่ใน Approved Device List
- [ ] **FR-HLT-010 (ทั้งสอง/Must)** ข้อมูลนำเข้าต้องเก็บ Source, Device และ Deduplication Key

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-008: เสียง Speech-to-Text และคำแนะนำ

As a **Patient**,  
I want **บันทึกเสียงและตรวจข้อความ**,  
so that **จำคำแนะนำได้โดยได้รับ consent**.

Priority: **P0**  
Source: SRS §5 — `FR-STT-001, FR-STT-002, FR-STT-003, FR-STT-004, FR-STT-005, FR-STT-006, FR-STT-007, FR-STT-008`

Acceptance Criteria:
- [ ] **FR-STT-001 (ทั้งสอง/Must)** ก่อนบันทึกเสียงต้องแสดงข้อความให้ผู้ใช้ยืนยันว่าได้รับอนุญาตจากผู้พูด
- [ ] **FR-STT-002 (ทั้งสอง/Must)** ผู้ใช้ต้องเริ่ม หยุดชั่วคราว หยุด ตั้งชื่อ และเชื่อมเสียงกับนัด/ยาได้
- [ ] **FR-STT-003 (ทั้งสอง/Must)** ระบบต้องอัปโหลดและประมวลผล STT แบบ Asynchronous พร้อม Progress/Retry
- [ ] **FR-STT-004 (ทั้งสอง/Must)** ระบบต้องเก็บเสียงต้นฉบับตาม Retention/Consent และให้ผู้ใช้ลบได้
- [ ] **FR-STT-005 (ทั้งสอง/Must)** ข้อความ STT ต้องแก้ไข ค้นหา และอ้างอิง Timestamp ในเสียงได้เมื่อ Provider รองรับ
- [ ] **FR-STT-006 (ทั้งสอง/Should)** ระบบอาจสรุปประเด็น สร้าง Checklist และตรวจจับวันนัด/ยา
- [ ] **FR-STT-007 (ทั้งสอง/Must)** ผลที่กระทบนัดหรือยาต้องผ่าน Human Confirmation ก่อนบันทึก
- [ ] **FR-STT-008 (ทั้งสอง/Must)** ระบบต้องแสดงว่าข้อความหรือสรุปสร้างจาก AI และอาจมีข้อผิดพลาด

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-009: เช็กลิสต์และคำถามสำหรับแพทย์

As a **Patient**,  
I want **ติดตามคำแนะนำและเตรียมคำถาม**,  
so that **ปฏิบัติตามแผนและสื่อสารครบ**.

Priority: **P0**  
Source: SRS §5 — `FR-CHK-001, FR-CHK-002, FR-CHK-003, FR-CHK-004, FR-CHK-005, FR-CHK-006, FR-CHK-007, FR-CHK-008`

Acceptance Criteria:
- [ ] **FR-CHK-001 (ทั้งสอง/Must)** ผู้ใช้ต้องสร้าง Checklist จากการกรอกเอง OCR หรือ STT ได้
- [ ] **FR-CHK-002 (ทั้งสอง/Must)** Checklist ต้องรองรับความถี่ วันเวลา เป้าหมาย วันเริ่ม/สิ้นสุด และผู้สร้าง
- [ ] **FR-CHK-003 (ทั้งสอง/Must)** ผู้ใช้ต้องทำเครื่องหมายสำเร็จ ไม่สำเร็จ เหตุผล หมายเหตุ และแนบรูปได้
- [ ] **FR-CHK-004 (ทั้งสอง/Must)** ระบบต้องแสดงความคืบหน้า Streak และอัตราความสำเร็จโดยไม่ตีความเป็นผลการรักษา
- [ ] **FR-CHK-005 (ทั้งสอง/Must)** ระบบห้ามแก้ไขคำแนะนำของแพทย์โดยอัตโนมัติ
- [ ] **FR-CHK-006 (ทั้งสอง/Must)** ผู้ใช้ต้องบันทึกคำถามด้วยข้อความ เสียง รูป หรือจากเหตุการณ์สุขภาพได้
- [ ] **FR-CHK-007 (ทั้งสอง/Must)** คำถามต้องเชื่อมกับนัด จัดหมวด ความสำคัญ สถานะถามแล้ว และคำตอบ
- [ ] **FR-CHK-008 (ทั้งสอง/Must)** วันนัดต้องแสดงคำถามทั้งหมดในมุมมองเดียวตามลำดับความสำคัญ

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-010: การแจ้งเตือนและ Escalation

As a **Patient/Caregiver**,  
I want **รับ reminder และ escalation**,  
so that **ลดการพลาดกิจกรรมสำคัญ**.

Priority: **P0**  
Source: SRS §5 — `FR-NOT-001, FR-NOT-002, FR-NOT-003, FR-NOT-004, FR-NOT-005, FR-NOT-006, FR-NOT-007, FR-NOT-008, FR-NOT-009, FR-NOT-010`

Acceptance Criteria:
- [ ] **FR-NOT-001 (ทั้งสอง/Must)** ระบบต้องรองรับ Reminder นัด ยา Checklist ยาใกล้หมด และ Threshold
- [ ] **FR-NOT-002 (ทั้งสอง/Must)** ผู้ใช้ต้องกำหนดช่องทาง เวลา Quiet Hours และระดับการเปิดเผยข้อความบน Lock Screen
- [ ] **FR-NOT-003 (ทั้งสอง/Must)** ระบบต้องบันทึก scheduled, sent, delivered เมื่อทราบ, opened, actioned, failed และ suppressed
- [ ] **FR-NOT-004 (ทั้งสอง/Must)** การส่งซ้ำต้องมี Deduplication และ Retry ด้วย Backoff
- [ ] **FR-NOT-005 (ทั้งสอง/Must)** ระบบต้อง Escalate ไปผู้ดูแลเฉพาะเมื่อมี Permission และกติกาที่ผู้ป่วยกำหนด
- [ ] **FR-NOT-006 (Phase 1/Must)** PWA ต้องตรวจความสามารถ Web Push และแสดง Fallback เมื่อไม่รองรับ
- [ ] **FR-NOT-007 (Phase 2/Must)** Mobile App ต้องรองรับ Native Push และ Local Notification
- [ ] **FR-NOT-008 (Phase 2/Must)** Mobile App ต้องแจ้งผู้ใช้เมื่อ Notification ถูกปิดหรือ OS จำกัด Background
- [ ] **FR-NOT-009 (ทั้งสอง/Must)** ระบบห้ามรับประกัน Delivery 100% และต้องมี In-app Upcoming List เป็นแหล่งสำรอง
- [ ] **FR-NOT-010 (ทั้งสอง/Should)** ช่องทางสำรอง Email/SMS/LINE ต้องเปิดผ่าน Feature Flag และ Cost Control

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-011: แผนที่ การเดินทาง และสถานที่

As a **Patient/Caregiver**,  
I want **เปิดแผนที่และวางเวลาเดินทาง**,  
so that **ไปถึงสถานพยาบาลทัน**.

Priority: **P0**  
Source: SRS §5 — `FR-MAP-001, FR-MAP-002, FR-MAP-003, FR-MAP-004, FR-MAP-005, FR-MAP-006, FR-MAP-007`

Acceptance Criteria:
- [ ] **FR-MAP-001 (ทั้งสอง/Must)** ผู้ใช้ต้องเปิดตำแหน่งสถานพยาบาลและนำทางด้วย External Map ได้
- [ ] **FR-MAP-002 (ทั้งสอง/Must)** ระบบต้องเก็บพิกัด ที่อยู่ อาคาร ห้อง จุดจอดรถ และหมายเหตุการเดินทางได้
- [ ] **FR-MAP-003 (ทั้งสอง/Should)** ระบบต้องคำนวณเวลาแนะนำให้ออกเดินทางจากเวลานัด เวลาเดินทาง และ Buffer
- [ ] **FR-MAP-004 (ทั้งสอง/Should)** ระบบต้องแสดงระยะทาง เวลาเดินทาง และรูปแบบการเดินทางเมื่อ Provider รองรับ
- [ ] **FR-MAP-005 (ทั้งสอง/Must)** Location Permission ต้องขอเมื่อใช้ฟังก์ชันและอธิบายวัตถุประสงค์
- [ ] **FR-MAP-006 (Phase 2/Could)** ระบบอาจรองรับ Background Location/Geofencing เมื่อผ่าน Privacy Review
- [ ] **FR-MAP-007 (ทั้งสอง/Must)** ระบบต้องมี Fallback ให้เปิดแผนที่ภายนอกหรือโทรสถานพยาบาลเมื่อ Map API ขัดข้อง

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-012: SOS และข้อมูลฉุกเฉิน

As a **Patient**,  
I want **เริ่ม SOS และแชร์ข้อมูลที่เลือก**,  
so that **ขอความช่วยเหลือได้เร็วขึ้น**.

Priority: **P0**  
Source: SRS §5 — `FR-SOS-001, FR-SOS-002, FR-SOS-003, FR-SOS-004, FR-SOS-005, FR-SOS-006, FR-SOS-007, FR-SOS-008`

Acceptance Criteria:
- [ ] **FR-SOS-001 (ทั้งสอง/Must)** ปุ่ม SOS ต้องเข้าถึงง่ายและใช้การกดค้างหรือยืนยันเพื่อป้องกันการกดผิด
- [ ] **FR-SOS-002 (ทั้งสอง/Must)** ผู้ใช้ต้องเลือกโทรผู้ดูแล หมายเลขฉุกเฉิน ส่งข้อความ และส่งตำแหน่งตามความสามารถ
- [ ] **FR-SOS-003 (ทั้งสอง/Must)** ระบบต้องแสดงสถานะการส่งสำเร็จ/ล้มเหลวและทางเลือกโทรโดยตรง
- [ ] **FR-SOS-004 (ทั้งสอง/Must)** Emergency Payload ต้องมีเฉพาะข้อมูลที่ผู้ใช้อนุญาต
- [ ] **FR-SOS-005 (ทั้งสอง/Must)** ระบบต้องบันทึกเหตุการณ์ SOS การยกเลิก และการแจ้งว่าปลอดภัยแล้ว
- [ ] **FR-SOS-006 (ทั้งสอง/Must)** ระบบต้องแสดงชัดเจนว่า Mo-nut ไม่ใช่บริการการแพทย์ฉุกเฉิน
- [ ] **FR-SOS-007 (Phase 2/Should)** Mobile App อาจแชร์ตำแหน่งต่อเนื่องตามระยะเวลาที่ผู้ใช้กำหนดและ OS Policy
- [ ] **FR-SOS-008 (ทั้งสอง/Must)** การยกเลิก SOS ต้องไม่ลบ Audit Log ของเหตุการณ์

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-013: รายงาน การส่งออก และลิงก์แชร์

As a **Patient**,  
I want **สร้างรายงานและลิงก์หมดอายุ**,  
so that **แชร์ข้อมูลขั้นต่ำอย่างควบคุมได้**.

Priority: **P0**  
Source: SRS §5 — `FR-RPT-001, FR-RPT-002, FR-RPT-003, FR-RPT-004, FR-RPT-005, FR-RPT-006, FR-RPT-007, FR-RPT-008`

Acceptance Criteria:
- [ ] **FR-RPT-001 (ทั้งสอง/Must)** ผู้ใช้ต้องสร้างรายงาน 7 วัน 30 วัน 3 เดือน หรือช่วงกำหนดเองได้
- [ ] **FR-RPT-002 (ทั้งสอง/Must)** ผู้ใช้ต้องเลือกหมวดข้อมูลที่จะรวมในรายงาน
- [ ] **FR-RPT-003 (ทั้งสอง/Must)** ระบบต้องสร้าง PDF ที่อ่านง่าย มีวันที่สร้าง Time Zone และ Disclaimer
- [ ] **FR-RPT-004 (ทั้งสอง/Must)** ลิงก์แชร์ต้องมี Token แบบสุ่ม วันหมดอายุ Scope และเพิกถอนได้
- [ ] **FR-RPT-005 (ทั้งสอง/Must)** การเปิดลิงก์ ดาวน์โหลด และเพิกถอนต้องมี Audit Log
- [ ] **FR-RPT-006 (ทั้งสอง/Must)** QR Code ต้องอ้างอิงลิงก์ที่ควบคุมสิทธิ์ ไม่ฝังข้อมูลสุขภาพจำนวนมากโดยตรง
- [ ] **FR-RPT-007 (ทั้งสอง/Must)** ผู้ใช้ต้องร้องขอ Export ข้อมูลส่วนบุคคลในรูปแบบที่อ่านได้และ Machine-readable ตามนโยบาย
- [ ] **FR-RPT-008 (ทั้งสอง/Must)** ระบบต้องป้องกัน Search Engine Indexing ของลิงก์แชร์และตั้ง Security Header ที่เหมาะสม

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-014: เนื้อหาความรู้

As a **Patient**,  
I want **อ่านเนื้อหาที่ตรวจสอบแล้ว**,  
so that **เข้าใจการดูแลตนเองอย่างปลอดภัย**.

Priority: **P0**  
Source: SRS §5 — `FR-CMS-001, FR-CMS-002, FR-CMS-003, FR-CMS-004, FR-CMS-005`

Acceptance Criteria:
- [ ] **FR-CMS-001 (ทั้งสอง/Should)** ระบบต้องแสดงบทความ/สื่อสุขภาพที่ผ่านการอนุมัติ
- [ ] **FR-CMS-002 (ทั้งสอง/Must)** เนื้อหาทางการแพทย์ต้องมีผู้ตรวจ แหล่งที่มา วันที่ทบทวน และเวอร์ชัน
- [ ] **FR-CMS-003 (ทั้งสอง/Must)** ระบบต้องรองรับ draft, review, approved, published, archived
- [ ] **FR-CMS-004 (ทั้งสอง/Must)** เนื้อหาต้องแยกจากคำแนะนำเฉพาะบุคคลและมี Disclaimer
- [ ] **FR-CMS-005 (ทั้งสอง/Should)** Admin ต้องกำหนดกลุ่มเป้าหมาย ภาษา และช่วงเวลาเผยแพร่ได้

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-015: ระบบผู้ดูแลและองค์กร

As a **Admin/Organization Staff**,  
I want **จัดการองค์กรและเหตุการณ์ระบบ**,  
so that **ดำเนินงานตาม least privilege**.

Priority: **P0**  
Source: SRS §5 — `FR-ADM-001, FR-ADM-002, FR-ADM-003, FR-ADM-004, FR-ADM-005, FR-ADM-006, FR-ADM-007`

Acceptance Criteria:
- [ ] **FR-ADM-001 (ทั้งสอง/Must)** Admin ต้องจัดการบัญชี สถานะผู้ใช้ องค์กร และบทบาทได้ตาม Least Privilege
- [ ] **FR-ADM-002 (ทั้งสอง/Must)** การเข้าถึงข้อมูลผู้ป่วยโดย Admin/Support ต้องมีเหตุผล Ticket และ Audit
- [ ] **FR-ADM-003 (ทั้งสอง/Must)** ระบบต้องรองรับ Feature Flag และ Configuration แยก Environment
- [ ] **FR-ADM-004 (ทั้งสอง/Must)** Admin ต้องตรวจ Notification Failure, OCR Failure, Sync Failure และ Service Health ได้
- [ ] **FR-ADM-005 (ทั้งสอง/Must)** ระบบต้องรองรับ Incident Record และการเชื่อม Correlation ID
- [ ] **FR-ADM-006 (ทั้งสอง/Should)** องค์กรต้องกำหนด Staff Role และขอบเขตผู้ป่วยตามโครงการนำร่องได้
- [ ] **FR-ADM-007 (ทั้งสอง/Must)** ห้าม Admin แก้ข้อมูลสุขภาพโดยตรงโดยไม่มี Use Case และ Audit ที่อนุมัติ

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-016: Offline และการซิงก์

As a **Patient**,  
I want **ใช้งาน core action ขณะ offline**,  
so that **ข้อมูลซิงก์โดยไม่ซ้ำหรือสูญหาย**.

Priority: **P0**  
Source: SRS §5 — `FR-SYNC-001, FR-SYNC-002, FR-SYNC-003, FR-SYNC-004, FR-SYNC-005, FR-SYNC-006, FR-SYNC-007, FR-SYNC-008, FR-SYNC-009, FR-SYNC-010`

Acceptance Criteria:
- [ ] **FR-SYNC-001 (ทั้งสอง/Must)** Client ต้องสร้าง Client-generated UUID และ Idempotency Key สำหรับคำสั่ง Offline ที่อนุญาต
- [ ] **FR-SYNC-002 (ทั้งสอง/Must)** ระบบต้องมี Outbox Queue พร้อมสถานะ pending, syncing, synced, failed, conflict
- [ ] **FR-SYNC-003 (ทั้งสอง/Must)** Server ต้องตรวจ Version/ETag/updatedAt ก่อนแก้ไขข้อมูลที่มีความเสี่ยง
- [ ] **FR-SYNC-004 (ทั้งสอง/Must)** ข้อมูลนัด ยา Consent และ Permission ต้องไม่ใช้ Last-write-wins แบบเงียบเมื่อ Conflict
- [ ] **FR-SYNC-005 (ทั้งสอง/Must)** ระบบต้องแสดง Conflict ให้ผู้ใช้เลือกหรือใช้กฎ Merge ที่อนุมัติราย Entity
- [ ] **FR-SYNC-006 (ทั้งสอง/Must)** Retry ต้องใช้ Exponential Backoff และไม่สร้างข้อมูลซ้ำ
- [ ] **FR-SYNC-007 (Phase 1/Must)** PWA ต้อง Cache เฉพาะข้อมูลที่อนุมัติและมี Offline Fallback
- [ ] **FR-SYNC-008 (Phase 2/Must)** Mobile App ต้องใช้ Local Database เข้ารหัสและล้างข้อมูลเมื่อ Logout/Revoke ตาม Policy
- [ ] **FR-SYNC-009 (ทั้งสอง/Must)** ระบบต้องแสดง Last Sync Time และจำนวนรายการรอซิงก์
- [ ] **FR-SYNC-010 (ทั้งสอง/Must)** ทุก Conflict Resolution ต้องมี Audit Log

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-017: AI Governance และ Human Confirmation

As a **Patient/Product Team**,  
I want **เห็นแหล่งที่มาและยืนยันผล AI**,  
so that **ป้องกันการนำข้อมูลผิดไปใช้**.

Priority: **P0**  
Source: SRS §5 — `FR-AI-001, FR-AI-002, FR-AI-003, FR-AI-004, FR-AI-005, FR-AI-006, FR-AI-007`

Acceptance Criteria:
- [ ] **FR-AI-001 (ทั้งสอง/Must)** ทุกผลลัพธ์ AI ต้องระบุแหล่งที่มา Provider/Model Version และสถานะการตรวจสอบ
- [ ] **FR-AI-002 (ทั้งสอง/Must)** ระบบต้องไม่ใช้ AI วินิจฉัยโรค ปรับยา หรือสร้างคำสั่งรักษาใหม่
- [ ] **FR-AI-003 (ทั้งสอง/Must)** ระบบต้องเก็บต้นฉบับที่ใช้ตรวจสอบตาม Retention/Consent
- [ ] **FR-AI-004 (ทั้งสอง/Must)** ข้อมูลต้องไม่ถูกนำไปฝึกโมเดลภายนอกโดยไม่มีฐานกฎหมายและ Consent ที่ชัดเจน
- [ ] **FR-AI-005 (ทั้งสอง/Must)** Prompt/Response Logging ต้องปิดหรือ Redact PHI ตามนโยบาย
- [ ] **FR-AI-006 (ทั้งสอง/Must)** เมื่อ AI Provider ขัดข้อง ผู้ใช้ต้องกรอกข้อมูลเองและไม่ถูกบล็อก Core Journey
- [ ] **FR-AI-007 (ทั้งสอง/Should)** ระบบต้องเก็บ Accuracy Feedback หลังผู้ใช้แก้ผล OCR/STT เพื่อปรับปรุงคุณภาพโดยไม่เปิดเผยตัวตนเกินจำเป็น

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-018: บุคลากรทางการแพทย์และ Doctor Lite

As a **Clinician**,  
I want **ดูข้อมูลที่ผู้ป่วยอนุญาต**,  
so that **ทบทวนข้อมูลได้โดยไม่เป็น HIS เต็มรูปแบบ**.

Priority: **P0**  
Source: SRS §5 — `FR-CLN-001, FR-CLN-002, FR-CLN-003, FR-CLN-004, FR-CLN-005, FR-CLN-006, FR-CLN-007, FR-CLN-008, FR-CLN-009, FR-CLN-010`

Acceptance Criteria:
- [ ] **FR-CLN-001 (Phase 1/Must)** บุคลากรทางการแพทย์ต้องเข้าถึงข้อมูลผู้ป่วยได้เฉพาะเมื่อมี Consent และ Scope ที่ยังมีผล
- [ ] **FR-CLN-002 (Phase 1/Must)** Doctor Lite ต้องแสดงข้อมูลสรุป นัด รายการยา ค่าสุขภาพ เช็กลิสต์ และคำถามตาม Scope ที่ผู้ป่วยอนุญาต
- [ ] **FR-CLN-003 (ทั้งสอง/Must)** Clinician ต้องไม่เห็นผู้ป่วยนอก Organization/Consent Context ของตน
- [ ] **FR-CLN-004 (ทั้งสอง/Must)** ระบบต้องบันทึก Audit เมื่อ Clinician เปิดดู ดาวน์โหลด เพิ่มคำแนะนำ หรือแก้ข้อมูลที่ได้รับอนุญาต
- [ ] **FR-CLN-005 (ทั้งสอง/Must)** Clinician ต้องเพิ่มคำแนะนำ เป้าหมาย เช็กลิสต์ และนัดครั้งถัดไปได้เฉพาะสิทธิ์ที่ได้รับ
- [ ] **FR-CLN-006 (ทั้งสอง/Must)** ข้อมูลที่ Clinician เพิ่มต้องระบุผู้สร้าง องค์กร ตำแหน่งวิชาชีพ เวลา และสถานะการยืนยัน
- [ ] **FR-CLN-007 (ทั้งสอง/Must)** การแก้ไขรายการยาหรือคำแนะนำจาก Clinician ต้องมี Version/History และไม่ลบประวัติเดิมแบบเงียบ
- [ ] **FR-CLN-008 (Phase 2/Should)** ระบบควรรองรับ Workflow โครงการนำร่องที่ Clinician ดูรายชื่อผู้ป่วยที่อนุญาตและผู้ป่วยที่มีนัดวันนี้
- [ ] **FR-CLN-009 (ทั้งสอง/Must)** Doctor Lite ต้องแสดง Disclaimer ว่าไม่ใช่ระบบเวชระเบียนหลักของสถานพยาบาล
- [ ] **FR-CLN-010 (ทั้งสอง/Must)** เมื่อ Consent หมดอายุหรือถูกถอน Clinician ต้องสูญเสียการเข้าถึงใหม่ตาม SLA และลิงก์/Session ที่เกี่ยวข้องต้องถูกเพิกถอน

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

### US-019: Dashboard และ Read Model ตามบทบาท

As a **All roles**,  
I want **เห็นข้อมูลสำคัญตามบทบาท**,  
so that **ดำเนินงานหลักได้รวดเร็ว**.

Priority: **P0**  
Source: SRS §5 — `FR-DASH-001, FR-DASH-002, FR-DASH-003, FR-DASH-004, FR-DASH-005, FR-DASH-006, FR-DASH-007, FR-DASH-008`

Acceptance Criteria:
- [ ] **FR-DASH-001 (ทั้งสอง/Must)** Dashboard ผู้ป่วยต้องแสดงยารอบถัดไป นัดครั้งถัดไป งานวันนี้ ค่าสุขภาพล่าสุด Quick Capture และ SOS
- [ ] **FR-DASH-002 (ทั้งสอง/Must)** Dashboard ผู้ดูแลต้องแสดงรายชื่อผู้ป่วยที่มีสิทธิ์ นัดใกล้ถึง Dose ที่ยังไม่ยืนยัน ยาใกล้หมด Checklist และ SOS
- [ ] **FR-DASH-003 (ทั้งสอง/Must)** Dashboard Clinician ต้องแสดงเฉพาะผู้ป่วยและข้อมูลที่มี Consent/Organization Scope
- [ ] **FR-DASH-004 (ทั้งสอง/Must)** Read Model ของ Dashboard ต้องสร้างจาก Source Entity ที่ระบุชัด และสามารถ Rebuild ได้โดยไม่เป็น Source of Truth ใหม่
- [ ] **FR-DASH-005 (ทั้งสอง/Must)** ข้อมูล Dashboard ต้องแสดงเวลาซิงก์ล่าสุดและสถานะข้อมูลเมื่อ Offline หรืออาจล้าสมัย
- [ ] **FR-DASH-006 (ทั้งสอง/Must)** การ์ดหรือ Action บน Dashboard ต้องเคารพ Permission ฝั่ง Server และไม่อาศัยการซ่อน UI เพียงอย่างเดียว
- [ ] **FR-DASH-007 (ทั้งสอง/Should)** ผู้ใช้ต้องปรับลำดับการ์ดที่ไม่สำคัญได้ โดยการ์ด SOS และการแจ้งเตือนความเสี่ยงไม่ควรถูกซ่อนโดยไม่เตือน
- [ ] **FR-DASH-008 (ทั้งสอง/Must)** Dashboard ต้องมี Loading, Empty, Error, Permission Denied และ Offline State ที่เข้าใจง่าย

Dependencies:
- API contract/schema published
- Permission and audit behavior defined

Risks/Notes:
- Test error, permission, offline and duplicate/conflict paths where applicable

## 4. Cross-cutting non-functional backlog

| Work item | Requirement | Priority |
|---|---|---|
| Performance | `NFR-PERF-001` — หน้าหลักต้องแสดงข้อมูลสำคัญภายใน 3 วินาทีที่ p75 บนเครือข่ายมือถือปกติหลัง Authentication | P0/P1 according to phase gate |
| Performance | `NFR-PERF-002` — การกดยืนยัน Dose/Checklist ต้องให้ Visual Feedback ภายใน 100 ms และบันทึก Local/Server ภายใน 2 วินาทีเมื่อออนไลน์ | P0/P1 according to phase gate |
| Performance | `NFR-PERF-003` — API อ่านทั่วไปเป้าหมาย p95 ไม่เกิน 800 ms ไม่รวมบริการภายนอก | P0/P1 according to phase gate |
| Performance | `NFR-PERF-004` — API คำสั่งทั่วไปเป้าหมาย p95 ไม่เกิน 1,500 ms ไม่รวมงาน Async | P0/P1 according to phase gate |
| Performance | `NFR-PERF-005` — งาน OCR/STT/PDF ต้องเป็น Async และแสดง Progress/Status | P0/P1 according to phase gate |
| Performance | `NFR-PERF-006` — รายการ Time-series ต้องใช้ Pagination/Cursor และห้ามโหลดไม่จำกัด | P0/P1 according to phase gate |
| Availability และ Resilience | `NFR-AVL-001` — Phase 1 เป้าหมาย Availability ของบริการกลางไม่น้อยกว่า 99.5% ต่อเดือน ยกเว้น Planned Maintenance | P0/P1 according to phase gate |
| Availability และ Resilience | `NFR-AVL-002` — ก่อนขยายองค์กรใน Phase 2 ให้ประเมินเป้าหมาย 99.9% และ SLA ตามงบประมาณ | P0/P1 according to phase gate |
| Availability และ Resilience | `NFR-AVL-003` — Critical API ต้องมี Timeout, Retry เฉพาะคำสั่ง Idempotent และ Circuit Breaker สำหรับ Dependency | P0/P1 according to phase gate |
| Availability และ Resilience | `NFR-AVL-004` — ระบบต้องมี Backup และ Restore Drill ตามรอบที่กำหนด | P0/P1 according to phase gate |
| Availability และ Resilience | `NFR-AVL-005` — RPO เป้าหมายเริ่มต้นไม่เกิน 24 ชั่วโมงสำหรับ Backup และใกล้ศูนย์สำหรับข้อมูล Transactional ที่ Commit แล้วตามบริการที่ใช้ | P0/P1 according to phase gate |
| Availability และ Resilience | `NFR-AVL-006` — RTO เป้าหมายเริ่มต้น 8 ชั่วโมงสำหรับเหตุร้ายแรง และต้องทบทวนก่อน B2B SLA | P0/P1 according to phase gate |

## 5. Phase acceptance traceability

| Acceptance criterion | Backlog coverage |
|---|---|
| `AC-P1-001` — ผู้ป่วยสมัคร เข้าสู่ระบบ และสร้างโปรไฟล์ได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-002` — สร้างนัดจากรูปและยืนยัน OCR ก่อนบันทึกได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-003` — ตั้ง Reminder และรับ In-app/Web Push หรือ Fallback ที่กำหนดได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-004` — เพิ่มยา ตารางยา และตอบสถานะ Dose ได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-005` — ผู้ดูแลได้รับ Escalation เมื่อพลาดยาตาม Permission | Validate against related US/API/E2E before phase release |
| `AC-P1-006` — บันทึกและดูกราฟข้อมูลสุขภาพพื้นฐานได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-007` — บันทึกเสียง ทำ STT และแก้ไขก่อนนำไปใช้ได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-008` — สร้าง Checklist และคำถามแพทย์ได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-009` — เปิดแผนที่และใช้ Doctor Visit Mode ได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-010` — SOS โทร/ส่งตำแหน่งตาม Permission พร้อมแสดงผลส่งได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-011` — ผู้ป่วยให้ ถอน และตรวจประวัติการแชร์ได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-012` — สร้าง PDF/Expiring Share Link และเพิกถอนได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-013` — คำสั่ง Offline ที่กำหนดเข้าคิวและซิงก์โดยไม่ซ้ำได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-013A` — Doctor Lite แสดงข้อมูลตาม Consent และหยุดเข้าถึงเมื่อถอนสิทธิ์ได้ | Validate against related US/API/E2E before phase release |
| `AC-P1-014` — ผ่าน Security, Privacy, Accessibility และ Usability Gate | Validate against related US/API/E2E before phase release |
| `AC-P1-015` — ไม่มี Critical Data Loss, Cross-patient Access หรือ Medication/Appointment Corruption | Validate against related US/API/E2E before phase release |
| `AC-P2-001` — Android/iOS รองรับ Core Journey ที่อนุมัติ | Validate against related US/API/E2E before phase release |
| `AC-P2-002` — ผู้ใช้ PWA เข้าด้วยบัญชีเดิมและเห็นข้อมูลเดิมครบ | Validate against related US/API/E2E before phase release |
| `AC-P2-003` — PWA/Mobile ซิงก์ข้ามช่องทางโดยไม่สร้างข้อมูลซ้ำ | Validate against related US/API/E2E before phase release |
| `AC-P2-004` — Native Push/Local Notification ผ่าน Device/OS Test Matrix | Validate against related US/API/E2E before phase release |
| `AC-P2-005` — แอปแนะนำเมื่อ Notification/Background ถูกจำกัด | Validate against related US/API/E2E before phase release |
| `AC-P2-006` — Biometric, Secure Storage และ Encrypted Local DB ผ่าน Security Test | Validate against related US/API/E2E before phase release |
| `AC-P2-007` — Offline Core Journey และ Conflict Handling ผ่าน | Validate against related US/API/E2E before phase release |
| `AC-P2-008` — Camera, Microphone, Share, Deep Link ทำงานบนอุปกรณ์จริง | Validate against related US/API/E2E before phase release |
| `AC-P2-009` — Health/Bluetooth/Location ขอ Consent ตามบริบทและเพิกถอนได้ | Validate against related US/API/E2E before phase release |
| `AC-P2-010` — Crash Reporting, Monitoring, Release Tracking และ Incident Process พร้อม | Validate against related US/API/E2E before phase release |
| `AC-P2-011` — ไม่มี Critical Crash, Data Loss หรือ Permission Escalation | Validate against related US/API/E2E before phase release |
| `AC-P2-012` — PWA/Web Portal และ Doctor Lite ยังคงทำงานร่วมกับ Mobile App | Validate against related US/API/E2E before phase release |
| `AC-P2-013` — Store Disclosure, Privacy Policy, Support และเอกสารผู้ใช้พร้อม | Validate against related US/API/E2E before phase release |

## 6. Blockers requiring decisions
- [!] Framework PWA และ Cross-platform Mobile App
- [!] Firebase Functions เทียบกับ Cloud Run สำหรับแต่ละ Service
- [!] OCR/STT Provider, Region, Data Retention และ Cost
- [!] Map Provider และรูปแบบค่าใช้จ่าย
- [!] ช่องทางสำรอง SMS/Email/LINE และผู้รับผิดชอบค่าใช้จ่าย
- [!] Browser/OS Version ขั้นต่ำ
- [!] Retention Period ของเสียง เอกสาร Audit และ Notification Log
- [!] Threshold/ข้อความเตือนที่ต้องผ่านผู้เชี่ยวชาญทางการแพทย์
- [!] Legal basis/Consent flow สำหรับผู้เยาว์หรือผู้แทนโดยชอบธรรม
- [!] SLA ของการถอนสิทธิ์ Data Export และ Account Deletion
- [!] รายการ Health/Bluetooth Device ที่อนุมัติใน Phase 2
