# 12 — AI Prompts for UX/UI Presentation Images

**Purpose:** ใช้สร้างภาพ mockup หน้าจอ Mo-nut สำหรับนำเสนอลูกค้า นักลงทุน และทีมออกแบบ  
**Source:** PRD/SRS Mo-nut v1.0 และ [08-ui-guide.md](08-ui-guide.md)

## วิธีใช้

1. ใช้ **Master Style Prompt** ร่วมกับ prompt ของแต่ละหน้า
2. สร้างภาพ mobile ที่อัตราส่วน 9:16 ความละเอียดสูง
3. ใช้ภาพแบบ “flat app screen” สำหรับนำไปวางในสไลด์ หรือระบุ “inside modern smartphone mockup” เมื่อต้องการภาพนำเสนอ
4. โมเดลสร้างภาพอาจสะกดภาษาไทยผิด ควรใช้ข้อความสั้นและแก้ text ใน Figma ภายหลัง
5. สร้างทุกหน้าด้วย seed/style reference เดียวกันเพื่อให้สีและ component สม่ำเสมอ

## Master Style Prompt

```text
ออกแบบหน้าจอแอปสุขภาพมือถือชื่อ “หมอนัด — Mo-nut” สำหรับผู้ป่วยโรคเรื้อรังและผู้สูงอายุ สไตล์ modern healthcare, calm, trustworthy, friendly Thai mobile app, mobile-first, clean white cards on very light warm gray-green background, primary teal #1D7A72, secondary blue #4D7CFE, success green, warning amber, emergency red used only for SOS, Thai-friendly sans-serif typography, large readable text, large rounded buttons, 16px rounded cards, generous spacing, clear icons with text labels, accessible high contrast, no visual clutter, premium polished Figma-quality UI, consistent bottom navigation with วันนี้ นัดหมาย ยา สุขภาพ โปรไฟล์, realistic Thai healthcare content, no hospital brand logo, no copyrighted logos, full screen flat UI, portrait 9:16, high resolution
```

## Negative Prompt

```text
avoid tiny text, avoid dark gloomy hospital style, avoid excessive gradients, avoid neon colors, avoid glassmorphism, avoid clutter, avoid complex medical charts, avoid English-only labels, avoid unrealistic body anatomy, avoid visible personal ID numbers, avoid real patient data, avoid advertisement banners, avoid red as primary color
```

---

# A. Brand and Onboarding

## Screen 01 — Splash Screen

```text
[MASTER STYLE] สร้างหน้า Splash ของแอป “หมอนัด Mo-nut” โลโก้รูปปฏิทินผสมหัวใจและเครื่องหมายเตือนยาแบบเรียบง่าย อยู่กึ่งกลาง หน้าพื้นสีอ่อน มี tagline ภาษาไทย “นัดไม่ลืม ยาไม่พลาด” ด้านล่าง ดูอบอุ่นและน่าเชื่อถือ ไม่มีปุ่มหรือข้อมูลอื่น
```

## Screen 02 — Onboarding Benefits

```text
[MASTER STYLE] หน้า onboarding แบบภาพประกอบ 3 ประโยชน์ในหน้าเดียว: เตือนนัดแพทย์, แสดงรูปยาเมื่อถึงเวลา, แชร์ข้อมูลให้ผู้ดูแล ใช้ illustration คนไทยวัยผู้สูงอายุกับลูกสาวในสไตล์ vector friendly มีหัวข้อ “ดูแลทุกนัด ใส่ใจทุกวัน” ปุ่มใหญ่ “เริ่มใช้งาน” และลิงก์ “เข้าสู่ระบบ”
```

## Screen 03 — Login and Registration

```text
[MASTER STYLE] หน้าเข้าสู่ระบบที่เรียบง่ายสำหรับผู้สูงอายุ มีช่องหมายเลขโทรศัพท์ขนาดใหญ่พร้อมธงไทย ปุ่มหลัก “รับรหัส OTP” ปุ่มรอง “เข้าสู่ระบบด้วย Google” และ “เข้าสู่ระบบด้วย Apple” ข้อความ privacy สั้น อ่านง่าย ไม่มีองค์ประกอบรก
```

## Screen 04 — Patient Profile Setup

