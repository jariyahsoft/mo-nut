# Task 19: OCR Review, Confirmation, and Appointment Reminders

## 🤖 Recommended Model
> Complexity: **High** — human confirmation and duplicate-safe local/server notifications

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ human confirmation and duplicate-safe local/server notifications เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ human confirmation and duplicate-safe local/server notifications เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ human confirmation and duplicate-safe local/server notifications เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ human confirmation and duplicate-safe local/server notifications เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`
- `docs/design/07-security-rules.md`

## Phase
Sprint 2 — Appointments/OCR

## Source Tasks
- F205–F206, US-031–US-032

## Prerequisites
- Tasks 17–18 and 31

## Instructions

1. **Implement scope**
   - Build OCR review UI showing original image, extracted fields, confidence, editable validation, processing/failure states, and explicit confirmation.

2. **Apply rules**
   - Implement confirmation transaction that creates/updates an appointment once and records source/audit evidence.

3. **Handle integration and states**
   - Implement configurable reminder offsets, deterministic IDs, deep links, local/server de-duplication, privacy mode, timezone changes, and cancellation/reschedule updates.

4. **Document and test**
   - Use non-blaming Thai copy and ensure the user can complete manual entry when OCR fails.

## Verify
- Run E2E-APT-001.
- Test low-confidence edits, duplicate confirm, OCR failure fallback, reminder de-duplication, quiet hours, and timezone change.
- Verify lock-screen payload contains no detailed health data in hidden mode.

## Definition of Done
- [ ] OCR review never bypasses confirmation
- [ ] Appointment is persisted idempotently
- [ ] Reminders and deep links work without duplicates
- [ ] E2E/accessibility/privacy checks pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
