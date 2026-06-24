# Task 38: PDF Reports and Secure Sharing

## 🤖 Recommended Model
> Complexity: **Very High** — PHI report generation, scoped public access, and revocation

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | PHI report generation, scoped public access, and revocation |
| Gemini | A | Flash 3.5 high | high | PHI report generation, scoped public access, and revocation |
| GPT | A | 5.4 high | high | PHI report generation, scoped public access, and revocation |
| Budget | A | DeepSeek V4 Pro | — | PHI report generation, scoped public access, and revocation |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P5 — Sprint 5

## Prerequisites
- Tasks 13, 14, 33–37

## Instructions

1. Implement date-range/section selection and asynchronous PDF report generation with status, retry, minimal necessary PHI, and accessible document output.
2. Implement high-entropy share links with token hash, scope, expiry, optional max views, revoke, noindex/cache protection, and privacy-safe expired/revoked errors.
3. Audit report generation/download/share/access/revoke when identifiable; support Web Share when available and copy/download fallback.

## Verify
- Generated report contains selected sections only
- Expired/revoked/max-use share reveals no PHI
- Plaintext token is not persisted
- Share access and revoke are audited

## Definition of Done
- [ ] F504–F505 are implemented
- [ ] PDF/share security rules pass
- [ ] Fallback UX works
- [ ] E2E and brute-force/rate-limit tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

