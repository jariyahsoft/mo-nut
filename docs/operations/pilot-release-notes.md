# Mo-nut Pilot Release Notes

## v1.0.0 — Initial Pilot Release

**Release Date**: TBD
**Deployment Stage**: Pilot
**Pilot Cohort**: 10-20 patients, 5-10 caregivers, 1-2 clinicians

### 🎯 Core Features

#### Account & Authentication
- Email/password registration with email verification
- Google sign-in integration
- Password reset flow
- Session management with automatic revoke
- MFA for privileged roles (admin, clinician)

#### Health Profile
- Patient profile with conditions, allergies, and emergency contacts
- Elderly Mode and font scale preferences
- Thai/English bilingual interface
- Onboarding consent flow (Terms, Privacy, Health Data)
- Profile data export and deletion request (follows policy)

#### Caregiver System
- Caregiver invitation by email with token-based verification
- One-time acceptance and duplicate prevention
- Granular permissions (primary/backup/viewer roles with scopes)
- Suspend and revoke with immediate effect
- Multi-patient caregiver support
- Permission-aware authorization checks

#### Medications & Doses
- Manual entry with photo support
- OCR draft review (mandatory human confirmation)
- Daily, weekly, specific-day schedule rules
- Timezone-safe deterministic occurrence generation
- First-final-action policy with corrections
- Snooze, Skip, Report Issue actions

#### Health Measurements
- Typed values: weight, height, pulse, glucose, blood pressure
- Validation with range checks
- Required context (e.g., fasting for glucose)
- BMI computation
- Source tracking (manual, device, OCR, import)

#### Appointments
- CRUD with optimistic concurrency
- Reschedule/cancel with state history
- Timezone-aware scheduling
- Preparation checklist
- Travel/map link
- Soft-delete preserving history

#### Documents & OCR
- Secure chunked upload with checksum verification
- MIME and size validation (JPEG/PNG/PDF, max 10MB)
- OCR draft review (mandatory confirmation before creating appointments)
- MIME/size policy enforcement

#### Today Dashboard
- Cross-domain aggregation (appointment, medications, checklist, measurements)
- Performance-bounded queries
- Permission-safe sections
- PHI sanitization in response

#### Notifications
- In-app baseline delivery
- Web Push when supported
- Quiet hours routing (22:00 - 06:00)
- Privacy levels (minimal/summary/full)
- Caregiver escalation after grace period

#### Reports & Sharing
- PDF report generation with date range and section selection
- Secure share links with high-entropy tokens
- Expiry, max-uses, revocation
- Privacy-safe rejection of invalid links

#### Visit Mode
- Aggregated visit context
- Audio recording with explicit consent
- File upload fallback when recorder unsupported
- Notes preservation

#### Doctor Tools
- Speech-to-Text (Thai) with segment timestamps
- Transcript review with mandatory confirmation
- Edit preserves original text

#### Travel
- Location consent required
- Map links without PHI
- Emergency Profile with QR-safe mode

#### SOS Emergency
- Press-and-hold activation
- Direct call always available
- Per-contact delivery status (success/failure)
- Disclaimer: "Mo-nut is not an emergency service"

### 🛡️ Security & Privacy

- TLS 1.3 everywhere
- Content Security Policy enforced
- IDOR prevention with authorization matrix
- Audit trail for all sensitive operations
- Admin/Support/Auditor role separation
- Break-glass workflow with reason requirement and time limit
- Offline PHI cleared on logout

### ♿ Accessibility

- WCAG 2.2 AA compliant
- Keyboard navigation throughout
- Screen reader support (NVDA, VoiceOver, JAWS)
- Touch targets ≥ 44×44 CSS px
- 200% zoom support
- Reduced motion preference respected
- Bilingual Thai/English interface
- Elderly-friendly design

### 🌐 Browser Support

- Chrome Android 90+
- Safari iOS 14+
- Edge Desktop 90+
- Firefox Desktop 90+

### 📱 PWA Features

- Installable on supported browsers
- Offline mode with App Shell cache
- Service worker with versioned cache cleanup
- Update notification with refresh recovery

### 🔧 Technical Highlights

- 78 domain entities, 100+ API endpoints
- 150+ automated tests across all layers
- Domain-driven design with portable interfaces
- Firebase-ready with emulator support
- TypeScript strict mode throughout

### ⚠️ Known Limitations

- Background Sync not available on iOS Safari
- iOS Web Push requires iOS 16.4+
- Continuous tracking not in MVP (planned)
- OCR/STT providers are mocked for pilot

### 📞 Support

- In-app help center
- Email: support@mo-nut.example
- SOS-related emergencies: call 1669 (Thailand)

### 🙏 Acknowledgements

Thank you to all participants in the pilot program. Your feedback helps us improve the experience for all users.

---

For technical issues or feedback during pilot, please contact the engineering team through your designated pilot coordinator.