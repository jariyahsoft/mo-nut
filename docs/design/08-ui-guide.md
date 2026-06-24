# 08 — UX/UI Guide

**Source:** PRD/SRS product design, mobile-first, elderly-friendly และ accessibility requirements

## Design Vision

Mo-nut ต้องให้ความรู้สึก **อุ่นใจ เรียบง่าย เชื่อถือได้ และไม่ทำให้ผู้ป่วยรู้สึกว่ากำลังใช้ระบบโรงพยาบาลที่ซับซ้อน** ทุกหน้าต้องตอบคำถามว่า “วันนี้ฉันต้องทำอะไรต่อ”

## Design Principles

1. Today-first — สิ่งสำคัญวันนี้อยู่บนสุด
2. One primary action — แต่ละหน้ามี action หลักชัดเจน
3. Recognize, not remember — ใช้รูปยา วันที่ และ checklist ลดการจำ
4. Care without surveillance — แชร์เท่าที่ผู้ป่วยอนุญาต
5. Safety before automation — AI/OCR ต้องให้ตรวจสอบ
6. Elderly-friendly by default — ไม่ซ่อนความสามารถสำคัญหลัง gesture ซับซ้อน

## Information Architecture

### Patient Bottom Navigation

1. วันนี้
2. นัดหมาย
3. ยา
4. สุขภาพ
5. โปรไฟล์

Quick Capture เป็น floating central action หรือปุ่มเด่นในหน้าวันนี้

SOS เข้าถึงได้จาก header/action menu และ Emergency card โดยต้องกดค้างเพื่อยืนยัน

### Caregiver Navigation

1. ภาพรวม
2. ผู้ป่วย
3. การแจ้งเตือน
4. ปฏิทิน
5. โปรไฟล์

### Doctor Lite Portal

- Dashboard
- Shared patients/reports
- Appointments
- Checklist recommendations
- Audit/access history

## Critical User Flows

### Scan Appointment

Home → Quick Capture → ถ่ายภาพ → Processing → Review extracted fields → Confirm → Set reminders → Success

### Take Medication

Push/Today card → Medication detail → Taken/Snooze/Skip → Confirmation → Updated daily progress

### Prepare Doctor Visit

Appointment detail → Questions → Health summary → Checklist progress → Travel plan → Doctor Visit Mode

### SOS

Press and hold → Confirmation with call/send options → Active state → Location/status → Resolve/Cancel

## Page Inventory

### Authentication/Onboarding

- Splash
- Onboarding benefits
- Login/register
- OTP
- Role selection
- Consent and permissions
- Create patient profile
- Accessibility setup

### Patient

- Today Dashboard
- Quick Capture sheet
- Appointment list/calendar
- Appointment detail
- Scan appointment camera
- OCR review
- Travel plan/navigation
- Medication list
- Add/edit medication
- Medication detail
- Medication due full-screen
- Health dashboard
- Add measurement
- Measurement history/chart
- Doctor Visit Mode
- Questions list/editor
- Audio recorder
- Transcript review
- Checklist list/detail/progress
- Caregiver list/invite/permissions
- Reports/create/share
- Emergency profile
- SOS confirmation/active
- Notifications
- Profile/settings/privacy

### Caregiver

- Caregiver dashboard
- Patient switcher
- Patient overview
- Missed medication alert
- Upcoming appointment detail
- SOS alert
- Permission status

### Doctor/Admin

- Doctor dashboard
- Shared patient summary
- Report viewer
- Recommendation/checklist form
- Admin system dashboard
- Audit access view

## UI States

ทุก data screen ต้องมี:

- Initial loading skeleton
- Pull-to-refresh/background sync
- Empty state พร้อม action
- Inline validation
- Retryable error
- Permission denied พร้อมคำอธิบาย
- Offline badge และ pending-sync state
- Success feedback ไม่รบกวน
- Deleted/revoked/expired state

## Design Tokens — Proposed Assumption

