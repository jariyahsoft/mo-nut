# Task 25: Consent Onboarding and Patient Profile

## 🤖 Recommended Model
> Complexity: **High** — versioned consent, health profile, export, and deletion request

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | versioned consent, health profile, export, and deletion request |
| Gemini | A | Flash 3.5 high | high | versioned consent, health profile, export, and deletion request |
| GPT | A | 5.4 high | high | versioned consent, health profile, export, and deletion request |
| Budget | A | DeepSeek V4 Pro | — | versioned consent, health profile, export, and deletion request |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/08-ui-guide.md`

## Phase
P1 — Sprint 1

## Prerequisites
- Task 24
- Tasks 10 and 19

## Instructions

1. Implement role selection plus required Terms, Privacy Notice, service/health-data consent with document version, purpose, evidence, and grant time.
2. Implement patient profile, conditions, allergies, facilities/patient number/care right, emergency contacts, locale, font scale, and elderly mode.
3. Add profile audit, validation, account-data download request, deletion request, responsive accessibility states, and safe offline policy.

## Verify
- Required consent blocks dashboard until accepted
- Consent version/evidence is persisted
- Profile edits create required audit
- Deletion request follows policy without immediate unsafe purge

## Definition of Done
- [ ] F102–F103 are implemented
- [ ] Profile fields match SRS
- [ ] Consent/audit rules pass
- [ ] E2E onboarding passes

---
*Note: You can start a new conversation for the next task to save Context window limits.*

