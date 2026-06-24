# Task 13: Patient Core Experience Prototypes

## 🤖 Recommended Model
> Complexity: **Medium** — four connected high-fidelity Flutter flows with responsive states

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ four connected high-fidelity Flutter flows with responsive states เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ four connected high-fidelity Flutter flows with responsive states เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ four connected high-fidelity Flutter flows with responsive states เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ four connected high-fidelity Flutter flows with responsive states เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/12-ui-image-prompts.md`
- `docs/design/06-backlog.md`
- `docs/design/02-coding-rules.md`

## Phase
Phase 0 — UX Prototype

## Source Tasks
- E03–E06

## Prerequisites
- Task 12

## Instructions

1. **Implement scope**
   - Build navigable high-fidelity prototypes for Patient Today, appointment scan/OCR review, medication due, and Health dashboard.

2. **Apply rules**
   - Use synthetic Thai content and local fixtures; show image/confidence/draft cues and never imply diagnosis or verified medication intake.

3. **Handle integration and states**
   - Implement loading, empty, retryable error, offline/pending-sync, permission denied, success, and large-font variants.

4. **Document and test**
   - Keep prototype data adapters replaceable by the generated API client and preserve the navigation model from `docs/design/08-ui-guide.md`.

## Verify
- Run Flutter widget tests and manual navigation smoke tests.
- Test mobile, tablet, web width, and 200% font scaling.
- Confirm primary actions, screen-reader order, and safety copy are clear.

## Definition of Done
- [ ] Four prototype flows are navigable
- [ ] All key UI states are represented
- [ ] No real data or invented feature is present
- [ ] Accessibility review passes

---
*Note: You can start a new conversation for the next task to save Context window limits.*
