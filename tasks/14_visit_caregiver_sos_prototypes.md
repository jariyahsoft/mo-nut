# Task 14: Doctor Visit, Caregiver, SOS, and Usability Prototypes

## 🤖 Recommended Model
> Complexity: **High** — permission-sensitive and emergency UX needs usability validation

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ permission-sensitive and emergency UX needs usability validation เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ permission-sensitive and emergency UX needs usability validation เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ permission-sensitive and emergency UX needs usability validation เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ permission-sensitive and emergency UX needs usability validation เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/12-ui-image-prompts.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`

## Phase
Phase 0 — UX Prototype

## Source Tasks
- E07–E11

## Prerequisites
- Tasks 12–13

## Instructions

1. **Implement scope**
   - Build navigable prototypes for Doctor Visit Mode, Caregiver dashboard, checklist/report context, SOS confirmation/active state, and emergency profile.

2. **Apply rules**
   - Make caregiver scope/revocation visible and use press-and-hold SOS with direct-call/offline options and a non-emergency-service disclaimer.

3. **Handle integration and states**
   - Prepare an elderly usability script covering core flows, observation criteria, consent for research, and synthetic scenarios.

4. **Document and test**
   - Record client/usability feedback with severity and traceability, then revise prototypes without silently converting feedback into requirements.

## Verify
- Run widget/accessibility tests and a structured internal usability dry run.
- Confirm accidental SOS activation is prevented while direct calling remains available offline.
- Verify caregiver cannot see content outside the displayed permission scope.

## Definition of Done
- [ ] Prototype flows and safety states are complete
- [ ] Usability test materials exist
- [ ] Feedback and resulting changes are traceable
- [ ] Accessibility and permission checks pass

## Open Questions
- Country-specific emergency numbers and final approved SOS wording are unresolved.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
