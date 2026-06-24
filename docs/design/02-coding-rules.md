# 02 — Coding Rules

**Source:** `mo-nut-SRS-mobile-first-PWA.md` Sections 3, 9–16, 19–22

## General Principles

- โค้ดต้องอ่านง่าย ทดสอบได้ และไม่ผูก domain กับ provider
- ห้าม bypass API contract หรือ authorization เพื่อความเร็วชั่วคราว
- ห้ามเก็บ secret, token หรือข้อมูลผู้ป่วยจริงใน repo/test fixtures
- ทุก assumption ที่มีผลต่อ requirement ต้องบันทึกใน ADR หรือ Open Questions

## TypeScript/NestJS Rules

- เปิด `strict` mode
- ห้ามใช้ `any` ยกเว้น adapter boundary ที่มีเหตุผลและ validate ทันที
- ใช้ immutable domain input เท่าที่ทำได้
- Controllers บาง: validate/map/call use case/map response
- Business logic อยู่ใน Domain/Application ไม่อยู่ใน controller/repository
- Repository interface อยู่ฝั่ง domain/application; implementation อยู่ infrastructure
- External provider ทุกชนิดต้องมี interface และ timeout/retry policy

### Naming

| Type | Convention | Example |
|---|---|---|
| Class | PascalCase | `CreateAppointmentUseCase` |
| Method/variable | camelCase | `patientId` |
| Constant | UPPER_SNAKE_CASE | `MAX_UPLOAD_BYTES` |
| File | kebab-case | `create-appointment.use-case.ts` |
| API JSON field | snake_case ตาม SRS/OpenAPI | `scheduled_start_at` |
| DB collection | snake_case plural | `medication_events` |

## React/Next.js PWA Rules

- เปิด TypeScript `strict`; หลีกเลี่ยง Client Component เมื่อ Server Component หรือ static output เพียงพอ
- Component แสดงผลและ dispatch intent; ห้ามเรียก Firebase/Firestore หรือ `fetch` แบบ ad hoc จาก component
- ใช้ generated OpenAPI client และ runtime validation ที่ trust boundary
- ใช้ Semantic HTML ก่อน ARIA และต้องรองรับ keyboard, visible focus, screen reader และ zoom/font scaling
- ทุก data screen ต้องมี loading, empty, retryable error, offline, permission denied และ expired/revoked state ตามบริบท
- Text ทั้งหมดมาจาก localization resources; ภาษาเริ่มต้น `th-TH`
- Business date/time ใช้ UTC ใน model และแปลง locale/timezone ที่ presentation
- Browser API ทุกตัวต้องทำ capability detection และมี fallback โดยไม่พึ่ง user-agent detection
- Service Worker ห้าม cache response ที่มี PHI โดยอัตโนมัติ และต้องมี version/update/rollback strategy
- IndexedDB record ต้องผูก account/patient context, มี schema version และ clear-on-logout policy

## Folder and Module Boundaries

- ห้าม import infrastructure จาก domain
- Feature หนึ่งห้ามอ่าน local table ของ feature อื่นโดยตรง
- Shared utility ต้อง generic จริง ไม่เป็นที่ทิ้ง business logic
- Circular dependency ถือเป็น build failure

## Type Safety and Validation

- Validate input ทั้ง client และ server; server เป็น authority
- ใช้ enum จาก contract ไม่ใช้ free-form string สำหรับ status
- Numeric health values ต้องมี unit และ range sanity validation
- ห้ามใช้ floating timestamp หรือ local time ที่ไม่มี timezone ใน API
- Parse external provider output เป็น typed internal result ก่อนใช้งาน

## Error Handling

- ใช้ stable error code เช่น `APPOINTMENT_NOT_FOUND`
- ห้ามส่ง stack trace ให้ client
- UI ต้องแสดงข้อความที่เข้าใจง่ายและ action ที่ทำต่อได้
- Retry เฉพาะ transient error; ห้าม retry validation/permission error
- Background job ต้องมี retry count, next attempt และ dead-letter state

## Logging

Log ได้:

- requestId
- internal user/resource ID
- action code
- duration
- provider status/error code

ห้าม log:

- access/refresh token, OTP
- ชื่อเต็มหรือเบอร์โทรโดยไม่จำเป็น
- transcript, diagnosis, medication instruction แบบเต็ม
- raw request body ที่มี PHI

