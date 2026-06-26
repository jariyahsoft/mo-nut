'use client';

import { useState } from 'react';
import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge, EmptyState, FormField, Input } from '../../lib/design/components';
import { colors, spacing, typography, shape } from '../../lib/design/tokens';

interface Caregiver {
  id: string; name: string; role: string; status: 'active' | 'pending' | 'expired' | 'revoked';
  scopes: string[]; expiresAt?: string;
}

export default function CaregiversPage() {
  const [showInvite, setShowInvite] = useState(false);

  const caregivers: Caregiver[] = [
    { id: '1', name: 'สายสุนีย์', role: 'primary', status: 'active', scopes: ['ยา', 'นัดหมาย', 'สุขภาพ'], expiresAt: '2026-12-31' },
    { id: '2', name: 'วิทยา', role: 'viewer', status: 'pending', scopes: ['นัดหมาย'] },
    { id: '3', name: 'สมศรี', role: 'viewer', status: 'revoked', scopes: ['ยา', 'นัดหมาย'] },
  ];

  return (
    <ShellLayout
      topBar={<span style={{ fontWeight: 700 }}>👤 ผู้ดูแล / Caregivers</span>}
      bottomNav={bottomNav}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        <Card>
          <h2 style={{ margin: 0, fontSize: typography.lg }}>👤 ผู้ดูแลของ / Your Caregivers</h2>
          <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
            ผู้ป่วย: สมชาย ใจดี · ผู้ป่วยที่กำลังดู: 1
          </p>
        </Card>

        <Button variant="primary" onClick={() => setShowInvite(!showInvite)}>
          {showInvite ? '✕ ย่อ' : '➕ เชิญผู้ดูแล / Invite Caregiver'}
        </Button>

        {showInvite && (
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
              <FormField label="อีเมล / Email" required>
                <Input placeholder="caregiver@example.com" />
              </FormField>
              <div>
                <p style={{ fontSize: typography.sm, fontWeight: typography.medium, margin: '0 0 spacing[1]' }}>
                  สิทธิ์การเข้าถึง / Permissions
                </p>
                {['ยา', 'นัดหมาย', 'สุขภาพ', 'รายงาน'].map(s => (
                  <label key={s} style={{ display: 'flex', alignItems: 'center', gap: spacing[1], cursor: 'pointer', minHeight: '44px' }}>
                    <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
                    {s}
                  </label>
                ))}
              </div>
              <FormField label="หมดอายุ / Expires">
                <Input type="date" />
              </FormField>
              <Button variant="primary">ส่งคำเชิญ / Send Invite</Button>
            </div>
          </Card>
        )}

        {caregivers.length === 0 ? (
          <EmptyState icon="👤" title="ไม่มีผู้ดูแล" description="No caregivers" />
        ) : (
          caregivers.map((cg) => (
            <Card key={cg.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: typography.semibold }}>
                    {cg.name} {cg.role === 'primary' && <StatusBadge status="info" label="หลัก" />}
                  </p>
                  <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>
                    {cg.scopes.join(', ')}
                  </p>
                  {cg.expiresAt && (
                    <p style={{ margin: `${spacing[1]} 0 0`, fontSize: typography.xs, color: colors.textTertiary }}>
                      หมดอายุ: {cg.expiresAt}
                    </p>
                  )}
                </div>
                <StatusBadge
                  status={cg.status === 'active' ? 'success' : cg.status === 'revoked' || cg.status === 'expired' ? 'error' : 'warning'}
                  label={cg.status === 'active' ? 'กำลังใช้งาน' : cg.status === 'pending' ? 'รอยืนยัน' : cg.status === 'expired' ? 'หมดอายุ' : 'ยกเลิกแล้ว'}
                />
              </div>
              {cg.status === 'active' && (
                <Button variant="ghost" size="sm" style={{ marginTop: spacing[2] }}>
                  🔒 ยกเลิกสิทธิ์ / Revoke Access
                </Button>
              )}
            </Card>
          ))
        )}

        <Card>
          <h2 style={{ margin: 0, fontSize: typography.base }}>📜 ประวัติการเข้าถึง / Access History</h2>
          <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
            บันทึกการเข้าถึงโดยผู้ดูแลทั้งหมด
          </p>
          <Button variant="secondary" size="sm">ดูประวัติ / View History</Button>
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
    <NavItem icon="👤" label="โปรไฟล์" active />
  </>
);
