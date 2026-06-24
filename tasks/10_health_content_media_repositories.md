# Task 10: Health, Checklist, Question, Media, Report, and SOS Repositories

## 🤖 Recommended Model
> Complexity: **High** — multiple restricted-health aggregates require safe query and retention boundaries

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ multiple restricted-health aggregates require safe query and retention boundaries ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ multiple restricted-health aggregates require safe query and retention boundaries ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ multiple restricted-health aggregates require safe query and retention boundaries ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ multiple restricted-health aggregates require safe query and retention boundaries ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/04-api-standard.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
Phase 0 — Domain and Database

## Source Tasks
- D06–D07

## Prerequisites
- Tasks 03, 06, and 08

## Instructions

1. **Implement scope**
   - Implement repository interfaces/adapters for health measurements, checklists/occurrences, questions/answers, documents/extractions, audio/transcripts, reports/share links, emergency profiles, SOS events/locations.

2. **Apply rules**
   - Add documented patient/type/time/status indexes and deterministic pagination.

3. **Handle integration and states**
   - Keep files in private Storage with metadata in the database; never persist signed URLs or plaintext share tokens.

4. **Document and test**
   - Represent AI artifacts as drafts, SOS locations as append-only, and retention/deletion markers without hard-coding unresolved durations.

## Verify
- Run emulator repository integration tests for each aggregate.
- Confirm share-token hashes, draft states, and private object keys are persisted correctly.
- Verify cross-patient queries and unauthorized adapter calls fail at application boundaries.

## Definition of Done
- [ ] All listed repository adapters exist
- [ ] Indexes and lifecycle states match the data design
- [ ] Sensitive token/file rules are enforced
- [ ] Integration tests pass

## Open Questions
- Retention durations for audio, documents, SOS locations, and audit logs remain policy decisions.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
