# Task 29: SOS Lifecycle and Caregiver Alert

## 🤖 Recommended Model
> Complexity: **Very High** — emergency interaction, offline calling, location consent, and duplicate control

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | S | Opus 4.6 | — | Tier S จำเป็นสำหรับ emergency interaction, offline calling, location consent, and duplicate control เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Gemini | S | Pro 3.1 | high | Tier S จำเป็นสำหรับ emergency interaction, offline calling, location consent, and duplicate control เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| GPT | S | 5.5 | high | Tier S จำเป็นสำหรับ emergency interaction, offline calling, location consent, and duplicate control เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Budget | S | GLM 5.2 | — | Tier S จำเป็นสำหรับ emergency interaction, offline calling, location consent, and duplicate control เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 6 — Map/SOS/Hardening

## Source Tasks
- F603, US-090

## Prerequisites
- Tasks 16, 28, 30–31

## Instructions

1. **Implement scope**
   - Implement press-and-hold confirmation, direct device call option that does not depend on internet, and clear non-emergency-service disclaimer.

2. **Apply rules**
   - Implement idempotent SOS create, ACTIVE/RESOLVED/CANCELLED/FAILED lifecycle, consented append-only locations, caregiver notification, and audit.

3. **Handle integration and states**
   - Prevent accidental duplicate events without rate-limiting genuine direct calls; handle offline queue and reconciliation safely.

4. **Document and test**
   - Build patient active/resolution UI and caregiver alert UI with accessible status, permission checks, retry, and failure transparency.

## Verify
- Run E2E-SOS-001 and accessibility accidental-activation tests.
- Test offline direct call, duplicate create, revoked caregiver, denied location, failed alert, resolve/cancel conflict, and reconnect.
- Verify location retention markers and PHI-free notification/log payloads.

## Definition of Done
- [ ] SOS and direct calling function safely
- [ ] Lifecycle is idempotent and audited
- [ ] Alerts honor consent/permissions
- [ ] E2E/security/accessibility tests pass

## Open Questions
- Supported country, emergency numbers, approved disclaimer, and SOS location retention must be confirmed before release.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
