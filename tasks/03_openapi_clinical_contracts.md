# Task 03: OpenAPI Clinical Feature Contracts

## 🤖 Recommended Model
> Complexity: **High** — many health workflows require consistent async, safety, and status contracts

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ many health workflows require consistent async, safety, and status contracts เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ many health workflows require consistent async, safety, and status contracts เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ many health workflows require consistent async, safety, and status contracts เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ many health workflows require consistent async, safety, and status contracts เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/03-database-design.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/10-glossary.md`

## Phase
Phase 0 — API Contract

## Source Tasks
- B04–B07

## Prerequisites
- Task 02

## Instructions

1. **Implement scope**
   - Define appointment, document/OCR, medication, schedule/event, health measurement, checklist/question, audio/STT, report/share, travel, and SOS schemas.

2. **Apply rules**
   - Model OCR/STT results as draft/review-required until explicit confirmation and use async job responses for processing work.

3. **Handle integration and states**
   - Apply enum baselines, UTC timestamps plus schedule timezone, units, cursor pagination, version fields, and idempotency keys where required.

4. **Document and test**
   - Add permission, validation, provider-failure, conflict, expired-share, and unsafe-state examples for each module.

## Verify
- Run `pnpm api:validate`.
- Check endpoint catalog coverage against `docs/design/04-api-standard.md`.
- Verify no contract permits automatic confirmation of OCR/STT or medication changes.

## Definition of Done
- [ ] All MVP clinical endpoint schemas validate
- [ ] Async and draft lifecycles are represented
- [ ] Errors and permission requirements are documented
- [ ] Examples can seed mocks and tests

---
*Note: You can start a new conversation for the next task to save Context window limits.*
