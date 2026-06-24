# Task 05: Mock Server, Generated Client, and Contract CI

## 🤖 Recommended Model
> Complexity: **Medium** — repeatable frontend/backend contract integration

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | repeatable frontend/backend contract integration |
| Gemini | B | Flash 3.5 mid | mid | repeatable frontend/backend contract integration |
| GPT | B | 5.4-mini | medium | repeatable frontend/backend contract integration |
| Budget | B | DeepSeek V4 Flash | — | repeatable frontend/backend contract integration |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`
- `docs/design/11-tasks.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 01–04

## Instructions

1. Configure a mock server from approved OpenAPI examples for major flows.
2. Generate the TypeScript web client into a generated package; prohibit manual edits and add a reproducible command.
3. Add CI schema validation, generated-diff detection, response conformance, and breaking-change detection.

## Verify
- `pnpm api:validate && pnpm api:generate` leaves a clean diff
- Mock server serves success/error cases
- Generated client typechecks
- A deliberate breaking change fails CI

## Definition of Done
- [ ] Mock server runs locally
- [ ] Client generation is reproducible
- [ ] Contract gates run in CI
- [ ] Usage is documented

---
*Note: You can start a new conversation for the next task to save Context window limits.*

