# Task 43: Pilot Release and Deployment

## 🤖 Recommended Model
> Complexity: **Very High** — production rollout, rollback, recovery, privacy, and support readiness

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | production rollout, rollback, recovery, privacy, and support readiness |
| Gemini | A | Flash 3.5 high | high | production rollout, rollback, recovery, privacy, and support readiness |
| GPT | A | 5.4 high | high | production rollout, rollback, recovery, privacy, and support readiness |
| Budget | A | DeepSeek V4 Pro | — | production rollout, rollback, recovery, privacy, and support readiness |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/05-decisions.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`
- `docs/design/11-tasks.md`

## Phase
P6 — Sprint 6

## Prerequisites
- Tasks 15 and 42
- All MVP/P0-priority feature acceptance tests

## Instructions

1. Complete legal review for Privacy Notice, consent, recording, analytics, provider DPA/residency, retention/deletion, offline emergency data, and SOS disclaimer/numbers.
2. Validate production config/secrets/service accounts, contract compatibility, migration dry-run, backup/restore, monitoring/alerts, feature flags, service-worker update, release notes, and rollback owner.
3. Deploy through development/staging/manual approval to production with smoke tests, support/incident runbook, staged feature exposure, cost dashboard, and post-deploy monitoring.

## Verify
- P0 E2E/UAT and security gates pass
- Restore/rollback and alert drills have evidence
- Production contains no debug/public source map outside policy
- Post-deploy smoke covers auth, dashboard, notification, offline sync, share revoke, and SOS call

## Definition of Done
- [ ] F606 and release checklist are complete
- [ ] Legal/privacy approvals are recorded
- [ ] Deployment/rollback are verified
- [ ] Pilot support and incident response are ready

---
*Note: You can start a new conversation for the next task to save Context window limits.*
