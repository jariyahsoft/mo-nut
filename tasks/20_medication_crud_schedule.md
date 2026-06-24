# Task 20: Medication CRUD, Images, and Schedule Engine

## 🤖 Recommended Model
> Complexity: **High** — medication history and recurrence calculations are safety-sensitive

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ medication history and recurrence calculations are safety-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ medication history and recurrence calculations are safety-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ medication history and recurrence calculations are safety-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ medication history and recurrence calculations are safety-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 3 — Medication

## Source Tasks
- F301–F302, US-040

## Prerequisites
- Tasks 06, 09, 12, and 15

## Instructions

1. **Implement scope**
   - Implement medication CRUD/stop and secure image handling with authorization, audit, validation, and history preservation.

2. **Apply rules**
   - Implement daily, weekly, interval, meal-relation, effective-date, and timezone-aware schedule rules using a controllable clock.

3. **Handle integration and states**
   - Build medication list/add/edit/detail screens showing image, name, strength, dose, instructions, status, and all required UI states.

4. **Document and test**
   - Do not interpret labels, recommend dosing, or automatically stop/change medication.

## Verify
- Run recurrence unit tests across date boundaries, timezone changes, DST simulation, and invalid schedules.
- Run upload/privacy, permission, concurrency, and stop-history tests.
- Run Flutter form/widget/accessibility tests.

## Definition of Done
- [ ] Medication CRUD and private images work
- [ ] Schedule engine is deterministic and tested
- [ ] Stopped medication preserves history
- [ ] UI and safety copy pass review

---
*Note: You can start a new conversation for the next task to save Context window limits.*