```text
[MASTER STYLE] หน้า setup โปรไฟล์ผู้ป่วยแบบ step 1 of 3 มีรูปโปรไฟล์ placeholder, ชื่อ, วันเกิด, โรคประจำตัวเป็น selectable chips เช่น เบาหวาน ความดัน โรคหัวใจ, ตัวเลือกขนาดตัวอักษร “ปกติ / ใหญ่” ปุ่มต่อไปเต็มความกว้าง และ progress indicator ด้านบน
```

---

# B. Patient Core Experience

## Screen 05 — Patient Today Dashboard

```text
[MASTER STYLE] หน้า “วันนี้” ของผู้ป่วย ช่วงเช้า แสดงคำทักทาย “สวัสดีค่ะ คุณสมพร” การ์ดนัดครั้งถัดไปโรงพยาบาลวันที่ 28 มิ.ย. 09:30 พร้อมปุ่มดูรายละเอียด การ์ดยารอบถัดไปพร้อมรูปเม็ดยาเวลา 08:00 และปุ่ม “กินแล้ว” ส่วน checklist วันนี้ 2 จาก 3 งาน การ์ดค่าความดันล่าสุด 128/82 และ floating quick capture button กล้อง/บวก Bottom navigation ครบ SOS icon เล็กแต่เห็นชัดบน header
```

## Screen 06 — Quick Capture Sheet

```text
[MASTER STYLE] หน้า bottom sheet Quick Capture ทับบน dashboard แสดง grid ปุ่มใหญ่ 6 รายการ: ถ่ายใบนัด, ถ่ายรูปยา, บันทึกเสียง, วัดความดัน, จดคำถาม, เพิ่มเช็กลิสต์ แต่ละปุ่มมี icon สีเรียบและข้อความไทยขนาดใหญ่ ใช้มือเดียวได้
```

---

# C. Appointment and Travel

## Screen 07 — Appointment List and Calendar

```text
[MASTER STYLE] หน้า “นัดหมาย” มี toggle รายการ/ปฏิทิน ปฏิทินรายเดือนเน้นวันที่มีนัด ด้านล่างเป็น appointment cards แสดงโรงพยาบาล แผนก วันเวลา สถานะ “ยืนยันแล้ว” และปุ่ม “เปิดแผนที่” มีปุ่มเพิ่มนัดแบบเด่น
```

## Screen 08 — Appointment Detail

```text
[MASTER STYLE] หน้ารายละเอียดนัด: โรงพยาบาลตัวอย่าง แผนกอายุรกรรม วันที่ 28 มิ.ย. 09:30 อาคาร A ชั้น 2 มี timeline การเตรียมตัว เช่น งดอาหาร 8 ชั่วโมง นำผลตรวจและยาเดิมมา มีการ์ดผู้ดูแล “คุณนิดจะพาไป” ปุ่มหลัก “ดูเส้นทาง” ปุ่มรอง “เปิดโหมดไปพบแพทย์”
```

## Screen 09 — Scan Appointment Card Camera

```text
[MASTER STYLE] หน้ากล้องสำหรับสแกนใบนัด มีกรอบถ่ายเอกสารแบบชัดเจน คำแนะนำ “วางใบนัดให้อยู่ในกรอบ” ปุ่ม shutter ขนาดใหญ่ ตัวเลือกแฟลชและเลือกรูปจากคลัง พื้นที่นอกกรอบมืดลงเล็กน้อย แต่ UI ไม่ดูเป็นแอปธนาคาร
```

## Screen 10 — OCR Review

```text
[MASTER STYLE] หน้า “ตรวจสอบข้อมูลใบนัด” แสดง thumbnail ใบนัดด้านบน และ form cards ที่ AI อ่านได้: วันที่ 28 มิ.ย. 2569, เวลา 09:30, โรงพยาบาล, แผนก, ห้องตรวจ แต่ละช่องมี confidence indicator เล็ก ๆ ช่องที่ไม่แน่ใจถูกไฮไลต์สี amber มีข้อความ “กรุณาตรวจสอบก่อนบันทึก” ปุ่มหลัก “ยืนยันและสร้างนัด”
```

## Screen 11 — Travel and Traffic Plan

```text
[MASTER STYLE] หน้าแผนการเดินทางวันนัด แผนที่ครึ่งบนแสดงเส้นทางจากบ้านไปโรงพยาบาล traffic layer สีมาตรฐาน ครึ่งล่างมีการ์ด “นัด 09:30” “ใช้เวลา 55 นาที” “ควรออก 08:10” และ breakdown เดินทาง 40 นาที ลงทะเบียน 10 นาที สำรอง 5 นาที ปุ่มใหญ่ “เริ่มนำทาง” และปุ่ม “แจ้งผู้ดูแลว่ากำลังเดินทาง”
```

