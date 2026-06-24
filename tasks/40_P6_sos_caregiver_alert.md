# Task 40: SOS and Caregiver Alert

## 🤖 Recommended Model
> Complexity: **Very High** — emergency interaction, partial delivery, location consent, and audit

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | emergency interaction, partial delivery, location consent, and audit |
| Gemini | A | Flash 3.5 high | high | emergency interaction, partial delivery, location consent, and audit |
| GPT | A | 5.4 high | high | emergency interaction, partial delivery, location consent, and audit |
| Budget | A | DeepSeek V4 Pro | — | emergency interaction, partial delivery, location consent, and audit |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P6 — Sprint 6

## Prerequisites
- Tasks 08, 14, 18, 26, and 39

## Instructions

1. Implement press-and-hold/accessible confirmation, direct emergency/caregiver `tel:` option, event lifecycle, cancel/resolve, and explicit disclaimer that Mo-nut is not emergency service.
2. When online and consented, send location and alerts to authorized caregivers with channel status; preserve direct call and show partial failure when push/location fails.
3. Prevent accidental duplicate SOS without blocking genuine call, audit actors/server time/status, minimize location retention, and expose failure recovery.

## Verify
- Direct call remains available offline
- Duplicate activation creates one logical event
- Only authorized caregivers receive alert
- Partial push/location failure is visible and auditable

## Definition of Done
- [ ] F603 is implemented
- [ ] SOS state machine matches SRS
- [ ] Consent/retention/privacy rules pass
- [ ] E2E failure-path tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

