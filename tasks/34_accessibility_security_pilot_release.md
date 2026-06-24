# Task 34: Accessibility, Security, and Pilot Release Gate

## 🤖 Recommended Model
> Complexity: **Very High** — final safety gate combines security, accessibility, migration, and rollback evidence

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | S | Opus 4.6 | — | Tier S จำเป็นสำหรับ final safety gate combines security, accessibility, migration, and rollback evidence เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Gemini | S | Pro 3.1 | high | Tier S จำเป็นสำหรับ final safety gate combines security, accessibility, migration, and rollback evidence เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| GPT | S | 5.5 | high | Tier S จำเป็นสำหรับ final safety gate combines security, accessibility, migration, and rollback evidence เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Budget | S | GLM 5.2 | — | Tier S จำเป็นสำหรับ final safety gate combines security, accessibility, migration, and rollback evidence เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/02-coding-rules.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`
- `docs/design/11-tasks.md`
- `docs/design/05-decisions.md`

## Phase
Sprint 6 — Pilot Readiness

## Source Tasks
- F604–F606, NFR-002–NFR-003

## Prerequisites
- Tasks 15–33

## Instructions

1. **Implement scope**
   - Run WCAG AA review across P0 flows: TalkBack/VoiceOver, keyboard web, 200% font, contrast, touch targets, focus/error association, chart alternatives, reduced motion, and SOS confirmation.

2. **Apply rules**
   - Run threat-model security tests: IDOR, role/scope/consent, revoked access, upload bypass, signed URLs, share brute force, Firebase rules, OTP abuse, secret/dependency/SAST scans, and PHI log leakage.

3. **Handle integration and states**
   - Run all P0 E2E, contract, integration, offline, notification, performance, backup/restore, migration dry run, and production-configuration checks.

4. **Document and test**
   - Prepare versioned pilot checklist with approved feature flags, secrets/service accounts, monitoring, privacy declarations, staged rollout, rollback owner, support process, and post-deploy smoke tests; stop release on any Critical/High issue.

## Verify
- Run all target CI commands from `docs/design/09-testing-guide.md`.
- Record evidence for every release gate and explicitly list waivers; Critical/High security waivers are not allowed.
- Perform staging smoke, rollback rehearsal, and monitoring alert test.

## Definition of Done
- [ ] P0 journeys pass
- [ ] Critical/High security defects equal zero
- [ ] Accessibility and operational gates have evidence
- [ ] Pilot release and rollback are approved

---
*Note: You can start a new conversation for the next task to save Context window limits.*
