# Task 11: Caregiver, Consent, and Appointment Repositories

## 🤖 Recommended Model
> Complexity: **Very High** — permission-critical relationships and appointment history

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | permission-critical relationships and appointment history |
| Gemini | A | Flash 3.5 high | high | permission-critical relationships and appointment history |
| GPT | A | 5.4 high | high | permission-critical relationships and appointment history |
| Budget | A | DeepSeek V4 Pro | — | permission-critical relationships and appointment history |

## Context Files
Read these before starting:
- `docs/design/03-database-design.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 02, 07, and 10

## Instructions

1. Implement caregiver invitations, token hashes, one-time acceptance, relationship permissions, primary/backup, expiry, suspend, and revoke transactions.
2. Implement consent purpose/scope/version/evidence/withdrawal plus a central permission-evaluation query boundary.
3. Implement appointments, preparations, reminders, linked documents, status history, soft delete, duplicate-query support, and concurrency.

## Verify
- Tests cover replay, duplicate relation, primary caregiver, expiry, revoke, and cross-patient denial
- Appointment history records actor/server time
- Version conflict preserves newer data
- No plaintext invite token persists

## Definition of Done
- [ ] Repositories are complete
- [ ] Permission/consent queries are explicit
- [ ] Transactional invariants pass
- [ ] Audit hooks exist

---
*Note: You can start a new conversation for the next task to save Context window limits.*

