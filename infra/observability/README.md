# Observability Strategy

## Overview

This document defines logging, tracing, metrics, and alerting for the Mo-nut application. All telemetry is PHI-safe and structured for operational visibility.

## Logging

### Structure

All logs use structured JSON format:

```json
{
  "timestamp": "2026-06-25T16:15:49.813Z",
  "severity": "INFO|WARNING|ERROR|CRITICAL",
  "service": "api|worker|notification",
  "correlationId": "uuid-v4",
  "userId": "hashed-or-pseudonymous",
  "patientId": "hashed-or-pseudonymous",
  "action": "appointment.create",
  "status": "success|failure",
  "durationMs": 123,
  "error": {
    "code": "VERSION_CONFLICT",
    "message": "Resource version mismatch",
    "retryable": true
  }
}
```

### Redaction Rules

**Never log:**
- Raw authentication tokens, OTP codes, passwords
- Full PHI: medication names, diagnoses, measurement values, document content
- Full audio transcripts or OCR text
- Provider API keys or internal secrets
- Signed URLs (contain tokens)
- Full stack traces in production (sanitized only)

**Safe to log:**
- Hashed or pseudonymous user/patient IDs
- Action types (appointment.create, dose.respond)
- Status codes and error types
- Performance metrics (duration, counts)
- Correlation IDs for tracing

### Log Levels

- **DEBUG**: Development only, never in production
- **INFO**: Successful operations, state transitions
- **WARNING**: Degraded performance, retryable errors, quota warnings
- **ERROR**: Failed operations requiring investigation
- **CRITICAL**: System failure, security incidents, data integrity issues

### Retention

- **INFO/WARNING**: 30 days
- **ERROR/CRITICAL**: 90 days
- **Audit logs**: 7 years (separate from operational logs)

## Distributed Tracing

### Trace Context

Every API request generates a correlation ID propagated through:
- API handlers
- Application services
- Repository calls
- Worker tasks
- Provider API calls
- Notification delivery

### Span Structure

```
Request: POST /api/v1/appointments
├─ Auth: Verify token
├─ Authorization: Check consent
├─ Validation: Check request schema
├─ Repository: Create appointment
│  └─ Firestore: Write document
├─ Worker: Schedule reminder
└─ Response: Return appointment
```

### Sampling

- **Development**: 100% sampling
- **Staging**: 50% sampling
- **Production**: 10% sampling for normal requests, 100% for errors

### PHI Safety

Trace spans contain:
- Operation names (e.g., "create-appointment")
- Status codes
- Duration
- Correlation IDs

Trace spans DO NOT contain:
- Request/response bodies with PHI
- Sensitive query parameters
- Full error messages with PHI

## Metrics

### Request Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `http_requests_total` | Counter | method, path, status | Total HTTP requests |
| `http_request_duration_ms` | Histogram | method, path | Request latency distribution |
| `http_request_errors_total` | Counter | method, path, error_type | Failed requests by error type |

### Domain Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `appointments_created_total` | Counter | status | Total appointments created |
| `doses_responded_total` | Counter | action | Dose responses (taken/skipped/snoozed) |
| `ocr_jobs_total` | Counter | provider, status | OCR jobs by status |
| `stt_jobs_total` | Counter | provider, status | STT jobs by status |
| `notifications_sent_total` | Counter | channel, type, status | Notifications by delivery status |
| `sync_operations_total` | Counter | status | Offline sync operations |
| `sync_conflicts_total` | Counter | entity_type | Sync version conflicts |

### Infrastructure Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `firestore_reads_total` | Counter | collection | Firestore read operations |
| `firestore_writes_total` | Counter | collection | Firestore write operations |
| `storage_uploads_total` | Counter | bucket | Storage uploads |
| `storage_bytes_uploaded` | Counter | bucket | Bytes uploaded to storage |
| `secret_access_total` | Counter | secret_name, service_account | Secret Manager access |

### Performance Targets (Proposed)

| Operation | p50 | p95 | p99 |
|-----------|-----|-----|-----|
| GET /patients/{id} | <100ms | <200ms | <500ms |
| POST /appointments | <300ms | <500ms | <1000ms |
| POST /medications | <300ms | <500ms | <1000ms |
| POST /sync | <500ms | <1000ms | <2000ms |
| OCR job complete | <30s | <60s | <120s |

## Alerting

### Critical Alerts (Immediate Response)

| Alert | Condition | Threshold | Action |
|-------|-----------|-----------|--------|
| API Error Rate | `error_rate > 5%` | 5 min window | Page on-call |
| Firestore Quota | `quota_usage > 90%` | Current usage | Page on-call |
| Secret Access Failure | `secret_access_errors > 0` | Immediate | Security team alert |
| Data Integrity | `version_conflicts > 100/min` | 5 min window | Page on-call |
| Auth Failure Rate | `auth_errors > 10%` | 5 min window | Security alert |

