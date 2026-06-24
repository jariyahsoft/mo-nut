# 10 — Glossary

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## Business and technical terms

| Term | Meaning | Notes |
|---|---|---|
| Mo-nut / หมอนัด | ระบบผู้ช่วยดูแลสุขภาพ | ไม่ใช่เครื่องมือวินิจฉัย |
| Patient | เจ้าของข้อมูลสุขภาพ | ให้/ถอน consent ได้ |
| Caregiver | ผู้ดูแลที่ได้รับเชิญ | scope ตาม permission |
| Clinician | แพทย์/บุคลากรทางการแพทย์ | Doctor Lite ตาม consent |
| Doctor Lite | มุมมองสรุปข้อมูลที่อนุญาต | ไม่ใช่ HIS/EMR เต็มรูปแบบ |
| Appointment | นัดหมายทางการแพทย์ | มี state/revision/history |
| Visit Record | ข้อมูลการไปพบแพทย์ครั้งหนึ่ง | เชื่อมกับ appointment |
| Medication | รายการยา | ไม่ใช่คำสั่งปรับยาอัตโนมัติ |
| Medication Schedule | กติกาการเกิดรอบยา | effective date + timezone |
| Dose Occurrence | รอบยาหนึ่งครั้ง | idempotent response |
| Adherence | ความสม่ำเสมอตามข้อมูลตอบ | ไม่ยืนยันว่ากินจริงทางคลินิก |
| Health Measurement | ค่าสุขภาพที่บันทึก | value+unit+context+source |
| OCR | อ่านข้อความจากภาพ | requires confirmation |
| STT | แปลงเสียงเป็นข้อความ | requires consent/review |
| Extracted Draft | ข้อมูลที่ AI เสนอ | proposed until confirmed |
| Quick Capture | ทางลัดบันทึกข้อมูล | เข้าถึงจากหน้าหลัก |
| Checklist | งาน/คำแนะนำติดตาม | ไม่แก้คำแนะนำแพทย์เอง |
| Consent Grant | หลักฐานยินยอม | purpose/scope/version/expiry |
| Permission Grant | สิทธิ์เชิงปฏิบัติ | server authoritative |
| Share Link | ลิงก์แชร์หมดอายุ | token hash + revoke |
| SOS | ฟังก์ชันขอความช่วยเหลือ | ไม่ใช่ emergency service guarantee |
| Emergency Card | ข้อมูลฉุกเฉินที่ผู้ใช้เลือก | privacy configurable |
| Canonical Model | แบบข้อมูลกลาง | database-independent |
| Repository Adapter | ตัวเชื่อม storage | isolates Firestore/Mongo/Postgres |
| Read Model | ข้อมูลสรุปเพื่ออ่านเร็ว | rebuildable, not source of truth |
| Idempotency | ทำคำสั่งซ้ำโดยไม่เกิดผลซ้ำ | uses idempotency key |
| Optimistic Concurrency | ตรวจ version ก่อนแก้ | returns VERSION_CONFLICT |
| Outbox | คิวคำสั่งฝั่ง client | for offline/retry |
| Correlation ID | รหัสติดตาม request | logs/traces/errors |
| PII | ข้อมูลระบุตัวบุคคล | confidential |
| PHI | ข้อมูลสุขภาพผูกกับบุคคล | restricted |
| RBAC | role-based access control | used with consent/context |
| ABAC | attribute-based access control | purpose/scope/expiry constraints |
| RPO | accepted data loss window | TBD per class |
| RTO | recovery time objective | TBD per service |
| PWA | Progressive Web App | Phase 1 |
| FCM | Firebase Cloud Messaging | push adapter reference |
| HealthKit | Apple health data platform | Phase 2 optional/should |
| Health Connect | Android health data platform | Phase 2 optional/should |

## Status values

| Domain | Values |
|---|---|
| Appointment | upcoming, confirmed, traveling, arrived, waiting, completed, rescheduled, cancelled, missed |
| Dose | scheduled, due, snoozed, taken, skipped, issue_reported, missed |
| Processing | uploaded, queued, processing, review_required, confirmed, applied, failed, retrying, manual_entry |
| Consent/Share | draft, active, suspended, revoked, expired |
| Sync | pending, syncing, synced, failed, retrying, conflict, resolved |
| Medication | active, paused, completed, cancelled |

## Error codes

| Code | Meaning |
|---|---|
| AUTH_REQUIRED | authentication required |
| FORBIDDEN_SCOPE | insufficient role/consent/scope |
| RESOURCE_NOT_FOUND | absent or intentionally undisclosed resource |
| VALIDATION_FAILED | schema/domain input invalid |
| VERSION_CONFLICT | stale entity version |
| IDEMPOTENCY_CONFLICT | same key with different payload |
| RATE_LIMITED | request limit exceeded |
| DEPENDENCY_UNAVAILABLE | external/internal dependency unavailable |
| PROCESSING_PENDING | async job not finished |

## Event naming examples

- `appointment.created.v1`
- `appointment.rescheduled.v1`
- `dose.responded.v1`
- `consent.granted.v1`
- `consent.revoked.v1`
- `processing.draft_confirmed.v1`
- `sos.initiated.v1`
- `share_link.revoked.v1`
