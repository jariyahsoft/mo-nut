# Task 00: Repository and CI Foundation

## 🤖 Recommended Model
> Complexity: **Medium** — monorepo scaffold, deterministic tooling, and CI gates

| Group | Tier | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| Claude | B | Haiku 4.5 | — | monorepo scaffold, deterministic tooling, and CI gates |
| Gemini | B | Flash 3.5 mid | mid | monorepo scaffold, deterministic tooling, and CI gates |
| GPT | B | 5.4-mini | medium | monorepo scaffold, deterministic tooling, and CI gates |
| Budget | B | DeepSeek V4 Flash | — | monorepo scaffold, deterministic tooling, and CI gates |

## Context Files
Read these before starting:
- `docs/design/01-architecture.md`
- `docs/design/02-coding-rules.md`
- `docs/design/11-tasks.md`

## Phase
P0 — Foundation, Contracts, Infrastructure, and UX Prototype

## Prerequisites
- None

## Instructions

1. Create `apps/web`, `apps/api`, shared packages, infrastructure, and documentation folders; initialize pnpm, the TypeScript React/Next.js PWA, and NestJS backend.
2. Add format, lint, type-check, unit-test, build scripts, `.env.example`, branch/PR templates, and lockfile-based GitHub Actions with no real secrets.
3. Keep domain/provider boundaries from the architecture and document clean-checkout bootstrap commands.

## Verify
- `pnpm install --frozen-lockfile`
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- CI runs the same gates on a clean checkout

## Definition of Done
- [ ] Monorepo and both applications initialize
- [ ] Local and CI commands are deterministic
- [ ] Environment template contains no secret
- [ ] Repository workflow documentation is current

---
*Note: You can start a new conversation for the next task to save Context window limits.*

