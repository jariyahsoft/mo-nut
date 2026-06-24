# Task 26: Doctor Visit Mode, Audio Recording, and Transcript Review

## 🤖 Recommended Model
> Complexity: **Very High** — recording consent and restricted transcript processing have privacy and legal risk

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ recording consent and restricted transcript processing have privacy and legal risk ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ recording consent and restricted transcript processing have privacy and legal risk ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ recording consent and restricted transcript processing have privacy and legal risk ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ recording consent and restricted transcript processing have privacy and legal risk ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 5 — Visit/Audio/Reports

## Source Tasks
- F501–F503, US-060–US-062

## Prerequisites
- Tasks 18, 23–25

## Instructions

1. **Implement scope**
   - Implement Doctor Visit Mode combining appointment, medication, prioritized questions, health summary, checklist progress, documents, and next-appointment action.

2. **Apply rules**
   - Require explicit recording permission confirmation; implement pause/resume/stop, local encrypted temp handling where supported, background private upload, and progress/retry.

3. **Handle integration and states**
   - Implement STT provider abstraction/mock and async lifecycle with consent, minimization, timeout/retry/dead-letter, configurable retention, and immutable original media.

4. **Document and test**
   - Build editable transcript review with timestamps and explicit draft/warning state; never treat transcript or summary as verified medical advice.

## Verify
- Run E2E-VISIT-001 using synthetic audio.
- Test permission denied, interrupted upload, retry, STT failure, duplicate jobs, edit history, and revoked consent.
- Verify logs/analytics do not contain audio or transcript text.

## Definition of Done
- [ ] Visit flow is cohesive and accessible
- [ ] Recording requires consent
- [ ] STT output remains reviewable draft
- [ ] Privacy, lifecycle, and E2E tests pass

## Open Questions
- Recording-law copy, STT provider/data residency, and raw-audio retention need legal/product approval.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
