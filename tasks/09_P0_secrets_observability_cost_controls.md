# Task 09: Secrets, Observability, and Cost Controls

## 🤖 Recommended Model
> Complexity: **High** — production credentials, PHI-safe telemetry, and quotas

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | production credentials, PHI-safe telemetry, and quotas |
| Gemini | A | Flash 3.5 high | high | production credentials, PHI-safe telemetry, and quotas |
| GPT | A | 5.4 high | high | production credentials, PHI-safe telemetry, and quotas |
| Budget | A | DeepSeek V4 Pro | — | production credentials, PHI-safe telemetry, and quotas |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 00 and 06

## Instructions

1. Create least-privilege service-account boundaries and Secret Manager references with owners/rotation.
2. Implement structured request tracing, redaction, error reporting, and metrics for latency, errors, queue, notification, sync, and OCR/STT.
3. Add budgets, quota alerts, and rate/concurrency controls for uploads, AI jobs, reports, shares, and SOS duplicates.

## Verify
- Secret/dependency scans pass
- Synthetic API→job trace contains no PHI
- Alert tests cover required failure classes
- Frontend bundle has no server secret

## Definition of Done
- [ ] Secrets use least privilege
- [ ] Dashboards/alerts are defined
- [ ] Telemetry passes PHI review
- [ ] Cost controls are testable

---
*Note: You can start a new conversation for the next task to save Context window limits.*

