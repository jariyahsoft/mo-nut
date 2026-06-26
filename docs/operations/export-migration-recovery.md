# Data Export, Migration, and Recovery

This document describes canonical export formats, migration procedures, backup strategies, and recovery runbooks for the Mo-nut health records system.

## 1. Canonical Export Format

### Export Schema Version

Current version: `1.0.0`

All exports include a metadata header:

```json
{
  "exportVersion": "1.0.0",
  "exportedAt": "2026-06-26T00:55:00.000Z",
  "exportedBy": "user-id or service-account-id",
  "environment": "production|staging|development",
  "checksum": "sha256-hash-of-content",
  "entityCounts": {
    "users": 100,
    "patients": 120,
    "medications": 450,
    "measurements": 5000
  }
}
```

### NDJSON Format

Each entity is exported as a single-line JSON object (newline-delimited JSON):

```
{"_type":"User","id":"user-001","version":1,"createdAt":"...","..."}
{"_type":"Patient","id":"pat-001","accountOwnerUserId":"user-001","..."}
{"_type":"Medication","id":"med-001","patientId":"pat-001","..."}
```

### Entity Type Markers

Every exported entity includes a `_type` field to enable portable deserialization:

- `User`
- `Patient`
- `CareRelationship`
- `ConsentGrant`
- `Appointment`
- `AppointmentEvent`
- `Medication`
- `MedicationSchedule`
- `DoseOccurrence`
- `DoseEvent`
- `HealthMeasurement`
- `DocumentAsset`
- `ProcessingJob`
- `AuditEvent`
- `OutboxMessage`
- `BackgroundJob`
- (and all other domain entities)

### Relationship Validation

Export includes relationship integrity checks:

1. **Foreign Key Validation**: All referenced IDs must exist in the export
2. **Ownership Chain**: Patient → User ownership is validated
3. **Temporal Consistency**: `createdAt` ≤ `updatedAt` for all entities
4. **Version Monotonicity**: Version numbers are sequential and positive

### Privacy and PHI

- Exports containing PHI must be encrypted at rest
- Access to exports requires audit logging
- Exports older than retention policy are auto-purged
- De-identified exports available for analytics (approved use only)

## 2. Migration Dry-Run Procedure

### Pre-Migration Checklist

- [ ] Review migration plan with stakeholders
- [ ] Verify backup exists and is restorable
- [ ] Run migration script in dry-run mode
- [ ] Review reconciliation report
- [ ] Schedule maintenance window
- [ ] Prepare rollback plan

### Dry-Run Modes

#### Read-Only Validation

```bash
npm run migration:dry-run -- --mode=validate --source=firestore --target=firestore-v2
```

Checks:
- Schema compatibility
- Data type conversions
- Relationship integrity
- Index requirements

#### Shadow Read

```bash
npm run migration:shadow-read -- --duration=24h --sample-rate=0.1
```

Runs parallel reads from old and new data sources, comparing results without affecting production writes.

#### Count/Hash/Sample Reconciliation

```bash
npm run migration:reconcile -- --entity-type=all
```

Compares:
- Entity counts (old vs new)
- Checksum of sorted entity IDs
- Random sample deep comparison (default 100 entities per type)

### Migration Feature Flags

```typescript
const migrationFlags = {
  'migration.read.medications': 'old|new|both',
  'migration.write.medications': 'old|new|both',
  'migration.rollback.enabled': true
};
```

Rollout stages:
1. Enable shadow reads (no production impact)
2. Enable dual writes (old + new, old authoritative)
3. Enable dual reads with comparison logging
4. Switch to new authoritative (old still written for rollback)
5. Stop old writes, monitor for 48h
6. Mark old data as archived

### Rollback Procedure

If issues detected within rollback window:

1. Set `migration.rollback.enabled` = true
2. Revert feature flags to previous stage
3. Validate data consistency
4. Review and fix any data written only to new storage
5. Document incident and lessons learned

## 3. Backup and Recovery

### Backup Strategy

#### Firestore Backups

- **Frequency**: Daily automated backups at 02:00 UTC
- **Retention**: 30 days rolling, 12 monthly snapshots
- **Location**: Multi-region Cloud Storage bucket with versioning
- **Encryption**: Customer-managed encryption keys (CMEK)

```bash
gcloud firestore export gs://mo-nut-backups-prod/$(date +%Y-%m-%d) \
  --project=mo-nut-prod \
  --collection-ids=users,patients,medications,appointments
```

#### Storage Backups

- **Object Lifecycle**: 
  - Hot: 0-90 days (Standard storage)
  - Warm: 91-365 days (Nearline storage)
  - Cold: 366+ days (Coldline storage)
  - Retention: 7 years minimum for medical records
- **Versioning**: Enabled for all patient data buckets
- **Soft Delete**: 30-day recovery window

### Recovery Targets

- **RPO (Recovery Point Objective)**: ≤ 24 hours
- **RTO (Recovery Time Objective)**: ≤ 8 hours

### Recovery Runbook

