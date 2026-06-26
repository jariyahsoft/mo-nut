# Mo-nut Security Headers and CSP Configuration

## Content-Security-Policy

The app enforces strict CSP to prevent XSS, code injection, and unauthorized resource loading:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval' https://*.firebaseio.com https://*.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https:;
  media-src 'self' blob: mediastream:;
  connect-src 'self' https://*.firebaseio.com https://*.googleapis.com wss://*.firebaseio.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
```

## Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0 (disabled in favor of CSP)
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(self), microphone=(self), geolocation=(self), payment=()
```

## XSS Prevention

1. **Output Encoding**: All user input is HTML-escaped at render time
2. **Input Validation**: All API inputs validated against JSON schema
3. **DOMPurify**: User-generated HTML sanitized before rendering (when applicable)
4. **No eval()**: No use of `eval()`, `Function()`, or inline scripts in production

## CSRF Prevention

1. **Bearer token authentication**: All state-changing requests require `Authorization: Bearer <token>`
2. **SameSite cookies**: If used, set to `Strict` or `Lax`
3. **Origin validation**: CORS configured to allow only production origins

## Clickjacking Prevention

- `X-Frame-Options: DENY` set on all responses
- CSP `frame-ancestors 'none'`

## Secret Management

- No secrets in client-side code (NEXT_PUBLIC_ prefix only for non-sensitive)
- Server-side secrets stored in Secret Manager
- Service account credentials never committed to repository
- Environment templates (`.env.example`) use placeholders only

## Upload Security

- MIME type validation: JPEG, PNG, PDF only
- File size limit: 10MB maximum
- Per-chunk SHA-256 integrity verification
- Object keys never exposed (private paths only)
- Time-limited signed URLs only when explicitly granted
- Malware scanning on upload (out of scope for MVP)

## Share Link Security

- 32-byte (256-bit) cryptographically random tokens
- Plaintext token returned once at creation, never stored
- SHA-256 hash stored for validation
- Expiry timestamp enforced
- Max uses optional but enforced when set
- Revocation immediate
- Rate limiting on validation attempts (5 per minute per IP)

## IDOR Prevention

- All resources scoped by patient ID and ownership
- Authorization middleware checks ownership before processing
- Caregiver access requires explicit scope and active relationship
- Admin operations require separate role enforcement
- Break-glass workflow required for privileged cross-tenant access

## Audit Trail

- All sensitive operations logged with actor, action, resource, purpose, occurredAt, correlationId
- Immutable log structure
- Retention: 7 years minimum
- Auditor role has read-only access

## OWASP Top 10 Coverage

| Risk | Mitigation |
|---|---|
| A01 Broken Access Control | Role separation, ownership checks, IDOR tests |
| A02 Cryptographic Failures | TLS 1.3, no plaintext secrets, token hashing |
| A03 Injection | Parameterized queries, CSP, input validation |
| A04 Insecure Design | Threat modeling, defense in depth |
| A05 Security Misconfiguration | Headers, CSP, hardening |
| A06 Vulnerable Components | Dependency scanning, lockfile |
| A07 Identification and Auth Failures | MFA, break-glass workflow |
| A08 Software and Data Integrity | Checksums, signed releases |
| A09 Security Logging Failures | Immutable audit trail |
| A10 SSRF | URL allowlist for external providers |

## Browser Support Policy

| Browser | Version | Status |
|---|---|---|
| Chrome Android | 90+ | Supported |
| Safari iOS | 14+ | Supported |
| Edge Desktop | 90+ | Supported |
| Firefox Desktop | 90+ | Supported |

Unsupported browsers show a clear error page with upgrade guidance.

## Offline PHI Protection

- All PHI encrypted at rest (AES-256) on device storage
- Offline cache cleared on logout/account switch
- Service worker cache strategy excludes PHI endpoints
- Manual clear-data policy in user settings

## Logout Clearing

On logout or account switch:
1. Clear all IndexedDB stores (caches, mutations, pending)
2. Clear localStorage (preferences, notifications)
3. Clear sessionStorage
4. Revoke Firebase session token
5. Unregister service worker if requested
6. Redirect to login page