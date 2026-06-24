# Task 18: Browser Capability Adapters and Resumable Uploads

## 🤖 Recommended Model
> Complexity: **High** — cross-browser fallbacks and unreliable media uploads

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | cross-browser fallbacks and unreliable media uploads |
| Gemini | A | Flash 3.5 high | high | cross-browser fallbacks and unreliable media uploads |
| GPT | A | 5.4 high | high | cross-browser fallbacks and unreliable media uploads |
| Budget | A | DeepSeek V4 Pro | — | cross-browser fallbacks and unreliable media uploads |

## Context Files
Read these before starting:
- `docs/design/08-ui-guide.md`
- `docs/design/02-coding-rules.md`
- `docs/design/07-security-rules.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 04, 16, and 17

## Instructions

1. Create feature-detected adapters for camera, MediaRecorder, geolocation, Web Share, Push, Background Sync, storage quota, and `tel:`.
2. Implement file/manual/In-app/app-open/copy fallbacks defined by the UI guide.
3. Implement resumable/retryable upload, progress, checksum/complete handshake, quota warning, and cleanup only after confirmed sync.

## Verify
- Preferred/fallback paths pass browser matrix
- Denied permissions do not dead-end
- Interrupted upload avoids duplicate document
- Unsynced media is never silently removed

## Definition of Done
- [ ] Capability adapters are reusable
- [ ] Every required API has fallback
- [ ] Upload/quota states are accessible
- [ ] Cross-browser tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

