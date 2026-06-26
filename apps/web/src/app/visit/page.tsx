'use client';

import { useState } from 'react';
import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge, FormField, Input } from '../../lib/design/components';
import { colors, spacing, typography, shape } from '../../lib/design/tokens';

export default function VisitPage() {
  const [recording, setRecording] = useState(false);
  const [recorderSupported] = useState(true);
  const [transcript] = useState('... AI draft will appear here after processing');
  const [transcriptReady] = useState(false);

  return (
    <ShellLayout
      topBar={<span style={{ fontWeight: 700 }}>🏥 พบแพทย์ / Visit</span>}
      bottomNav={bottomNav}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {/* Visit header */}
        <Card>
          <h2 style={{ margin: 0, fontSize: typography.lg }}>🏥 พบแพทย์อายุรกรรม</h2>
          <p style={{ color: colors.textSecondary, fontSize: typography.sm }}>
            รพ.ศิริราช · 26 มิ.ย. 2026 · 09:30 น.
          </p>
          <StatusBadge status="info" label="กำลังดำเนินการ / In Progress" />
        </Card>

        {/* Audio Recording */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>
            🎙️ บันทึกเสียง / Recording
          </h2>
          {recorderSupported ? (
            <div style={{ textAlign: 'center', padding: spacing[4] }}>
              {recording ? (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: spacing[2] }}>🔴</div>
                  <p style={{ fontWeight: typography.semibold }}>กำลังบันทึก / Recording...</p>
                  <Button variant="danger" onClick={() => setRecording(false)}>
                    ⏹️ หยุด / Stop
                  </Button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: spacing[2] }}>🎤</div>
                  <Button variant="primary" onClick={() => setRecording(true)}>
                    🎙️ เริ่มบันทึก / Start Recording
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: spacing[4] }}>
              <StatusBadge status="warning" label="ไม่รองรับการบันทึกเสียง" />
              <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
                Recorder not supported — use text input instead
              </p>
              <Button variant="secondary" size="sm" style={{ marginTop: spacing[2] }}>
                ✍️ ป้อนข้อความ / Type Notes
              </Button>
            </div>
          )}
        </Card>

        {/* Transcript */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>
            📝 ถอดความ / Transcript
          </h2>
          {transcriptReady ? (
            <div>
              <p style={{ margin: 0 }}>{transcript}</p>
              <StatusBadge status="warning" label="AI draft — ตรวจสอบก่อนยืนยัน" />
              <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[2] }}>
                <Button variant="primary" size="sm">ยืนยัน / Confirm</Button>
                <Button variant="ghost" size="sm">แก้ไข / Edit</Button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: spacing[4], color: colors.textTertiary }}>
              {recording ? '⏳ รอการประมวลผล...' : 'บันทึกเสียงเพื่อเริ่มต้น'}
            </div>
          )}
        </Card>

        {/* Checklist */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>
            ✅ เช็คลิสต์ / Checklist
          </h2>
          {['ถามเรื่องยา metformin', 'ตรวจวัดความดัน', 'นัดครั้งต่อไป'].map((item, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], cursor: 'pointer', minHeight: '44px' }}>
              <input type="checkbox" style={{ width: '20px', height: '20px' }} />
              {item}
            </label>
          ))}
          <FormField label="เพิ่มรายการ / Add item">
            <Input placeholder="พิมพ์รายการ..." />
          </FormField>
        </Card>

        {/* Questions */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>
            ❓ คำถามที่ต้องการถาม / Questions for Doctor
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {[
              { q: 'ต้องกิน metformin ต่อเนื่องนานเท่าไหร่?', status: 'unanswered' as const },
              { q: 'มีผลข้างเคียงอะไรที่ต้องระวัง?', status: 'answered' as const, a: 'คลื่นไส้ เวียนหัว' },
            ].map((qa, i) => (
              <div key={i} style={{ padding: spacing[2], background: colors.bgSecondary, borderRadius: shape.md }}>
                <p style={{ margin: 0, fontWeight: typography.medium }}>{qa.q}</p>
                {qa.status === 'answered' && qa.a && (
                  <p style={{ margin: `${spacing[1]} 0 0`, color: colors.primary }}>ตอบ: {qa.a}</p>
                )}
                <StatusBadge status={qa.status === 'answered' ? 'success' : 'warning'} label={qa.status === 'answered' ? 'ตอบแล้ว' : 'รอตอบ'} />
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" style={{ marginTop: spacing[2] }}>
            ➕ เพิ่มคำถาม / Add Question
          </Button>
        </Card>
      </div>
    </ShellLayout>
  );
}

const bottomNav = (
  <>
    <NavItem icon="🏠" label="วันนี้" />
    <NavItem icon="📅" label="นัดหมาย" />
    <NavItem icon="💊" label="ยา" />
    <NavItem icon="❤️" label="สุขภาพ" />
    <NavItem icon="👤" label="โปรไฟล์" />
  </>
);
