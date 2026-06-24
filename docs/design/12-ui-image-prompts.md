# 12 — UI Image Generation Prompts

> **Source:** `mo-nut-SRS-two-phase.md` เวอร์ชัน 1.0, วันที่ 24 มิถุนายน 2026. เอกสารนี้ต้องอ่านร่วมกับไฟล์อื่นใน `docs/design/`

## 1. Purpose

ชุด prompt นี้ใช้สร้างภาพแนวทาง UX/UI สำหรับลูกค้า นักลงทุน ทีมออกแบบ และทีมพัฒนา ไม่ใช้แทน implementation specification. Source of screen inventory: [`08-ui-guide.md`](08-ui-guide.md).

## 2. How to use

1. Prepend `[MASTER STYLE]` and `[NEGATIVE PROMPT]` to each screen prompt
2. Generate mobile flat screen at 390×844 or specified responsive variant
3. Correct Thai text and exact spacing in a design tool
4. Reuse the same tokens, icons, sample patient and navigation across all screens

## 3. Master style

```text
[MASTER STYLE]
Create a high-fidelity UX/UI concept for “หมอนัด — Mo-nut”, a Thai mobile-first health companion for chronic-care patients, elderly users, caregivers and consent-scoped clinicians. Calm trustworthy teal/blue-green visual direction, warm amber reminders, red only for SOS/high-risk actions, light neutral background, strong contrast, large readable Thai typography, 44px+ touch targets, rounded accessible cards, simple line icons with text labels, generous spacing, realistic but entirely fictional Thai sample data, no real brands or hospital logos. Mobile reference 390×844, clean flat app screen rather than decorative poster, preserve safe areas and bottom navigation. Show clear role/patient context, privacy status, offline/last-sync indicators and human confirmation for OCR/STT/AI. Never imply diagnosis, automatic medication change or guaranteed emergency response. All text should be short; typography may require correction in a design tool after image generation.
```

## 4. Negative prompt

```text
[NEGATIVE PROMPT]
No tiny text, clutter, dark low-contrast UI, neon colors, excessive gradients, glassmorphism that harms readability, unlabeled icons, hidden critical actions, real patient PII/PHI, real hospital logos, prescription advice, diagnosis, automatic drug adjustment, misleading “SOS delivered” state without channel status, scary medical imagery, copyrighted brand assets, desktop-only layout for mobile screens, or fantasy features absent from requirements.
```

## 5. Shared fictional sample data

- Patient: “คุณสมใจ ใจดี”, อายุ 68 ปี
- Caregiver: “นิด — ลูกสาว”
- Facility: “ศูนย์สุขภาพชุมชนตัวอย่าง”
- Appointment: 28 มิ.ย. 2569 เวลา 09:30 น.
- Medication: “ยาความดัน A 5 mg” (fictional label)
- Latest measurement: 128/78 mmHg

Do not use real contact numbers, medical identifiers or credentials.

## 6. Screen prompts

### UI-01 — Welcome / Sign in / OTP

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: secure onboarding. User role: All. Key content/components: Mo-nut logo wordmark, phone/email options, Google, Apple note, OTP input, privacy link. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “phone sign-in”. Secondary action: “language/accessibility”. Navigation/context: none. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-01` and related SRS functional module.

### UI-02 — Patient onboarding and accessibility

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: complete a simple elderly-friendly profile. User role: Patient. Key content/components: progress stepper, name/date of birth, large-text toggle, language, emergency contact. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “continue”. Secondary action: “save later”. Navigation/context: onboarding. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-02` and related SRS functional module.

### UI-03 — Patient Today dashboard

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: see the next medicine, appointment and tasks immediately. User role: Patient. Key content/components: greeting, next-dose card, next-appointment card, checklist progress, latest blood pressure, Quick Capture, SOS. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “confirm dose / view appointment”. Secondary action: “view all”. Navigation/context: bottom nav Today active. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-03` and related SRS functional module.

### UI-04 — Quick Capture sheet

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: capture common health information in one tap. User role: Patient/Caregiver. Key content/components: camera appointment, medicine label, audio, pressure, weight, glucose, symptom, question, checklist. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “choose capture type”. Secondary action: “close”. Navigation/context: modal bottom sheet. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-04` and related SRS functional module.

