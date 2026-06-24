# Task 01: Repository Foundation

## 🤖 Recommended Model
> Complexity: **Medium** — cross-stack monorepo setup and CI baseline

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ cross-stack monorepo setup and CI baseline เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ cross-stack monorepo setup and CI baseline เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ cross-stack monorepo setup and CI baseline เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ cross-stack monorepo setup and CI baseline เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/05-decisions.md`
- `docs/design/11-tasks.md`

## Phase
Phase 0 — Foundation

## Source Tasks
- A01–A08, US-000

## Prerequisites
- None

## Instructions

1. **Implement scope**
   - Create the monorepo layout for the Flutter client, NestJS backend, shared contract/packages, and infrastructure without adding product features.

2. **Apply rules**
   - Initialize Flutter flavors and NestJS strict TypeScript; configure the pnpm workspace and root commands for format, lint, type-check, test, and build.

3. **Handle integration and states**
   - Add a secret-free `.env.example`, GitHub Actions baseline, and branch/PR templates with security, accessibility, contract, and test checks.

4. **Document and test**
   - Document exact bootstrap and common commands in `README.md`; record unresolved runtime or state-management choices instead of silently deciding them.

## Verify
- Run `flutter analyze` and `flutter test`.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and the build command.
- Confirm CI uses the same commands and no real secret or patient data is committed.

## Definition of Done
- [ ] Monorepo and both applications initialize successfully
- [ ] Root developer commands work locally
- [ ] Environment and contribution templates are complete
- [ ] CI baseline passes

---
*Note: You can start a new conversation for the next task to save Context window limits.*
