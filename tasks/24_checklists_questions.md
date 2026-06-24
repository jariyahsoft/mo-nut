# Task 24: Checklists, Progress, Questions, and Answers

## 🤖 Recommended Model
> Complexity: **High** — recurring goals and AI-draft/voice inputs need safe state workflows

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ recurring goals and AI-draft/voice inputs need safe state workflows เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ recurring goals and AI-draft/voice inputs need safe state workflows เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ recurring goals and AI-draft/voice inputs need safe state workflows เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ recurring goals and AI-draft/voice inputs need safe state workflows เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 4 — Health/Checklist/Questions

## Source Tasks
- F402–F403, US-060, US-070–US-071

## Prerequisites
- Tasks 10, 12, 15, and 30

## Instructions

1. **Implement scope**
   - Implement daily/weekly/one-time checklist templates, deterministic occurrences, complete/skip-with-reason actions, progress, and streak calculations.

2. **Apply rules**
   - Keep AI-created checklists in `DRAFT` until confirmed and enforce permission-scoped progress sharing.

3. **Handle integration and states**
   - Implement appointment questions/answers with text plus approved media/voice attachment path, priority, category, and ordering.

4. **Document and test**
   - Build accessible list/detail/editor/progress UI with offline operations, review reminders, and all standard states.

## Verify
- Run E2E-CHK-001 and recurrence/progress unit tests.
- Test duplicate occurrence/action, draft activation, offline sync, and permission-scoped sharing.
- Verify Doctor Visit ordering by question priority.

## Definition of Done
- [ ] Checklist recurrence/progress is deterministic
- [ ] Questions and answers are linked to appointments
- [ ] Draft and permission rules are enforced
- [ ] Offline and E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