### UI-05 — Appointment list/calendar

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: review upcoming and past appointments. User role: Patient/Caregiver. Key content/components: month strip, status chips, facility, department, caregiver, preparation badge. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “open appointment”. Secondary action: “add appointment”. Navigation/context: Appointments nav active. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-05` and related SRS functional module.

### UI-06 — Appointment detail and preparation

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: prepare for a medical visit. User role: Patient/Caregiver. Key content/components: date/time, facility map, fasting instruction, documents checklist, caregiver, reminders, status timeline. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “start navigation / confirm attendance”. Secondary action: “edit/reschedule”. Navigation/context: appointment detail. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-06` and related SRS functional module.

### UI-07 — OCR capture and review

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: verify extracted appointment fields before saving. User role: Patient/Caregiver. Key content/components: original document thumbnail, processing status, confidence per field, editable date/time/facility/doctor, clear “ตรวจสอบก่อนบันทึก”. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “confirm and save”. Secondary action: “retry/manual entry”. Navigation/context: review step. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-07` and related SRS functional module.

### UI-08 — Doctor Visit Mode

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: show all visit essentials in one focused screen. User role: Patient/Caregiver. Key content/components: appointment header, prepared questions, current medicines, recent report, capture audio/document, next appointment. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “record visit note”. Secondary action: “open report”. Navigation/context: visit mode header. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-08` and related SRS functional module.

### UI-09 — Medication list

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: see active medicines and stock status. User role: Patient/Caregiver. Key content/components: medicine image placeholders, schedule summary, next dose, low stock badge, active/paused filter. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “open medicine”. Secondary action: “add medicine”. Navigation/context: Medication nav active. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-09` and related SRS functional module.

### UI-10 — Medication detail and schedule

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: review medicine instructions and effective schedule. User role: Patient/Caregiver. Key content/components: fictional medicine, strength, before/after food, schedule timeline, source and safety disclaimer, inventory estimate. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “edit schedule”. Secondary action: “pause with reason”. Navigation/context: detail page. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-10` and related SRS functional module.

### UI-11 — Dose reminder and response

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: respond safely to one due dose. User role: Patient. Key content/components: large medicine card, due time, instructions, photo, buttons taken/snooze/skip/issue, no preselected answer. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “กินแล้ว”. Secondary action: “เตือนภายหลัง / ข้าม”. Navigation/context: notification/deep-link context. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-11` and related SRS functional module.

### UI-12 — Health dashboard and trends

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: understand measurements without diagnosis. User role: Patient/Caregiver. Key content/components: latest blood pressure, weight and glucose cards, accessible line chart plus text summary, filter day/week/month, source labels. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “add measurement”. Secondary action: “view history”. Navigation/context: Health nav active. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-12` and related SRS functional module.

### UI-13 — Add health measurement

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: enter a measurement with unit and context. User role: Patient/Caregiver. Key content/components: large numeric inputs, unit, date/time, before/after meal context, source manual/device, validation guidance. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “save”. Secondary action: “cancel”. Navigation/context: form. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-13` and related SRS functional module.

### UI-14 — Checklist and doctor questions

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: track recommendations and prepare questions. User role: Patient. Key content/components: today checklist with streak/progress, questions sorted by priority, add from symptom or dose issue. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “mark done”. Secondary action: “add question”. Navigation/context: tabbed checklist/questions. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-14` and related SRS functional module.

### UI-15 — Audio recording and STT review

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: record with consent and review transcript. User role: Patient. Key content/components: consent checkbox, waveform/timer, pause/stop, transcript segments, highlighted uncertain phrases, link to visit. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “confirm transcript”. Secondary action: “edit/retry”. Navigation/context: recording workflow. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-15` and related SRS functional module.

### UI-16 — Caregiver invitation and permissions

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: grant only necessary access. User role: Patient. Key content/components: recipient method, caregiver relationship, grouped scope toggles, purpose, expiry, plain-language review. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “send invitation”. Secondary action: “cancel”. Navigation/context: sharing settings. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-16` and related SRS functional module.

