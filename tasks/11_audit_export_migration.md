# Task 11: Audit, Outbox, Export, and Migration Dry Run

## 🤖 Recommended Model
> Complexity: **Very High** — append-only evidence and migration tooling can cause irreversible data loss

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | S | Opus 4.6 | — | Tier S จำเป็นสำหรับ append-only evidence and migration tooling can cause irreversible data loss เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Gemini | S | Pro 3.1 | high | Tier S จำเป็นสำหรับ append-only evidence and migration tooling can cause irreversible data loss เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| GPT | S | 5.5 | high | Tier S จำเป็นสำหรับ append-only evidence and migration tooling can cause irreversible data loss เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |
| Budget | S | GLM 5.2 | — | Tier S จำเป็นสำหรับ append-only evidence and migration tooling can cause irreversible data loss เพราะความผิดพลาดมีผลกระทบสูงหรือย้อนกลับยาก |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/05-decisions.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
Phase 0 — Domain and Database

## Source Tasks
- D08–D10, X06

## Prerequisites
- Tasks 08–10

## Instructions

1. **Implement scope**
   - Implement append-only audit and outbox repositories with minimal PHI payloads, retry metadata, and transaction coupling to state changes.

2. **Apply rules**
   - Build an NDJSON export tool with schemaVersion, stable ordering, checksums, counts, relationship validation, and encrypted destination guidance.

3. **Handle integration and states**
   - Create a migration dry-run framework that supports backfill validation, read comparison, resumability, and a no-write default.

4. **Document and test**
   - Document rollback, dual-write/read-compare stages, operator approvals, and restore evidence; never execute production migration in this task.

## Verify
- Run export/import dry runs using synthetic fixtures.
- Verify counts, checksums, IDs, timestamps, and relationships.
- Simulate interruption/retry and prove no duplicate or partial silent success.

## Definition of Done
- [ ] Audit/outbox persistence is append-only
- [ ] NDJSON export is deterministic and validated
- [ ] Migration dry run is safe and resumable
- [ ] Rollback and operator steps are documented

## Open Questions
- Target database and approved retention schedule are not yet selected.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