## Configuration and Environment

- Config ต้อง validate ตอน startup
- Secret ใช้ Secret Manager
- `.env` ใช้เฉพาะ local development
- ห้าม hard-code project ID, bucket, API base URL หรือ emergency number
- Feature flags ต้องมี default ที่ปลอดภัย

## API Boundary

- Frontend ใช้ generated API client
- ห้ามสร้าง DTO ซ้ำแบบไม่จำเป็น
- API breaking change ต้องเพิ่ม version หรือ migration window
- ทุก mutation สำคัญรองรับ idempotency และ optimistic concurrency ตามที่ระบุ

## Database Rules

- Domain ID ใช้ UUIDv7/ULID
- ห้ามใช้ Firestore DocumentReference ใน domain
- ห้าม nested subcollection ลึกโดยไม่มี ADR
- ห้ามเก็บ array ที่เติบโตไม่จำกัด
- Medical/audit event ใช้ append-only หรือ soft-delete ตาม policy
- Query ใหม่ต้องระบุ index และคาดการณ์ volume

## Date and Time

- Database/API timestamp เป็น UTC ISO 8601
- เก็บ timezone ของ schedule แยกต่างหาก
- DST-safe แม้ตลาดแรกคือไทย
- งานแจ้งเตือนต้องมี deterministic occurrence ID

## i18n and Content

- ภาษาเริ่มต้น `th-TH`
- หลีกเลี่ยงศัพท์แพทย์ที่ผู้ใช้ทั่วไปไม่เข้าใจ
- Error และ notification ต้องมี localization key
- ห้าม concatenate ประโยคที่ทำให้แปลไม่ได้

## Accessibility

- Touch target ขั้นต่ำประมาณ 44×44 CSS px
- รองรับ font scaling โดย layout ไม่พัง
- ใส่ semantic label ทุก icon-only button
- ห้ามสื่อสถานะด้วยสีอย่างเดียว
- SOS ต้องเด่นแต่ป้องกัน accidental activation
- Contrast และพฤติกรรมโดยรวมต้องเป้าหมาย WCAG 2.2 AA

## PWA and Offline Rules

- Manifest ต้องมี `name`, `short_name`, icons, `theme_color`, `background_color`, `start_url`, `scope` และ `display`
- Cache name ทุกชุดต้อง versioned; App Shell ใช้ Cache First ส่วน API/PHI ใช้ Network First ตาม policy
- Offline mutation ทุกตัวมี `client_mutation_id`, retry metadata และ idempotency behavior ที่ตรงกับ API
- Sync queue ห้าม discard pending item เงียบ ๆ; conflict ต้องแสดงข้อมูล local/server และทางเลือกเมื่อ merge ไม่ปลอดภัย
- File ชั่วคราวต้องตรวจ quota, แจ้ง progress, retry/resume และล้างหลัง sync สำเร็จตาม policy
- Logout, account switch และ permission revocation ต้อง invalidate cache/local data ตามนโยบาย

## Security Coding Checklist

- [ ] Authentication middleware ทำงาน
- [ ] ตรวจ ownership/relationship/scope/consent
- [ ] Validate body/query/path
- [ ] Rate limit endpoint เสี่ยง
- [ ] ป้องกัน IDOR
- [ ] ไม่ log PHI/secret
- [ ] File upload ตรวจ MIME, size และ authorization
- [ ] Share token เก็บแบบ hash
- [ ] Audit privileged access
- [ ] Dependency scan ผ่าน

## Code Review Checklist

- [ ] ตรงกับ user story และ contract
- [ ] ไม่มี duplicated business rule
- [ ] Error code และ edge cases ครบ
- [ ] Unit/integration tests ครบตาม risk
- [ ] Offline behavior ถูกกำหนด
- [ ] Accessibility states ครบ
- [ ] Migration/index impact ถูกพิจารณา
- [ ] Documentation/ADR อัปเดต

## Definition of Done

- Acceptance criteria ผ่าน
- API spec และ generated client sync
- Unit tests และ required integration tests ผ่าน
- Static analysis/lint/format ผ่าน
- Security checklist ผ่าน
- Loading/empty/error/offline states พร้อม
- Analytics/audit events ที่จำเป็นถูกเพิ่ม
- ไม่มี secret หรือ real patient data
- QA verification และ product acceptance ผ่าน
