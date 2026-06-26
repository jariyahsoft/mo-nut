'use client';

import { useState } from 'react';
import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge, FormField, Input } from '../../lib/design/components';
import { colors, spacing, typography } from '../../lib/design/tokens';

export default function ProfilePage() {
  const [showDeletion, setShowDeletion] = useState(false);
  const [exportRequested, setExportRequested] = useState(false);

  return (
    <ShellLayout topBar={<span style={{ fontWeight: 700 }}>👤 โปรไฟล์ / Profile</span>} bottomNav={bottomNav}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {/* Patient Info */}
        <Card>
          <h2 style={{ margin: 0, fontSize: typography.lg }}>สมชาย ใจดี</h2>
          <p style={{ color: colors.textSecondary, fontSize: typography.sm }}>ผู้ป่วย / Patient</p>
          <div style={{ marginTop: spacing[2], display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
            <StatusBadge status="info" label="โรค: ความดันโลหิตสูง, เบาหวาน" />
            <StatusBadge status="warning" label="แพ้: Penicillin" />
          </div>
        </Card>

        {/* Conditions & Allergies */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>🏥 ข้อมูลสุขภาพ / Health Info</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            <FormField label="โรคประจำตัว / Conditions">
              <Input placeholder="เช่น ความดันโลหิตสูง" />
            </FormField>
            <FormField label="การแพ้ยา / Allergies">
              <Input placeholder="เช่น Penicillin" />
            </FormField>
            <FormField label="เบอร์ผู้ป่วย / Patient ID">
              <Input placeholder="HN-12345" />
            </FormField>
            <Button variant="primary" size="sm">บันทึก / Save</Button>
          </div>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>
            📞 ผู้ติดต่อฉุกเฉิน / Emergency Contacts
          </h2>
          <div style={{ padding: spacing[2], background: colors.bgSecondary, borderRadius: shape.md }}>
            <p style={{ margin: 0, fontWeight: typography.medium }}>สายสุนีย์</p>
            <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>บุตรสาว · 081-234-5678</p>
          </div>
          <Button variant="secondary" size="sm" style={{ marginTop: spacing[2] }}>
            ➕ เพิ่มผู้ติดต่อ
          </Button>
        </Card>

        {/* Preferences */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>⚙️ การตั้งค่า / Preferences</h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: spacing[2], cursor: 'pointer', minHeight: '44px' }}>
            <input type="checkbox" style={{ width: '20px', height: '20px' }} />
            โหมดผู้สูงอายุ / Elderly Mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: spacing[2], minHeight: '44px' }}>
            <span>ภาษา / Language:</span>
            <select style={{ padding: spacing[2], border: `1px solid ${colors.border}`, borderRadius: '8px', fontFamily: typography.fontFamily }}>
              <option>ไทย / Thai</option>
              <option>English</option>
            </select>
          </label>
        </Card>

        {/* Data Management */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>📋 จัดการข้อมูล / Data</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            <Button variant="secondary" size="sm" onClick={() => { setExportRequested(true); }}>
              {exportRequested ? '✅ ส่งคำขอแล้ว' : '📥 ขอข้อมูล / Request Data Export'}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeletion(!showDeletion)}
            >
              🗑️ ขอลบบัญชี / Request Deletion
            </Button>
            {showDeletion && (
              <div style={{ padding: spacing[3], background: colors.warningBg, borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: typography.sm }}>
                  การลบบัญชีจะเริ่มต้นกระบวนการตามนโยบายข้อมูลของคุณ
                  ข้อมูลจะไม่ถูกลบทันที — มีระยะเวลาทบทวนก่อนดำเนินการ
                </p>
                <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
                  Account deletion follows our data policy. Data is not purged immediately.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ShellLayout>
  );
}

const shape = { md: '8px' };
const bottomNav = (
  <>
    <NavItem icon="🏠" label="วันนี้" />
    <NavItem icon="📅" label="นัดหมาย" />
    <NavItem icon="💊" label="ยา" />
    <NavItem icon="❤️" label="สุขภาพ" />
    <NavItem icon="👤" label="โปรไฟล์" active />
  </>
);
