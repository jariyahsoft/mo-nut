# Task 05: Firebase Environments, Authentication, FCM, and App Check

## 🤖 Recommended Model
> Complexity: **High** — multi-environment identity and abuse controls are security-sensitive

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ multi-environment identity and abuse controls are security-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ multi-environment identity and abuse controls are security-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ multi-environment identity and abuse controls are security-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ multi-environment identity and abuse controls are security-sensitive ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/01-architecture.md`
- `docs/design/05-decisions.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
Phase 0 — Cloud Foundation

## Source Tasks
- C01, C02, C05

## Prerequisites
- Task 01

## Instructions

1. **Implement scope**
   - Define reproducible dev/staging/prod Firebase configuration with strict project and bundle separation; do not commit credentials.

2. **Apply rules**
   - Configure approved Auth providers, OTP abuse/rate-limit considerations, and MFA readiness for Doctor/Admin roles.

3. **Handle integration and states**
   - Configure FCM and App Check per platform with safe local/emulator behavior and privacy-minimized push payload expectations.

4. **Document and test**
   - Add environment validation and setup documentation, clearly marking console-only or owner-required actions.

## Verify
- Build each Flutter flavor using non-secret placeholders.
- Test Auth and token verification in development/emulator mode.
- Confirm production identifiers cannot be selected accidentally by local defaults.

## Definition of Done
- [ ] Environment boundaries are explicit
- [ ] Auth providers and FCM/App Check setup are documented/configured
- [ ] No secret is stored in the repo
- [ ] Owner-required steps are listed

---
*Note: You can start a new conversation for the next task to save Context window limits.*
