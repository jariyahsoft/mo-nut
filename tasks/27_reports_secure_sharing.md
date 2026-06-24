# Task 27: PDF Reports and Secure Sharing

## 🤖 Recommended Model
> Complexity: **Very High** — restricted-health exports and public tokens require strict lifecycle controls

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ restricted-health exports and public tokens require strict lifecycle controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ restricted-health exports and public tokens require strict lifecycle controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ restricted-health exports and public tokens require strict lifecycle controls ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ restricted-health exports and public tokens require strict lifecycle controls ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/03-database-design.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 5 — Visit/Audio/Reports

## Source Tasks
- F504–F505, US-100–US-101

## Prerequisites
- Tasks 07, 10–11, and 23–26

## Instructions

1. **Implement scope**
   - Implement patient-selected report range/sections, authorization, async PDF generation, status polling, retry, private storage, and accessible report formatting.

2. **Apply rules**
   - Implement high-entropy share tokens stored only as hashes with expiry, revoke, optional max views, rate limiting, and minimal public response.

3. **Handle integration and states**
   - Build create/status/share/revoke UI and read-only Doctor Lite report view with explicit patient-controlled scope.

4. **Document and test**
   - Audit generation, download, share creation/access/revoke where identifiable; ensure URLs/logs never expose health detail beyond the token route.

## Verify
- Run E2E-RPT-001.
- Test expired/revoked/exhausted/brute-forced tokens, duplicate report requests, worker failure/retry, and unauthorized ranges.
- Inspect generated PDF for readability, data scope, and synthetic-only fixtures.

## Definition of Done
- [ ] Reports generate asynchronously and privately
- [ ] Share tokens are hashed, expiring, and revocable
- [ ] Access is scoped and audited
- [ ] E2E/security/accessibility checks pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*
