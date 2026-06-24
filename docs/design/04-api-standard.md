# 04 — API Standard

**Source:** `mo-nut-SRS-mobile-first-PWA.md` Sections 3.4, 9–12 และ 21

## Principles

- REST + JSON over HTTPS
- OpenAPI 3.1 เป็น source of truth
- Versioned base path `/api/v1`
- Firebase ID token สำหรับ authentication
- Permission/consent ตรวจบน server ทุก request
- DTO ไม่เปิดเผย Firestore-specific types
- List endpoints ใช้ cursor pagination
- Mutation สำคัญรองรับ idempotency และ optimistic concurrency

## Base URLs

```text
Local:       http://localhost:8080/api/v1
Development: https://api-dev.example.com/api/v1
Staging:     https://api-staging.example.com/api/v1
Production:  https://api.example.com/api/v1
```

## Headers

```http
Authorization: Bearer <firebase-id-token>
Content-Type: application/json
Accept-Language: th-TH
X-Request-Id: optional-client-generated-id
Idempotency-Key: required-for-selected-mutations
If-Match: "<version>"
```

## Success Envelope

```json
{
  "data": {},
  "meta": {
    "request_id": "req_01J...",
    "schema_version": 1,
    "next_cursor": null
  }
}
```

## Error Envelope

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "ข้อมูลไม่ถูกต้อง",
    "fields": [
      {"field": "scheduled_start_at", "code": "REQUIRED"}
    ],
    "details": {},
    "retryable": false
  },
  "meta": {"request_id": "req_01J..."}
}
```

## HTTP and Error Mapping

| HTTP | Stable Code | Meaning |
|---:|---|---|
| 400 | VALIDATION_ERROR | รูปแบบข้อมูลไม่ถูกต้อง |
| 401 | UNAUTHENTICATED | token ไม่มี/หมดอายุ |
| 403 | FORBIDDEN | ไม่มีสิทธิ์หรือ consent |
| 404 | RESOURCE_NOT_FOUND | ไม่พบ resource |
| 409 | CONFLICT / VERSION_CONFLICT / IDEMPOTENCY_CONFLICT | resource, version หรือ idempotency conflict |
| 422 | BUSINESS_RULE_VIOLATION | ขัด business rule |
| 429 | RATE_LIMITED | เกิน quota/rate |
| 500 | INTERNAL_ERROR | server error |
| 503 | PROVIDER_UNAVAILABLE | provider/worker unavailable |

## IDs and Time

- ID เป็น UUIDv7 หรือ ULID string
- Timestamp เป็น UTC ISO 8601
- Date-only เป็น `YYYY-MM-DD`
- Schedule ต้องส่ง `timezone` แยก
- ห้ามส่ง provider timestamp object

## Pagination

Request:

```http
GET /patients/{id}/appointments?limit=20&cursor=opaque&status=UPCOMING&sort=scheduled_start_at
```

Response meta:

```json
{
  "next_cursor": "opaque-or-null",
  "has_more": true
}
```

Cursor ต้อง opaque และไม่ expose raw Firestore cursor

## Filtering and Sorting

- Allowlist fields เท่านั้น
- Default sort ต้อง deterministic และมี ID tie-breaker
- Reject unknown filter เพื่อป้องกัน accidental expensive query

## Idempotency

Required for:

- create appointment
- confirm medication event
- create SOS event
- initiate report
- create upload metadata

Server เก็บ result ตาม key + user + endpoint ตาม configurable TTL

## Optimistic Concurrency

Update request ส่ง `If-Match` หรือ `version`:

```json
{
  "version": 3,
  "status": "CONFIRMED"
}
```

หาก mismatch คืน `409 VERSION_CONFLICT` พร้อม latest version metadata

## Authentication and Authorization Checks

ทุก protected endpoint:

1. Verify Firebase token
2. Resolve domain user
3. Check account status
4. Check coarse role
5. Check ownership/relationship/organization
6. Check permission scope
7. Check consent and expiry
8. Audit privileged reads/writes

## Upload Flow

1. `POST /uploads/initiate`
2. Server ตรวจ permission/MIME/size และคืน signed upload configuration
3. Client upload ไป Storage
4. `POST /uploads/{uploadId}/complete` ยืนยัน metadata/checksum
5. Processing endpoint สร้าง async job

## Async Job Response

```json
{
  "data": {
    "job_id": "job_01J...",
    "status": "QUEUED",
    "status_url": "/api/v1/ai-jobs/job_01J..."
  }
}
```

## Core Endpoint Catalog

### Identity and Patients

```text
GET    /me
POST   /sessions/revoke-all
GET    /consent-documents/current
POST   /consents
POST   /consents/{consentId}/withdraw
POST   /patients
GET    /patients/{patientId}
PATCH  /patients/{patientId}
GET    /patients/{patientId}/conditions
POST   /patients/{patientId}/conditions
GET    /patients/{patientId}/allergies
POST   /patients/{patientId}/allergies
GET    /patients/{patientId}/emergency-contacts
POST   /patients/{patientId}/emergency-contacts
```

### Caregivers and Consent

```text
POST   /patients/{patientId}/caregiver-invitations
GET    /patients/{patientId}/caregivers
PATCH  /patients/{patientId}/caregivers/{relationshipId}
DELETE /patients/{patientId}/caregivers/{relationshipId}
POST   /caregiver-invitations/{token}/accept
GET    /caregiver/patients
```

### Appointments

```text
GET    /patients/{patientId}/appointments
POST   /patients/{patientId}/appointments
GET    /appointments/{appointmentId}
PATCH  /appointments/{appointmentId}
POST   /appointments/{appointmentId}/status-transitions
POST   /appointments/{appointmentId}/reminders
POST   /appointments/{appointmentId}/documents
```

### Upload, OCR and STT

```text
POST   /uploads/initiate
POST   /uploads/{uploadId}/complete
POST   /patients/{patientId}/ocr-jobs
POST   /patients/{patientId}/recordings
POST   /recordings/{recordingId}/transcription-jobs
GET    /ai-jobs/{jobId}
POST   /ai-jobs/{jobId}/review
```

### Medications

```text
GET    /patients/{patientId}/medications
POST   /patients/{patientId}/medications
GET    /medications/{medicationId}
PATCH  /medications/{medicationId}
POST   /medications/{medicationId}/schedules
```

### Medication Events

```text
GET    /patients/{patientId}/dose-events
POST   /dose-events/{doseEventId}/actions
POST   /dose-events/{doseEventId}/corrections
```

### Health

```text
GET    /patients/{patientId}/measurements
POST   /patients/{patientId}/measurements
PATCH  /measurements/{measurementId}
DELETE /measurements/{measurementId}
GET    /patients/{patientId}/measurement-summary
```

### Checklists and Questions

```text
GET    /patients/{patientId}/checklists
POST   /patients/{patientId}/checklists
PATCH  /checklists/{checklistId}
POST   /checklists/{checklistId}/logs
GET    /patients/{patientId}/questions
POST   /patients/{patientId}/questions
PATCH  /questions/{questionId}
```

### Maps and SOS

```text
GET    /appointments/{appointmentId}/travel-plan
POST   /patients/{patientId}/sos-events
PATCH  /sos-events/{sosEventId}
GET    /patients/{patientId}/emergency-profile
```

### Reports

```text
POST   /patients/{patientId}/reports
GET    /reports/{reportId}
POST   /reports/{reportId}/share-links
DELETE /share-links/{shareLinkId}
GET    /shared/{token}
```

### Notification, PWA and Offline Sync

```text
POST   /push-subscriptions
DELETE /push-subscriptions/{id}
GET    /notifications
POST   /notifications/{id}/read
POST   /sync/batch
```

`POST /sync/batch` รับ `device_id` และรายการ mutation ที่มี `client_mutation_id`, `entity_type`, `operation`, `base_version`, `payload`; response ต้องคืนผลรายรายการเพื่อไม่ให้ mutation ที่ผิดทำให้ทั้ง batch ล้มเหลว

```json
{
  "device_id": "dev_01J...",
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

## Event Format

```json
{
  "event_id": "evt_01J...",
  "event_type": "MEDICATION_EVENT_MISSED",
  "event_version": 1,
  "occurred_at": "2026-06-24T08:00:00Z",
  "aggregate_type": "MEDICATION_EVENT",
  "aggregate_id": "mev_01J...",
  "patient_id": "pat_01J...",
  "payload": {}
}
```

Payload ต้องมีเฉพาะข้อมูลที่ worker ต้องใช้ ไม่คัดลอก PHI เกินจำเป็น

## Notification Payload

Push payload ไม่ควรใส่ข้อมูลสุขภาพละเอียดบน lock screen

```json
{
  "type": "MEDICATION_DUE",
  "resource_id": "mev_01J...",
  "deep_link": "/medications/dose-events/mev_01J...",
  "privacy_mode": "HIDDEN"
}
```

Deep link ต้องเป็น HTTPS/relative web route ภายใน PWA; ห้ามใช้ native custom URL scheme ใน MVP

## API Security Checklist

- [ ] HTTPS only
- [ ] Token verification
- [ ] Resource-level authorization
- [ ] Input validation and allowlists
- [ ] Rate limiting
- [ ] Idempotency for high-risk mutations
- [ ] Audit logging
- [ ] No PHI in URL query where avoidable
- [ ] Signed URL short expiry
- [ ] OpenAPI contract tests
