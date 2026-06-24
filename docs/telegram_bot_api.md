จัดให้แบบละเอียดตั้งแต่ 0 → ใช้งานกับ Codex ได้จริง 👇

---

# 🔧 วิธีสร้าง Telegram Bot แบบละเอียด (Step-by-step)

## 1) สร้าง Bot กับ Telegram

### 👉 เปิด Telegram แล้วค้นหา

```
@BotFather
```

(เป็น bot ทางการของ Telegram)

---

## 2) สร้าง Bot ใหม่

พิมพ์คำสั่ง:

```
/start
```

แล้ว:

```
/newbot
```

ระบบจะถาม 2 อย่าง:

### (1) ชื่อ Bot

```
Codex Notify Bot
```

### (2) Username (ต้องลงท้ายด้วย bot)

```
codex_notify_bot
```

---

## 3) ได้ TOKEN (สำคัญมาก)

คุณจะได้ข้อความแบบนี้:

```
Use this token to access the HTTP API:
123456789:AAHxxxxxxxxxxxxxxxxxxxxx
```

👉 ตรงนี้คือ:

```
TELEGRAM_BOT_TOKEN
```

⚠️ ห้ามให้คนอื่นเด็ดขาด

---

## 4) เปิดใช้งาน Bot

### 👉 ค้นหา bot ของคุณใน Telegram

เช่น:

```
@codex_notify_bot
```

แล้วกด:

```
Start
```

---

## 5) หา chat_id (สำคัญมาก)

### วิธีง่ายสุด

ส่งข้อความอะไรก็ได้ไปที่ bot เช่น:

```
hello
```

แล้วรันคำสั่งนี้ในเครื่อง:

```bash
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates"
```

---

### ผลลัพธ์จะประมาณนี้:

```json
{
  "result": [
    {
      "message": {
        "chat": {
          "id": 123456789,
          "first_name": "YourName"
        },
        "text": "hello"
      }
    }
  ]
}
```

👉 ค่า:

```
123456789
```

คือ:

```
TELEGRAM_CHAT_ID
```

---

# 🧪 6) ทดสอบส่งข้อความ

ลองยิงเองก่อน:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \
-d chat_id="<YOUR_CHAT_ID>" \
-d text="Hello from Codex 🚀"
```

👉 ถ้าถูกต้อง ข้อความจะเด้งเข้า Telegram ทันที

---

# 🔐 7) ตั้งค่า ENV (แนะนำมาก)

## Linux / Ubuntu

```bash
export TELEGRAM_BOT_TOKEN="123456:ABC..."
export TELEGRAM_CHAT_ID="123456789"
```

## Windows PowerShell

```powershell
$env:TELEGRAM_BOT_TOKEN="123456:ABC..."
$env:TELEGRAM_CHAT_ID="123456789"
```

---

# 🤖 8) ใช้กับ Codex (ตัวจริง)

## แบบสั้น (inline)

```bash
codex "run tasks/01" && \
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
-d chat_id="$TELEGRAM_CHAT_ID" \
-d text="✅ Task 01 done"
```

---

## แบบใน Agent Prompt (แนะนำ)

ให้ใส่กฎนี้:

```
หลังจบแต่ละ task ให้ส่ง telegram โดยใช้ curl:

https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage

text:
✅ Completed: <task-name>
```

---

# 🔥 Advanced (แนะนำเพิ่ม)

## ส่งชื่อเครื่อง + เวลา

```bash
MESSAGE="✅ Done: task-01 on $(hostname) at $(date)"

curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
-d chat_id="$TELEGRAM_CHAT_ID" \
-d text="$MESSAGE"
```

---

## ส่ง error

```bash
if [ $? -ne 0 ]; then
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d chat_id="$TELEGRAM_CHAT_ID" \
  -d text="❌ Task failed"
fi
```

---

# 🎯 สรุป

คุณต้องมี 2 ค่า:

```
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

แล้วเรียก API:

```
https://api.telegram.org/bot<TOKEN>/sendMessage
```

จบเลย

---