---

# D. Medication

## Screen 12 — Medication List

```text
[MASTER STYLE] หน้า “ยา” แสดงยาวันนี้แยก เช้า กลางวัน เย็น แต่ละ medication card มีรูปยา ชื่อ ขนาด จำนวน และเวลา สถานะยาที่กินแล้วเป็น success check สีเขียว ยาที่กำลังจะถึงใช้ teal outline มีปุ่ม “เพิ่มยา” และ summary “วันนี้กินแล้ว 2 จาก 4 รอบ”
```

## Screen 13 — Add Medication

```text
[MASTER STYLE] หน้าเพิ่มยา มีพื้นที่ถ่ายรูปยาและบรรจุภัณฑ์ ช่องชื่อยา ขนาดยา จำนวน เลือกก่อนอาหาร/หลังอาหาร เวลาแบบ chips 08:00 และ 20:00 วันที่เริ่ม ปุ่ม “บันทึกยา” มีข้อความเตือนให้ตรวจข้อมูลจากฉลากหรือเภสัชกร ไม่แสดงคำแนะนำวินิจฉัย
```

## Screen 14 — Medication Detail

```text
[MASTER STYLE] หน้ารายละเอียดยา มีรูปเม็ดยาและแผงยาใหญ่ ชื่อ Metformin 500 mg วิธีใช้ 1 เม็ดหลังอาหารเช้าและเย็น ตารางเวลาวันนี้ จำนวนยาคงเหลือประมาณ 18 เม็ด กราฟ adherence 7 วันแบบเรียบ ปุ่มแก้ไขตารางและ “หยุดยาตามคำสั่งแพทย์” เป็น secondary action พร้อม confirmation concept
```

## Screen 15 — Medication Due Full-screen

```text
[MASTER STYLE] หน้าแจ้งเตือนกินยาเต็มจอสำหรับผู้สูงอายุ เวลา 08:00 รูปยาใหญ่ชัด ชื่อ “Metformin 500 mg” ข้อความ “1 เม็ด หลังอาหารเช้า” ปุ่มหลักสี teal ขนาดใหญ่มาก “กินแล้ว” ปุ่มรอง “เตือนอีก 10 นาที” และ text button “ข้ามยา” มีข้อความ “โปรดตรวจรูปและชื่อยาก่อนรับประทาน” ไม่มีข้อมูลอื่นรบกวน
```

## Screen 16 — Medication Missed Caregiver Alert

```text
[MASTER STYLE] หน้าการแจ้งเตือนผู้ดูแล แสดงการ์ดผู้ป่วย “คุณแม่สมพร” ยังไม่ได้ยืนยันยาเวลา 08:00 เกิน 45 นาที มีรูปยาเล็ก ปุ่ม “โทรหาแม่” “ส่งข้อความ” และ “ดูรายละเอียด” โทนเตือน amber ไม่ใช้สีแดงฉุกเฉิน
```

---

# E. Health Measurements

## Screen 17 — Health Dashboard

```text
[MASTER STYLE] หน้า “สุขภาพ” แสดง cards ค่าล่าสุด ความดัน 128/82 ชีพจร 72 น้ำหนัก 68.4 kg น้ำตาล 112 mg/dL ใช้ mini trend sparklines ที่อ่านง่าย มีข้อความสรุป “ค่าความดันเฉลี่ย 7 วันคงที่” และปุ่มใหญ่ “บันทึกค่าใหม่” ไม่วินิจฉัยโรค
```

## Screen 18 — Record Blood Pressure

```text
[MASTER STYLE] หน้าบันทึกความดัน มี input ตัวเลขขนาดใหญ่ 3 ช่อง: ตัวบน 128 ตัวล่าง 82 ชีพจร 72 เลือกบริบท “วัดที่บ้าน” เวลาอัตโนมัติ เพิ่มหมายเหตุได้ มี illustration วิธีนั่งวัดที่ถูกต้องแบบ minimal ปุ่ม “บันทึก”
```

## Screen 19 — Health Trend Chart

```text
[MASTER STYLE] หน้ากราฟความดัน 30 วัน ใช้ line chart สองเส้นที่ชัดเจนแต่ไม่ซับซ้อน มี legend ตัวบน/ตัวล่าง summary cards ค่าเฉลี่ย สูงสุด ต่ำสุด ตัวเลือก 7 วัน 30 วัน 3 เดือน และ textual insight “มี 3 วันที่อยู่นอกช่วงที่ตั้งไว้” พร้อม action “เตรียมรายงานให้แพทย์”
```

