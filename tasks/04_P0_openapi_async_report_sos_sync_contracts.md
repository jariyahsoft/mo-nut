# Task 04: Async, Report, SOS, Notification, and Sync Contracts

## 🤖 Recommended Model
> Complexity: **High** — async jobs, secure sharing, SOS, and batch sync consistency

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | async jobs, secure sharing, SOS, and batch sync consistency |
| Gemini | A | Flash 3.5 high | high | async jobs, secure sharing, SOS, and batch sync consistency |
| GPT | A | 5.4 high | high | async jobs, secure sharing, SOS, and batch sync consistency |
| Budget | A | DeepSeek V4 Pro | — | async jobs, secure sharing, SOS, and batch sync consistency |

## Context Files
Read these before starting:
- `docs/design/04-api-standard.md`
- `docs/design/07-security-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 01–03

## Instructions

1. Define upload, OCR, recording, transcription, AI review/job, report, share-link, notification, push-subscription, SOS, and emergency-profile contracts.
2. Define `POST /sync/batch` with `client_mutation_id`, `base_version`, per-item partial success, retryability, and conflicts.
3. Add privacy-safe push, token hash/expiry, upload limits, async status, provider failure, revoked share, and SOS partial-failure examples.

## Verify
- `pnpm api:validate`
- Batch fixture returns independent mutation outcomes
- Expired share exposes no patient data
- Push fixtures contain no detailed PHI

## Definition of Done
- [ ] Async/PWA contracts validate
- [ ] Retry and idempotency are explicit
- [ ] Sharing/SOS failures are covered
- [ ] Fixtures support frontend mocks

---
*Note: You can start a new conversation for the next task to save Context window limits.*