### UI-17 — Caregiver multi-patient dashboard

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: switch patients without entering data for the wrong person. User role: Caregiver. Key content/components: large active-patient header/photo initials, patient cards, missed dose alert, upcoming appointments, context switch confirmation. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “open selected patient”. Secondary action: “view alerts”. Navigation/context: caregiver navigation. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-17` and related SRS functional module.

### UI-18 — Consent and access history

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: see who accessed what and revoke safely. User role: Patient. Key content/components: active grants, scope/expiry, access timeline, share link usage, revoked state. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “revoke access”. Secondary action: “download history”. Navigation/context: privacy settings. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-18` and related SRS functional module.

### UI-19 — Report builder and share link

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: select minimum data and create expiring access. User role: Patient. Key content/components: period selector, scope checklist, PDF/link/QR options, expiry, recipient purpose, privacy warning. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “create report/link”. Secondary action: “preview”. Navigation/context: report workflow. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-19` and related SRS functional module.

### UI-20 — SOS confirmation and delivery status

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: request help without accidental activation or false success. User role: Patient. Key content/components: large press-and-hold control, direct emergency call option, selected contacts/location info, after activation show call/message/location status separately. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “hold to start / call now”. Secondary action: “cancel”. Navigation/context: persistent SOS entry. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-20` and related SRS functional module.

### UI-21 — Emergency card and QR

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: show only user-selected emergency information. User role: Patient. Key content/components: name, blood group, allergies, important medicines, emergency contact, QR, privacy toggles and lock-screen preview. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “save visibility”. Secondary action: “hide all”. Navigation/context: emergency profile. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-21` and related SRS functional module.

### UI-22 — Notification center and preferences

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: review reminders and choose privacy/channel. User role: All. Key content/components: today notifications, delivery status, appointment/medication/checklist categories, lock-screen privacy, web-push capability warning. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “enable notification”. Secondary action: “open settings help”. Navigation/context: notification nav. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-22` and related SRS functional module.

### UI-23 — Doctor Lite patient summary

```text
[MASTER STYLE]
Create 1440×1024 desktop web. Objective: review consent-scoped summary efficiently. User role: Clinician. Key content/components: consent banner and expiry, demographics, current medicines, adherence trend, measurements, questions, checklist progress, access purpose. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “add approved note/checklist”. Secondary action: “export permitted summary”. Navigation/context: desktop/tablet sidebar. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-23` and related SRS functional module.

### UI-24 — Offline queue and conflict resolution

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: understand what is saved locally and resolve conflict. User role: Patient/Caregiver. Key content/components: offline banner, queued dose/measurement/checklist items, last synced time, one appointment conflict comparing local/server. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “keep server / review change”. Secondary action: “retry sync”. Navigation/context: sync status. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-24` and related SRS functional module.

### UI-25 — Mobile biometric and permission setup

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: secure the app and explain device permissions. User role: Patient. Key content/components: biometric toggle, secure storage explanation, notification/camera/mic/location permission cards with purpose and status. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “enable selected”. Secondary action: “not now”. Navigation/context: Phase 2 native setup. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-25` and related SRS functional module.

### UI-26 — Health platform/device connection

```text
[MASTER STYLE]
Create 390×844 mobile app screen. Objective: connect HealthKit/Health Connect or approved device with scoped consent. User role: Patient. Key content/components: source cards, data types, import range, permission summary, disconnect control, source and last sync. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “connect”. Secondary action: “learn more”. Navigation/context: Phase 2 integration. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-26` and related SRS functional module.

### UI-27 — Admin operational dashboard

```text
[MASTER STYLE]
Create 1440×1024 desktop web. Objective: monitor service health without exposing unnecessary PHI. User role: Admin. Key content/components: system status, queue age, notification errors, security incidents, feature flags, audit/search by pseudonymous reference, no patient clinical details. State: realistic normal state plus one subtle status indicator where relevant. Primary action: “open incident”. Secondary action: “view metrics”. Navigation/context: desktop admin sidebar. Keep Thai labels concise and consistent with Mo-nut terminology. Follow privacy, consent, human-confirmation and safety constraints.
[NEGATIVE PROMPT]
```

