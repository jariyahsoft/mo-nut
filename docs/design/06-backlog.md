# 06 — Product Backlog

**Source:** `mo-nut-PRD-mobile-first-PWA.md` v1.1 และ `mo-nut-SRS-mobile-first-PWA.md` v1.0
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
| E06 | Quick Capture, Visit, Questions and Audio | P0 |
| E07 | Checklists | P0 |
| E08 | Map and Travel | P0/P1 |
| E09 | SOS and Emergency Profile | P0 |
| E10 | Reports and Sharing | P0 |
| E11 | PWA, Offline, Notifications and Sync | P0 |
| E12 | Admin/Support, Doctor Lite and Integrations | P0/P1/P2 |

## E00 — Foundation and Contracts

### US-000: Initialize Monorepo

As a development team, I want a consistent repository scaffold so that teams can work independently.

Priority: P0  
Source: SRS Sections 5–6

Acceptance Criteria:
- [ ] Web PWA, backend, packages and infrastructure folders exist
- [ ] lint, format, typecheck, test and build commands work
- [ ] environment template contains no real secrets
- [ ] CI validates both stacks

### US-001: Publish OpenAPI Baseline

As frontend and backend teams, we want an approved API contract so that implementation can run in parallel.

Acceptance Criteria:
- [ ] OpenAPI validates
- [ ] mock server runs
- [ ] TypeScript web client generation works
- [ ] standard error examples exist
- [ ] contract version is visible

## E01 — Identity and Patient Profile

### US-010: Sign in with Email or Google

As a patient, I want to sign in using email/password or Google so that I can access the PWA without installing a Native App.

Acceptance Criteria:
- [ ] Email/password sign-up, verification, recovery and sign-in work
- [ ] Google Sign-In works
- [ ] Phone OTP is feature-flagged as SHOULD and handles resend/rate limit when enabled
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
- [ ] In-app and Web Push notification are scheduled idempotently
- [ ] HTTPS/relative PWA route opens appointment
- [ ] Permission/capability state and recovery guidance are visible
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

## E06 — Quick Capture, Visit, Questions and Audio

### US-059: Quick Capture from Today

- [ ] Opens from Dashboard in one action and shows the active patient context
- [ ] Supports appointment/medication photo, audio, measurement, symptom, appointment, question and checklist entry points
- [ ] Camera/microphone use capability detection and file/manual fallbacks
- [ ] Offline item enters Sync Queue with visible status

### US-060: Prepare Questions for Appointment

- [ ] Text/voice/photo input
- [ ] Priority and category
- [ ] Review reminder before appointment
- [ ] Doctor Visit Mode orders questions by priority

### US-061: Record Medical Advice

- [ ] Permission confirmation before recording
- [ ] Pause/resume/stop
- [ ] Resumable/retryable upload and progress; file upload fallback when recording API is unavailable
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

### US-109: Install and Update PWA

- [ ] Manifest passes installability checks and includes required icons/start URL/scope/display
- [ ] Service Worker provides versioned App Shell and offline fallback
- [ ] Install guidance supports normal browser flow and iOS Add to Home Screen
- [ ] Update flow never traps users on a stale version without a refresh path

### US-110: Offline Operation Queue

- [ ] Stable operation IDs
- [ ] Retry with backoff
- [ ] User sees sync status
- [ ] Conflict never discards data silently
- [ ] Queue is isolated per account/patient and logout clears local data per policy
- [ ] Manual sync works when Background Sync is unavailable

### US-111: Notification Preferences

- [ ] Per-type toggle
- [ ] Quiet hours
- [ ] Lock-screen privacy mode
- [ ] In-app notification remains baseline when Web Push is unsupported/denied

## E12 — Admin/Support, Doctor Lite and Integrations

### US-119: Admin Account and Audit Operations

Priority: P0

- [ ] Admin searches accounts with minimum identifiers and sees no PHI by default
- [ ] Admin can suspend an account, revoke sessions and view system status
- [ ] Security Auditor can search audit events by time, actor and resource
- [ ] Admin, Support and Auditor permissions are distinct; privileged access requires reason and audit

### US-120: Doctor Lite Shared Report View

Priority: P1

- [ ] Expiring access
- [ ] Read-only by default
- [ ] Patient-controlled scope

### US-121: Native Health Data Integration

Priority: P2

Out of MVP: Apple Health / Health Connect ต้องรอ Native App หรือ integration scope ระยะถัดไป

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
- [ ] NFR-007 Browser matrix: Chrome/Android, Safari/iOS, Edge/Desktop และ Firefox/Desktop
- [ ] NFR-008 Dashboard skeleton ≤ 1s, primary data ≤ 3s; common read P95 ≤ 800 ms
- [ ] NFR-009 PWA installability, Service Worker update, storage quota และ clear-on-logout tests

## Traceability

Story IDs map to modules and requirements in SRS. Detailed acceptance test IDs should be added during refinement, e.g. `US-041 -> E2E-MED-001, API-MED-014`.
