# Task 41: Admin, Support, and Auditor Operations

## 🤖 Recommended Model
> Complexity: **Very High** — privileged account controls, role separation, and break-glass audit

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | privileged account controls, role separation, and break-glass audit |
| Gemini | A | Flash 3.5 high | high | privileged account controls, role separation, and break-glass audit |
| GPT | A | 5.4 high | high | privileged account controls, role separation, and break-glass audit |
| Budget | A | DeepSeek V4 Pro | — | privileged account controls, role separation, and break-glass audit |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P6 — Sprint 6

## Prerequisites
- Tasks 09, 14, 24, and 26

## Instructions

1. Implement minimum-identifier account search, account suspend, session revoke, and system status without showing PHI by default.
2. Implement Security Auditor search by time/actor/resource and strict Admin/Support/Auditor role separation with MFA/step-up.
3. Implement optional break-glass request/reason/time limit/approval/audit alert; keep health access denied unless the approved flow is active.

## Verify
- Admin default view contains no PHI
- Suspension/revoke blocks next protected request
- Auditor cannot mutate records
- Break-glass use/denial is fully audited

## Definition of Done
- [ ] F607–F608 are implemented
- [ ] Privileged roles are separated
- [ ] Authorization matrix/IDOR tests pass
- [ ] No unresolved Critical/High issue

---
*Note: You can start a new conversation for the next task to save Context window limits.*

