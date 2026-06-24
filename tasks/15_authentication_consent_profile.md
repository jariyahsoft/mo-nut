# Task 15: Authentication, Consent Onboarding, and Patient Profile

## 🤖 Recommended Model
> Complexity: **High** — identity bootstrap and versioned health consent are security-critical

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ identity bootstrap and versioned health consent are security-critical ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ identity bootstrap and versioned health consent are security-critical ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ identity bootstrap and versioned health consent are security-critical ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ identity bootstrap and versioned health consent are security-critical ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 1 — Identity/Profile/Caregiver

## Source Tasks
- F101–F103, US-010–US-011

## Prerequisites
- Tasks 04–08 and 12

## Instructions

1. **Implement scope**
   - Implement phone OTP and email sign-in, resend/rate-limit/error handling, Firebase token verification, and exactly-once domain-user bootstrap.

2. **Apply rules**
   - Implement versioned consent onboarding for storage and applicable processing purposes with evidence, withdrawal path, and safe defaults.

3. **Handle integration and states**
   - Implement patient profile API/UI for required fields, conditions, allergies, hospitals, language, and font scale with audit on edits.

4. **Document and test**
   - Handle unauthenticated, suspended, partial-onboarding, offline read-only, validation, and retry states.

## Verify
- Run E2E-AUTH-001 plus auth abuse and duplicate-bootstrap tests.
- Verify no protected API is accessible before valid auth/required consent.
- Run Flutter and backend static analysis/tests.

## Definition of Done
- [ ] Auth and domain bootstrap work idempotently
- [ ] Consent version/evidence is stored
- [ ] Profile validation and audit are complete
- [ ] E2E and security checks pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
