# Task 13: Media, Checklist, Report, and SOS Repositories

## 🤖 Recommended Model
> Complexity: **High** — private media, AI review, secure shares, and SOS history

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | private media, AI review, secure shares, and SOS history |
| Gemini | A | Flash 3.5 high | high | private media, AI review, secure shares, and SOS history |
| GPT | A | 5.4 high | high | private media, AI review, secure shares, and SOS history |
| Budget | A | DeepSeek V4 Pro | — | private media, AI review, secure shares, and SOS history |

## Context Files
Read these before starting:
- `docs/design/03-database-design.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 04, 07, and 10

## Instructions

1. Implement document, recording, transcript, AI job, checklist/log, question/answer, report/share, SOS/location, and emergency-profile repositories.
2. Persist private object keys and metadata, never durable signed URLs; keep AI output linked to originals as drafts.
3. Hash share tokens, enforce expiry/revoke/max use, use append-oriented SOS history, and expose retention/deletion hooks.

## Verify
- Invalid AI transitions fail
- Expired/revoked share reveals no report
- Checklist merge/correction is deterministic
- SOS partial failure stays auditable

## Definition of Done
- [ ] Repositories/indexes exist
- [ ] Private media boundaries hold
- [ ] State rules pass tests
- [ ] Retention hooks are documented

---
*Note: You can start a new conversation for the next task to save Context window limits.*

