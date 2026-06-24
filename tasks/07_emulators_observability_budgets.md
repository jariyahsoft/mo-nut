# Task 07: Emulator Suite, Logging, Monitoring, and Budgets

## 🤖 Recommended Model
> Complexity: **Medium** — local cloud parity plus operational alert configuration

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ local cloud parity plus operational alert configuration เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ local cloud parity plus operational alert configuration เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ local cloud parity plus operational alert configuration เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ local cloud parity plus operational alert configuration เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
Phase 0 — Cloud Foundation

## Source Tasks
- C06, C08

## Prerequisites
- Tasks 01 and 05–06

## Instructions

1. **Implement scope**
   - Configure Auth, Firestore, Storage, Functions/worker, and FCM-compatible local test substitutes in the Emulator Suite.

2. **Apply rules**
   - Add structured JSON logging with requestId, action code, duration, provider status, and mandatory PHI/token redaction.

3. **Handle integration and states**
   - Define baseline metrics, alerts, Crashlytics setup, budget thresholds, quotas, and safe alert routing per environment.

4. **Document and test**
   - Document local startup, seed/reset, integration-test, and alert-test workflows.

## Verify
- Start the full emulator stack from one documented command.
- Emit a synthetic request/error and verify correlation plus redaction.
- Exercise a test alert or provide a non-production alert validation procedure.

## Definition of Done
- [ ] Emulator workflow is repeatable
- [ ] Logs are structured and redacted
- [ ] Monitoring/budget configuration is represented as code or documented setup
- [ ] Operational verification steps pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
