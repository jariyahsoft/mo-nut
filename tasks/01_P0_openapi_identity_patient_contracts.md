# Task 01: OpenAPI Root, Identity, and Patient Contracts

## 🤖 Recommended Model
> Complexity: **High** — authentication contracts and portable health-data schemas

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | authentication contracts and portable health-data schemas |
| Gemini | A | Flash 3.5 high | high | authentication contracts and portable health-data schemas |
| GPT | A | 5.4 high | high | authentication contracts and portable health-data schemas |
| Budget | A | DeepSeek V4 Pro | — | authentication contracts and portable health-data schemas |

## Context Files
Read these before starting:
- `docs/design/04-api-standard.md`
- `docs/design/03-database-design.md`
- `docs/design/07-security-rules.md`
- `docs/design/11-tasks.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 00

## Instructions

1. Create the OpenAPI 3.1 root, shared metadata, response/error envelopes, bearer security, pagination, idempotency, and concurrency components.
2. Define `/me`, session revocation, consent document/record, patient, condition, allergy, and emergency-contact schemas using `snake_case`.
3. Add valid examples for success, validation, unauthenticated, forbidden, suspended-account, and version-conflict responses without Firebase types.

## Verify
- `pnpm api:validate`
- Examples validate against schemas
- A saved baseline supports breaking-change comparison

## Definition of Done
- [ ] Root and shared schemas validate
- [ ] Identity/patient endpoints cover SRS fields
- [ ] Security requirements appear in OpenAPI
- [ ] Executable examples are committed

---
*Note: You can start a new conversation for the next task to save Context window limits.*

