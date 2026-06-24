# Task 10: Domain Metadata, User, and Patient Repositories

## 🤖 Recommended Model
> Complexity: **High** — portable identity mapping and health-profile persistence

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | portable identity mapping and health-profile persistence |
| Gemini | A | Flash 3.5 high | high | portable identity mapping and health-profile persistence |
| GPT | A | 5.4 high | high | portable identity mapping and health-profile persistence |
| Budget | A | DeepSeek V4 Pro | — | portable identity mapping and health-profile persistence |

## Context Files
Read these before starting:
- `docs/design/03-database-design.md`
- `docs/design/05-decisions.md`
- `docs/design/02-coding-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 01, 06, and 07

## Instructions

1. Implement application IDs, standard metadata, schema/version, UTC/timezone, soft-delete, and persistence mappers.
2. Implement Firebase UID→domain user resolution plus user, patient, condition, allergy, facility, and emergency-contact repositories.
3. Separate domain/API/persistence models; repository interfaces contain no Firebase type and have in-memory contract tests.

## Verify
- Repository tests cover CRUD/version conflict/soft delete
- One Firebase identity creates one domain user
- Canonical data uses portable IDs/timestamps
- Domain packages do not import Firebase

## Definition of Done
- [ ] Metadata/ID rules are centralized
- [ ] User/patient repositories work
- [ ] Portability boundaries hold
- [ ] Indexes/tests are documented

---
*Note: You can start a new conversation for the next task to save Context window limits.*

