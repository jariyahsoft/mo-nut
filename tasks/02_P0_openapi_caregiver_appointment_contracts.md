# Task 02: Caregiver and Appointment API Contracts

## 🤖 Recommended Model
> Complexity: **High** — relationship permissions, invitation expiry, and appointment states

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | relationship permissions, invitation expiry, and appointment states |
| Gemini | A | Flash 3.5 high | high | relationship permissions, invitation expiry, and appointment states |
| GPT | A | 5.4 high | high | relationship permissions, invitation expiry, and appointment states |
| Budget | A | DeepSeek V4 Pro | — | relationship permissions, invitation expiry, and appointment states |

## Context Files
Read these before starting:
- `docs/design/04-api-standard.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/03-database-design.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 01

## Instructions

1. Define caregiver invitation, one-time acceptance, relationship, granular permission, expiry, revoke, and caregiver patient-list contracts.
2. Define appointment CRUD/status-transition, reminder, preparation, document-link, timezone, OCR draft, and soft-delete semantics.
3. Specify errors for cross-patient access, expired/replayed invitations, duplicate relationships, invalid transitions, and version conflicts.

## Verify
- `pnpm api:validate`
- Fixtures cover invite→accept→revoke and appointment lifecycle
- Unauthorized fixtures use stable SRS error codes

## Definition of Done
- [ ] Contracts validate
- [ ] Permission and state rules are explicit
- [ ] No PHI appears in unsafe URLs
- [ ] Compatibility fixtures are added

---
*Note: You can start a new conversation for the next task to save Context window limits.*

