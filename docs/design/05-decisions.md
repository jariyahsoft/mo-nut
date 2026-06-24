# 05 — Architecture Decision Records

**Source:** SRS Mo-nut v1.0

## Decision Status Summary

| ADR | Decision | Status |
|---|---|---|
| ADR-001 | Flutter เป็น cross-platform client | Accepted |
| ADR-002 | Firebase เป็น MVP platform | Accepted |
| ADR-003 | API-first และ server-side data access | Accepted |
| ADR-004 | Clean Architecture + Repository Pattern | Accepted |
| ADR-005 | Portable IDs และ top-level collections | Accepted |
| ADR-006 | OpenAPI Contract-first | Accepted |
| ADR-007 | Offline-first สำหรับ workflow สำคัญ | Accepted |
| ADR-008 | AI output ต้องเป็น Draft และยืนยันโดยมนุษย์ | Accepted |
| ADR-009 | Cloud Run vs Functions Gen 2 | Proposed |
| ADR-010 | Riverpod vs Bloc | Proposed |
| ADR-011 | Admin portal framework | Proposed |

## ADR-001: Flutter as Cross-platform Client

Status: Accepted  
Date: 2026-06-23

### Context
ต้องรองรับ Android, iOS, Web/PWA และลดจำนวน codebase

### Decision
ใช้ Flutter/Dart เป็น client หลักสำหรับ Patient และ Caregiver; Doctor Lite ใช้ Flutter Web ได้ในระยะแรก

### Alternatives Considered
- React Native + React Web
- Native Android/iOS แยกกัน

### Consequences
ลด code duplication แต่ต้องทดสอบ web accessibility และ admin data tables เพิ่ม

## ADR-002: Firebase as Initial Platform

Status: Accepted  
Date: 2026-06-23

### Decision
ใช้ Firebase Auth, Firestore, Storage, FCM, App Check, Crashlytics และ Emulator Suite ใน MVP

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

## ADR-010: Flutter State Management

Status: Proposed

### Options
- Riverpod: composable, testable, modern
- Bloc: explicit events/states, team convention ชัด

### Decision Criteria
ประสบการณ์ทีม, offline sync complexity, code generation และ onboarding

## ADR-011: Admin Portal Framework

Status: Proposed

### Options
- Flutter Web: reuse models/design
- Next.js: data tables, admin ecosystem, web accessibility

### Suggested Boundary
Flutter สำหรับ Doctor Lite; Next.js เมื่อ Admin Portal มี complex tables/reporting

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
