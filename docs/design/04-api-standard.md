# 04 — API Standard

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Principles

- HTTPS JSON API, contract-first and versioned
- Server-authoritative authentication, consent, permission and state transition
- Canonical JSON types independent of Firebase
- Idempotent commands and optimistic concurrency
- Consistent error envelope and correlation ID
- Cursor pagination and explicit filtering/sorting
- Async jobs return status resources rather than block long requests

## 2. Base URL and versioning

```text
https://<environment-host>/api/v1
```

Breaking changes require a new major version or compatibility layer. Mobile support/deprecation policy must be defined before Phase 2.

## 3. Required headers

| Header | Use |
|---|---|
| `Authorization: Bearer <token>` | authenticated requests |
| `X-Correlation-Id` | end-to-end tracing |
| `Idempotency-Key` | retryable create/command operations |
| `If-Match` or `baseVersion` | optimistic concurrency |
| `X-Client-Platform` | web/android/ios |
| `X-App-Version` | compatibility/observability |
| `Accept-Language` | localized response/message key |

## 4. Authentication and authorization

1. Identity token is validated and exchanged for application claims/session
2. Request resolves active role, organization and patient context
3. Policy evaluates role + resource owner + consent + scope + constraints
4. Resource query itself is scoped; authorization is not only post-filtering
5. High-risk actions may require re-authentication

## 5. Request conventions

- JSON uses camelCase
- Timestamps use RFC 3339 UTC; local schedule also includes IANA time zone
- IDs are UUID/ULID strings
- Unknown fields are rejected or ignored according to endpoint schema; behavior must be documented
- File upload uses signed upload workflow and metadata API

## 6. Success response

```json
{
  "data": {},
  "meta": {
    "correlationId": "req_01J...",
    "serverTime": "2026-06-24T10:00:00Z",
    "nextCursor": null
  },
  "error": null
}
```

## 7. Error response

```json
{
  "data": null,
  "meta": {"correlationId": "req_01J..."},
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "ข้อมูลบางรายการไม่ถูกต้อง",
    "fields": [{"path": "scheduledAt", "code": "REQUIRED"}]
  }
}
```

Minimum codes: `AUTH_REQUIRED`, `FORBIDDEN_SCOPE`, `RESOURCE_NOT_FOUND`, `VALIDATION_FAILED`, `VERSION_CONFLICT`, `IDEMPOTENCY_CONFLICT`, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `PROCESSING_PENDING`.

## 8. Pagination/filtering/sorting

- Cursor pagination only for growing collections
- `limit` is capped server-side
- Filters are allow-listed and map to approved indexes
- Sorting has stable tie-breaker (`id` or timestamp+id)
- Responses expose `nextCursor`, not database-native cursor

Example:

```text
GET /patients/{id}/measurements?type=bloodPressure&from=...&to=...&limit=50&cursor=...
```

## 9. Idempotency

- Required for create appointment, dose response, measurement append, SOS, report/share creation and sync operations where retry can duplicate effects
- Server stores key + normalized payload hash + result for retention window
- Same key/same payload returns original result
- Same key/different payload returns `IDEMPOTENCY_CONFLICT`

## 10. Concurrency

- Mutable entities expose integer `version`
- Client sends `If-Match` or `baseVersion`
- Conflict response returns safe server snapshot and resolution metadata
- Consent/permission changes are online and server authoritative

## 11. Endpoint catalog