#### Full System Recovery

**Scenario**: Complete data loss or corruption

1. **Declare Incident** (0-15 min)
   - Notify on-call team
   - Start incident log
   - Assess scope of data loss

2. **Isolate Issue** (15-30 min)
   - Put system in maintenance mode
   - Stop all background workers
   - Prevent new writes

3. **Identify Restore Point** (30-45 min)
   - Determine last known good backup
   - Verify backup integrity (checksum validation)
   - Document data loss window

4. **Restore Firestore** (45 min - 3 hours)
   ```bash
   gcloud firestore import gs://mo-nut-backups-prod/2026-06-25 \
     --project=mo-nut-prod
   ```

5. **Restore Storage Objects** (parallel with step 4)
   ```bash
   gsutil -m rsync -r \
     gs://mo-nut-backups-prod/storage/2026-06-25/ \
     gs://mo-nut-storage-prod/
   ```

6. **Rebuild Indexes** (3-5 hours)
   ```bash
   gcloud firestore indexes create --project=mo-nut-prod
   firebase deploy --only firestore:indexes
   ```

7. **Validate Data Integrity** (5-6 hours)
   ```bash
   npm run validate:post-recovery -- --sample-size=1000
   ```
   - Run relationship validation
   - Check entity counts
   - Verify recent user operations

8. **Resume Operations** (6-7 hours)
   - Enable writes
   - Start background workers
   - Monitor error rates
   - Exit maintenance mode

9. **Post-Recovery** (7-8 hours)
   - Document recovery process
   - Identify data loss (if any)
   - User communications
   - Post-mortem scheduling

#### Partial Recovery (Single Entity)

**Scenario**: Accidental deletion or corruption of specific records

1. Export entity from backup:
   ```bash
   npm run export:entity -- --id=pat-12345 --from-backup=2026-06-25
   ```

2. Validate entity and relationships
3. Import with conflict resolution:
   ```bash
   npm run import:entity -- --file=pat-12345.json --merge-strategy=manual
   ```

#### Emergency Operations

**Revoke Compromised Share Links**

```bash
npm run emergency:revoke-shares -- --pattern=all --reason="Security incident"
```

**Lock User Account**

```bash
npm run emergency:lock-user -- --user-id=user-123 --reason="Suspicious activity"
```

**Audit Trail Export**

```bash
npm run export:audit -- --start=2026-06-25T00:00:00Z --end=2026-06-26T00:00:00Z
```

### Recovery Testing

#### Six-Month Drill Schedule

- **Monthly**: Backup integrity verification (automated)
- **Quarterly**: Partial recovery drill (single patient record)
- **Biannually**: Full recovery drill in isolated environment
- **Pre-Pilot**: Complete disaster recovery simulation

#### Drill Checklist

- [ ] Restore to isolated test environment
- [ ] Validate all entity types restored
- [ ] Check relationship integrity
- [ ] Verify indexes rebuilt correctly
- [ ] Test read/write operations
- [ ] Measure actual RTO
- [ ] Document issues and improvements
- [ ] Update runbook based on findings

### Configuration and Index Restore

All configuration and indexes are version-controlled:

```bash
# Restore Firestore rules
firebase deploy --only firestore:rules

# Restore Firestore indexes
firebase deploy --only firestore:indexes

# Restore Storage rules
firebase deploy --only storage

# Restore Cloud Functions
firebase deploy --only functions
```

### Monitoring and Alerting

Post-recovery monitoring:
- Error rate < 0.1%
- P95 latency < 500ms
- No data integrity violations
- Audit log continuity verified

## 4. Export/Import Utilities

### Export Command

```bash
npm run export:canonical -- \
  --entity-types=all \
  --start-date=2026-01-01 \
  --end-date=2026-06-26 \
  --output=./exports/mo-nut-2026-06-26.ndjson \
  --include-checksums=true
```

### Import Command

```bash
npm run import:canonical -- \
  --input=./exports/mo-nut-2026-06-26.ndjson \
  --validate-only=true \
  --merge-strategy=fail-on-conflict
```

Merge strategies:
- `fail-on-conflict`: Abort on any ID collision
- `skip-existing`: Import only new entities
- `overwrite-older`: Replace if imported version is newer
- `manual`: Prompt for each conflict

### Validation Command

```bash
npm run validate:export -- \
  --input=./exports/mo-nut-2026-06-26.ndjson \
  --check-relationships=true \
  --check-checksums=true
```

## 5. Legal and Compliance

- All backups encrypted with customer-managed keys
- Access to production backups requires multi-party approval
- Backup restoration logged to immutable audit trail
- Patient data export requests honored within 30 days (GDPR/CCPA)
- Right-to-erasure implemented with audit preservation

## 6. Maintenance and Updates

This document is reviewed and updated:
- After each recovery drill
- After any migration
- Quarterly as part of operational review
- When backup/recovery tooling changes

**Last Updated**: 2026-06-26
**Next Review**: 2026-09-26
**Document Owner**: Infrastructure Team
