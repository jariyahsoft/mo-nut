# Task 06: Firebase Environments, Auth, and Emulators

## 🤖 Recommended Model
> Complexity: **High** — environment isolation and authentication security

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | environment isolation and authentication security |
| Gemini | A | Flash 3.5 high | high | environment isolation and authentication security |
| GPT | A | 5.4 high | high | environment isolation and authentication security |
| Budget | A | DeepSeek V4 Pro | — | environment isolation and authentication security |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/07-security-rules.md`
- `docs/design/11-tasks.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 00

## Instructions

1. Configure isolated local/development/staging/production Firebase projects with validated environment mapping.
2. Enable email/password and Google; keep Phone OTP feature-flagged and define MFA for privileged roles.
3. Configure Auth, Firestore, Storage, and Functions emulators with synthetic data and production-target safeguards.

## Verify
- Local sign-in uses emulators
- Project mismatch fails fast
- Verification/recovery and Google sign-in are testable
- No credential or real patient data is committed

## Definition of Done
- [ ] Environment mapping is documented
- [ ] Required Auth providers are configured
- [ ] Emulator workflow is repeatable
- [ ] Production safeguards exist

---
*Note: You can start a new conversation for the next task to save Context window limits.*

