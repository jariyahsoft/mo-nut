'use client';

import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge, Skeleton, EmptyState } from '../../lib/design/components';
import { colors, spacing, typography, shape } from '../../lib/design/tokens';

export default function TodayPage() {
  // Simulated prototype data
  const appointments = [
    { id: '1', title: 'พบแพทย์อายุรกรรม', facility: 'รพ.ศิริราช', time: '09:30', status: 'upcoming' as const },
    { id: '2', title: 'ตรวจเลือด', facility: 'คลินิกพิเศษ', time: '13:00', status: 'confirmed' as const },
  ];

  const medications = [
    { id: '1', name: 'Metformin', dose: '500mg', time: '08:00', taken: true },
    { id: '2', name: 'Metformin', dose: '500mg', time: '20:00', taken: false },
  ];

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
        {/* Header */}
        <div>
          <p style={{ color: colors.textSecondary, margin: 0, fontSize: typography.sm }}>
            วันนี้ / Today
          </p>
          <h1 style={{ margin: 0, fontSize: typography['2xl'] }}>
            สวัสดี / Hello
          </h1>
        </div>

        {/* Quick Capture FAB */}
        <a
          href="/capture"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            background: colors.primary,
            color: colors.textInverse,
            padding: spacing[3],
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: typography.semibold,
            justifyContent: 'center',
            minHeight: '44px',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>📷</span>
          ถ่ายเอกสาร / Capture Document
        </a>

        {/* Appointments Today */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[3]', fontSize: typography.lg }}>
            📅 นัดวันนี้ / Today&apos;s Appointments
          </h2>
          {appointments.length === 0 ? (
            <EmptyState icon="📅" title="ไม่มีนัดวันนี้" description="No appointments today" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: spacing[2],
                    background: colors.bgSecondary,
                    borderRadius: shape.md,
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: typography.semibold }}>{appt.title}</p>
                    <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>
                      {appt.facility} — {appt.time}
                    </p>
                  </div>
                  <StatusBadge
                    status={appt.status === 'confirmed' ? 'success' : 'info'}
                    label={appt.status === 'confirmed' ? 'ยืนยัน' : 'ใกล้ถึงเวลา'}
                  />
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: spacing[2] }}>
            <a href="/appointments" style={{ color: colors.primary, fontSize: typography.sm }}>
              ดูทั้งหมด / View all →
            </a>
          </div>
        </Card>

        {/* Medications Today */}
        <Card>
          <h2 style={{ margin: '0 0 spacing[3]', fontSize: typography.lg }}>
            💊 ยาวันนี้ / Today&apos;s Medications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {medications.map((med) => (
              <div
                key={med.id + med.time}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  padding: spacing[2],
                  background: med.taken ? colors.successBg : colors.bgSecondary,
                  borderRadius: shape.md,
                }}
              >
                <span
                  aria-label={med.taken ? 'Taken' : 'Not taken'}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: med.taken ? colors.success : colors.border,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.75rem',
                  }}
                >
                  {med.taken ? '✓' : ''}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: typography.medium }}>{med.name} {med.dose}</p>
                  <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>
                    {med.time}
                  </p>
                </div>
                {!med.taken && (
                  <Button variant="primary" size="sm">กินแล้ว</Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Sync Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            padding: spacing[2],
            fontSize: typography.sm,
            color: colors.textTertiary,
          }}
        >
          <span aria-hidden="true">🔄</span>
          ซิงค์ล่าสุด / Last synced: เมื่อสักครู่ / Just now
        </div>
      </div>
    </ShellLayout>
  );
}
