# Task 18: Secure Document Upload and OCR Job Processing

## 🤖 Recommended Model
> Complexity: **Very High** — untrusted health-document uploads and external AI processing carry high privacy risk

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ untrusted health-document uploads and external AI processing carry high privacy risk ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ untrusted health-document uploads and external AI processing carry high privacy risk ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ untrusted health-document uploads and external AI processing carry high privacy risk ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ untrusted health-document uploads and external AI processing carry high privacy risk ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/07-security-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/09-testing-guide.md`
- `docs/design/05-decisions.md`

## Phase
Sprint 2 — Appointments/OCR

## Source Tasks
- F203–F204, US-031

## Prerequisites
- Tasks 06, 07, 10, and 17

## Instructions

1. **Implement scope**
   - Implement authorized upload requests, private object paths, metadata confirmation, checksum, MIME/magic-byte/size checks, and malware-scan hook.

2. **Apply rules**
   - Create an OCR provider interface and safe mock; minimize provider payloads and require processing consent.

3. **Handle integration and states**
   - Implement outbox/job lifecycle, timeout, exponential retry, quota/rate limits, dead-letter state, and status polling.

4. **Document and test**
   - Store original metadata and extraction confidence as `REVIEW_REQUIRED`; never create/finalize an appointment from OCR automatically.

## Verify
- Run upload spoof, oversize, unauthorized, expired signed URL, and checksum mismatch tests.
- Exercise OCR success, timeout, retry, failure, and duplicate request paths.
- Verify logs/events contain no raw image or extracted PHI.

## Definition of Done
- [ ] Upload flow is private and validated
- [ ] OCR mock/job lifecycle is resilient
- [ ] Results remain draft
- [ ] Security and integration tests pass

## Open Questions
- Production OCR provider, data residency, and quota are pending decisions.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
