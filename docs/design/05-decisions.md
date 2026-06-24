# 05 — Architecture Decision Records

**Source:** `mo-nut-SRS-mobile-first-PWA.md` v1.0 (24 มิถุนายน 2026)

## Decision Status Summary

| ADR | Decision | Status |
|---|---|---|
| ADR-001 | Mobile-first Web PWA เป็น MVP client | Accepted |
| ADR-002 | Firebase เป็น MVP platform | Accepted |
| ADR-003 | API-first และ server-side data access | Accepted |
| ADR-004 | Clean Architecture + Repository Pattern | Accepted |
| ADR-005 | Portable IDs และ top-level collections | Accepted |
| ADR-006 | OpenAPI Contract-first | Accepted |
| ADR-007 | Offline-first สำหรับ workflow สำคัญ | Accepted |
| ADR-008 | AI output ต้องเป็น Draft และยืนยันโดยมนุษย์ | Accepted |
| ADR-009 | Cloud Run vs Functions Gen 2 | Proposed |
| ADR-010 | IndexedDB + Service Worker สำหรับ offline-aware PWA | Accepted |
| ADR-011 | Doctor Lite/Admin เป็น Web modules แยก role | Accepted |

## ADR-001: Mobile-first Web PWA as MVP Client

Status: Accepted  
Date: 2026-06-24

### Context
MVP ต้องเข้าถึงได้จาก Smartphone Browser ติดตั้งบน Home Screen ได้เมื่อรองรับ และทดสอบความเหมาะสมก่อนลงทุน Native App

### Decision
ใช้ TypeScript + React/Next.js หรือ Framework เทียบเท่าเพื่อสร้าง Responsive Mobile-first PWA โดยใช้ Web App Manifest, Service Worker และ IndexedDB

### Alternatives Considered
- Flutter Web/cross-platform
- React Native หรือ Native Android/iOS
- Web responsive ที่ไม่รองรับ PWA/offline

### Consequences
Deploy ได้เร็วและไม่ต้องผ่าน App Store แต่ต้องออกแบบ fallback สำหรับ Web Push, Camera, Microphone, Geolocation, Web Share และ Background Sync ที่ต่างกันตาม Browser

## ADR-002: Firebase as Initial Platform

Status: Accepted  
Date: 2026-06-24

### Decision
ใช้ Firebase Auth, Firestore, Storage, FCM Web Push, App Check, Cloud Logging/Error Reporting และ Emulator Suite ใน MVP

### Consequences
เริ่มได้เร็ว แต่ต้องป้องกัน vendor lock-in ด้วย architecture ที่กำหนด

## ADR-003: API-first and No Direct PHI Writes from Client

Status: Accepted

### Decision
ข้อมูลสุขภาพหลักเขียนผ่าน Backend API เท่านั้น Client direct Firestore access อนุญาตเฉพาะ use case ที่ผ่าน security review

### Consequences
Authorization และ audit สม่ำเสมอ แต่เพิ่ม backend cost/latency

## ADR-004: Clean Architecture and Repository Pattern

Status: Accepted

### Decision
Domain/Application ไม่ import Firebase SDK; database/provider ใช้ interfaces และ adapters

### Consequences
เพิ่ม boilerplate แต่ย้าย database และทดสอบง่าย

## ADR-005: Portable IDs and Top-level Collections

Status: Accepted

### Decision
ใช้ UUIDv7/ULID, string foreign IDs, top-level collections, schemaVersion และ version fields

### Rejected Alternative
ใช้ Firestore auto ID และ DocumentReference เป็น domain relation

## ADR-006: OpenAPI Contract-first

Status: Accepted

### Decision
กำหนด OpenAPI, examples และ stable errors ก่อน Frontend/Backend implementation ใช้ generated client และ mock server

### Consequences
เพิ่มขั้นตอน design แต่ลด integration rework

## ADR-007: Offline-first Critical Workflows

Status: Accepted

### Decision
นัด ยา medication event ค่าสุขภาพ checklist questions และ emergency profile ต้องใช้งานพื้นฐานได้ Offline

### Consequences
ต้องมี local DB, pending operations, conflict policy และ idempotency

## ADR-008: Human Confirmation for AI/OCR/STT

Status: Accepted

### Decision
ผล OCR/STT/AI summary/checklist เป็น Draft จนผู้ใช้ยืนยัน ห้ามแก้ยา/นัดสำคัญอัตโนมัติ

### Consequences
ปลอดภัยขึ้นแต่มี interaction เพิ่ม

## ADR-009: Backend Runtime

Status: Proposed

### Context
Cloud Run เหมาะกับ long-running API/containers; Functions Gen 2 integration ง่าย

### Options
1. Cloud Run สำหรับ API + Functions/Scheduler สำหรับ event jobs
2. Functions Gen 2 ทั้งหมด

### Recommendation to Confirm
Hybrid: Cloud Run สำหรับ API และ workers ที่ควบคุม runtime; Scheduler/Tasks สำหรับ triggers

## ADR-010: IndexedDB and Service Worker for Offline-aware PWA

Status: Accepted
Date: 2026-06-24

### Decision
ใช้ IndexedDB สำหรับ cache/sync queue และ Service Worker สำหรับ versioned App Shell/offline fallback โดยไม่พึ่ง Background Sync เพียงช่องทางเดียว ทุก mutation มี `client_mutation_id` และ sync ผ่าน API

### Consequences
รองรับงานหลักเมื่อเครือข่ายขาดหาย แต่ต้องมี quota handling, cache privacy, account isolation, conflict UI, manual sync และ service-worker update strategy

## ADR-011: Doctor Lite and Admin as Role-separated Web Modules

Status: Accepted
Date: 2026-06-24

### Decision
Doctor Lite และ Admin ใช้ Web routes/modules ที่แยก authorization และ layout จาก Patient/Caregiver PWA; สามารถแยก deployment ภายหลังโดยยังใช้ OpenAPI และ design system ร่วมกัน

### Consequences
MVP ไม่สร้าง Full Doctor Portal แต่ไม่ปิดทางแยก application เมื่อ data table, compliance หรือ release cadence ซับซ้อนขึ้น

## ADR Template

```md
## ADR-XXX: Title

Status: Proposed | Accepted | Superseded | Rejected
Date: YYYY-MM-DD

### Context
### Decision
### Alternatives Considered
### Consequences
### Follow-up
```
