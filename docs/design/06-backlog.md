# 06 — Product Backlog

**Source:** PRD/SRS Mo-nut v1.0  
Priority: P0 = MVP critical, P1 = Pilot enhancement, P2 = future

## Epic Summary

| Epic | Name | Priority |
|---|---|---|
| E00 | Foundation and Contracts | P0 |
| E01 | Identity and Patient Profile | P0 |
| E02 | Caregiver and Consent | P0 |
| E03 | Appointments and OCR | P0 |
| E04 | Medication and Adherence | P0 |
| E05 | Health Measurements | P0 |
| E06 | Visit, Questions and Audio | P0 |
| E07 | Checklists | P0 |
| E08 | Map and Travel | P0/P1 |
| E09 | SOS and Emergency Profile | P0 |
| E10 | Reports and Sharing | P0 |
| E11 | Offline, Notifications and Sync | P0 |
| E12 | Doctor/Admin and Integrations | P1/P2 |

## E00 — Foundation and Contracts

### US-000: Initialize Monorepo

As a development team, I want a consistent repository scaffold so that teams can work independently.

Priority: P0  
Source: SRS Sections 5–6

Acceptance Criteria:
- [ ] Flutter, backend, packages and infrastructure folders exist
- [ ] lint, format, typecheck, test and build commands work
- [ ] environment template contains no real secrets
- [ ] CI validates both stacks

### US-001: Publish OpenAPI Baseline

As frontend and backend teams, we want an approved API contract so that implementation can run in parallel.

Acceptance Criteria:
- [ ] OpenAPI validates
- [ ] mock server runs
- [ ] Flutter client generation works
- [ ] standard error examples exist
- [ ] contract version is visible

## E01 — Identity and Patient Profile

### US-010: Sign in with Phone or Email

As a patient, I want to sign in using phone OTP or email so that I can access the app without complex setup.

Acceptance Criteria:
- [ ] Phone OTP flow handles resend/rate limit
- [ ] Email sign-in works
- [ ] Domain user is created exactly once
- [ ] Terms/consent version recorded

### US-011: Create Patient Profile

- [ ] Required profile fields validate
- [ ] Conditions, allergies and hospitals can be added
- [ ] Font scale and language can be selected
- [ ] Profile edits are audited

## E02 — Caregiver and Consent

### US-020: Invite Caregiver

As a patient, I want to invite a caregiver so that they can help manage my care.

Acceptance Criteria:
- [ ] Invite by phone/email/link
- [ ] Link expires
- [ ] Duplicate active relationship prevented
- [ ] Patient selects permission scopes

### US-021: Revoke Caregiver Access

- [ ] Revocation takes effect immediately
- [ ] Active sessions cannot retrieve new protected data
- [ ] Action appears in audit log

## E03 — Appointments and OCR

### US-030: Create Appointment Manually

- [ ] Required date/time/hospital/department fields
- [ ] Store UTC + timezone
- [ ] Add preparation notes and caregiver
- [ ] Works offline and syncs later

### US-031: Scan Appointment Card

As a patient, I want to photograph an appointment card so that I do not need to type everything.

- [ ] Upload original image securely
- [ ] OCR status visible
- [ ] Extracted fields and confidence shown
- [ ] No appointment finalized before confirmation

### US-032: Receive Appointment Reminder

- [ ] Multiple reminder offsets
- [ ] Local and server notification de-duplicated
- [ ] Deep link opens appointment
- [ ] Privacy mode hides sensitive content

## E04 — Medication and Adherence

### US-040: Add Medication with Photo

- [ ] Name, dose, form, photo and instructions
- [ ] Photo stored securely
- [ ] Schedule supports daily/weekly/interval/meal relation
- [ ] Stopping medication preserves history

### US-041: Confirm Medication Event

- [ ] Shows medication image and dose
- [ ] TAKEN/SNOOZED/SKIPPED supported
- [ ] Double confirmation is idempotent
- [ ] Offline action syncs without duplicate event

