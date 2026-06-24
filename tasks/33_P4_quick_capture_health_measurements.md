# Task 33: Quick Capture and Health Measurements

## 🤖 Recommended Model
> Complexity: **High** — multi-entry capture, typed values, and offline persistence

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | multi-entry capture, typed values, and offline persistence |
| Gemini | A | Flash 3.5 high | high | multi-entry capture, typed values, and offline persistence |
| GPT | A | 5.4 high | high | multi-entry capture, typed values, and offline persistence |
| Budget | A | DeepSeek V4 Pro | — | multi-entry capture, typed values, and offline persistence |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/08-ui-guide.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P4 — Sprint 4

## Prerequisites
- Tasks 16, 18, 19, and 26

## Instructions

1. Implement one-action Quick Capture with visible active-patient context and entry points for required photo/audio/measurement/symptom/appointment/question/checklist items.
2. Implement weight, height, blood pressure, pulse, and glucose entry/history/charts with units, context, source/device/actor, BMI, sanity validation, edit history, and soft delete.
3. Queue offline captures with visible status and no duplicates; add textual chart summaries and never diagnose from out-of-range values.

## Verify
- Each required Quick Capture route opens correct form
- Offline BP syncs once
- Invalid units/ranges are explained
- Caregiver attribution and chart alternatives pass

## Definition of Done
- [ ] F400–F401 are implemented
- [ ] Offline health flow is idempotent
- [ ] Accessibility/responsive states pass
- [ ] API/E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

