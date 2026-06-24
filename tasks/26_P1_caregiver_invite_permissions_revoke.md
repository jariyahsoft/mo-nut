# Task 26: Caregiver Invite, Permissions, and Revoke

## 🤖 Recommended Model
> Complexity: **Very High** — relationship-based PHI authorization and immediate revocation

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | relationship-based PHI authorization and immediate revocation |
| Gemini | A | Flash 3.5 high | high | relationship-based PHI authorization and immediate revocation |
| GPT | A | 5.4 high | high | relationship-based PHI authorization and immediate revocation |
| Budget | A | DeepSeek V4 Pro | — | relationship-based PHI authorization and immediate revocation |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P1 — Sprint 1

## Prerequisites
- Tasks 11, 14, 24, and 25

## Instructions

1. Implement invite by email/phone/link, expiry, one-time acceptance, duplicate prevention, and caregiver multi-patient switcher.
2. Implement granular permission selection, primary/backup caregiver, optional expiry, suspend/revoke, and actor/patient context on every screen.
3. Enforce central relationship authorization on APIs, invalidate controlled cache after revoke, audit changes, and notify important permission changes when configured.

## Verify
- Invite→accept→allowed read works
- Replayed/expired invite fails safely
- Cross-patient and missing-scope requests are forbidden
- Next API request after revoke is denied

## Definition of Done
- [ ] F104–F105 are implemented
- [ ] Permission matrix is automated
- [ ] Revocation is immediate
- [ ] No Critical/High authorization defect remains

---
*Note: You can start a new conversation for the next task to save Context window limits.*

