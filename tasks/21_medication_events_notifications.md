# Task 21: Medication Event Generation and Due Notifications

## 🤖 Recommended Model
> Complexity: **High** — deterministic event generation and reliable notification delivery

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ deterministic event generation and reliable notification delivery เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ deterministic event generation and reliable notification delivery เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ deterministic event generation and reliable notification delivery เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ deterministic event generation and reliable notification delivery เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/06-backlog.md`
- `docs/design/09-testing-guide.md`
- `docs/design/01-architecture.md`

## Phase
Sprint 3 — Medication

## Source Tasks
- F303–F304, US-041

## Prerequisites
- Tasks 07, 09, 20, and 31

## Instructions

1. **Implement scope**
   - Implement scheduled generation of medication events with deterministic occurrence keys, bounded lookahead, resumable batches, and outbox events.

2. **Apply rules**
   - Implement local due notifications and server FCM jobs with stable IDs, deep links, permission health checks, privacy mode, and de-duplication.

3. **Handle integration and states**
   - Build the full-screen due experience with medication image/dose and accessible Taken/Snooze/Skip actions.

4. **Document and test**
   - Handle reboot, app lifecycle, timezone/schedule changes, worker retries, and cancelled/stopped medication.

## Verify
- Run occurrence generation and duplicate-worker tests with a fake clock.
- Test foreground/background/terminated/reboot/timezone notification cases.
- Confirm stopped medication produces no future events while historical events remain.

## Definition of Done
- [ ] Events generate exactly once
- [ ] Local/server notifications de-duplicate
- [ ] Due UI is accessible and privacy-safe
- [ ] Unit/integration/notification tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
