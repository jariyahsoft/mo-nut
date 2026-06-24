# Task 36: Doctor Visit Mode and Audio Capture

## 🤖 Recommended Model
> Complexity: **High** — multi-domain visit flow, recording consent, and browser fallback

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | multi-domain visit flow, recording consent, and browser fallback |
| Gemini | A | Flash 3.5 high | high | multi-domain visit flow, recording consent, and browser fallback |
| GPT | A | 5.4 high | high | multi-domain visit flow, recording consent, and browser fallback |
| Budget | A | DeepSeek V4 Pro | — | multi-domain visit flow, recording consent, and browser fallback |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/08-ui-guide.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
P5 — Sprint 5

## Prerequisites
- Tasks 18, 27, 33–35

## Instructions

1. Implement Visit Mode combining appointment, medications, priority questions, health summary, checklist progress, notes, and next-appointment creation.
2. Implement explicit recording-permission confirmation, start/pause/resume/stop where supported, audio-file fallback, naming/notes/relations, progress, retry/resume, and cancel.
3. Support adding measurements/documents/audio during visit, preserve unsynced work, and show recording/legal/AI notices in simple Thai.

## Verify
- Visit sequence works on mobile and desktop
- Recording denied/unsupported uses file fallback
- Interrupted upload preserves audio
- No recording starts before confirmation

## Definition of Done
- [ ] F501–F502 are implemented
- [ ] Visit context is permission-safe
- [ ] Audio/fallback/offline states work
- [ ] Accessibility/security/E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

