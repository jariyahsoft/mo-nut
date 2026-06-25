# Infrastructure

Local infrastructure and deployment scaffolding live here.

- `firebase/` for environment-specific Firebase configuration
- `deployment/` for CI/CD and rollout assets

Run `pnpm firebase:validate` before using Firebase targets, and use `pnpm firebase:auth:smoke` to verify the local Auth emulator workflow with synthetic identities only.
