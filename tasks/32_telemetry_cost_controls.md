# Task 32: Tracing, Privacy-safe Analytics, Cost, and Quota Controls

## 🤖 Recommended Model
> Complexity: **High** — health-data observability must avoid PHI while controlling provider cost

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ health-data observability must avoid PHI while controlling provider cost เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ health-data observability must avoid PHI while controlling provider cost เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ health-data observability must avoid PHI while controlling provider cost เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ health-data observability must avoid PHI while controlling provider cost เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`
- `docs/design/10-glossary.md`

## Phase
Cross-cutting — MVP

## Source Tasks
- X04–X05, X07, NFR-001, NFR-006

## Prerequisites
- Task 07 and feature APIs

## Instructions

1. **Implement scope**
   - Propagate/generate requestId across Flutter, API, jobs, and providers; emit structured duration/status metrics and redacted errors.

2. **Apply rules**
   - Create a documented analytics event catalog using stable names and identifiers but no raw PHI, free text, medication detail, transcript, or location.

3. **Handle integration and states**
   - Implement configurable per-user/plan/provider quotas and cost metrics for OCR, STT, reports, uploads, and notification work with safe failure messages.

4. **Document and test**
   - Create dashboards/alerts for latency, errors, queue depth, delivery, quota, spend, and abnormal abuse signals.

## Verify
- Trace a synthetic request through API and worker using one correlation ID.
- Run PHI canary/redaction tests against logs and analytics.
- Trigger non-production quota/budget/latency alerts and verify actionable metadata.

## Definition of Done
- [ ] End-to-end tracing works
- [ ] Analytics catalog is privacy-reviewed
- [ ] Quotas and cost metrics are configurable
- [ ] Dashboards/alerts and leakage tests pass

## Open Questions
- Business plans, provider quotas, load profile, and final budget thresholds need product/ops approval.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
