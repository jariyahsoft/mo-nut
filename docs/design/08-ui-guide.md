# 08 — UX/UI Guide

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Design principles

1. Mobile-first and elderly-friendly
2. One primary action per screen
3. Plain Thai, large text and recognizable icons with labels
4. Safety before speed for medication, consent and SOS
5. Show source/status/confidence for OCR/STT/AI
6. Do not hide critical data behind gestures only
7. Graceful degradation when notification/camera/location is unavailable
8. Privacy by default on shared/lock-screen surfaces

## 2. Brand direction — Assumption

SRS does not define a final brand system. Proposed direction for prototypes:

- Personality: calm, trustworthy, supportive, non-clinical but professional
- Primary color: teal/blue-green family for trust and calm
- Accent: warm amber for reminders
- Danger: red reserved for SOS/high-risk only
- Background: light neutral with high contrast
- Illustrations: simple inclusive Thai adults/elderly; no real patient data

Final values require design approval and contrast testing.

## 3. Information architecture

### Patient navigation (mobile)

1. วันนี้
2. นัดหมาย
3. ยา
4. สุขภาพ
5. โปรไฟล์

Quick Capture is a prominent central/floating action. SOS is always reachable but visually separated to prevent accidental activation.

### Caregiver navigation

- ผู้ป่วยที่ดูแล
- วันนี้/แจ้งเตือน
- นัดหมาย
- รายงาน
- โปรไฟล์

### Clinician/Doctor Lite web

- ผู้ป่วยที่ได้รับอนุญาต
- นัดวันนี้
- สรุปสุขภาพ
- ยา/ความสม่ำเสมอ
- คำถามและเช็กลิสต์

## 4. Critical user flows

### Add appointment from image
Home → Quick Capture → Camera/File → Upload/Processing → OCR Review → Confirm fields → Reminder/Caregiver → Success

### Respond to medication dose
Notification/Home card → Dose detail → Taken/Snooze/Skip/Issue → Confirmation → Timeline update

### Grant caregiver access
Profile/Sharing → Invite → Select scopes/purpose/expiry → Review consent → Send → Accepted state → Access history

### Doctor visit
Upcoming appointment → Visit Mode → Questions/medications/report → Capture audio/document → Review drafts → Next appointment/checklist

### SOS
Persistent SOS entry → Press and hold/confirm → Direct call/message/location attempts → Per-channel delivery status → Close/safe state

## 5. Page inventory

| ID | Screen/Page | Role | Phase |
|---|---|---|---|
| UI-01 | Welcome / Sign in / OTP | All | Both |
| UI-02 | Patient onboarding and accessibility | Patient | Both |
| UI-03 | Patient Today dashboard | Patient | Both |
| UI-04 | Quick Capture sheet | Patient/Caregiver | Both |
| UI-05 | Appointment list/calendar | Patient/Caregiver | Both |
| UI-06 | Appointment detail and preparation | Patient/Caregiver | Both |
| UI-07 | OCR capture and review | Patient/Caregiver | Both |
| UI-08 | Doctor Visit Mode | Patient/Caregiver | Both |
| UI-09 | Medication list | Patient/Caregiver | Both |
| UI-10 | Medication detail/schedule | Patient/Caregiver | Both |
| UI-11 | Dose reminder/response | Patient | Both |
| UI-12 | Health dashboard and trends | Patient/Caregiver | Both |
| UI-13 | Add health measurement | Patient/Caregiver | Both |
| UI-14 | Checklist and doctor questions | Patient | Both |
| UI-15 | Audio recording/STT review | Patient | Both |
| UI-16 | Caregiver invitation and permissions | Patient | Both |
| UI-17 | Caregiver multi-patient dashboard | Caregiver | Both |
| UI-18 | Consent/access history | Patient | Both |
| UI-19 | Report builder and share link | Patient | Both |
| UI-20 | SOS confirmation and delivery status | Patient | Both |
| UI-21 | Emergency card/QR | Patient | Both |
| UI-22 | Notification center/preferences | All | Both |
| UI-23 | Doctor Lite patient summary | Clinician | Both |
| UI-24 | Offline queue/conflict resolution | Patient/Caregiver | P1/P2 |
| UI-25 | Mobile biometric/permission setup | Patient | Phase 2 |
| UI-26 | Health platform/device connection | Patient | Phase 2 |
| UI-27 | Admin operational dashboard | Admin | Both |

## 6. Required UI states

Every relevant page defines:

- Loading/skeleton
- Empty with useful next action
- Validation error
- Network/dependency error with retry/manual fallback
- Permission denied without revealing resource existence
- Offline and last-synced timestamp
- Success confirmation
- Conflict with server/local comparison where needed
- Processing status for OCR/STT/report
- Revoked/expired consent state

## 7. Layout and responsive rules

- Mobile reference width 360–430 CSS px
- Bottom navigation on mobile; side navigation on tablet/desktop when space permits
- Content max width for reading forms/reports
- Safe areas and keyboard avoidance
- Avoid dense multi-column medical forms on mobile
- Tablet may show list/detail split view
- Desktop Doctor Lite may show summary panels but preserve reading order

## 8. Design tokens — provisional

| Token | Proposed value/rule |
|---|---|
| Base spacing | 4 px scale; common 8/12/16/24/32 |
| Touch target | minimum 44×44 px |
| Body text | minimum 16 px equivalent; elderly mode larger |
| Heading | clear 3-level hierarchy |
| Radius | 12–16 px for cards/controls |
| Shadow | subtle; never sole boundary indicator |
| Focus | high-contrast visible ring |
| Danger | reserved for destructive/SOS |
| Success | icon + text, not color alone |

Exact colors/fonts are assumptions pending brand/accessibility approval.

## 9. Component inventory

- App shell, bottom/side navigation, top bar
- Patient context switcher with strong identity cue
- Appointment card/timeline
- Medication card and dose action panel
- Measurement input and trend chart
- Consent scope selector and review summary
- File/audio capture and processing status
- Confidence field review component
- Checklist progress and question list
- Notification/privacy preference
- Expiring share-link card
- SOS press-and-hold control and delivery status
- Offline banner, sync queue, conflict card
- Empty/error/permission state templates

## 10. Content tone

- Thai plain language, respectful and supportive
- Do not shame missed dose/checklist
- State uncertainty: “ระบบอ่านได้ว่า…” and require confirmation
- Safety disclaimer is visible but not alarmist
- Avoid “วินิจฉัย”, “รับรอง”, “ปลอดภัยแน่นอน” unless legally/clinically approved

## 11. Accessibility requirements

- WCAG-aligned contrast and semantic labels
- Screen reader order and live-region updates
- Keyboard navigation for web/desktop
- Dynamic type and no clipping
- Charts have text/table equivalents
- Captions/transcripts for audio content
- Reduced motion and no flashing
- Destructive action confirmation and undo where safe

## 12. Privacy and safety patterns

- Mask sensitive values in app switcher/lock screen where possible
- Show active patient context prominently to caregiver
- Consent review lists purpose, scope, expiry and recipient
- SOS shows actual status per channel; never imply delivered without evidence
- AI-derived fields show confidence/source and “ตรวจสอบก่อนบันทึก”
- Share links show expiry, scope and revoke action

## 13. Assumptions and open design questions

- Brand palette/font and illustration style are not final
- Need usability target and test sample size for elderly users
- Need approved medical warning/threshold copy
- Need browser/OS support matrix before final responsive/device designs
