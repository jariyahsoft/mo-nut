# Task 30: Offline Database, Operation Queue, and Conflict UX

## 🤖 Recommended Model
> Complexity: **Very High** — cross-feature offline consistency and conflict handling risk silent data loss

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ cross-feature offline consistency and conflict handling risk silent data loss ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ cross-feature offline consistency and conflict handling risk silent data loss ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ cross-feature offline consistency and conflict handling risk silent data loss ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ cross-feature offline consistency and conflict handling risk silent data loss ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/01-architecture.md`
- `docs/design/05-decisions.md`
- `docs/design/03-database-design.md`
- `docs/design/09-testing-guide.md`
- `docs/design/02-coding-rules.md`

## Phase
Cross-cutting — MVP

## Source Tasks
- X01–X02, US-110

## Prerequisites
- Tasks 01, 04, and 08

## Instructions

1. **Implement scope**
   - Implement Drift/SQLite schema for bounded caches and pending operations with stable operation IDs, idempotency keys, attempts, backoff, and migration support.

2. **Apply rules**
   - Implement sync orchestration with per-feature adapters, network transitions, crash recovery, retry classification, and observable pending/failed state.

3. **Handle integration and states**
   - Apply server-wins for permission/account status, append-safe rules for events, version checks for mutable records, and user review where data could be lost.

4. **Document and test**
   - Build shared offline/sync banners, chips, conflict review, and retry actions without allowing one feature to read another feature's local tables directly.

## Verify
- Run the offline/sync matrix from `docs/design/09-testing-guide.md`, including kill/restart, duplicate retry, two-device conflict, revoked permission, app upgrade, and network flapping.
- Verify no conflict silently discards user data.
- Run local database migration and corruption-recovery tests.

## Definition of Done
- [ ] Queue is crash-safe and idempotent
- [ ] Feature sync boundaries are explicit
- [ ] Conflict UI handles loss-risk cases
- [ ] Offline matrix and migration tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