### Warning Alerts (Business Hours Response)

| Alert | Condition | Threshold | Action |
|-------|-----------|-----------|--------|
| OCR Queue Age | `ocr_queue_age > 5min` | p95 | Team notification |
| Notification Delivery | `notification_failure_rate > 10%` | 15 min window | Team notification |
| Sync Conflict Rate | `sync_conflicts > 50/hr` | Hourly | Investigation |
| Storage Growth | `storage_growth > 10GB/day` | Daily | Cost review |

### Budget Alerts

| Alert | Condition | Threshold | Action |
|-------|-----------|-----------|--------|
| Daily Budget | `daily_cost > budget * 1.2` | Daily | Finance notification |
| OCR Cost | `ocr_cost > provider_budget` | Daily | Integration team |
| FCM Cost | `fcm_cost > notification_budget` | Daily | Platform team |
| Storage Cost | `storage_cost > storage_budget` | Weekly | Platform team |

## Dashboards

### API Dashboard

- Request rate (total, by endpoint)
- Error rate (by endpoint, by error type)
- Latency (p50, p95, p99 by endpoint)
- Active users (hourly, daily)
- Top errors (count, percentage)

### Domain Dashboard

- Appointments created/updated (daily)
- Doses due/taken/missed (daily)
- Measurements recorded (daily, by type)
- OCR/STT jobs (queued, processing, completed, failed)
- Notifications sent (by channel, by type)

### Infrastructure Dashboard

- Firestore reads/writes (by collection)
- Storage usage and growth
- Cloud Functions invocations
- Secret Manager access (by service account)
- Budget burn rate vs forecast

### User Experience Dashboard

- Time to interactive (PWA)
- Offline sync queue depth
- Notification delivery time (p95)
- Asset upload success rate
- Error states shown to users

## Error Reporting

### Error Aggregation

Group errors by:
- Error type/code
- API endpoint
- Service component
- Time window
- Impact (number of affected users)

### Error Context (PHI-safe)

Include:
- Correlation ID
- Operation being performed
- Pseudonymous user ID
- Error type and retryable flag
- Sanitized error message
- Request method and path (no query params with PHI)

Exclude:
- Full request/response bodies
- Sensitive query parameters
- Stack traces with environment variables
- PHI in error messages

### Integration

- Cloud Error Reporting for backend
- Sentry or equivalent for frontend (with PHI redaction)
- Slack/email notifications for critical errors
- Incident management integration

## Audit Logging

Separate from operational logs, audit events track:

- Authentication/authorization events
- Consent grant/revoke
- Caregiver/clinician access
- Data export/deletion requests
- Admin/support actions
- Share link creation/access
- SOS events

**Retention:** 7 years (compliance requirement)

**Immutability:** Audit logs cannot be modified through application API

**Format:**
```json
{
  "timestamp": "2026-06-25T16:15:49.813Z",
  "eventType": "consent.granted",
  "actorId": "user-123",
  "resourceType": "patient",
  "resourceId": "patient-456",
  "action": "grant-consent",
  "scope": ["appointment.read", "medication.read"],
  "purpose": "caregiver-access",
  "correlationId": "uuid",
  "metadata": {
    "expiresAt": "2027-06-25T16:15:49.813Z"
  }
}
```

## Testing Observability

### Synthetic Monitoring

- Hourly health checks for critical endpoints
- End-to-end user journey tests
- Provider integration checks
- Notification delivery tests

### Chaos Engineering (Staging)

- Inject latency to external services
- Simulate quota exhaustion
- Test circuit breaker behavior
- Verify alert triggering

### Load Testing

- Measure performance under expected load
- Identify breaking points
- Validate autoscaling
- Test rate limiting

## Compliance and Privacy

- All telemetry data is reviewed for PHI exposure
- No diagnostic data contains full PHI
- User consent covers analytics with pseudonymous IDs
- Provider data subject agreements cover telemetry sent to third parties
- Data retention policies comply with PDPA requirements

## Tools (Proposed)

- **Logging**: Cloud Logging (GCP) or CloudWatch (AWS)
- **Tracing**: Cloud Trace or OpenTelemetry
- **Metrics**: Cloud Monitoring or Prometheus
- **Alerting**: Cloud Monitoring Alerts or PagerDuty
- **Dashboards**: Cloud Monitoring or Grafana
- **Error Reporting**: Cloud Error Reporting or Sentry
- **Frontend**: Browser RUM with PHI redaction

## Open Decisions

- [ ] Alert escalation policy and on-call rotation
- [ ] Incident severity classification
- [ ] Performance SLOs for production
- [ ] Third-party observability tool selection
- [ ] Cost monitoring tool integration
