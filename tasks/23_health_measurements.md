# Task 23: Health Measurement Entry, History, and Charts

## 🤖 Recommended Model
> Complexity: **Medium** — typed measurement CRUD with offline sync and accessible charts

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ typed measurement CRUD with offline sync and accessible charts เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ typed measurement CRUD with offline sync and accessible charts เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ typed measurement CRUD with offline sync and accessible charts เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ typed measurement CRUD with offline sync and accessible charts เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 4 — Health/Checklist/Questions

## Source Tasks
- F401, US-050–US-051

## Prerequisites
- Tasks 10, 12, 15, and 30

## Instructions

1. **Implement scope**
   - Implement measurement API/use cases for blood pressure, pulse, weight, height, and blood glucose with units, source, context, time, audit, and authorization.

2. **Apply rules**
   - Apply sanity validation that warns/rejects malformed values without diagnosing disease; preserve correction history as required.

3. **Handle integration and states**
   - Build entry, dashboard, paginated history, and trend chart screens with textual chart summaries.

4. **Document and test**
   - Support offline create/update, exactly-once sync, conflict review, loading/empty/error/permission states, and 200% font scaling.

## Verify
- Run E2E-HLT-001 plus unit/range/unit/timezone tests.
- Record offline, restart, reconnect, and verify one server record/chart update.
- Audit chart contrast, labels, and text alternatives.

## Definition of Done
- [ ] Measurement API and UI support all MVP types
- [ ] Validation avoids diagnosis
- [ ] Offline sync and correction history work
- [ ] Tests/accessibility pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
