# Task 30: Medication CRUD and Schedule Engine

## 🤖 Recommended Model
> Complexity: **Very High** — recurrence correctness and immutable medication history

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | recurrence correctness and immutable medication history |
| Gemini | A | Flash 3.5 high | high | recurrence correctness and immutable medication history |
| GPT | A | 5.4 high | high | recurrence correctness and immutable medication history |
| Budget | A | DeepSeek V4 Pro | — | recurrence correctness and immutable medication history |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P3 — Sprint 3

## Prerequisites
- Tasks 03, 12, 18, and 26

## Instructions

1. Implement medication manual/photo entry, OCR draft review, image, dose/form/route/instruction/meal relation, date range, pause/stop, and history-preserving edits.
2. Implement daily, multiple times, weekdays, alternate-day, interval/date-range schedule rules with timezone-safe deterministic occurrence keys.
3. Generate dose events in bounded batches, preserve occurred history after schedule edits, and provide responsive form/list/detail states.

## Verify
- Schedule fixtures cover every required pattern and timezone edge
- Editing schedule does not mutate prior dose events
- OCR cannot create schedule before confirm
- Patient/caregiver permissions pass

## Definition of Done
- [ ] F301–F303 are implemented
- [ ] Recurrence engine is deterministic
- [ ] History invariants pass
- [ ] Forms and tests meet accessibility/security requirements

---
*Note: You can start a new conversation for the next task to save Context window limits.*

