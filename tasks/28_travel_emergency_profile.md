# Task 28: Travel Planning and Offline Emergency Profile

## 🤖 Recommended Model
> Complexity: **High** — location consent and offline emergency access need careful scope controls

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | Tier B เพียงพอสำหรับ location consent and offline emergency access need careful scope controls เพราะ scope และ verification ระบุชัด |
| Gemini | B | Flash 3.5 | mid | Tier B เพียงพอสำหรับ location consent and offline emergency access need careful scope controls เพราะ scope และ verification ระบุชัด |
| GPT | B | 5.4-mini | medium | Tier B เพียงพอสำหรับ location consent and offline emergency access need careful scope controls เพราะ scope และ verification ระบุชัด |
| Budget | B | DeepSeek V4 Flash | — | Tier B เพียงพอสำหรับ location consent and offline emergency access need careful scope controls เพราะ scope และ verification ระบุชัด |

## Context Files
Read these before starting:
- Mandatory baseline: `docs/design/00-project-overview.md`, `docs/design/01-architecture.md`, `docs/design/02-coding-rules.md`
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/04-api-standard.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
Sprint 6 — Map/SOS/Hardening

## Source Tasks
- F601–F602, US-080, US-091

## Prerequisites
- Tasks 17, 30–31

## Instructions

1. **Implement scope**
   - Implement appointment travel-plan provider boundary, travel estimate, configurable registration/parking buffer, navigation deep link, and TRAVELING/ARRIVED status.

2. **Apply rules**
   - Require location/traffic consent and minimize retention; provide graceful fallback when provider/network/location permission is unavailable.

3. **Handle integration and states**
   - Implement user-selected emergency-profile fields and a safe offline cache; any QR representation must expose only explicitly approved fields.

4. **Document and test**
   - Build accessible travel and emergency-profile screens with stale-data, offline, permission, and error states.

## Verify
- Test provider failure, no coordinates, denied permission, offline deep link, and timezone cases.
- Inspect offline/QR output to ensure unapproved fields are absent.
- Run authorization and location-retention tests using synthetic data.

## Definition of Done
- [ ] Travel plan and statuses work with fallbacks
- [ ] Emergency profile is user-scoped and offline-capable
- [ ] Location/QR privacy controls are enforced
- [ ] Tests/accessibility pass

## Open Questions
- Map/travel provider and country-specific emergency integrations are not selected.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
