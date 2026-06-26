# Elderly Usability Test Protocol — Mo-nut PWA

## Overview

- **Date**: 2026-06-26
- **Phase**: P0 Prototype Evaluation
- **Test Type**: Moderated walkthrough with synthetic data
- **Participant Profile**: Elderly Thai adults (60+) and caregiver-assisted users
- **Sample Size Target**: 5–8 participants per journey

## Safety and Consent

1. All test data is fully synthetic — no real patient information is used
2. Participants are briefed on data handling before starting
3. Consent is recorded (verbal + checklist acknowledgment)
4. Participants may stop at any time without reason
5. No biometric or health data is collected from participants
6. Screen recordings are stored encrypted and deleted after analysis

## Synthetic Data Fixtures

| Entity | Synthetic Value |
|---|---|
| Patient name | สมชาย ใจดี (male, 68) |
| Conditions | ความดันโลหิตสูง, เบาหวาน type 2 |
| Allergies | Penicillin |
| Medications | Metformin 500mg, Amlodipine 5mg |
| Appointments | พบแพทย์อายุรกรรม, ตรวจเลือด |
| Measurements | Weight 70.5 kg, Glucose 120 mg/dL |
| Caregiver | สายสุนีย์ (daughter, primary) |
| SOS contacts | สายสุนีย์, วิทยา (brother) |

## Journeys

### J1: Profile and Onboarding
**Goal**: User can identify their name, conditions, allergies, and emergency contact.

Steps:
1. Open PWA → see profile icon
2. Tap profile → view personal information
3. Read medical conditions and allergies
4. Read emergency contact information

**Success criteria**: User reads and understands all 4 data points without assistance.

**Observe**:
- Can user find the profile? (Y/N)
- Does user understand the Thai labels? (Y/N)
- Any confusion about medical terms? (notes)

**Screens covered**: `/` → profile section

---

### J2: OCR Capture and Review
**Goal**: User captures a document (prescription) and reviews AI-extracted data before confirming.

Steps:
1. Tap Quick Capture (📷 ถ่ายเอกสาร)
2. Choose "Take Photo" or "Choose File" (file fallback)
3. Preview captured image
4. Tap "Use Photo"
5. Review AI-extracted data (OCR draft — not yet confirmed)
6. Choose "Confirm" or "Incorrect"

**Success criteria**: User successfully completes flow and understands OCR data is a draft requiring review.

**Observe**:
- Does user notice the review step? (Y/N)
- Does user understand they must confirm? (Y/N)
- Any hesitation with camera permission? (notes)
- Is the "not correct" button visible and understandable? (Y/N)

**Screens covered**: `/capture`

---

### J3: Medication Dose Response
**Goal**: User can see today's medications and mark a dose as taken.

Steps:
1. Open medications tab
2. View medication list with dose status
3. Tap a medication to see details
4. Tap "กินแล้ว" (Taken) on a pending dose
5. See status update

**Success criteria**: User marks dose correctly and understands the status change.

**Observe**:
- Are dose status colors/indicators understood? (Y/N/notes)
- Can user tap the "Taken" button accurately? (touch target size)
- Does user notice any hesitation due to duplicate-tap prevention? (notes)
- Is the distinction between pending/taken/skipped clear? (Y/N)

**Screens covered**: `/medications`

---

### J4: Health Measurement Entry
**Goal**: User adds a weight measurement and sees it in history.

Steps:
1. Open health tab
2. Tap "Add Measurement"
3. Select measurement type (น้ำหนัก)
4. Enter value
5. Save
6. View measurement in history

**Success criteria**: Measurement appears in history with correct value.

**Observe**:
- Can user select measurement type easily? (Y/N)
- Is the input field clear about units? (Y/N/notes)
- Does user verify the saved value in history? (Y/N)

**Screens covered**: `/measurements`

---

### J5: Caregiver Permission
**Goal**: User can view current caregivers and understand revoke option.

Steps:
1. Open profile
2. Tap "ผู้ดูแล" (Caregivers)
3. View caregiver list with access scopes
4. Understand revoke option for active caregiver