---

# F. Doctor Visit, Questions and Audio

## Screen 20 — Doctor Visit Mode

```text
[MASTER STYLE] หน้า “ไปพบแพทย์วันนี้” เป็น guided checklist มี header นัด 09:30 โรงพยาบาล ด้านล่าง section 1 คำถาม 4 ข้อ section 2 ยาปัจจุบัน section 3 ค่าล่าสุด section 4 เอกสาร มี sticky bottom actions “บันทึกเสียงคำแนะนำ” และ “เพิ่มใบนัดครั้งต่อไป” ดูเป็นโหมดใช้งานจริงในโรงพยาบาลที่รวดเร็ว
```

## Screen 21 — Questions for Doctor

```text
[MASTER STYLE] หน้า “คำถามสำหรับคุณหมอ” แสดงรายการคำถามเรียงความสำคัญ เช่น “เวียนหัวหลังยาเช้า ควรทำอย่างไร” “ควรตรวจเลือดอีกเมื่อไร” แต่ละรายการมี checkbox ถามแล้วและปุ่มบันทึกคำตอบ มีปุ่มเพิ่มคำถามด้วยเสียงหรือข้อความ และ reminder badge “ทบทวนก่อนวันนัด”
```

## Screen 22 — Audio Recording

```text
[MASTER STYLE] หน้าบันทึกเสียงคำแนะนำ มี consent banner “โปรดยืนยันว่าได้รับอนุญาตจากผู้พูดแล้ว” toggle checked, waveform เรียบ, timer 03:42, ปุ่ม pause/stop ขนาดใหญ่, label เชื่อมกับนัดวันนี้ มีข้อความว่าไฟล์จะถูกเก็บอย่างปลอดภัยและสามารถถอดเป็นข้อความได้
```

## Screen 23 — Transcript Review

```text
[MASTER STYLE] หน้า “ตรวจสอบข้อความจากเสียง” แสดง transcript ภาษาไทยแบ่งย่อหน้าพร้อม timestamp มี highlighted action items เช่น “เดิน 30 นาที 4 วันต่อสัปดาห์” และ “นัดอีก 3 เดือน” แถบคำเตือน “AI อาจถอดคำผิด กรุณาตรวจสอบ” ปุ่ม “แก้ไขข้อความ” “สร้างเช็กลิสต์” และ “สร้างนัดครั้งถัดไป”
```

---

# G. Checklist and Progress

## Screen 24 — Doctor Recommendation Checklist

```text
[MASTER STYLE] หน้า “คำแนะนำจากแพทย์” มี weekly checklist cards: เดิน 30 นาที 4 วัน/สัปดาห์, วัดความดันเช้า-เย็น, ลดอาหารเค็ม แสดง progress ring 75% และ day chips จันทร์ถึงอาทิตย์ รายการวันนี้มีปุ่มเช็คขนาดใหญ่ มีข้อความให้กำลังใจอ่อนโยน
```

## Screen 25 — Checklist Detail and Weekly Progress

```text
[MASTER STYLE] หน้ารายละเอียดเป้าหมาย “เดินออกกำลังกาย” เป้าหมาย 30 นาที 4 วันต่อสัปดาห์ แสดง progress 3/4 วัน calendar heatmap เรียบ streak 5 วัน note จากแพทย์ และปุ่ม “ทำแล้ววันนี้” ปุ่มรอง “วันนี้ทำไม่ได้” พร้อมเลือกเหตุผล ไม่มี gamification แบบเด็กเกินไป
```

---

# H. Caregiver and Sharing

## Screen 26 — Caregiver Dashboard

```text
[MASTER STYLE] หน้า dashboard ผู้ดูแล แสดง patient switcher ด้านบน “คุณแม่สมพร” การ์ดสรุป นัดถัดไป 28 มิ.ย., ยาที่ยังไม่ยืนยัน 1 รายการ, checklist วันนี้ 2/3, ความดันล่าสุด มี alert section ที่เรียงตามความสำคัญ ปุ่มโทรและดูรายละเอียด ใช้โทนดูแล ไม่เหมือนระบบเฝ้าระวัง
```

## Screen 27 — Invite Caregiver

