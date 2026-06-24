# Task 27: Appointment CRUD, List, Detail, and Calendar

## 🤖 Recommended Model
> Complexity: **High** — timezone, state history, soft delete, and offline drafts

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | timezone, state history, soft delete, and offline drafts |
| Gemini | A | Flash 3.5 high | high | timezone, state history, soft delete, and offline drafts |
| GPT | A | 5.4 high | high | timezone, state history, soft delete, and offline drafts |
| Budget | A | DeepSeek V4 Pro | — | timezone, state history, soft delete, and offline drafts |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/04-api-standard.md`
- `docs/design/03-database-design.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P2 — Sprint 2

## Prerequisites
- Tasks 02, 11, 16, 19, and 26

## Instructions

1. Implement appointment create/edit/reschedule/cancel/soft-delete, preparation, facility/department/doctor/purpose, caregiver assignment, timezone, and status history.
2. Build responsive list/calendar/detail with next appointment, pagination, duplicate warning, map link, and loading/empty/error/offline/pending/conflict states.
3. Queue offline drafts with `client_mutation_id`; use optimistic concurrency and never discard a local/server conflict silently.

## Verify
- Manual appointment works online/offline
- Timezone and status history are correct
- Reschedule/cancel updates history without hard delete
- Patient/caregiver permissions and version conflicts pass

## Definition of Done
- [ ] F201–F202 are implemented
- [ ] Offline draft sync is idempotent
- [ ] Responsive/accessibility checks pass
- [ ] API/E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

