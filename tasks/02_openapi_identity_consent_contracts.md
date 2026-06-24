# Task 02: OpenAPI Core, Identity, and Consent Contracts

## 🤖 Recommended Model
> Complexity: **High** — contract-first auth and consent boundaries affect every protected API

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ contract-first auth and consent boundaries affect every protected API ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ contract-first auth and consent boundaries affect every protected API ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ contract-first auth and consent boundaries affect every protected API ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ contract-first auth and consent boundaries affect every protected API ซึ่งต้อง reasoning ข้ามหลาย boundary |

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
- B01–B03, US-001, US-010–US-021

## Prerequisites
- Task 01

## Instructions

1. **Implement scope**
   - Create the OpenAPI 3.1 root with `/api/v1`, shared success/error envelopes, IDs, timestamps, pagination, idempotency, and optimistic-concurrency schemas.

2. **Apply rules**
   - Define `/me`, patient profile, consent, caregiver invitation, relationship, and permission-scope schemas and examples.

3. **Handle integration and states**
   - Document stable validation, auth, permission, conflict, expiry, and revocation errors; do not expose Firebase-specific DTO types.

4. **Document and test**
   - Add synthetic executable examples for owner, scoped caregiver, revoked relationship, and expired consent.

## Verify
- Run `pnpm api:validate`.
- Validate examples against their schemas.
- Confirm all protected operations declare bearer auth and documented permission/consent failures.

## Definition of Done
- [ ] Core and identity/consent contracts validate
- [ ] Examples contain synthetic data only
- [ ] Stable errors and authorization expectations are explicit
- [ ] Traceability to backlog stories is recorded

---
*Note: You can start a new conversation for the next task to save Context window limits.*
