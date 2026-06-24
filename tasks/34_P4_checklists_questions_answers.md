# Task 34: Checklists, Questions, and Answers

## 🤖 Recommended Model
> Complexity: **High** — recurring goals, AI drafts, and visit preparation

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | recurring goals, AI drafts, and visit preparation |
| Gemini | A | Flash 3.5 high | high | recurring goals, AI drafts, and visit preparation |
| GPT | A | 5.4 high | high | recurring goals, AI drafts, and visit preparation |
| Budget | A | DeepSeek V4 Pro | — | recurring goals, AI drafts, and visit preparation |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/03-database-design.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P4 — Sprint 4

## Prerequisites
- Tasks 13, 16, 19, and 26

## Instructions

1. Implement checklist templates/goals for one-time/daily/weekly schedules, steps, frequency/minutes/measurement targets, Complete/Skip reason, progress, streak, pause/complete, and offline logs.
2. Implement patient questions with text/voice/photo source, category, priority, appointment relation, reorder, answer text/audio, and reviewed state.
3. Keep AI-created checklist/question suggestions as Draft until confirmation; enforce caregiver permissions and deterministic offline correction/merge.

## Verify
- Weekly progress and streak fixtures pass
- Offline log syncs without duplicate
- Questions order by priority in visit context
- Unconfirmed AI output cannot become active

## Definition of Done
- [ ] F402–F403 are implemented
- [ ] Draft/permission rules hold
- [ ] Progress calculations are tested
- [ ] Accessible UI states pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

