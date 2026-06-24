# Task 21: Medication and Health Prototypes

## 🤖 Recommended Model
> Complexity: **Medium** — safety-sensitive dose actions and readable trends

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | safety-sensitive dose actions and readable trends |
| Gemini | B | Flash 3.5 mid | mid | safety-sensitive dose actions and readable trends |
| GPT | B | 5.4-mini | medium | safety-sensitive dose actions and readable trends |
| Budget | B | DeepSeek V4 Flash | — | safety-sensitive dose actions and readable trends |

## Context Files
Read these before starting:
- `docs/design/08-ui-guide.md`
- `docs/design/06-backlog.md`
- `docs/design/12-ui-image-prompts.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 19

## Instructions

1. Prototype medication list/add/detail/photo/schedule, due actions, caregiver missed alert, measurement entry/history, and charts.
2. Represent optimistic pending, offline queue, duplicate-tap prevention, correction, invalid unit/range, missing image, and push fallback.
3. Provide textual chart summaries, clear units/context, non-blaming copy, and preserved history when medication changes.

## Verify
- Dose flow is usable one-handed
- Pending/correction states are distinct
- Charts have text alternatives
- 200% zoom passes

## Definition of Done
- [ ] Medication/health flows are prototyped
- [ ] Safety/history rules are visible
- [ ] All common states exist
- [ ] Accessibility review passes

---
*Note: You can start a new conversation for the next task to save Context window limits.*

