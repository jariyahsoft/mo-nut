# Task 08: Domain Base, Identity, and Caregiver Repositories

## 🤖 Recommended Model
> Complexity: **High** — portable IDs, consent relationships, and transaction invariants

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ portable IDs, consent relationships, and transaction invariants ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ portable IDs, consent relationships, and transaction invariants ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ portable IDs, consent relationships, and transaction invariants ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ portable IDs, consent relationships, and transaction invariants ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/01-architecture.md`
- `docs/design/03-database-design.md`
- `docs/design/05-decisions.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
Phase 0 — Domain and Database

## Source Tasks
- D01–D03

## Prerequisites
- Tasks 02 and 06

## Instructions

1. **Implement scope**
   - Implement standard entity metadata, UUIDv7/ULID generation, schemaVersion, version, audit timestamps, and provider-neutral value objects.

2. **Apply rules**
   - Create repository interfaces and Firestore adapters for users, patient profiles, consents, invitations, and caregiver relationships.

3. **Handle integration and states**
   - Enforce unique Firebase identity, one active relationship, one primary caregiver, invitation expiry, immediate revoke, and optimistic concurrency.

4. **Document and test**
   - Keep Firebase types out of domain/application code and add transaction-focused emulator tests.

## Verify
- Run domain unit tests and repository integration tests.
- Confirm duplicate bootstrap/invitation and stale-version writes are idempotent or rejected correctly.
- Verify revoked relationships cannot be returned as active.

## Definition of Done
- [ ] Portable domain primitives exist
- [ ] Identity/caregiver repositories satisfy invariants
- [ ] Firestore details remain inside adapters
- [ ] Tests cover transactions and edge cases

---
*Note: You can start a new conversation for the next task to save Context window limits.*
