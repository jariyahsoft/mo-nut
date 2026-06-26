'use client';

import { useState } from 'react';
import { ShellLayout, NavItem, SOSButton } from '../../lib/design/shell';
import { Card, Button, StatusBadge, FormField, Input } from '../../lib/design/components';
import { colors, spacing, typography, shape } from '../../lib/design/tokens';

export default function SOSPage() {
  const [sosActive, setSosActive] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [contactResults] = useState([
    { name: 'สมชาย เพื่อน', status: 'success' as const },
    { name: 'สายสุนีย์ ลูกสาว', status: 'success' as const },
    { name: 'วิทยา พี่ชาย', status: 'error' as const, error: 'สายไม่ว่าง' },
  ]);

  return (
    <ShellLayout
      topBar={<span style={{ fontWeight: 700 }}>🆘 SOS</span>}
      bottomNav={bottomNav}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {/* Emergency Profile Card */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.lg }}>🆔 บัตรฉุกเฉิน / Emergency Card</h2>
          <div style={{ padding: spacing[3], background: colors.warningBg, borderRadius: '12px' }}>
            <p style={{ margin: 0, fontWeight: typography.bold }}>สมชาย ใจดี</p>
            <p style={{ margin: 0, fontSize: typography.sm }}>กรุ๊ปเลือด: O | แพ้: Penicillin</p>
            <p style={{ margin: 0, fontSize: typography.sm }}>โรคประจำตัว: ความดันโลหิตสูง, เบาหวาน</p>
            <p style={{ margin: `${spacing[1]} 0 0`, fontSize: typography.sm, color: colors.textSecondary }}>
              ผู้ติดต่อฉุกเฉิน: สายสุนีย์ 081-234-5678
            </p>
          </div>
          <Button variant="secondary" size="sm" style={{ marginTop: spacing[2] }}>
            แก้ไข / Edit
          </Button>
        </Card>

        {/* SOS Activation */}
        {!sosActive ? (
          <div style={{ textAlign: 'center', padding: spacing[8] }}>
            <p style={{ fontSize: typography.lg, fontWeight: typography.semibold }}>
              กดปุ่มด้านล่างเพื่อขอความช่วยเหลือ
            </p>
            <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
              Press and hold to activate SOS
            </p>
            <div style={{ marginTop: spacing[4], display: 'inline-block' }}>
              <SOSButton onClick={() => { setSosActive(true); setConfirmed(false); }} />
            </div>
          </div>
        ) : !confirmed ? (
          <Card>
            <h2 style={{ margin: 0, color: colors.danger, fontSize: typography.lg }}>
              🆘 ยืนยันการขอความช่วยเหลือ?
            </h2>
            <p style={{ color: colors.textSecondary, fontSize: typography.sm }}>
              จะแจ้งเตือนผู้ติดต่อฉุกเฉินของคุณ
            </p>
            <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[3] }}>
              <Button variant="secondary" style={{ flex: 1 }} onClick={() => setSosActive(false)}>
                ยกเลิก
              </Button>
              <Button variant="danger" style={{ flex: 1 }} onClick={() => setConfirmed(true)}>
                🆘 ยืนยัน / Confirm
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <Card>
              <h2 style={{ margin: 0, fontSize: typography.lg }}>🆘 กำลังขอความช่วยเหลือ...</h2>
              <StatusBadge status="info" label="SOS Activated" />
            </Card>

            <Card>
              <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>
                📞 ผลการแจ้งเตือน / Notification Results
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
                {contactResults.map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: spacing[2], background: colors.bgSecondary, borderRadius: shape.md }}>
                    <span>{c.name}</span>
                    <StatusBadge
                      status={c.status}
                      label={c.status === 'success' ? 'แจ้งเตือนแล้ว' : `ล้มเหลว: ${c.error}`}
                    />
                  </div>
                ))}
              </div>
              {contactResults.some(c => c.status === 'error') && (
                <div style={{ marginTop: spacing[2], textAlign: 'center' }}>
                  <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
                    ผู้ติดต่อบางรายไม่ได้รับการแจ้งเตือน
                  </p>
                  <a href="tel:1669" style={{
                    display: 'inline-flex', alignItems: 'center', gap: spacing[1],
                    background: colors.danger, color: '#fff', padding: `${spacing[2]} ${spacing[4]}`,
                    borderRadius: shape.md, textDecoration: 'none', fontWeight: typography.semibold,
                    marginTop: spacing[1], minHeight: '44px',
                  }}>
                    📞 โทร 1669 (รถพยาบาล)
                  </a>
                </div>
              )}
            </Card>

            <Button variant="secondary" onClick={() => { setSosActive(false); setConfirmed(false); }}>
              ✅ ปิด / Resolve
            </Button>
          </>
        )}
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
