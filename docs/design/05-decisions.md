# 05 — Architecture Decision Records

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Accepted decisions derived from SRS

## ADR-001: Two-phase delivery

Status: Accepted  
Date: 2026-06-24

### Context
ต้องนำผลิตภัณฑ์ออกทดสอบเร็ว แต่ PWA มีข้อจำกัด notification/offline/device integration

### Decision
Phase 1 เป็น Mobile-first PWA; Phase 2 เป็น Cross-platform Android/iOS โดยใช้บัญชี API กฎธุรกิจ และข้อมูลเดิม

### Consequences
ต้องรักษา API compatibility, migration tests และ PWA ระหว่าง mobile rollout

---

## ADR-002: API-first and server-authoritative business rules

Status: Accepted  
Date: 2026-06-24

### Decision
Client ใช้ versioned API; permission, consent, dose/appointment transition, share link และ audit ทำที่ server

### Consequences
ต้องมี OpenAPI/mock/generated client ก่อน feature implementation

---

## ADR-003: Firebase as initial infrastructure behind adapters

Status: Accepted  
Date: 2026-06-24

### Decision
ใช้ Firebase Auth/Firestore/Storage/FCM เป็น reference infrastructure โดย domain และ public API ไม่ผูก Firebase types/document paths

### Alternatives Considered
- Direct client-to-Firestore: rejected for high-risk data/business rules
- PostgreSQL from day one: possible but not selected by source

### Consequences
ต้องสร้าง repository adapter, canonical model และ migration tests

---

## ADR-004: Human confirmation for OCR/STT/AI

Status: Accepted  
Date: 2026-06-24

### Decision
ผลจาก OCR/STT/AI เป็น proposed draft จนผู้ใช้ตรวจและยืนยัน ห้ามเปลี่ยนนัด/ยาอัตโนมัติ

### Consequences
ทุก AI flow ต้องมี review UI, confidence, original asset และ audit

---

## ADR-005: Canonical IDs, time and versioning

Status: Accepted  
Date: 2026-06-24

### Decision
ใช้ UUID/ULID, UTC timestamps + IANA time zone, `schemaVersion` และ entity `version`

### Consequences
ห้ามใช้ Firestore document ID/type เป็น public contract

---

## ADR-006: Consent and least privilege

Status: Accepted  
Date: 2026-06-24

### Decision
ผู้ป่วยควบคุม scope/purpose/expiry; revoke ต้องหยุด access ใหม่และเพิกถอน artifacts ที่เกี่ยวข้อง

### Consequences
ต้องมี permission matrix, audit evidence และ online-only sensitive changes

## 2. Open decisions

## ADR-101: Framework PWA และ Cross-platform Mobile App

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-102: Firebase Functions เทียบกับ Cloud Run สำหรับแต่ละ Service

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-103: OCR/STT Provider, Region, Data Retention และ Cost

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-104: Map Provider และรูปแบบค่าใช้จ่าย

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-105: ช่องทางสำรอง SMS/Email/LINE และผู้รับผิดชอบค่าใช้จ่าย

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-106: Browser/OS Version ขั้นต่ำ

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-107: Retention Period ของเสียง เอกสาร Audit และ Notification Log

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-108: Threshold/ข้อความเตือนที่ต้องผ่านผู้เชี่ยวชาญทางการแพทย์

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-109: Legal basis/Consent flow สำหรับผู้เยาว์หรือผู้แทนโดยชอบธรรม

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-110: SLA ของการถอนสิทธิ์ Data Export และ Account Deletion

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## ADR-111: รายการ Health/Bluetooth Device ที่อนุมัติใน Phase 2

Status: Proposed  
Date: TBD

### Context
SRS ระบุว่าต้องตัดสินใจก่อน implementation หรือก่อน phase ที่เกี่ยวข้อง

### Decision
TBD

### Alternatives Considered
TBD หลัง technical spike / legal / cost review

### Consequences
ห้ามถือว่าเลือกแล้วจนสถานะเป็น Accepted

### Follow-up
- [ ] ระบุ owner
- [ ] ระบุ decision deadline
- [ ] บันทึก evidence/tradeoff

## 3. Rejected alternatives

| Alternative | Status | Reason |
|---|---|---|
| Direct UI access to Firestore for critical data | Rejected | permission/business-rule consistency and migration risk |
| Auto-apply OCR/STT/AI to medication/appointment | Rejected | safety and data integrity |
| Build separate backend/database for Phase 2 | Rejected | duplicated logic, account/data fragmentation |
| Mark unanswered dose as taken | Rejected | violates medication integrity |

## 4. ADR template

```md
## ADR-000: Title

Status: Proposed | Accepted | Superseded | Rejected
Date: YYYY-MM-DD
Owner: ...

### Context
### Decision
### Alternatives Considered
### Consequences
### Security/Privacy Impact
### Migration/Rollback
### Follow-up
```
