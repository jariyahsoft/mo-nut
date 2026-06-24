# Task 39: Travel Plan and Emergency Profile

## 🤖 Recommended Model
> Complexity: **High** — external maps, offline emergency data, and consent

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | external maps, offline emergency data, and consent |
| Gemini | A | Flash 3.5 high | high | external maps, offline emergency data, and consent |
| GPT | A | 5.4 high | high | external maps, offline emergency data, and consent |
| Budget | A | DeepSeek V4 Pro | — | external maps, offline emergency data, and consent |

## Context Files
Read these before starting:
- `docs/design/06-backlog.md`
- `docs/design/07-security-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P6 — Sprint 6

## Prerequisites
- Tasks 18, 27, and 33

## Instructions

1. Implement map provider adapter for geocoding/directions/estimated travel time, registration/parking buffer, web map link, and Traveling/Arrived status without sending health data.
2. Provide address/manual fallback when geolocation/provider fails; real-time continuous tracking remains out of MVP.
3. Implement opt-in minimized Emergency Profile offline with selected fields, QR scope, shared-device warning, clear/update behavior, and direct contact `tel:` links.

## Verify
- Map provider failure still offers address/open-map fallback
- No PHI enters map request
- Emergency profile works offline only after opt-in
- QR exposes only approved fields

## Definition of Done
- [ ] F601–F602 are implemented
- [ ] Map/privacy boundaries hold
- [ ] Offline profile policy is enforced
- [ ] Browser/accessibility tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