| Endpoint | Purpose |
|---|---|
| `POST /auth/session/exchange` | แลก Identity Token เป็น Application Session/Claims |
| `GET/PATCH /me` | ข้อมูลบัญชีและ Preference |
| `GET/POST/PATCH /patients` | โปรไฟล์ผู้ป่วยตามสิทธิ์ |
| `GET/POST /patients/{id}/caregivers` | จัดการผู้ดูแลและคำเชิญ |
| `GET/POST /patients/{id}/consents` | จัดการ Consent/Permission |
| `GET/POST/PATCH /patients/{id}/appointments` | นัดหมาย |
| `POST /appointments/{id}/transition` | เปลี่ยนสถานะตาม State Machine |
| `GET/POST/PATCH /patients/{id}/medications` | รายการยา |
| `GET/POST/PATCH /medications/{id}/schedules` | ตารางยา |
| `GET/PATCH /patients/{id}/doses` | Dose Occurrence และการตอบ |
| `GET/POST /patients/{id}/measurements` | ข้อมูลสุขภาพ |
| `POST /patients/{id}/assets` | ขอ Signed Upload/สร้าง Metadata |
| `POST /assets/{id}/ocr-jobs` | เริ่ม OCR |
| `POST /assets/{id}/transcription-jobs` | เริ่ม STT |
| `POST /processing-drafts/{id}/confirm` | ยืนยันผล AI/OCR/STT |
| `GET/POST /patients/{id}/checklists` | Checklist |
| `GET/POST /patients/{id}/questions` | คำถามแพทย์ |
| `GET/PATCH /notification-preferences` | Preference แจ้งเตือน |
| `POST /patients/{id}/sos` | เริ่ม SOS |
| `POST /sos/{id}/close` | ปิดเหตุการณ์ SOS |
| `POST /patients/{id}/reports` | สร้างรายงาน |
| `POST /patients/{id}/share-links` | สร้างลิงก์แชร์ |
| `DELETE /share-links/{id}` | เพิกถอนลิงก์ |
| `POST /sync/batch` | ส่งชุดคำสั่ง Offline |
| `GET /sync/changes` | รับ Delta/Change Feed ตาม Cursor |

## 12. Module endpoint expectations

### Appointment

- Transition uses dedicated command endpoint and validates state machine
- Reschedule creates revision/history and notification changes
- OCR never mutates appointment until draft confirmation

### Medication/Dose

- Schedule changes use effective date/version
- Dose response is idempotent and records actor/respondedAt/reason
- Past dose correction requires reason and audit

### Consent/Sharing

- Grant records policy version, purpose, scopes and validity
- Revoke invalidates related link/session according to SLA
- Share page must not expose resource existence beyond scope

### Processing jobs

- Create returns `202 Accepted` with job resource
- Polling or event channel returns status
- Provider metadata/model version stored; PHI-minimized diagnostics only

## 13. Webhook/event format

External webhooks are not yet required. Internal domain events should use:

```json
{
  "eventId": "01J...",
  "eventType": "appointment.rescheduled.v1",
  "occurredAt": "2026-06-24T10:00:00Z",
  "actor": {"type": "user", "id": "..."},
  "subject": {"type": "appointment", "id": "..."},
  "correlationId": "req_...",
  "data": {}
}
```

No secret or unnecessary PHI in event headers/log transport.

## 14. Notification template contract

A notification request must use approved template key, locale, minimal data references, channel preference, recipient scope and disclosure class. Lock-screen text must minimize PHI.

## 15. Rate limiting

Apply stricter limits to login/OTP, invitation, share-link, SOS abuse paths, report export, OCR/STT and notification resend. Limits should combine user/device/IP risk without blocking legitimate caregivers.

## 16. API security checklist

- [ ] Auth token issuer/audience/expiry validated
- [ ] Resource authorization uses patient/resource ID
- [ ] Consent scope checked server-side
- [ ] Input schema and file policy validated
- [ ] Idempotency/version enforced where needed
- [ ] Response contains no hidden fields/other patient data
- [ ] Rate limit and abuse monitoring enabled
- [ ] Correlation/audit event generated
- [ ] OpenAPI examples contain synthetic data only

## 17. Contract development workflow

1. Propose OpenAPI/JSON Schema change
2. Review with PWA/Mobile/Backend/QA/Security
3. Publish mock server and generated client
4. Implement producer and consumer tests
5. Run backward-compatibility check in CI
6. Deprecate only under published support policy
