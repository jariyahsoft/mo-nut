# Task 17: Appointment CRUD, List, Detail, and Calendar

## 🤖 Recommended Model
> Complexity: **Medium** — contract-backed CRUD plus offline-aware multi-view Flutter UI

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ contract-backed CRUD plus offline-aware multi-view Flutter UI เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ contract-backed CRUD plus offline-aware multi-view Flutter UI เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ contract-backed CRUD plus offline-aware multi-view Flutter UI เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ contract-backed CRUD plus offline-aware multi-view Flutter UI เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/04-api-standard.md`
- `docs/design/03-database-design.md`
- `docs/design/08-ui-guide.md`
- `docs/design/02-coding-rules.md`

## Phase
Sprint 2 — Appointments/OCR

## Source Tasks
- F201–F202, US-030

## Prerequisites
- Tasks 04, 09, 12, and 15

## Instructions

1. **Implement scope**
   - Implement appointment create/read/update/delete/confirm/complete use cases and endpoints with authorization, audit, idempotency, and optimistic concurrency.

2. **Apply rules**
   - Validate hospital, department, UTC start time, timezone, optional preparation/location/caregiver fields, and legal status transitions.

3. **Handle integration and states**
   - Build Flutter list/calendar/detail/manual form using the generated client and repository boundary.

4. **Document and test**
   - Support pagination, loading/empty/error/offline/pending-sync/permission/revoked states and accessible responsive layouts.

## Verify
- Run appointment domain, API, repository, and widget tests.
- Create offline, reconnect, and verify exactly-one appointment sync.
- Attempt stale updates and unauthorized patient IDs.

## Definition of Done
- [ ] Appointment API and screens are complete
- [ ] Time/status validation is enforced
- [ ] Offline and conflict states are visible
- [ ] Tests and accessibility checks pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
