# Task 17: PWA Manifest, Service Worker, and Update Flow

## 🤖 Recommended Model
> Complexity: **High** — installability, safe caching, and stale-version recovery

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | A | Sonnet 4.6 | — | installability, safe caching, and stale-version recovery |
| Gemini | A | Flash 3.5 high | high | installability, safe caching, and stale-version recovery |
| GPT | A | 5.4 high | high | installability, safe caching, and stale-version recovery |
| Budget | A | DeepSeek V4 Pro | — | installability, safe caching, and stale-version recovery |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/08-ui-guide.md`
- `docs/design/09-testing-guide.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- Tasks 00 and 16

## Instructions

1. Create required manifest metadata, icons, start URL, scope, display, theme, and safe-area support.
2. Implement scoped/versioned Service Worker with App Shell Cache First, offline fallback, policy-approved Network First data, and old-cache cleanup.
3. Implement non-blocking install/iOS guidance and an update flow that preserves pending data and always offers refresh recovery.

## Verify
- Installability checks pass
- App Shell opens offline
- Restricted responses are not broadly cached
- Worker update loses no pending mutation

## Definition of Done
- [ ] PWA installs where supported
- [ ] Cache policy is safe
- [ ] Update flow avoids stale traps
- [ ] Browser smoke tests pass

---
*Note: You can start a new conversation for the next task to save Context window limits.*

