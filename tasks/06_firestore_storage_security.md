# Task 06: Firestore, Storage, and Service Security Baseline

## 🤖 Recommended Model
> Complexity: **Very High** — deny-by-default health-data access and private uploads are critical controls

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ deny-by-default health-data access and private uploads are critical controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ deny-by-default health-data access and private uploads are critical controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ deny-by-default health-data access and private uploads are critical controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ deny-by-default health-data access and private uploads are critical controls ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`
- `docs/design/05-decisions.md`

## Phase
Phase 0 — Cloud Foundation

## Source Tasks
- C03, C04, C07

## Prerequisites
- Tasks 01 and 05

## Instructions

1. **Implement scope**
   - Create version-controlled Firestore indexes from documented query patterns and a deny-by-default ruleset for restricted collections.

2. **Apply rules**
   - Create private Storage rules/policies and the authorized upload boundary; validate MIME, magic bytes, size, checksum, path, and ownership.

3. **Handle integration and states**
   - Define least-privilege service accounts and Secret Manager references per environment without embedding secret values.

4. **Document and test**
   - Add emulator tests for denied direct PHI access, allowed reviewed public/config access, upload bypasses, and cross-patient IDOR attempts.

## Verify
- Run Firestore and Storage rules tests in the Emulator Suite.
- Confirm unauthenticated and client-direct restricted reads/writes fail.
- Confirm backend service identities have only required permissions.

## Definition of Done
- [ ] Rules and indexes are version controlled
- [ ] Restricted data is deny-by-default
- [ ] Private upload controls are tested
- [ ] Least-privilege service setup is documented

## Open Questions
- Confirm whether any client-direct cache collection is required for MVP.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
