# Task 31: Dose Actions and Offline Sync

## 🤖 Recommended Model
> Complexity: **Very High** — optimistic medication actions, idempotency, and correction history

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | optimistic medication actions, idempotency, and correction history |
| Gemini | A | Flash 3.5 high | high | optimistic medication actions, idempotency, and correction history |
| GPT | A | 5.4 high | high | optimistic medication actions, idempotency, and correction history |
| Budget | A | DeepSeek V4 Pro | — | optimistic medication actions, idempotency, and correction history |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/04-api-standard.md`
- `docs/design/03-database-design.md`
- `docs/design/09-testing-guide.md`

## Phase
P3 — Sprint 3

## Prerequisites
- Tasks 12, 16, and 30

## Instructions

1. Implement DUE card/detail and Taken, Snooze, Skip, Report issue actions with scheduled/actual time, actor/source, grace period, and non-blaming copy.
2. Apply optimistic UI ≤300ms and queue offline actions with stable idempotency; first valid final action wins and later changes use audited correction.
3. Handle duplicate taps/retries, conflict UI, caregiver acting on behalf, and schedule-history independence.

## Verify
- Repeated key returns one result/audit effect
- Offline Taken syncs once
- Concurrent final actions follow policy
- Correction records old/new/reason/actor

## Definition of Done
- [ ] F305 is implemented
- [ ] Dose state machine matches SRS
- [ ] Offline/conflict states work
- [ ] Idempotency/concurrency tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