> สีและตัวเลขนี้เป็น design direction เบื้องต้น ต้องทดสอบ contrast และอนุมัติแบรนด์

### Colors

| Token | Suggested Value | Use |
|---|---|---|
| Primary | `#1D7A72` | trust/health actions |
| Primary Dark | `#135E58` | pressed/high contrast |
| Secondary | `#4D7CFE` | information/navigation |
| Success | `#2E7D32` | completed/taken |
| Warning | `#B26A00` | due/attention |
| Danger | `#C62828` | SOS/critical only |
| Background | `#F7FAF9` | calm neutral |
| Surface | `#FFFFFF` | cards |
| Text Primary | `#17201F` | main text |
| Text Secondary | `#5E6B69` | supporting text |
| Border | `#DDE6E4` | separators |

อย่าใช้ Danger red เป็นสีตกแต่งทั่วไป

### Typography

- Thai-friendly sans-serif เช่น Noto Sans Thai หรือ system font
- Body baseline 16–18 px equivalent
- Elderly mode body 20–22 px
- Heading hierarchy ชัด ไม่ใช้ weight บาง
- Line height อย่างน้อย 1.4–1.6 สำหรับข้อความไทย

### Spacing and Shape

- 4pt spacing grid
- Card padding 16–20
- Button height 48–56; Elderly mode 56–64
- Radius 12–16
- Shadow เบา หลีกเลี่ยง visual clutter

## Component Inventory

- AppShell/BottomNavigation
- PatientSwitcher
- TodayTaskCard
- AppointmentCard
- MedicationCard with image
- MeasurementCard
- ProgressRing/WeeklyProgress
- ChecklistItem
- QuestionCard
- AudioRecorderControls
- TranscriptReviewPanel
- PermissionScopeSelector
- OfflineStatusBanner
- SyncStatusChip
- EmptyState
- ErrorState
- ConfirmationBottomSheet
- PressAndHoldSOSButton
- EmergencyProfileCard
- SecureShareSheet

## Content Tone

- สุภาพ อบอุ่น ตรงไปตรงมา
- หลีกเลี่ยงการตำหนิ เช่นใช้ “ยังไม่ได้ยืนยัน” แทน “คุณลืมกินยา”
- แยก alert สำคัญออกจากคำแนะนำทั่วไป
- ไม่วินิจฉัย เช่น “ค่านี้อยู่นอกช่วงที่ตั้งไว้ กรุณาวัดซ้ำหรือติดต่อบุคลากรทางการแพทย์”

## Responsive Rules

- Mobile เป็น reference layout
- Tablet ใช้ master-detail เมื่อเหมาะสม
- Web จำกัดความกว้าง content form และใช้ side navigation
- ไม่ stretch card/line length เกินอ่านง่าย
- Desktop doctor/admin ใช้ table พร้อม accessible responsive fallback

## Accessibility

- WCAG AA baseline
- Dynamic type/font scaling 200% โดย task หลักยังสำเร็จได้
- Screen reader order ตรง visual order
- ทุก icon มี label
- Charts มี textual summary
- Color status มี icon+label
- Haptic เป็นเสริม ไม่ใช่ช่องทางเดียว
- Motion ลดได้ตาม system preference

## Prototype Priority

สำหรับนำเสนอลูกค้า ให้สร้าง high-fidelity screens ตามลำดับ:

1. Patient Today Dashboard
2. Appointment Scan/OCR Review
3. Medication Due
4. Health Dashboard
5. Doctor Visit Mode
6. Caregiver Dashboard
7. Checklist Progress
8. Travel Plan
9. SOS
10. Report/Doctor View

รายละเอียด prompt อยู่ใน [12-ui-image-prompts.md](12-ui-image-prompts.md)

## Open Questions

- Logo/brand identity final
- สีตามแบรนด์ลูกค้า/สถานพยาบาล
- Elderly mode เป็น toggle หรือ adaptive default
- Bottom navigation final label
- ต้องมี dark mode ใน MVP หรือไม่
