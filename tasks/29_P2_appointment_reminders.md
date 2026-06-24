# Task 29: Appointment Reminders and Actions

## 🤖 Recommended Model
> Complexity: **High** — idempotent schedules, Web Push variability, and caregiver escalation

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | idempotent schedules, Web Push variability, and caregiver escalation |
| Gemini | A | Flash 3.5 high | high | idempotent schedules, Web Push variability, and caregiver escalation |
| GPT | A | 5.4 high | high | idempotent schedules, Web Push variability, and caregiver escalation |
| Budget | A | DeepSeek V4 Pro | — | idempotent schedules, Web Push variability, and caregiver escalation |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P2 — Sprint 2

## Prerequisites
- Tasks 08, 14, and 27

## Instructions

1. Implement multiple reminder offsets, timezone-aware idempotent scheduling, delivery status, cancellation/rebuild after edit/reschedule/cancel, and quiet/privacy settings.
2. Deliver In-app baseline and Web Push when supported; deep link to appointment and support Confirm going, Snooze, Open map, and Contact caregiver.
3. Implement optional caregiver escalation for no confirmation under permission rules; prevent duplicate notifications and expose permission/capability recovery.

## Verify
- Edit/reschedule cancels old jobs and creates one new set
- Push-disabled user still receives In-app item
- Deep links and actions work
- No detailed PHI appears on lock screen

## Definition of Done
- [ ] F206 is implemented
- [ ] Scheduling is idempotent
- [ ] Fallback/escalation follows policy
- [ ] Notification tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

