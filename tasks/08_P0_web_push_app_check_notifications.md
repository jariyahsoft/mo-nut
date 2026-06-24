# Task 08: App Check, Web Push, and In-app Notifications

## 🤖 Recommended Model
> Complexity: **High** — browser permissions, privacy-safe delivery, and subscription lifecycle

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | browser permissions, privacy-safe delivery, and subscription lifecycle |
| Gemini | A | Flash 3.5 high | high | browser permissions, privacy-safe delivery, and subscription lifecycle |
| GPT | A | 5.4 high | high | browser permissions, privacy-safe delivery, and subscription lifecycle |
| Budget | A | DeepSeek V4 Pro | — | browser permissions, privacy-safe delivery, and subscription lifecycle |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/07-security-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 04 and 06

## Instructions

1. Configure App Check with a safe emulator/local workflow that cannot leak to production.
2. Implement FCM Web Push subscription create/refresh/expire/revoke/delete and capability/permission state.
3. Make In-app Notification the baseline; implement hidden payloads, quiet hours, HTTPS deep links, de-duplication, and denied/unsupported guidance.

## Verify
- Staging browser can subscribe/unsubscribe
- Denied push still has In-app notification
- Expired subscriptions stop retry storms
- Payload contains no detailed PHI

## Definition of Done
- [ ] App Check/Web Push are environment-safe
- [ ] Lifecycle is handled
- [ ] Fallback UX exists
- [ ] Notification tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

