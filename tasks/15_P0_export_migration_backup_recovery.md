# Task 15: Canonical Export, Migration Dry-run, and Recovery

## 🤖 Recommended Model
> Complexity: **Very High** — portable health data, reconciliation, and recovery

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | portable health data, reconciliation, and recovery |
| Gemini | A | Flash 3.5 high | high | portable health data, reconciliation, and recovery |
| GPT | A | 5.4 high | high | portable health data, reconciliation, and recovery |
| Budget | A | DeepSeek V4 Pro | — | portable health data, reconciliation, and recovery |

## Context Files
Read these before starting:
- `docs/design/03-database-design.md`
- `docs/design/05-decisions.md`
- `docs/design/09-testing-guide.md`
- `docs/design/01-architecture.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 10–14

## Instructions

1. Implement versioned NDJSON canonical export with checksums, portable mapping, and relationship validation.
2. Create a non-production migration dry-run for backfill, count/hash/sample reconciliation, shadow reads, feature-flag switching, and rollback evidence.
3. Document Firestore export, Storage lifecycle, configuration/index restore, RPO ≤24h, RTO ≤8h, and six-month/pre-pilot drills.

## Verify
- Synthetic export/import preserves IDs/times/relations
- Corrupt relation fails reconciliation
- Dry-run cannot write production by default
- Runbook restores indexes/jobs and supports emergency share revoke

## Definition of Done
- [ ] Export is repeatable
- [ ] Dry-run reports reconciliation
- [ ] Runbook meets SRS targets
- [ ] Rollback/data protection are documented

---
*Note: You can start a new conversation for the next task to save Context window limits.*

