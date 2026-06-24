# 07 — Security Rules

**Source:** `mo-nut-SRS-mobile-first-PWA.md` Sections 10–12, 18–20 และ 25–27

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
| XSS/Service Worker compromise | script อ่าน token หรือ Offline PHI | CSP, Trusted Types/encoding, dependency control, scoped/versioned worker |
| Shared-device offline leakage | ผู้ใช้ถัดไปเห็น cache เดิม | per-account isolation, minimize storage, clear on logout/account switch |
| CSRF/clickjacking | mutation หรือหน้าข้อมูลถูกฝัง/เรียกข้าม origin | SameSite/CSRF control ตาม auth model, origin validation, frame restrictions |

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
- Email/password และ Google เป็น MVP MUST; Phone OTP เป็น SHOULD เมื่อเปิด Provider
- MFA สำหรับ Doctor Lite, Organization Admin, System Admin และบัญชีสิทธิ์สูง
- Native biometric login อยู่นอก MVP; sensitive web action ใช้ provider re-authentication/step-up
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

## PWA and Browser Security

- Production ต้องใช้ HTTPS, HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` และ frame protection ที่เหมาะสม
- ป้องกัน XSS ด้วย framework escaping, output encoding และห้าม render untrusted HTML โดยไม่มี sanitizer
- ประเมิน CSRF ตาม Firebase bearer-token/session model; mutation ต้องตรวจ origin/authorization และใช้ SameSite token/cookie controls เมื่อเกี่ยวข้อง
- Service Worker scope ต้องแคบ, asset/version ตรวจสอบได้ และ update/rollback ได้; ห้าม cache authenticated response แบบกว้าง
- IndexedDB/Cache Storage เก็บ PHI เท่าที่ policy อนุญาต แยก account/patient และล้างเมื่อ logout/account switch
- Emergency Profile Offline เป็น opt-in, minimized และอธิบายความเสี่ยง shared device
- Push payload ใช้ข้อความทั่วไปเป็นค่าเริ่มต้น; subscription ที่หมดอายุ/ผิดพลาดต้อง revoke
- Camera, Microphone, Geolocation และ Notification ขอสิทธิ์เมื่อมี user intent และต้องมี fallback เมื่อถูกปฏิเสธ

## Secret Management

- Production secrets อยู่ Secret Manager
- Key แยก environment
- Least-privilege service accounts
- Rotation policy และ owner ชัดเจน
- ห้าม expose server key ใน Web bundle; Firebase public config ไม่ถือเป็น authorization และต้องใช้ App Check/rules/API controls

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
- [ ] XSS, CSP, CSRF, clickjacking และ security-header tests
- [ ] Service Worker cache poisoning/update และ Offline PHI leakage tests
- [ ] Logout/account-switch cache and IndexedDB clearing tests

## Compliance Notes

- PDPA เป็น baseline สำหรับประเทศไทย
- HIPAA/GDPR ยังไม่ควรอ้าง compliance จนกว่าจะมี legal/security assessment และ contractual controls
- การบันทึกเสียงต้องมี consent UX และข้อความตามข้อกฎหมายพื้นที่ให้บริการ

## Open Questions

- Data residency requirement
- Retention/deletion schedule ที่ฝ่ายกฎหมายอนุมัติ
- Break-glass workflow สำหรับ support/admin
- ต้องใช้ field-level encryption ตั้งแต่ MVP หรือ Pilot