```text
[MASTER STYLE] หน้าเชิญผู้ดูแล เลือกเชิญด้วยเบอร์โทร อีเมล QR code หรือลิงก์ มีช่องชื่อความสัมพันธ์ “ลูกสาว” และวันหมดอายุ optional ปุ่ม “กำหนดสิทธิ์ต่อไป” พร้อม privacy explanation สั้น
```

## Screen 28 — Caregiver Permissions

```text
[MASTER STYLE] หน้ากำหนดสิทธิ์ผู้ดูแล แบ่งกลุ่ม นัดหมาย ยา สุขภาพ เอกสาร เสียง รายงาน SOS ใช้ toggles พร้อมคำอธิบาย เช่น “รับแจ้งเตือนเมื่อยังไม่ยืนยันยา” มี preset “ดูอย่างเดียว” “ผู้ดูแลหลัก” และปุ่ม “บันทึกสิทธิ์” ข้อความผู้ป่วยยกเลิกได้ทุกเวลา
```

---

# I. Reports and Sharing

## Screen 29 — Create Health Report

```text
[MASTER STYLE] หน้าสร้างรายงานสุขภาพ เลือกช่วงเวลา 30 วัน มี checkboxes หมวด ยา ความดัน น้ำหนัก น้ำตาล checklist อาการ คำถาม Preview card แสดงหน้าปกรายงานแบบ professional ปุ่ม “สร้างรายงาน PDF” และข้อความว่าใช้สำหรับประกอบการพบแพทย์ ไม่ใช่การวินิจฉัย
```

## Screen 30 — Secure Share Report

```text
[MASTER STYLE] หน้าแชร์รายงานอย่างปลอดภัย มี QR code กลางหน้า ลิงก์ masked วันหมดอายุ 7 วัน ตัวเลือกต้องใช้รหัสผ่าน จำกัดจำนวนครั้งเปิด และปุ่ม “คัดลอกลิงก์” “แชร์” “ยกเลิกลิงก์” มี security badge และข้อความ “คุณควบคุมการเข้าถึงได้”
```

## Screen 31 — Doctor Shared Report View — Desktop

```text
ออกแบบหน้าเว็บ desktop สำหรับแพทย์ของ Mo-nut สไตล์เดียวกับ [MASTER STYLE] แต่เป็น professional clinical portal ขนาด 1440x1024 sidebar ซ้าย หน้าสรุปผู้ป่วยที่แชร์ข้อมูล มี profile summary, allergies banner, current medications table, blood pressure and glucose charts, medication adherence 30 days, checklist progress, prepared questions, access-expiry indicator และ audit notice ใช้ข้อมูลตัวอย่าง ไม่แสดงเลขบัตรหรือข้อมูลจริง สะอาด อ่านเร็ว เหมาะสำหรับนำเสนอคลินิก
```

---

# J. SOS and Emergency

## Screen 32 — SOS Confirmation

```text
[MASTER STYLE] หน้า SOS confirmation เน้นสีแดงเฉพาะปุ่มหลัก มีข้อความใหญ่ “ต้องการขอความช่วยเหลือหรือไม่” เลือกโทรหมายเลขฉุกเฉิน โทรผู้ดูแลหลัก หรือส่งตำแหน่ง มี countdown ยกเลิก 5 วินาที ปุ่มโทรออกชัดเจน ข้อความ “Mo-nut ไม่ใช่ศูนย์บริการฉุกเฉิน” และปุ่มยกเลิกที่เห็นง่าย
```

## Screen 33 — SOS Active

```text
[MASTER STYLE] หน้า SOS กำลังทำงาน มี status “ส่งแจ้งเตือนให้ผู้ดูแลแล้ว” แผนที่ตำแหน่งปัจจุบัน รายชื่อผู้ติดต่อและสถานะรับทราบ ปุ่ม “โทรซ้ำ” “เปิดเสียงขอความช่วยเหลือ” และปุ่มใหญ่ “ฉันปลอดภัยแล้ว” แสดงเวลาที่เริ่มเหตุการณ์ ไม่แสดง animation รุนแรง
```

## Screen 34 — Emergency Profile

```text
[MASTER STYLE] หน้า Emergency Profile ที่อ่านได้เร็ว มีชื่อ รูปเล็ก กรุ๊ปเลือด O+ โรคประจำตัว แพ้ยา ยาสำคัญ ผู้ติดต่อฉุกเฉิน QR code และปุ่มโทร การ์ดแต่ละส่วนมี icon ชัด โหมด offline badge ด้านบน ไม่มีเมนูซับซ้อน
```

