# Task 20: Today, Quick Capture, and Appointment Prototypes

## 🤖 Recommended Model
> Complexity: **Medium** — critical dashboard and OCR journey

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | critical dashboard and OCR journey |
| Gemini | B | Flash 3.5 mid | mid | critical dashboard and OCR journey |
| GPT | B | 5.4-mini | medium | critical dashboard and OCR journey |
| Budget | B | DeepSeek V4 Flash | — | critical dashboard and OCR journey |

## Context Files
Read these before starting:
- `docs/design/08-ui-guide.md`
- `docs/design/06-backlog.md`
- `docs/design/12-ui-image-prompts.md`
- `docs/design/02-coding-rules.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 19

## Instructions

1. Build interactive prototypes for Today, active-patient context, Quick Capture, appointment list/detail, camera/file capture, OCR review, reminders, and travel link.
2. Include loading, empty, error, offline, pending sync, permission denied, unsupported camera, OCR confidence/draft, duplicate warning, and success states.
3. Use mock contract types; validate touch targets, Thai copy, one-primary-action hierarchy, and no automatic OCR confirmation.

## Verify
- Complete Dashboard→Capture→OCR review→confirm at mobile width
- File fallback works
- Keyboard/screen-reader order is correct
- Desktop remains readable

## Definition of Done
- [ ] Critical states are covered
- [ ] OCR remains draft until confirm
- [ ] Responsive/accessibility checks pass
- [ ] Feedback is recorded

---
*Note: You can start a new conversation for the next task to save Context window limits.*

