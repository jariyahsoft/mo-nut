# Task 04: Contract Mocking, Flutter Client, and Compatibility CI

## 🤖 Recommended Model
> Complexity: **Medium** — tooling integration across OpenAPI, mocks, generated Dart, and CI

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ tooling integration across OpenAPI, mocks, generated Dart, and CI เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ tooling integration across OpenAPI, mocks, generated Dart, and CI เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ tooling integration across OpenAPI, mocks, generated Dart, and CI เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ tooling integration across OpenAPI, mocks, generated Dart, and CI เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
Phase 0 — API Contract

## Source Tasks
- B08–B10, US-001

## Prerequisites
- Tasks 02–03

## Instructions

1. **Implement scope**
   - Configure a deterministic mock server from the OpenAPI examples and document startup/override behavior.

2. **Apply rules**
   - Generate the Flutter client into the agreed package path; keep generated DTOs separate from domain and local-storage models.

3. **Handle integration and states**
   - Add CI checks for OpenAPI validity, generated-client compilation, example fixtures, and breaking contract changes.

4. **Document and test**
   - Provide one smoke integration proving the Flutter client can call the mock `/me` and a paginated feature endpoint.

## Verify
- Run the mock server and execute the smoke calls.
- Run `pnpm test:contract` and `flutter analyze`.
- Introduce a temporary breaking schema change and confirm compatibility CI rejects it, then revert it.

## Definition of Done
- [ ] Mock server runs from repository commands
- [ ] Generated Flutter client compiles
- [ ] Compatibility check blocks accidental breaks
- [ ] Usage is documented

---
*Note: You can start a new conversation for the next task to save Context window limits.*