---

# K. Settings and Trust

## Screen 35 — Privacy and Consent Center

```text
[MASTER STYLE] หน้า “ความเป็นส่วนตัวและการยินยอม” แสดง cards ผู้ดูแลที่เข้าถึงข้อมูล ลิงก์รายงานที่ยัง active การใช้ OCR/เสียง/AI ตำแหน่ง และประวัติการเข้าถึงล่าสุด มีปุ่มยกเลิกสิทธิ์และดาวน์โหลดข้อมูล ใช้ภาษาง่าย โปร่งใส ไม่เหมือนเอกสารกฎหมายยาว
```

## Screen 36 — Notification Settings

```text
[MASTER STYLE] หน้าตั้งค่าการแจ้งเตือน แบ่ง นัดหมาย ยา checklist caregiver SOS มี toggles เวลาสงบ 21:00–06:00 และตัวเลือก “ซ่อนชื่อยาและข้อมูลสุขภาพบนหน้าจอล็อก” มี status ตรวจว่า notification permission เปิดอยู่หรือไม่
```

---

# L. Investor / Client Presentation Composite Images

## Composite 01 — Patient Journey Board

```text
สร้าง presentation board ขนาด 16:9 สำหรับแอป Mo-nut วาง smartphone mockups 5 เครื่องเรียงเป็น user journey: Today Dashboard, Scan Appointment OCR, Medication Due, Doctor Visit Mode, Health Report ใช้พื้นหลังสว่าง เรียบ premium มีหัวข้อ “จากใบนัด สู่การดูแลต่อเนื่อง” และลูกศรเชื่อม workflow ใช้ UI consistent ตาม [MASTER STYLE] เหมาะสำหรับ pitch deck ลูกค้าและนักลงทุน
```

## Composite 02 — Connected Care Ecosystem

```text
สร้างภาพนำเสนอ 16:9 แสดง ecosystem ของ Mo-nut มี smartphone ผู้ป่วยตรงกลาง, caregiver dashboard ทางซ้าย, doctor portal ทางขวา เชื่อมด้วยเส้นข้อมูลที่ปลอดภัย รอบ ๆ มี icon นัดหมาย ยา ค่าสุขภาพ checklist รายงาน และ SOS ใช้สี teal/blue สะอาด professional ไม่มีภาพโรงพยาบาลจริง มีข้อความไทย “ผู้ป่วย • ผู้ดูแล • บุคลากรทางการแพทย์”
```

## Composite 03 — Elderly-friendly Design

```text
สร้างภาพ pitch 16:9 แสดงผู้สูงอายุชาวไทยกำลังใช้แอป Mo-nut บนสมาร์ตโฟน พร้อม enlarged UI callouts ของปุ่มใหญ่ รูปยา ตัวอักษรใหญ่ และการแจ้งเตือนที่เข้าใจง่าย บรรยากาศบ้านอบอุ่น ลูกสาวผู้ดูแลอยู่ข้าง ๆ สไตล์ realistic commercial healthcare photography ผสม UI overlay ที่คมชัด ไม่มีโลโก้แบรนด์อื่น
```

## Consistency Checklist ก่อนนำเสนอ

- [ ] สี primary และ typography เหมือนกันทุกภาพ
- [ ] Bottom navigation และ icon set เหมือนกัน
- [ ] ชื่อผู้ป่วยตัวอย่างเดียวกันและไม่มีข้อมูลจริง
- [ ] ข้อความภาษาไทยสั้น อ่านชัด
- [ ] ไม่แสดง diagnosis หรือ AI advice ที่เกินขอบเขต
- [ ] SOS ใช้สีแดงเฉพาะ emergency
- [ ] หน้าผู้ดูแลแสดง permission-based care ไม่ใช่ surveillance
- [ ] ใส่ disclaimer ที่เหมาะสมในหน้าสุขภาพ/SOS

## Recommended Presentation Set

สำหรับ Pitch 8–10 หน้า ให้สร้างภาพอย่างน้อย:

1. Composite 02 — Ecosystem
2. Screen 05 — Patient Today Dashboard
3. Screen 10 — OCR Review
4. Screen 15 — Medication Due
5. Screen 20 — Doctor Visit Mode
6. Screen 24 — Checklist
7. Screen 26 — Caregiver Dashboard
8. Screen 11 — Travel Plan
9. Screen 32/33 — SOS
10. Screen 31 — Doctor Shared Report View
