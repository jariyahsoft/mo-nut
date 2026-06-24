# Task 24: Authentication and Domain-user Bootstrap

## 🤖 Recommended Model
> Complexity: **High** — account security, token verification, and session lifecycle

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | account security, token verification, and session lifecycle |
| Gemini | A | Flash 3.5 high | high | account security, token verification, and session lifecycle |
| GPT | A | 5.4 high | high | account security, token verification, and session lifecycle |
| Budget | A | DeepSeek V4 Pro | — | account security, token verification, and session lifecycle |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P1 — Sprint 1

## Prerequisites
- Tasks 01, 05, 06, 09, and 10

## Instructions

1. Implement email/password registration, verification, recovery, Google sign-in, logout, and Firebase token attachment through the generated client.
2. Resolve/create one domain user idempotently, enforce active/suspended status, revoke-all sessions, re-authenticate sensitive actions, and MFA for privileged roles.
3. Add loading/error/rate-limit/offline guidance, security logs without PHI, and feature-flagged Phone OTP that is off by default.

## Verify
- New user reaches onboarding exactly once
- Unverified/suspended/revoked sessions cannot call protected APIs
- Google and recovery flows work
- Auth abuse and token tests pass

## Definition of Done
- [ ] F101 is implemented
- [ ] Session/security rules are enforced
- [ ] Accessible error states exist
- [ ] Unit/integration/E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

