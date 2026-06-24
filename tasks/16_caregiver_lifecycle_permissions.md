# Task 16: Caregiver Invitation, Permissions, and Revocation

## 🤖 Recommended Model
> Complexity: **Very High** — granular delegated access and immediate revocation protect restricted health data

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | S | Opus 4.6 | — | Tier S จำเป็นสำหรับ granular delegated access and immediate revocation protect restricted health data เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Gemini | S | Pro 3.1 | high | Tier S จำเป็นสำหรับ granular delegated access and immediate revocation protect restricted health data เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| GPT | S | 5.5 | high | Tier S จำเป็นสำหรับ granular delegated access and immediate revocation protect restricted health data เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Budget | S | GLM 5.2 | — | Tier S จำเป็นสำหรับ granular delegated access and immediate revocation protect restricted health data เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 1 — Identity/Profile/Caregiver

## Source Tasks
- F104–F105, US-020–US-021

## Prerequisites
- Tasks 15 and 08

## Instructions

1. **Implement scope**
   - Implement invite by approved phone/email/link channels, high-entropy expiring tokens, duplicate prevention, accept transaction, and patient-selected scopes.

2. **Apply rules**
   - Implement list/update/revoke APIs and patient/caregiver UI with expiry and permission status clearly visible.

3. **Handle integration and states**
   - Centralize authorization evaluation for owner, active relationship, scope, consent, account status, and expiry; revocation must affect new reads immediately.

4. **Document and test**
   - Write matrix integration tests for every patient/caregiver resource action, IDOR, expired invite, duplicate accept, stale session, and audit events.

## Verify
- Run E2E-CARE-001 and the permission matrix suite.
- Attempt cross-patient and revoked-session reads; expect `PERMISSION_DENIED`.
- Confirm invite/accept/revoke operations are audited without leaking token values.

## Definition of Done
- [ ] Caregiver lifecycle works end to end
- [ ] Authorization uses granular scopes
- [ ] Revocation is immediate for new protected data
- [ ] Matrix and IDOR tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
