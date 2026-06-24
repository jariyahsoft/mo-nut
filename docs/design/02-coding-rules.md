# 02 — Coding Rules

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Scope

กติกานี้ใช้กับ PWA, API, workers, shared contracts และ Mobile App แม้ framework สุดท้ายยังเป็น Open Decision

## 2. Language and framework conventions

- TypeScript code uses strict mode; no implicit `any`
- Mobile code must enable the framework's strict/static analysis mode
- Domain rules must not import UI, Firebase SDK or provider SDK
- Public contract types are generated from OpenAPI/JSON Schema where possible
- Framework-specific code stays in `apps/*` or `adapters/*`
- Date/time manipulation uses audited library and explicit time zone

## 3. Folder and dependency rules

```text
UI -> generated client -> API transport -> application -> domain -> ports
                                                adapters -> external services
```

- Inner layers must not depend on outer layers
- No direct Firestore access from UI
- No provider response object may cross into domain/public API without mapping
- Shared package exports must be explicit; avoid deep imports
- Circular dependencies are build failures

## 4. Naming conventions

| Item | Rule | Example |
|---|---|---|
| Entity/type | PascalCase | `DoseOccurrence` |
| Function/variable | camelCase | `confirmDose()` |
| Constant/enum value | UPPER_SNAKE_CASE or contract convention | `VERSION_CONFLICT` |
| API path | plural kebab-case nouns | `/patients/{id}/share-links` |
| Database field | camelCase canonical name | `measuredAt` |
| Event | past-tense domain event | `appointment.rescheduled.v1` |
| Permission | resource.action | `medication.read` |
| Test | behavior statement | `rejects caregiver without scope` |

## 5. Type safety

- Use branded/opaque types for IDs where language supports it
- Avoid raw string for status, role, scope, units and event names
- Unknown enum values must fail safely or map to `unknown`
- Money/cost uses integer minor units; health values specify unit explicitly
- Do not derive age as persisted source of truth; calculate from birth date
- All timestamps are UTC plus display/schedule time zone where relevant

## 6. Validation

- Client validation is UX only; server validation is authoritative
- Validate request schema, permission, current version, state transition and domain constraints
- Health range validation prevents malformed values but must not diagnose
- File upload validates MIME, extension, size, checksum and malware policy
- OCR/STT fields remain proposed until confirmation

## 7. Error handling

- Throw/return typed domain and application errors
- Map errors to standard API codes, never leak stack/secret/provider details
- Use retry only for transient/idempotent operations
- External calls require timeout; critical calls require circuit-breaker/fallback strategy
- UI must distinguish validation, permission, offline, conflict and dependency failure

## 8. Logging and audit

- Structured JSON logs with correlation ID
- Never log raw token, OTP, password, private URL, full transcript, document image or unnecessary PHI
- Audit is not ordinary debug logging; required actions create immutable `AuditEvent`
- Log redaction must be tested
- Support/admin access logs purpose and ticket reference

## 9. Configuration and environment

- Secrets come from Secret Manager/CI environment, never repository/client bundle
- Environment configuration is validated at startup
- Separate dev/staging/prod projects and credentials
- Feature flags must have owner, default, expiry/review date and rollback behavior
- `.env.example` contains names and safe examples only

## 10. i18n and content

- Thai is initial locale; text must use message keys, not be scattered in components
- Dates, numbers and units use locale-aware formatting
- Medical/safety text requires approved content source and version
- Avoid abbreviations for elderly users unless expanded
- Error messages state next action without exposing security detail

## 11. Accessibility

- Touch target ≥44×44 CSS px
- Semantic controls, labels, focus order and keyboard support
- Screen reader announcements for async status and validation
- Dynamic text without clipping; do not rely on color alone
- Reduced motion supported
- Confirmation required for destructive/high-risk actions

## 12. API boundary

- Generated client is the only standard path from UI to API
- Client may not construct database paths or infer permission
- Commands requiring idempotency always send `Idempotency-Key`
- Updates use version/`If-Match` where specified
- Breaking contract needs versioning and consumer review

## 13. Security coding checklist

- [ ] Server checks resource ownership/consent for every ID
- [ ] No IDOR via nested IDs or list filters
- [ ] Token audience/issuer/expiry validated
- [ ] File access uses short-lived signed URL and scope
- [ ] Rate limit login, OTP, share, report and processing endpoints
- [ ] Output encoding and injection protections applied
- [ ] Sensitive local data encrypted/cleared by policy
- [ ] Dependencies and secrets scanned in CI

## 14. Testability rules

- Domain policies are pure/deterministic where possible
- Clock, UUID, provider and repository are injectable
- Every state transition has positive/negative tests
- Contract fixtures use synthetic data only
- Provider adapters have recorded/sandbox tests without real PHI

## 15. Code review checklist

- [ ] Requirement/issue and traceability cited
- [ ] Permission and privacy impact reviewed
- [ ] Error/offline/loading states handled
- [ ] Unit/integration/contract tests added
- [ ] Accessibility reviewed for UI
- [ ] Migration/backward compatibility considered
- [ ] Logs contain no sensitive data
- [ ] Documentation/ADR updated where necessary

## 16. Definition of Done for code

- Accepted contract and acceptance criteria implemented
- Lint, typecheck, unit, integration and contract tests pass
- Security/accessibility checks applicable to change pass
- Observability and audit behavior included
- No Critical/High unresolved defect unless formally accepted
- Feature flag/rollback path documented for risky change
- Thai UI copy and error states reviewed

## 17. Stack-specific TBD

The following must be filled after ADR acceptance: formatter/linter names, package manager, state library, test runners, mobile analyzer, code-generation commands and minimum runtime versions.
