# Task 09: Appointment and Medication Repositories

## 🤖 Recommended Model
> Complexity: **High** — time-based clinical records need indexes, histories, and concurrency controls

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ time-based clinical records need indexes, histories, and concurrency controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ time-based clinical records need indexes, histories, and concurrency controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ time-based clinical records need indexes, histories, and concurrency controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ time-based clinical records need indexes, histories, and concurrency controls ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/05-decisions.md`
- `docs/design/09-testing-guide.md`

## Phase
Phase 0 — Domain and Database

## Source Tasks
- D04–D05

## Prerequisites
- Tasks 03, 06, and 08

## Instructions

1. **Implement scope**
   - Implement provider-neutral repositories and Firestore adapters for appointments/reminders, medications, schedules, and medication events.

2. **Apply rules**
   - Implement documented patient/time/status query shapes and ensure every query has a version-controlled composite index.

3. **Handle integration and states**
   - Preserve medication and schedule history; use append-oriented events with unique deterministic `occurrenceKey`.

4. **Document and test**
   - Enforce UTC plus timezone, soft-delete/stop semantics, pagination, optimistic concurrency, and idempotent event writes.

## Verify
- Run repository tests against the emulator.
- Query upcoming/history pages deterministically with cursor pagination.
- Confirm duplicate occurrence and stale update scenarios cannot corrupt history.

## Definition of Done
- [ ] Appointment and medication repositories are implemented
- [ ] Required indexes are present
- [ ] History and occurrence uniqueness are enforced
- [ ] Portability boundaries and tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
