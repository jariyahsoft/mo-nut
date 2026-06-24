# 07 — Security Rules

**Source:** SRS Sections 19–20 และ health-data privacy requirements

## Security Objectives

- Confidentiality: ผู้ที่ไม่ได้รับสิทธิ์ต้องไม่เห็นข้อมูลสุขภาพ
- Integrity: ประวัติยา นัด ค่าสุขภาพ และ audit ต้องไม่ถูกแก้โดยมิชอบ
- Availability: นัด ยา และ SOS พื้นฐานยังใช้งานได้ในสภาวะเครือข่ายจำกัด
- Accountability: การเข้าถึงและแก้ไขข้อมูลสำคัญตรวจสอบย้อนหลังได้

## Threat Model Summary

| Threat | Example | Primary Controls |
|---|---|---|
| IDOR/Broken access | เปลี่ยน patientId ใน URL | resource-level authorization |
| Account takeover | OTP abuse/token theft | rate limit, MFA, revoke, device/session records |
| Excess privilege | caregiver อ่าน transcript โดยไม่มี scope | relationship + permission + consent |
| Public file exposure | Storage URL ถาวร | private bucket, short signed URL |
| Data leakage in logs | raw transcript in error | logging policy/redaction |
| Malicious upload | disguised executable | MIME/size scan, malware scanning |
| Share-link guessing | brute force public URL | high-entropy token, hash, expiry, rate limit |
| AI/provider exposure | ส่ง PHI เกินจำเป็น | minimization, provider contract, consent |
| Firebase misconfiguration | client reads collections | deny-by-default rules + API-only architecture |

## Data Classification

| Class | Examples | Controls |
|---|---|---|
| Public | marketing content | integrity protection |
| Internal | feature flags, non-sensitive metrics | authenticated staff |
| Confidential | email, phone, account metadata | encryption, least privilege |
| Restricted Health | medications, measurements, transcripts, documents | strongest access/audit/minimization |
| Security Secret | keys, tokens, credentials | Secret Manager only |

## Authentication

- Firebase Authentication
- Phone OTP/email/Google/Apple ตาม platform
- MFA สำหรับ Doctor, Organization Admin, System Admin
- App PIN/Biometric เป็น local re-authentication ไม่แทน server auth
- Rate limit OTP/login และตรวจ abuse signals
- Revoke tokens เมื่อ account suspended/deleted หรือ security incident

## Authorization Evaluation

ทุก protected resource ต้องตรวจ:

```text
authenticated
AND active account
AND role allows action
AND (
  resource owner
  OR active caregiver relationship with scope
  OR organization member with granted clinical scope
  OR audited privileged support/admin workflow
)
AND consent valid
AND permission not expired
```

## Role Matrix Summary

| Resource | Patient | Caregiver | Doctor | Org Admin | System Admin |
|---|---|---|---|---|---|
| Own profile | RW | scoped R/W | consent R | no default | break-glass only |
| Appointment | RW | scoped R/W | consent R/W | metadata only | break-glass |
| Medication | RW | scoped R/W | consent R/W | no default | break-glass |
| Measurements | RW | scoped R/W | consent R | no default | break-glass |
| Transcript | RW | explicit scope | explicit consent | no | break-glass |
| Audit log | own summary | no | own actions | organization scope | full audited scope |

`break-glass` ต้องมีเหตุผล, elevated approval/step-up auth, limited time และ audit alert

## Consent Requirements

Consent แยกอย่างน้อย:

- health data storage
- caregiver sharing
- doctor sharing
- OCR processing
- audio recording and STT
- AI processing
- location and traffic
- SOS data sharing
- notifications

Consent record มี version, purpose, scope, grantedAt, withdrawnAt และ evidence channel

## Firebase Security Posture

แนวทางหลักคือ client ไม่อ่าน/เขียน restricted collections โดยตรง

Firestore rules baseline:

```text
match /{document=**} {
  allow read, write: if false;
}
```

อนุญาตเฉพาะ public/config/cache collection ที่ผ่าน review ตัวอย่าง pseudocode:

```text
match /public_content/{id} {
  allow read: if true;
  allow write: if false;
}

match /user_device_preferences/{id} {
  allow read, write: if request.auth != null
    && resource.data.userId == request.auth.uid;
}
```

Domain user ID ไม่เท่ากับ Firebase UID จึงไม่ควรใช้ direct rules กับ health resources โดยไม่มีกลไก mapping ที่ปลอดภัย

## Storage Rules

- Bucket private
- Client upload ผ่าน authorized upload request
- Path ใช้ internal IDs ไม่มีชื่อ/โรคใน filename
- Download ผ่าน short-lived signed URL หรือ authenticated proxy
- Validate MIME, magic bytes, size, checksum และ malware scan

## Secret Management

- Production secrets อยู่ Secret Manager
- Key แยก environment
- Least-privilege service accounts
- Rotation policy และ owner ชัดเจน
- ห้าม expose server key ใน Flutter/Web bundle

## Encryption

- TLS 1.2+
- Provider-managed encryption at rest
- พิจารณา application/field-level encryption สำหรับ transcript, sensitive identifiers หรือ regulatory need
- Backup encrypted และ access logged

## Audit Events

อย่างน้อยต้องบันทึก:

- login success/failure
- patient record view by non-owner
- permission/consent change
- document/audio download
- medication or appointment change
- report generation/share/access/revoke
- SOS create/update/resolve
- admin/support privileged access
- account export/delete

Audit log append-only และ client ห้ามเขียน

## Abuse and Rate Limits

| Action | Control |
|---|---|
| OTP | per phone/device/IP cooldown |
| OCR/STT/AI | per user/plan/day quota |
| Upload | size/type/rate/concurrent limits |
| Share links | creation and public access limits |
| SOS | prevent accidental duplicate, but do not block genuine emergency call |
| Reports | queue and per-user concurrency |

## Privacy by Design Checklist

- [ ] เก็บข้อมูลขั้นต่ำ
- [ ] Default share = off
- [ ] Permission granular และ revoke ง่าย
- [ ] Lock-screen notification ซ่อนข้อมูลได้
- [ ] ผู้ใช้ export/delete account ได้
- [ ] Provider processing มี consent และ retention
- [ ] Location เก็บเท่าที่จำเป็น
- [ ] Analytics ไม่มี raw PHI

## Security Testing Checklist

- [ ] IDOR across all patient-scoped endpoints
- [ ] revoked caregiver token/session behavior
- [ ] privilege escalation
- [ ] upload bypass and malware
- [ ] public share brute force
- [ ] Firebase rules deny tests
- [ ] secret scanning
- [ ] dependency/SAST scans
- [ ] API fuzzing for validation
- [ ] log redaction verification
- [ ] backup access review

## Compliance Notes

- PDPA เป็น baseline สำหรับประเทศไทย
- HIPAA/GDPR ยังไม่ควรอ้าง compliance จนกว่าจะมี legal/security assessment และ contractual controls
- การบันทึกเสียงต้องมี consent UX และข้อความตามข้อกฎหมายพื้นที่ให้บริการ

## Open Questions

- Data residency requirement
- Retention/deletion schedule ที่ฝ่ายกฎหมายอนุมัติ
- Break-glass workflow สำหรับ support/admin
- ต้องใช้ field-level encryption ตั้งแต่ MVP หรือ Pilot