**Success criteria**: User correctly identifies a caregiver and understands how to revoke access.

**Observe**:
- Does user understand the permission scopes listed? (Y/N/notes)
- Is the status badge (active/pending/revoked) clear? (Y/N)
- Is revoke action visible and understandable? (Y/N)
- Any trust concerns expressed? (notes)

**Screens covered**: `/caregivers`

---

### J6: Offline Sync Understanding
**Goal**: User understands when data is pending sync.

Steps:
1. View today dashboard
2. See sync status indicator
3. Add a measurement while "offline" (simulated)
4. See change reflected in pending queue

**Success criteria**: User recognizes synced vs. pending state.

**Observe**:
- Does user notice the sync indicator? (Y/N)
- Does user understand "pending" vs "synced"? (Y/N/notes)
- Any anxiety about data loss? (notes)

**Screens covered**: `/today`, `/measurements`

---

### J7: PWA Install Guidance
**Goal**: User can install the PWA and understands it works offline.

Steps:
1. Open PWA in browser
2. See install prompt or guidance
3. Follow install flow
4. Open installed PWA
5. Understand it works offline (show offline page)

**Success criteria**: PWA is installed and user opens it standalone.

**Observe**:
- Does user notice the install prompt? (Y/N)
- On iOS, is guidance clear? (Y/N/notes)
- Is the offline page helpful? (Y/N)
- Does user understand "app" vs "website" value? (Y/N)

**Screens covered**: Service worker + install prompt

---

### J8: SOS Activation
**Goal**: In a simulated emergency, user can activate SOS and understand next steps.

Steps:
1. Open SOS screen
2. Activate SOS (press button)
3. Confirm activation
4. View notification delivery results
5. See direct call option for failed contacts

**Success criteria**: User activates SOS, sees per-contact delivery, and accesses direct call.

**Observe**:
- Can user find the SOS screen? (Y/N)
- Is accidental activation prevented? (confirm dialog)
- Does user understand failed contact results? (Y/N/notes)
- Does user know to call 1669 if contacts fail? (Y/N)

**Screens covered**: `/sos`

---

## Measurements

| Metric | Collection Method |
|---|---|
| Task completion (Y/N) | Observer notes |
| Time-on-task | Stopwatch |
| Errors per task | Observer count |
| Comprehension score (1-5) | Post-task question |
| Touch target accuracy | Observed miss/hit ratio |
| Zoom usage | Observe if user zooms |
| Confidence rating | 5-point Likert after each journey |

## Heuristic Checklist

- [ ] All touch targets ≥ 44×44 CSS px
- [ ] Text can be zoomed to 200% without clipping
- [ ] Color is never the only status indicator
- [ ] Thai copy is natural and respectful (ไม่กล่าวโทษ / non-blaming)
- [ ] Keyboard navigation reaches all interactive elements
- [ ] Focus indicators are visible (2px outline)
- [ ] Screen reader announces state changes
- [ ] Reduced motion disables animations
- [ ] One primary action per screen
- [ ] No critical functionality behind gestures only

## Priority Schema for Findings

| Severity | Definition | Action |
|---|---|---|
| Critical | Blocks task completion, causes data loss | Fix before next test |
| High | Major confusion, repeated errors | Fix or escalate |
| Medium | Minor confusion, slow but completes | Document for revision |
| Low | Aesthetic, preference | Log for backlog |

## Revision Tracking

| ID | Finding | Severity | Screen | Fix Applied | Verified? |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Open Questions / Accepted Tradeoffs

| # | Question | Decision | Rationale |
|---|---|---|---|
| 1 | Should SOS button be on every screen? | Keep in bottom nav + profile | Prevents accidental activation while always accessible |
| 2 | Should we add text-only mode? | Deferred to P1 | Monitor elderly feedback before building |
| 3 | Confirm dialog for dose action? | Not needed — taken action is reversible via correction | Matches domain model |

## Sign-off

- **Test Lead**: ___________________
- **Design**: ___________________
- **Product**: ___________________
- **Date**: ___________________
