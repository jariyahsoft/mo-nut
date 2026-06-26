'use client';

import { ShellLayout, NavItem, SOSButton } from '../lib/design/shell';
import { Card, Button } from '../lib/design/components';
import { colors, spacing, typography } from '../lib/design/tokens';

export default function HomePage() {
  return (
    <ShellLayout
      topBar={<span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Mo-nut</span>}
      bottomNav={
        <>
          <NavItem icon="🏠" label="วันนี้" active />
          <NavItem icon="📅" label="นัดหมาย" />
          <NavItem icon="💊" label="ยา" />
          <NavItem icon="❤️" label="สุขภาพ" />
          <NavItem icon="👤" label="โปรไฟล์" />
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        <h1 style={{ fontSize: typography['2xl'], margin: 0 }}>Mo-nut PWA</h1>
        <p style={{ color: colors.textSecondary, margin: 0 }}>
          แอปพลิเคชันดูแลสุขภาพ / Health Application
        </p>

        <Card>
          <h2 style={{ margin: 0, fontSize: typography.lg }}>🔗 Routes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], marginTop: spacing[3] }}>
            {[
              { href: '/today', label: 'วันนี้ / Today', icon: '🏠' },
              { href: '/appointments', label: 'นัดหมาย / Appointments', icon: '📅' },
              { href: '/capture', label: 'ถ่ายเอกสาร / Capture', icon: '📷' },
              { href: '/medications', label: 'ยา / Medications', icon: '💊' },
              { href: '/measurements', label: 'สุขภาพ / Health', icon: '❤️' },
              { href: '/visit', label: 'พบแพทย์ / Visit', icon: '🏥' },
              { href: '/caregivers', label: 'ผู้ดูแล / Caregivers', icon: '👤' },
              { href: '/reports', label: 'รายงาน / Reports', icon: '📊' },
              { href: '/sos', label: 'SOS ฉุกเฉิน', icon: '🆘' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[3],
                  padding: spacing[3],
                  background: colors.bgSecondary,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: colors.text,
                  fontWeight: typography.medium,
                  minHeight: '44px',
                }}
              >
                <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: spacing[4] }}>
          <a href="/sos" style={{ textDecoration: 'none' }}>
            <SOSButton />
          </a>
        </div>
      </div>
    </ShellLayout>
  );
}
