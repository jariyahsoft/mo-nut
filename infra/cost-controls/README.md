# Cost Controls and Rate Limiting

## Overview

This document defines budget controls, quota management, and rate limiting to prevent unexpected costs and abuse in the Mo-nut application.

## Budget Configuration

### Monthly Budget Allocations (Proposed)

| Category | Development | Staging | Production | Notes |
|----------|-------------|---------|------------|-------|
| Firestore | $50 | $200 | $1,000 | Read/write operations and storage |
| Storage | $20 | $100 | $500 | Object storage and bandwidth |
| Cloud Functions/Run | $50 | $200 | $800 | Compute for API and workers |
| Firebase Auth | $0 | $0 | $100 | Authentication operations |
| FCM | $10 | $50 | $300 | Push notification delivery |
| OCR Provider | $0 (mock) | $50 | $500 | Document processing |
| STT Provider | $0 (mock) | $30 | $300 | Audio transcription |
| Map Provider | $0 (mock) | $20 | $200 | Location and mapping |
| SMS Provider | $0 | $10 | $200 | SMS notification fallback |
| Monitoring/Logging | $10 | $50 | $200 | Observability services |
| **Total** | **$140** | **$710** | **$4,100** | Per environment per month |

### Budget Alerts

**Thresholds:**
- 50% of budget: Team notification (informational)
- 80% of budget: Manager notification (warning)
- 100% of budget: Emergency alert + auto-throttle non-critical operations
- 120% of budget: Critical alert + block non-essential operations

**Actions at 100%:**
- Pause report generation for non-urgent requests
- Delay OCR/STT jobs for non-critical documents
- Switch to in-app notifications only (disable FCM)
- Reduce logging verbosity
- Notify users of degraded service

**Actions at 120%:**
- Block new asset uploads (except critical)
- Pause all background processing
- Emergency cost review meeting
- Evaluate service suspension

## Quota Management

### Firestore Quotas

| Operation | Quota | Per | Throttle Action |
|-----------|-------|-----|-----------------|
| Document reads | 50,000 | user/day | Return cached data, defer sync |
| Document writes | 10,000 | user/day | Queue non-critical writes |
| Collection queries | 1,000 | user/day | Return cached results |
| Batch writes | 500 | user/day | Reject with retry-after |

### Storage Quotas

| Operation | Quota | Per | Throttle Action |
|-----------|-------|-----|-----------------|
| File uploads | 50 | user/day | Reject with quota message |
| Total upload size | 100 MB | user/day | Reject with quota message |
| Maximum file size | 5 MB | file | Reject before upload |
| Signed URL requests | 200 | user/day | Reject with quota message |

### Processing Quotas

| Operation | Quota | Per | Throttle Action |
|-----------|-------|-----|-----------------|
| OCR jobs | 20 | user/day | Queue with delay |
| STT jobs | 10 | user/day | Queue with delay |
| Report generation | 5 | user/day | Reject with quota message |
| Share link creation | 10 | user/day | Reject with quota message |

### Notification Quotas

| Operation | Quota | Per | Throttle Action |
|-----------|-------|-----|-----------------|
| Push notifications | 200 | user/day | Defer non-critical |
| SMS fallback | 10 | user/day | Defer or block |
| Email notifications | 50 | user/day | Defer non-critical |

### SOS Quotas (Anti-abuse)

| Operation | Quota | Per | Throttle Action |
|-----------|-------|-----|-----------------|
| SOS initiation | 5 | user/day | Warn + allow (safety-critical) |
| SOS initiation | 20 | user/week | Alert support team for review |

## Rate Limiting

### Authentication Rate Limits

| Endpoint | Limit | Window | Response |
|----------|-------|--------|----------|
| `/api/v1/auth/otp/request` | 5 | 1 hour per phone | 429 Too Many Requests |
| `/api/v1/auth/otp/verify` | 10 | 1 hour per phone | 429 + account lock |
| `/api/v1/auth/session` | 20 | 1 hour per IP | 429 Too Many Requests |
| `/api/v1/auth/refresh` | 100 | 1 hour per user | 429 Too Many Requests |

### API Rate Limits (Per User)

| Endpoint Pattern | Limit | Window | Response |
|------------------|-------|--------|----------|
| `GET /api/v1/*` | 1000 | 1 hour | 429 with Retry-After header |
| `POST /api/v1/*` | 500 | 1 hour | 429 with Retry-After header |
| `PUT /PATCH /api/v1/*` | 200 | 1 hour | 429 with Retry-After header |
| `DELETE /api/v1/*` | 50 | 1 hour | 429 with Retry-After header |

### Asset Upload Rate Limits

| Endpoint | Limit | Window | Response |
|----------|-------|--------|----------|
| `POST /api/v1/assets/upload` | 50 | 1 hour | 429 with quota message |
| `POST /api/v1/assets/upload` | 10 | 1 minute | 429 (burst protection) |

### Background Job Rate Limits

