# Task 12: Medication, Dose Event, and Health Repositories

## 🤖 Recommended Model
> Complexity: **Very High** — schedule history, idempotent dose actions, and corrections

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | schedule history, idempotent dose actions, and corrections |
| Gemini | A | Flash 3.5 high | high | schedule history, idempotent dose actions, and corrections |
| GPT | A | 5.4 high | high | schedule history, idempotent dose actions, and corrections |
| Budget | A | DeepSeek V4 Pro | — | schedule history, idempotent dose actions, and corrections |

## Context Files
Read these before starting:
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/06-backlog.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 03, 07, and 10

## Instructions

1. Implement medication, image, schedule, dose event/correction, measurement, and threshold repositories with required indexes.
2. Preserve dose history when schedules change; enforce occurrence uniqueness and first valid final action, then correction events.
3. Validate typed measurement values/units/context and record actor, source, device, time, version, edit history, and soft deletion.

## Verify
- Schedule change preserves old dose events
- Repeated idempotent action creates one result
- Concurrent final actions resolve deterministically
- Measurement queries/version conflicts pass

## Definition of Done
- [ ] Medication/health repositories work
- [ ] History invariants are enforced
- [ ] Indexes support pagination
- [ ] Contract tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

