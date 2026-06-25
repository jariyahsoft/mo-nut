# Firestore Indexes Documentation

Version: 1.0.0
Last Updated: 2026-06-25

## Index Strategy

All indexes are driven by approved API query patterns. Indexes are versioned to track changes over time and ensure consistent deployment across environments.

## Composite Indexes

### caregiverAccess (Collection Group)
- Fields: `accessStatus` (ASC), `updatedAt` (DESC)
- Purpose: Query active caregiver relationships sorted by recency
- Used by: Caregiver permission validation, access audit

### appointments (Collection)
- Index 1: `patientId` (ASC), `scheduledAt` (DESC)
  - Purpose: List patient appointments by date
  - Used by: Appointment list, calendar view

- Index 2: `patientId` (ASC), `status` (ASC), `scheduledAt` (ASC)
  - Purpose: Filter patient appointments by status and date
  - Used by: Upcoming appointments, appointment reminders

### consent_grants (Collection)
- Fields: `patientId` (ASC), `granteeId` (ASC), `status` (ASC)
- Purpose: Check active consent between patient and grantee
- Used by: Authorization checks, consent validation

### dose_occurrences (Collection)
- Index 1: `patientId` (ASC), `dueAt` (ASC)
  - Purpose: List patient doses by due time
  - Used by: Medication schedule, upcoming doses

- Index 2: `patientId` (ASC), `status` (ASC), `dueAt` (ASC)
  - Purpose: Filter patient doses by status and time
  - Used by: Overdue doses, missed medication alerts

### health_measurements (Collection)
- Fields: `patientId` (ASC), `type` (ASC), `measuredAt` (DESC)
- Purpose: Query patient measurements by type over time
- Used by: Health trends, measurement history

### notification_deliveries (Collection)
- Index 1: `recipientId` (ASC), `createdAt` (DESC)
  - Purpose: List notifications for a user
  - Used by: Notification inbox, unread count

- Index 2: `status` (ASC), `nextRetryAt` (ASC)
  - Purpose: Worker queue for retry processing
  - Used by: Background notification retry jobs

### processing_jobs (Collection)
- Fields: `status` (ASC), `createdAt` (ASC)
- Purpose: Worker queue for OCR/STT/AI jobs
- Used by: Background job processing

## Single-Field Indexes

Firestore automatically creates single-field indexes for common queries. No additional single-field indexes are explicitly defined.

## Security Notes

- Indexes do not enforce security; they only enable queries
- All queries must pass through Firestore rules authorization
- Sensitive fields (PHI, credentials) are not indexed without review
- Index cost and cardinality are monitored in production

## Deployment

Indexes are deployed via:
```bash
firebase deploy --only firestore:indexes --project <environment>
```

## Version History

### 1.0.0 (2026-06-25)
- Initial index set for P0 foundation
- Covers core patient, appointment, medication, consent, and notification queries
- All indexes validated in emulator tests