| Job Type | Concurrency | Queue Depth | Overflow Action |
|----------|-------------|-------------|-----------------|
| OCR processing | 10 | 1000 | Reject new jobs |
| STT processing | 5 | 500 | Reject new jobs |
| Report generation | 3 | 100 | Reject new jobs |
| Notification delivery | 50 | 10,000 | Defer delivery |

## Cost Optimization Strategies

### Firestore Optimization

- **Caching**: Cache frequently read data (e.g., user preferences, facility info)
- **Batch Operations**: Use batch writes instead of individual writes
- **Query Optimization**: Use indexed queries, avoid full collection scans
- **Denormalization**: Duplicate data to reduce joins/multiple reads
- **TTL**: Auto-delete expired temporary data (expired drafts, old notifications)

### Storage Optimization

- **Compression**: Compress images before upload (client-side)
- **Lifecycle Policies**: Auto-delete old temporary files
- **Deduplication**: Check checksums before storing duplicates
- **Thumbnail Generation**: Store multiple sizes, serve appropriate size
- **CDN**: Use CDN for public assets (not for PHI)

### Provider Cost Optimization

- **OCR**: Batch documents, use lower-tier for non-critical
- **STT**: Compress audio, use streaming for long recordings
- **Maps**: Cache geocoding results, use static maps where possible
- **SMS**: Use push notifications as primary, SMS as fallback only
- **FCM**: Batch notifications, use topics for broadcasts

### Compute Optimization

- **Cold Start**: Keep critical functions warm with scheduled pings
- **Memory Allocation**: Right-size function memory for cost/performance
- **Timeouts**: Set appropriate timeouts to avoid hung executions
- **Retry Logic**: Exponential backoff to avoid retry storms
- **Concurrency**: Limit concurrent executions to control cost spikes

## Quota Enforcement Implementation

### Rate Limiter Architecture

```typescript
interface RateLimitConfig {
  key: string; // user-id, ip, endpoint
  limit: number;
  windowMs: number;
  message: string;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfterSeconds?: number;
}
```

### Storage

- **In-Memory**: Redis or Memorystore for distributed rate limiting
- **Fallback**: Local memory with synchronized cleanup
- **Persistence**: Optional quota usage stored in Firestore for daily limits

### Response Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 742
X-RateLimit-Reset: 1719337200
Retry-After: 3600
```

### User Communication

When quota exceeded:
- Clear error message explaining limit
- When quota resets
- How to request quota increase (if applicable)
- Alternative actions available

Example:
```json
{
  "error": {
    "code": "QUOTA_EXCEEDED",
    "message": "คุณใช้จำนวนการอัปโหลดไฟล์เกินโควต้าแล้ว",
    "details": {
      "quota": "50 uploads per day",
      "used": 50,
      "resetsAt": "2026-06-26T00:00:00Z"
    }
  }
}
```

## Monitoring Cost Controls

### Metrics to Track

- Quota usage per user (daily, hourly)
- Rate limit hits (by endpoint, by user)
- Cost per service (daily trend)
- Budget burn rate vs forecast
- Quota exhaustion events
- Throttled operations count

### Alerts

- User hitting quota limits repeatedly (abuse detection)
- Service cost spike >50% above daily average
- Rate limit hit rate >10% of requests
- Firestore write quota >80% used
- Storage growth >10GB/day

## Abuse Detection

### Patterns to Monitor

- Rapid repeated requests (bot-like behavior)
- Unusual upload patterns (many files, same content)
- Excessive SOS triggers
- Account sharing (multiple IPs, devices)
- Scraping attempts (sequential ID enumeration)

### Actions

1. **Soft Block**: Reduce rate limits temporarily
2. **Warning**: Notify user of suspicious activity
3. **Hard Block**: Temporary account suspension
4. **Investigation**: Support team review
5. **Permanent Ban**: For confirmed abuse

## Cost Reporting

### Daily Cost Report

- Total cost per service
- Budget usage percentage
- Top cost drivers
- Forecast for month-end
- Anomalies detected

### Monthly Cost Review

- Actual vs budget per service
- Cost per user/patient
- Optimization opportunities identified
- Budget adjustment recommendations

## Testing Cost Controls

### Test Cases

- Verify rate limits enforce correctly
- Confirm quota exceeded responses
- Test graceful degradation at budget limit
- Validate cost monitoring accuracy
- Ensure alerts trigger at thresholds

### Load Testing

- Simulate quota exhaustion
- Test behavior under rate limit
- Verify throttling doesn't affect critical paths
- Measure degraded performance impact

## Emergency Cost Override

### Procedure

1. Identify cost spike source
2. Notify stakeholders
3. Apply emergency throttles
4. Investigate root cause
5. Implement permanent fix
6. Document incident
7. Update cost controls

### Override Authority

- Platform team can adjust quotas temporarily
- Finance approval required for budget increase
- Security team can block abusive users
- On-call can enable emergency mode

## Future Enhancements

- [ ] Machine learning-based anomaly detection
- [ ] Dynamic quota adjustment based on usage patterns
- [ ] User-specific quota increases (premium tier)
- [ ] Cost attribution by feature
- [ ] Predictive cost forecasting
- [ ] Automated cost optimization recommendations
