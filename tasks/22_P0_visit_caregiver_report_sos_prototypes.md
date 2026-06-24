# Task 22: Visit, Caregiver, Report, and SOS Prototypes

## 🤖 Recommended Model
> Complexity: **High** — consent, secure sharing, recording, and emergency flows

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | consent, secure sharing, recording, and emergency flows |
| Gemini | A | Flash 3.5 high | high | consent, secure sharing, recording, and emergency flows |
| GPT | A | 5.4 high | high | consent, secure sharing, recording, and emergency flows |
| Budget | A | DeepSeek V4 Pro | — | consent, secure sharing, recording, and emergency flows |

## Context Files
Read these before starting:
- `docs/design/08-ui-guide.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/12-ui-image-prompts.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 19

## Instructions

1. Prototype Visit Mode, questions, recording/fallback, transcript review, checklist, caregiver permissions, report sharing, emergency profile, and SOS.
2. Include AI draft, expired share, permission expiry, unsupported recorder, partial SOS failure, direct call, location denied, and resolve/cancel states.
3. Prevent accidental SOS without hiding direct call; always show active patient context on caregiver screens.

## Verify
- Recording fallback and transcript review work
- Caregiver revoke state is clear
- Expired share exposes no PHI
- SOS keeps direct call during failure

## Definition of Done
- [ ] High-risk flows are prototyped
- [ ] Consent states are explicit
- [ ] Fallbacks are covered
- [ ] Security/accessibility review passes

---
*Note: You can start a new conversation for the next task to save Context window limits.*

