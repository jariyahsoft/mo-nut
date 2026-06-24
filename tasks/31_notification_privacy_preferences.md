# Task 31: Notification Preferences, Privacy, and Quiet Hours

## 🤖 Recommended Model
> Complexity: **High** — cross-platform delivery rules and lock-screen health privacy

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ cross-platform delivery rules and lock-screen health privacy เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ cross-platform delivery rules and lock-screen health privacy เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ cross-platform delivery rules and lock-screen health privacy เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ cross-platform delivery rules and lock-screen health privacy เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`
- `docs/design/08-ui-guide.md`

## Phase
Cross-cutting — MVP

## Source Tasks
- X03, US-111

## Prerequisites
- Tasks 05 and 12

## Instructions

1. **Implement scope**
   - Implement per-type notification preferences, quiet hours with timezone behavior, lock-screen privacy mode, and permission health status.

2. **Apply rules**
   - Centralize deterministic notification IDs, deep-link routing, local/server de-duplication, cancellation, and schedule restoration after reboot/app update.

3. **Handle integration and states**
   - Keep push payloads minimal and localized; never include detailed medication, transcript, diagnosis, or raw PHI in hidden mode.

4. **Document and test**
   - Build settings and permission-recovery UI for granted/denied/provisional states.

## Verify
- Run the full notification matrix in `docs/design/09-testing-guide.md`.
- Test quiet-hour boundaries, timezone/DST change, privacy payloads, duplicate delivery, reboot, and denied permission.
- Inspect notification logs/analytics for PHI leakage.

## Definition of Done
- [ ] Preferences apply to local and server notifications
- [ ] Quiet hours and privacy mode are reliable
- [ ] Deep links/de-duplication work
- [ ] Cross-platform notification tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
