# 04 — API Standard

**Source:** SRS Section 10–11 และ Contract-first requirement

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
    "requestId": "req_01J...",
    "timestamp": "2026-06-23T08:00:00Z",
    "nextCursor": null
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
      {"field": "scheduledStartAt", "code": "REQUIRED"}
    ],
    "details": {}
  },
  "meta": {"requestId": "req_01J..."}
}
```

## HTTP and Error Mapping

| HTTP | Stable Code | Meaning |
|---:|---|---|
| 400 | VALIDATION_ERROR | รูปแบบข้อมูลไม่ถูกต้อง |
| 401 | AUTH_REQUIRED | token ไม่มี/หมดอายุ |
| 403 | PERMISSION_DENIED | ไม่มีสิทธิ์หรือ consent |
| 404 | RESOURCE_NOT_FOUND | ไม่พบ resource |
| 409 | RESOURCE_CONFLICT | version/idempotency conflict |
| 422 | BUSINESS_RULE_VIOLATION | ขัด business rule |
| 429 | RATE_LIMITED | เกิน quota/rate |
| 500 | INTERNAL_ERROR | server error |
| 503 | SERVICE_UNAVAILABLE | provider/worker unavailable |

## IDs and Time

- ID เป็น UUIDv7 หรือ ULID string
- Timestamp เป็น UTC ISO 8601
- Date-only เป็น `YYYY-MM-DD`
- Schedule ต้องส่ง `timezone` แยก
- ห้ามส่ง provider timestamp object

## Pagination

Request:

```http
GET /patients/{id}/appointments?limit=20&cursor=opaque&status=UPCOMING&sort=scheduledStartAt
```

Response meta:

```json
{
  "nextCursor": "opaque-or-null",
  "hasMore": true
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

หาก mismatch คืน `409 RESOURCE_CONFLICT` พร้อม latest version metadata

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

1. `POST /upload-requests`
2. Server ตรวจ permission/MIME/size และคืน signed upload configuration
3. Client upload ไป Storage
4. `POST /documents` ยืนยัน metadata/checksum
5. Processing endpoint สร้าง async job

## Async Job Response

```json
{
  "data": {
    "jobId": "job_01J...",
    "status": "QUEUED",
    "statusUrl": "/api/v1/jobs/job_01J..."
  }
}
```

## Core Endpoint Catalog

### Identity and Patients

```text
GET    /me
PATCH  /me
DELETE /me
GET    /patients/{patientId}
PATCH  /patients/{patientId}
```

### Caregivers and Consent

```text
POST   /patients/{patientId}/caregiver-invitations
GET    /patients/{patientId}/caregivers
PATCH  /patients/{patientId}/caregivers/{relationshipId}
DELETE /patients/{patientId}/caregivers/{relationshipId}
POST   /caregiver-invitations/{token}/accept
GET    /patients/{patientId}/consents
POST   /patients/{patientId}/consents
POST   /consents/{consentId}/withdraw
```

### Appointments

```text
GET    /patients/{patientId}/appointments
POST   /patients/{patientId}/appointments
GET    /appointments/{appointmentId}
PATCH  /appointments/{appointmentId}
DELETE /appointments/{appointmentId}
POST   /appointments/{appointmentId}/confirm
POST   /appointments/{appointmentId}/complete
```

### Documents/OCR

```text
POST   /upload-requests
POST   /documents
GET    /documents/{documentId}
DELETE /documents/{documentId}
POST   /documents/{documentId}/ocr-jobs
GET    /document-extractions/{extractionId}
POST   /document-extractions/{extractionId}/confirm
```

### Medications

```text
GET    /patients/{patientId}/medications
POST   /patients/{patientId}/medications
GET    /medications/{medicationId}
PATCH  /medications/{medicationId}
POST   /medications/{medicationId}/stop
POST   /medications/{medicationId}/schedules
PATCH  /medication-schedules/{scheduleId}
```

### Medication Events

```text
GET    /patients/{patientId}/medication-events
POST   /medication-events/{eventId}/taken
POST   /medication-events/{eventId}/snooze
POST   /medication-events/{eventId}/skip
```

### Health

```text
GET    /patients/{patientId}/health-measurements
POST   /patients/{patientId}/health-measurements
PATCH  /health-measurements/{measurementId}
DELETE /health-measurements/{measurementId}
GET    /patients/{patientId}/health-summary
```

### Audio and Transcript

```text
POST   /audio-records
GET    /audio-records/{audioId}
POST   /audio-records/{audioId}/transcription-jobs
GET    /audio-transcripts/{transcriptId}
PATCH  /audio-transcripts/{transcriptId}
POST   /audio-transcripts/{transcriptId}/summary-jobs
```

### Checklists and Questions

```text
GET    /patients/{patientId}/checklists
POST   /patients/{patientId}/checklists
PATCH  /checklists/{checklistId}
POST   /checklist-occurrences/{occurrenceId}/complete
POST   /checklist-occurrences/{occurrenceId}/skip
GET    /appointments/{appointmentId}/questions
POST   /appointments/{appointmentId}/questions
PATCH  /questions/{questionId}
POST   /questions/{questionId}/answers
```

### Maps and SOS

```text
GET    /appointments/{appointmentId}/travel-plan
POST   /appointments/{appointmentId}/travel-status
POST   /patients/{patientId}/sos-events
POST   /sos-events/{sosEventId}/locations
POST   /sos-events/{sosEventId}/resolve
POST   /sos-events/{sosEventId}/cancel
```

### Reports

```text
POST   /patients/{patientId}/reports
GET    /reports/{reportId}
POST   /reports/{reportId}/share-links
DELETE /share-links/{shareLinkId}
GET    /public/share/{token}
```

## Event Format

```json
{
  "eventId": "evt_01J...",
  "eventType": "MEDICATION_EVENT_MISSED",
  "eventVersion": 1,
  "occurredAt": "2026-06-23T08:00:00Z",
  "aggregateType": "MEDICATION_EVENT",
  "aggregateId": "mev_01J...",
  "patientId": "pat_01J...",
  "payload": {}
}
```

Payload ต้องมีเฉพาะข้อมูลที่ worker ต้องใช้ ไม่คัดลอก PHI เกินจำเป็น

## Notification Payload

Push payload ไม่ควรใส่ข้อมูลสุขภาพละเอียดบน lock screen

```json
{
  "type": "MEDICATION_DUE",
  "resourceId": "mev_01J...",
  "deepLink": "monut://medication-events/mev_01J...",
  "privacyMode": "HIDDEN"
}
```

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