Source: `08-ui-guide.md` page inventory `UI-27` and related SRS functional module.

## 7. State variant prompts

### Loading

```text
[MASTER STYLE] Show the Patient Today dashboard in accessible loading state with skeleton cards, stable layout, screen-reader-friendly status label and no fake health values. [NEGATIVE PROMPT]
```

### Empty

```text
[MASTER STYLE] Show an empty appointment list for a new patient, friendly explanation, one clear “เพิ่มนัดหมาย” action and Quick Capture shortcut; no guilt or alarming imagery. [NEGATIVE PROMPT]
```

### Permission denied

```text
[MASTER STYLE] Show a caregiver attempting to open a section not granted by the patient. Do not reveal hidden data; explain that permission is unavailable and provide “ขอสิทธิ์จากผู้ป่วย” action. [NEGATIVE PROMPT]
```

### Dependency error

```text
[MASTER STYLE] Show OCR provider unavailable after upload, preserving the original file safely, with “ลองอีกครั้ง” and “กรอกข้อมูลเอง” actions and no data loss implication. [NEGATIVE PROMPT]
```

### Offline

```text
[MASTER STYLE] Show offline Patient Today dashboard with cached appointment/medicine, clear last-synced timestamp, queued action badge and no claim that SOS data was sent. [NEGATIVE PROMPT]
```

### Success

```text
[MASTER STYLE] Show a subtle success confirmation after saving a reviewed appointment, including next reminder summary and caregiver notification setting; avoid celebratory clutter. [NEGATIVE PROMPT]
```

## 8. Responsive variants

- Mobile: 390×844, bottom navigation, single column
- Tablet: 1024×1366, list/detail split when useful
- Desktop Doctor Lite/Admin: 1440×1024, side navigation, constrained content width and logical reading order

## 9. Presentation composites

### Two-phase product journey board

```text
[MASTER STYLE] Create a clean 16:9 presentation board comparing Phase 1 Mobile-first PWA and Phase 2 Cross-platform Mobile App. Show the same patient account/data flowing through one API/backend, with Phase 1 browser screens and Phase 2 native notification, biometric and offline capabilities. Use simple architecture arrows, not technical code. [NEGATIVE PROMPT]
```

### Patient-caregiver-clinician ecosystem

```text
[MASTER STYLE] Create a 16:9 ecosystem overview with a fictional elderly patient at the center, caregiver and consent-scoped clinician connected through Mo-nut. Visualize appointment, medication, health trends, reports and SOS, while emphasizing patient-controlled consent. [NEGATIVE PROMPT]
```

### Critical journey storyboard

```text
[MASTER STYLE] Create a six-panel 16:9 storyboard: capture appointment image, review OCR, receive reminder, prepare questions, Doctor Visit Mode, create checklist/next appointment. Consistent device frame and fictional data. [NEGATIVE PROMPT]
```

## 10. Consistency checklist

- [ ] Same fictional patient/facility/medicine across screens
- [ ] Same teal/amber/red semantics and typography scale
- [ ] Same bottom navigation labels and selected states
- [ ] Caregiver always sees active patient context
- [ ] OCR/STT/AI always shows source/review status
- [ ] Consent shows purpose, scope and expiry
- [ ] SOS shows actual per-channel status
- [ ] No diagnosis, medication adjustment or real brand/PII
- [ ] Loading/empty/error/offline/denied states included
- [ ] Thai text corrected in design tool

## 11. Recommended presentation set

1. UI-03 Patient Today dashboard
2. UI-07 OCR review
3. UI-11 Dose response
4. UI-16 Caregiver permission
5. UI-17 Caregiver dashboard
6. UI-08 Doctor Visit Mode
7. UI-20 SOS status
8. UI-23 Doctor Lite summary
9. Two-phase product journey board
