# หมอนัด — Mo-nut

ผู้ช่วยดูแลสุขภาพสำหรับผู้ป่วยโรคเรื้อรัง ผู้ดูแล และบุคลากรทางการแพทย์ พัฒนาเป็น 2 เฟส: **Mobile-first PWA** และ **Cross-platform Mobile App** โดยใช้ Backend/API และข้อมูลชุดเดียวกัน

> **Source of truth:** `mo-nut-SRS-two-phase.md` Version 1.0 (2026-06-24)

## Repository bootstrap

```bash
npx --yes pnpm@11.9.0 install
npx --yes pnpm@11.9.0 api:contract-ci
npx --yes pnpm@11.9.0 lint
npx --yes pnpm@11.9.0 typecheck
npx --yes pnpm@11.9.0 test
npx --yes pnpm@11.9.0 build
```

## Workspace layout

```text
apps/
  web/                  # Phase 1 PWA
  api/                  # NestJS backend
packages/
  contracts/            # Shared contract package placeholder
  generated-client/     # Generated TypeScript API client
infra/                  # Deployment and environment scaffolding
docs/                   # Architecture, design, prompts, and task specs
```

## Contract workflow

```bash
npx --yes pnpm@11.9.0 api:validate
npx --yes pnpm@11.9.0 api:generate
npx --yes pnpm@11.9.0 api:mock
npx --yes pnpm@11.9.0 api:check-generated
npx --yes pnpm@11.9.0 api:check-breaking
npx --yes pnpm@11.9.0 firebase:validate
npx --yes pnpm@11.9.0 firebase:auth:smoke
```

The mock server serves approved OpenAPI examples for local frontend work. The generated client lives in `packages/generated-client/src/generated` and must not be edited by hand; regenerate it with `pnpm api:generate`.

## Firebase workflow

Firebase environment mapping, emulator ports, provider policy, and synthetic seed data live under `infra/firebase/`. Local development is pinned to the demo project `demo-mo-nut-local`, while `development`, `staging`, and `production` remain isolated targets validated by `pnpm firebase:validate`.

## Overview

Mo-nut ช่วยลดการพลาดนัด พลาดยา และการสูญหายของข้อมูลสุขภาพ ด้วยระบบนัดหมาย ตารางยา ข้อมูลสุขภาพ OCR/STT เช็กลิสต์ ผู้ดูแล รายงาน การแชร์แบบมี Consent และ SOS โดยระบบไม่วินิจฉัยโรค ไม่สั่งยา และไม่ใช้แทนบริการฉุกเฉิน

## Delivery phases

| Phase   | Client                                    | เป้าหมาย                                                                                   |
| ------- | ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| Phase 1 | Mobile-first PWA + Responsive Web         | พิสูจน์ Core Journey และ Product–Market Fit                                                |
| Phase 2 | Android/iOS Cross-platform App + PWA เดิม | เพิ่ม Native Notification, Offline-first, Biometric, Secure Storage และ Device Integration |

## Target users

- ผู้ป่วยโรคเรื้อรังและผู้สูงอายุ
- ผู้ดูแลหรือสมาชิกครอบครัว
- แพทย์และบุคลากรทางการแพทย์ในโหมด Doctor Lite
- เจ้าหน้าที่องค์กร ผู้ดูแลระบบ และ Support ที่ได้รับสิทธิ์

## Core modules

Identity & Access, Patient Profile, Appointment, Medication, Health Record, Caregiver & Consent, Document/OCR, Audio/STT, Checklist & Questions, Notification, Map & Travel, SOS, Report & Share, Clinician Access, Dashboard, Offline Sync, CMS, Audit และ Administration
