# Task 03: Medication and Health API Contracts

## 🤖 Recommended Model
> Complexity: **High** — dose idempotency, schedule rules, and typed measurements

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | dose idempotency, schedule rules, and typed measurements |
| Gemini | A | Flash 3.5 high | high | dose idempotency, schedule rules, and typed measurements |
| GPT | A | 5.4 high | high | dose idempotency, schedule rules, and typed measurements |
| Budget | A | DeepSeek V4 Pro | — | dose idempotency, schedule rules, and typed measurements |

## Context Files
Read these before starting:
- `docs/design/04-api-standard.md`
- `docs/design/03-database-design.md`
- `docs/design/06-backlog.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 01

## Instructions

1. Define medication, image, schedule, dose action/correction, and adherence contracts with timezone and effective ranges.
2. Define measurement create/list/update/delete/summary contracts for weight, height, blood pressure, pulse, and glucose.
3. Document dose idempotency, immutable schedule history, optimistic concurrency, unit/range validation, and caregiver attribution.

## Verify
- `pnpm api:validate`
- Fixtures cover supported schedule patterns
- Repeated dose action documents one result
- Invalid unit/range returns `VALIDATION_ERROR`

## Definition of Done
- [ ] Medication and health contracts validate
- [ ] State machines match SRS
- [ ] Idempotency/correction is explicit
- [ ] Examples are executable fixtures

---
*Note: You can start a new conversation for the next task to save Context window limits.*

