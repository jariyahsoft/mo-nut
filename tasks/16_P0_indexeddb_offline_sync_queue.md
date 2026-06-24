# Task 16: IndexedDB Offline Store and Sync Queue

## 🤖 Recommended Model
> Complexity: **Very High** — offline PHI isolation, idempotency, and conflicts

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | offline PHI isolation, idempotency, and conflicts |
| Gemini | A | Flash 3.5 high | high | offline PHI isolation, idempotency, and conflicts |
| GPT | A | 5.4 high | high | offline PHI isolation, idempotency, and conflicts |
| Budget | A | DeepSeek V4 Pro | — | offline PHI isolation, idempotency, and conflicts |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 04, 05, and 10

## Instructions

1. Implement versioned IndexedDB stores for approved cache, drafts, temporary uploads, and mutations isolated by account/patient.
2. Create queue states, `client_mutation_id`, retry/backoff, online/app-open/manual triggers, partial batch handling, and conflict records.
3. Implement entity policies for create de-duplication, versioned updates, dose first-final action, checklist corrections, and server-wins permissions.

## Verify
- Offline measurement syncs once
- Tab close/reopen preserves pending work
- Partial batch failure does not block valid items
- Logout/account switch follows clear-data policy without silent pending loss

## Definition of Done
- [ ] IndexedDB migrations exist
- [ ] Queue is observable/retryable
- [ ] Conflict behavior matches SRS
- [ ] Privacy/idempotency tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

