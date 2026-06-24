# Task 37: Speech-to-Text and Transcript Review

## 🤖 Recommended Model
> Complexity: **High** — async Thai STT, original preservation, and human review

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | async Thai STT, original preservation, and human review |
| Gemini | A | Flash 3.5 high | high | async Thai STT, original preservation, and human review |
| GPT | A | 5.4 high | high | async Thai STT, original preservation, and human review |
| Budget | A | DeepSeek V4 Pro | — | async Thai STT, original preservation, and human review |

## Context Files
Read these before starting:
- `docs/design/04-api-standard.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
P5 — Sprint 5

## Prerequisites
- Tasks 13, 14, and 36

## Instructions

1. Implement STT provider adapter/mock with Thai language, timeout/retry/cancel, segment timestamps when available, glossary prompt support, and minimized provider payload.
2. Implement queued/processing/retrying/failed/needs-review/completed UI; preserve original recording and show provider-safe recovery.
3. Allow transcript edit/search and explicit confirm; label AI origin and block creation of appointment/medication/checklist data before confirmation.

## Verify
- Provider failure keeps playable original
- Retry is idempotent
- Edited transcript preserves original/review metadata
- Unconfirmed transcript cannot mutate clinical records

## Definition of Done
- [ ] F503 is implemented
- [ ] AI job state machine matches SRS
- [ ] Human confirmation is enforced
- [ ] Provider/security/E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

