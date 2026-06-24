# Task 35: Today Dashboard Aggregation

## 🤖 Recommended Model
> Complexity: **High** — cross-domain aggregation, privacy, and fast mobile rendering

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | cross-domain aggregation, privacy, and fast mobile rendering |
| Gemini | A | Flash 3.5 high | high | cross-domain aggregation, privacy, and fast mobile rendering |
| GPT | A | 5.4 high | high | cross-domain aggregation, privacy, and fast mobile rendering |
| Budget | A | DeepSeek V4 Pro | — | cross-domain aggregation, privacy, and fast mobile rendering |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/06-backlog.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P4 — Sprint 4

## Prerequisites
- Tasks 27, 31, 33, and 34

## Instructions

1. Implement backend/application aggregation for next appointment, due/missed medication, checklist, recent measurement, caregiver alerts, sync state, and Quick Capture.
2. Build today-first responsive cards with active patient, one primary action, loading skeleton ≤1s, primary data ≤3s, empty/error/offline/stale/pending states.
3. Paginate or bound each source, enforce permissions per section, avoid PHI in analytics/logs, and refresh on app open/reconnect.

## Verify
- Dashboard returns only authorized sections
- Performance targets pass under agreed fixture load
- Offline view clearly marks last sync/staleness
- Quick Capture and card deep links work

## Definition of Done
- [ ] F404 is implemented
- [ ] Aggregation is bounded and permission-safe
- [ ] Performance/accessibility targets pass
- [ ] E2E dashboard flow passes

---
*Note: You can start a new conversation for the next task to save Context window limits.*

