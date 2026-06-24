# Task 32: Medication Notifications and Caregiver Escalation

## 🤖 Recommended Model
> Complexity: **High** — grace periods, permission-aware escalation, and delivery reliability

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | grace periods, permission-aware escalation, and delivery reliability |
| Gemini | A | Flash 3.5 high | high | grace periods, permission-aware escalation, and delivery reliability |
| GPT | A | 5.4 high | high | grace periods, permission-aware escalation, and delivery reliability |
| Budget | A | DeepSeek V4 Pro | — | grace periods, permission-aware escalation, and delivery reliability |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P3 — Sprint 3

## Prerequisites
- Tasks 08, 14, 30, and 31

## Instructions

1. Schedule medication due notifications idempotently with timezone, quiet hours, privacy-hidden payload, In-app baseline, and supported Web Push.
2. Transition unanswered events after the configured grace period to the SRS state and create escalation only when caregiver scope/settings allow.
3. Audit schedule/delivery/escalation, expose failure/retry state, de-duplicate channels, and stop future jobs when medication is paused/stopped.

## Verify
- One occurrence creates one logical notification
- Denied push uses In-app fallback
- Missed escalation reaches only authorized caregiver
- Pause/stop cancels future jobs

## Definition of Done
- [ ] F304/F306 are implemented
- [ ] Escalation follows permission policy
- [ ] Delivery is observable/idempotent
- [ ] Notification E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

