# Task 28: Secure Upload, OCR Job, and Review

## 🤖 Recommended Model
> Complexity: **High** — private documents, async OCR, and mandatory human confirmation

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | private documents, async OCR, and mandatory human confirmation |
| Gemini | A | Flash 3.5 high | high | private documents, async OCR, and mandatory human confirmation |
| GPT | A | 5.4 high | high | private documents, async OCR, and mandatory human confirmation |
| Budget | A | DeepSeek V4 Pro | — | private documents, async OCR, and mandatory human confirmation |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/09-testing-guide.md`

## Phase
P2 — Sprint 2

## Prerequisites
- Tasks 04, 13, 14, 18, and 27

## Instructions

1. Implement camera/file capture, secure initiate/upload/complete flow, progress/retry/resume, checksum, MIME/size validation, and private document access.
2. Implement OCR adapter/mock, queued/processing/retry/failure/review states, original image retention, extracted canonical fields, bounding/confidence where available.
3. Build editable OCR review; never create/finalize an appointment before explicit confirmation and provide manual-entry fallback on provider failure.

## Verify
- Interrupted upload resumes without duplicate
- Malicious/oversized upload is rejected
- OCR failure preserves original and manual entry
- E2E creates one appointment only after review confirm

## Definition of Done
- [ ] F203–F205 are implemented
- [ ] OCR remains Draft until confirm
- [ ] Provider failure degrades gracefully
- [ ] Security/E2E tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