### US-042: Escalate Missed Medication

- [ ] Configurable grace period
- [ ] Caregiver receives alert only with permission
- [ ] Escalation status auditable

## E05 — Health Measurements

### US-050: Record Blood Pressure

- [ ] Systolic, diastolic, pulse, time and context
- [ ] Sanity validation without diagnosis
- [ ] Offline supported
- [ ] Chart shows trend

### US-051: Record Weight and Blood Glucose

- [ ] Units displayed clearly
- [ ] Source recorded
- [ ] User can correct own record with history/audit as required

## E06 — Visit, Questions and Audio

### US-060: Prepare Questions for Appointment

- [ ] Text/voice/photo input
- [ ] Priority and category
- [ ] Review reminder before appointment
- [ ] Doctor Visit Mode orders questions by priority

### US-061: Record Medical Advice

- [ ] Permission confirmation before recording
- [ ] Pause/resume/stop
- [ ] Background upload and progress
- [ ] Transcript editable while preserving original

### US-062: Doctor Visit Mode

- [ ] Appointment, medication, questions, checklist and health summary in one flow
- [ ] Add measurements/documents/audio
- [ ] Create next appointment

## E07 — Checklists

### US-070: Create Doctor Recommendation Checklist

- [ ] Daily/weekly/one-time goals
- [ ] Minutes, frequency, steps and measurement goals
- [ ] AI-created checklist starts as DRAFT

### US-071: Track Checklist Progress

- [ ] Complete/skip with reason
- [ ] Weekly percentage and streak
- [ ] Share progress according to permission

## E08 — Map and Travel

### US-080: Open Navigation and Estimate Departure

- [ ] Hospital coordinates and map deep link
- [ ] Travel time estimate
- [ ] Registration/parking buffer
- [ ] “กำลังเดินทาง” and “ถึงแล้ว” status

### US-081: Live Traffic Alerts

Priority: P1

- [ ] Periodic recalculation before appointment
- [ ] Notify when departure time materially changes

## E09 — SOS and Emergency Profile

### US-090: Trigger SOS

- [ ] Press-and-hold confirmation
- [ ] Direct call option works without internet
- [ ] Send alert/location with consent
- [ ] Resolve/cancel and audit event

### US-091: Configure Emergency Profile

- [ ] User selects visible fields
- [ ] QR does not expose unapproved fields
- [ ] Available offline

## E10 — Reports and Sharing

### US-100: Generate Health Report

- [ ] Select date range and sections
- [ ] Async PDF generation
- [ ] Status and retry visible

### US-101: Share Report Securely

- [ ] Expiry and revoke
- [ ] Token stored hashed
- [ ] Access logged when identifiable

## E11 — Offline, Notifications and Sync

### US-110: Offline Operation Queue

- [ ] Stable operation IDs
- [ ] Retry with backoff
- [ ] User sees sync status
- [ ] Conflict never discards data silently

### US-111: Notification Preferences

- [ ] Per-type toggle
- [ ] Quiet hours
- [ ] Lock-screen privacy mode

## E12 — Doctor/Admin and Integrations

### US-120: Doctor Lite Shared Report View

Priority: P1

- [ ] Expiring access
- [ ] Read-only by default
- [ ] Patient-controlled scope

### US-121: Health Connect and Apple Health

Priority: P2

- [ ] Explicit permissions
- [ ] Source attribution
- [ ] De-duplication policy

## Non-functional Backlog

- [ ] NFR-001 API P95 target and load test
- [ ] NFR-002 Security threat model and penetration test
- [ ] NFR-003 WCAG AA/accessibility review
- [ ] NFR-004 Backup/restore drill
- [ ] NFR-005 Database export and migration rehearsal
- [ ] NFR-006 Cost monitoring and quota alerts

## Traceability

Story IDs map to modules and requirements in SRS. Detailed acceptance test IDs should be added during refinement, e.g. `US-041 -> E2E-MED-001, API-MED-014`.
