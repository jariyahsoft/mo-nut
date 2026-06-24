# Task 12: Brand Direction and Accessible Design System

## 🤖 Recommended Model
> Complexity: **Medium** — shared Flutter tokens/components with elderly accessibility constraints

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ shared Flutter tokens/components with elderly accessibility constraints เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ shared Flutter tokens/components with elderly accessibility constraints เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ shared Flutter tokens/components with elderly accessibility constraints เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ shared Flutter tokens/components with elderly accessibility constraints เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/02-coding-rules.md`
- `docs/design/12-ui-image-prompts.md`
- `docs/design/06-backlog.md`

## Phase
Phase 0 — Design System

## Source Tasks
- E01–E02

## Prerequisites
- Task 01

## Instructions

1. **Implement scope**
   - Record brand/logo/color decisions or keep proposed tokens explicitly marked as assumptions pending approval.

2. **Apply rules**
   - Implement Flutter design tokens, Thai typography, spacing, radii, semantic colors, themes, localization foundation, and 200% font scaling.

3. **Handle integration and states**
   - Build core accessible components from the inventory, including loading/empty/error/offline/permission states and icon labels.

4. **Document and test**
   - Add a component showcase and targeted widget/golden tests for critical components; do not use Danger red outside emergency/critical states.

## Verify
- Run `flutter analyze` and component tests.
- Audit WCAG AA contrast, touch targets, screen-reader labels, and 200% scaling.
- Review Thai copy and verify no hard-coded user-facing strings.

## Definition of Done
- [ ] Design decisions/assumptions are recorded
- [ ] Core tokens and components are reusable
- [ ] Accessibility states are demonstrated
- [ ] Tests and showcase pass

## Open Questions
- Final logo, brand colors, and state-management choice require confirmation.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
