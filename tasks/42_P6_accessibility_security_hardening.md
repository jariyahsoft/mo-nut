# Task 42: Accessibility, Browser, and Security Hardening

## 🤖 Recommended Model
> Complexity: **Very High** — WCAG, OWASP, offline PHI, and cross-browser release risk

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | WCAG, OWASP, offline PHI, and cross-browser release risk |
| Gemini | A | Flash 3.5 high | high | WCAG, OWASP, offline PHI, and cross-browser release risk |
| GPT | A | 5.4 high | high | WCAG, OWASP, offline PHI, and cross-browser release risk |
| Budget | A | DeepSeek V4 Pro | — | WCAG, OWASP, offline PHI, and cross-browser release risk |

## Context Files
Read these before starting:
- `docs/design/07-security-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`
- `docs/design/02-coding-rules.md`

## Phase
P6 — Sprint 6

## Prerequisites
- Tasks 24–41

## Instructions

1. Run WCAG 2.2 AA automation plus manual keyboard, visible focus, screen reader Mobile/Desktop, 200% zoom, contrast, 44×44 target, chart alternative, and elderly checks.
2. Run browser matrix for Chrome/Android, Safari/iOS, Edge/Desktop, Firefox/Desktop including install, service-worker update, camera/audio/location/share/push/tel fallbacks, quota, offline, and logout clearing.
3. Run SAST/dependency/secret, DAST, OWASP/IDOR, CSP/XSS/CSRF/clickjacking, upload, share brute force, Firebase rules, service-worker cache, log/analytics PHI, and backup-access tests.

## Verify
- All P0 E2E journeys pass browser matrix
- Critical/High defects are zero or formally accepted
- Logout/account switch clears policy data
- Accessibility report has no blocking issue

## Definition of Done
- [ ] F604–F605 and X13–X14 are complete
- [ ] Security/accessibility evidence is stored
- [ ] Browser support policy is accurate
- [ ] Release blockers are resolved

---
*Note: You can start a new conversation for the next task to save Context window limits.*

