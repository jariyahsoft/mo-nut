# Task 07: Firestore, Storage Rules, and Indexes

## 🤖 Recommended Model
> Complexity: **Very High** — deny-by-default PHI access and malicious upload controls

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | deny-by-default PHI access and malicious upload controls |
| Gemini | A | Flash 3.5 high | high | deny-by-default PHI access and malicious upload controls |
| GPT | A | 5.4 high | high | deny-by-default PHI access and malicious upload controls |
| Budget | A | DeepSeek V4 Pro | — | deny-by-default PHI access and malicious upload controls |

## Context Files
Read these before starting:
- `docs/design/03-database-design.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`
- `docs/design/05-decisions.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Task 06

## Instructions

1. Implement deny-by-default Firestore rules; restricted health collections remain backend-only.
2. Configure private Storage paths, authorized upload assumptions, MIME/size/checksum validation, short-lived download access, and malware-scan boundary.
3. Version composite indexes and add emulator tests for cross-patient and direct-client denial.

## Verify
- Firestore/Storage rule tests pass
- Clients cannot directly access restricted collections
- Required queries have indexes
- Spoofed/oversized uploads are rejected

## Definition of Done
- [ ] Rules are default deny
- [ ] Indexes are versioned
- [ ] Denial tests cover protected data
- [ ] No unresolved high-risk exposure

---
*Note: You can start a new conversation for the next task to save Context window limits.*

