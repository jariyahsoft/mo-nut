# Task 25: Today Dashboard Aggregation

## 🤖 Recommended Model
> Complexity: **Medium** — cross-module read model and responsive state orchestration

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ cross-module read model and responsive state orchestration เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ cross-module read model and responsive state orchestration เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ cross-module read model and responsive state orchestration เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ cross-module read model and responsive state orchestration เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/06-backlog.md`
- `docs/design/04-api-standard.md`
- `docs/design/02-coding-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 4 — Health/Checklist/Questions

## Source Tasks
- F404

## Prerequisites
- Tasks 17, 21–24

## Instructions

1. **Implement scope**
   - Define and implement a server/client aggregation boundary for next appointment, due medication events, checklist progress, latest measurements, and relevant alerts.

2. **Apply rules**
   - Build the Today-first dashboard with one clear next action, quick capture, bottom navigation, refresh, and privacy-conscious summaries.

3. **Handle integration and states**
   - Handle partial module failures, stale cache, offline data, pending sync, empty onboarding, revoked access, and loading without blocking unaffected cards.

4. **Document and test**
   - Add performance instrumentation without raw PHI and avoid N+1 queries or unbounded reads.

## Verify
- Run aggregation unit/integration tests with missing and partial data.
- Measure dashboard rendering/API behavior using synthetic representative data.
- Test mobile/tablet/web, screen-reader order, and 200% scaling.

## Definition of Done
- [ ] Dashboard composes required modules
- [ ] Partial/offline states remain usable
- [ ] Queries are bounded and observable
- [ ] Performance/accessibility tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
