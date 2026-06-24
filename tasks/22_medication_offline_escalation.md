# Task 22: Medication Offline Actions and Caregiver Escalation

## 🤖 Recommended Model
> Complexity: **Very High** — offline idempotency plus permission-gated missed-dose escalation

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ offline idempotency plus permission-gated missed-dose escalation ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ offline idempotency plus permission-gated missed-dose escalation ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ offline idempotency plus permission-gated missed-dose escalation ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ offline idempotency plus permission-gated missed-dose escalation ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`
- `docs/design/01-architecture.md`

## Phase
Sprint 3 — Medication

## Source Tasks
- F305–F306, US-041–US-042

## Prerequisites
- Tasks 16, 21, 30, and 31

## Instructions

1. **Implement scope**
   - Implement Taken/Snooze/Skip commands with idempotency, optimistic UI, local pending operations, and conflict-safe server confirmation.

2. **Apply rules**
   - Implement grace-period evaluation and `NOT_TAKEN` escalation jobs without asserting the patient actually consumed or missed medicine.

3. **Handle integration and states**
   - Notify caregivers only when the relationship, `RECEIVE_ALERTS` scope, consent, and preference are active; audit escalation lifecycle.

4. **Document and test**
   - Build patient sync/conflict states and caregiver alert actions with neutral language and retry/failure handling.

## Verify
- Run E2E-MED-001 and E2E-MED-002.
- Replay the same offline command and worker event; verify one final action/alert.
- Revoke caregiver permission before escalation and verify no protected alert is delivered.

## Definition of Done
- [ ] Offline actions sync exactly once
- [ ] Escalation is configurable and permission-gated
- [ ] Audit and neutral safety copy are present
- [ ] E2E/security tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
