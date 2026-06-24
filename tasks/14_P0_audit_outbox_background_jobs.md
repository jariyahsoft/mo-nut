# Task 14: Audit, Outbox, and Background Job Foundation

## 🤖 Recommended Model
> Complexity: **Very High** — reliable side effects, append-only audit, and retries

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | reliable side effects, append-only audit, and retries |
| Gemini | A | Flash 3.5 high | high | reliable side effects, append-only audit, and retries |
| GPT | A | 5.4 high | high | reliable side effects, append-only audit, and retries |
| Budget | A | DeepSeek V4 Pro | — | reliable side effects, append-only audit, and retries |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/03-database-design.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 10–13
- Task 09

## Instructions

1. Implement append-only audit for privileged access, permissions, media, medications, appointments, reports, SOS, and account operations.
2. Implement transactional outbox plus workers for notification, OCR, STT, reports, reminders, and dose generation.
3. Add retry classification, backoff, attempt limits, dead-letter/partial failure, idempotent worker keys, metrics, and deploy-safe scheduling.

## Verify
- State and outbox commit atomically where required
- Reprocessing does not duplicate effects
- Provider failure preserves originals and retries
- Client cannot write audit/outbox

## Definition of Done
- [ ] Audit coverage matches policy
- [ ] Workers are idempotent
- [ ] Retry/dead-letter metrics exist
- [ ] Failure tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

