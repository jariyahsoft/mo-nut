# Task 33: Backup, Restore, Export, and Privacy/Consent Review

## 🤖 Recommended Model
> Complexity: **Very High** — health-data recovery and legal retention/deletion requirements are high impact

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | Tier A จำเป็นสำหรับ health-data recovery and legal retention/deletion requirements are high impact ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Gemini | A | Flash 3.5 | high | Tier A จำเป็นสำหรับ health-data recovery and legal retention/deletion requirements are high impact ซึ่งต้อง reasoning ข้ามหลาย boundary |
| GPT | A | 5.4 | high | Tier A จำเป็นสำหรับ health-data recovery and legal retention/deletion requirements are high impact ซึ่งต้อง reasoning ข้ามหลาย boundary |
| Budget | A | DeepSeek V4 Pro | — | Tier A จำเป็นสำหรับ health-data recovery and legal retention/deletion requirements are high impact ซึ่งต้อง reasoning ข้ามหลาย boundary |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/03-database-design.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`
- `docs/design/05-decisions.md`

## Phase
Cross-cutting — Pilot Readiness

## Source Tasks
- X06, X08, NFR-004–NFR-005

## Prerequisites
- Tasks 11, 26–29

## Instructions

1. **Implement scope**
   - Define automated Firestore export, Storage lifecycle/versioning, encrypted backup access, owners, schedules, evidence, and environment separation.

2. **Apply rules**
   - Execute a synthetic non-production restore drill with count/checksum/relationship validation, recovery timing, and documented rollback.

3. **Handle integration and states**
   - Prepare privacy policy and granular consent copy for legal review covering OCR, STT/audio, AI, location/SOS, caregiver/doctor sharing, notifications, export, deletion, and retention.

4. **Document and test**
   - Create a policy decision register for unresolved retention, residency, deletion, break-glass, emergency, and provider-contract questions; do not claim unassessed compliance.

## Verify
- Complete and record a non-production backup/restore drill.
- Validate restored IDs, counts, checksums, relationships, access controls, and audit evidence.
- Confirm legal-review artifacts contain no unsupported HIPAA/GDPR compliance claim.

## Definition of Done
- [ ] Backup/restore procedure is tested
- [ ] Export/migration evidence is retained
- [ ] Privacy/consent copy is ready for legal review
- [ ] Unresolved policy decisions are explicit

## Open Questions
- Legal approval, retention periods, residency, break-glass, and compliance scope remain external decisions.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
