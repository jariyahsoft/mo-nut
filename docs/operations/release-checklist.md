# Pilot Release Checklist — Mo-nut

## Pre-Release

### Legal & Privacy
- [ ] Privacy Notice reviewed and approved by legal team
- [ ] Consent texts (Terms, Privacy, Health Data) reviewed and approved
- [ ] Recording consent language approved
- [ ] Analytics usage disclosed and approved
- [ ] Provider Data Processing Agreements (DPA) signed
- [ ] Data residency compliance verified (Thailand PDPA)
- [ ] Retention and deletion policies documented
- [ ] Offline emergency data policy reviewed
- [ ] SOS disclaimer language approved (Mo-nut is not emergency service)
- [ ] Emergency numbers (1669 Thailand) verified and current

### Production Readiness
- [ ] All secrets configured in production Secret Manager
- [ ] Service accounts provisioned with least-privilege IAM
- [ ] Contract compatibility verified (no breaking changes)
- [ ] Migration dry-run completed successfully
- [ ] Backup/restore drill evidence captured
- [ ] Monitoring and alerting configured
- [ ] Feature flags configured
- [ ] Service worker update flow tested
- [ ] Release notes drafted

## Deployment Stages

### 1. Development
- [ ] Deploy to dev environment
- [ ] Smoke tests pass
- [ ] Logs show no errors

### 2. Staging
- [ ] Deploy to staging environment
- [ ] Full regression tests pass
- [ ] Performance benchmarks meet targets
- [ ] Security scan passes

### 3. Manual Approval Gate
- [ ] Product Manager sign-off
- [ ] Engineering Lead sign-off
- [ ] Security review completed
- [ ] Privacy Officer approval

### 4. Production Rollout
- [ ] Deploy with feature flag at 0% exposure
- [ ] Monitor error rates
- [ ] Gradually increase to 10%, 25%, 50%, 100%
- [ ] Monitor at each stage for at least 24 hours

## Post-Deploy Verification

### Smoke Tests (must all pass)
- [ ] User can register and log in
- [ ] Dashboard loads for active patient
- [ ] Notification delivered to In-app baseline
- [ ] Offline sync completes for queued mutations
- [ ] Share link revoke prevents access
- [ ] SOS activation reaches direct call

### Monitoring
- [ ] Error rate < 0.5%
- [ ] P95 latency < 500ms (dashboard)
- [ ] P95 latency < 800ms (API endpoints)
- [ ] No PHI in logs (verified by audit)
- [ ] Cost within budget allocation

## Rollback Plan

### Triggers
- Error rate spike > 5%
- Critical security vulnerability discovered
- Data integrity issue detected
- Cost spike > 200% of budget

### Procedure
1. **Page on-call engineer**: Initiate incident response
2. **Communicate**: Notify Product Manager and stakeholders
3. **Execute rollback**: Use pre-tested rollback command
4. **Verify**: Confirm rollback successful
5. **Post-mortem**: Within 24 hours of incident

### Rollback Owner
- Primary: Engineering Lead
- Secondary: Senior SRE
- Escalation: CTO

## Support Readiness

### Documentation
- [ ] Incident response runbook published
- [ ] Common issues FAQ
- [ ] User onboarding guide (Thai and English)
- [ ] Caregiver quick-start guide
- [ ] Admin operations manual

### Support Channels
- [ ] In-app help center
- [ ] Email support (support@mo-nut.example)
- [ ] Phone hotline for emergencies (SOS-related queries only)
- [ ] Community forum (optional)

### Team Training
- [ ] Support agents trained on dashboard
- [ ] Triage procedures documented
- [ ] Escalation paths clear
- [ ] On-call rotation set

## Post-Deploy Monitoring

### Week 1
- Daily error rate review
- Daily cost review
- Daily active user metrics
- Daily SOS false-positive rate

### Month 1
- Weekly metrics review
- Feature flag exposure review
- Retention metrics
- Caregiver adoption rate

### Quarterly
- Security audit
- Performance audit
- UX/usability review
- Legal/compliance review

## Release Notes Template

```markdown
## v1.X.Y - YYYY-MM-DD

### New Features
- [List new features]

### Improvements
- [List improvements]

### Bug Fixes
- [List bug fixes]

### Breaking Changes
- [List breaking changes, if any]

### Security & Privacy
- [List security/privacy notes]

### Known Issues
- [List known issues]
```

## Pilot Cohort

### Initial Pilot (Month 1)
- 10-20 patients
- 5-10 caregivers
- 1-2 clinicians
- 1 specific clinical site

### Expansion Criteria
- Error rate < 1% sustained
- User satisfaction ≥ 4.0/5.0
- No P0 security issues
- No PHI leaks detected

### General Availability Criteria
- Error rate < 0.5% sustained
- User satisfaction ≥ 4.2/5.0
- 90% of pilot users retained after 30 days
- All P0/P1 issues resolved
- Documentation complete

## Sign-off

- [ ] Engineering Lead
- [ ] Product Manager
- [ ] Security Officer
- [ ] Privacy Officer
- [ ] Legal Counsel
- [ ] Customer Support Lead
- [ ] Release Date: ____-__-__