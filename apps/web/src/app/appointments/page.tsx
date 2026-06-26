'use client';

import { useState } from 'react';
import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge, EmptyState, Skeleton } from '../../lib/design/components';
import { colors, spacing, typography } from '../../lib/design/tokens';

type ViewType = 'list' | 'detail';

interface Appointment {
  id: string;
  title: string;
  facility: string;
  address: string;
  date: string;
  time: string;
  status: 'upcoming' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  preparation: { label: string; done: boolean }[];
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1', title: 'พบแพทย์อายุรกรรม', facility: 'รพ.ศิริราช', address: 'กรุงเทพฯ',
    date: '2026-06-26', time: '09:30', status: 'confirmed',
    preparation: [
      { label: 'งดน้ำงดอาหาร 8 ชม.', done: true },
      { label: 'นำบัตรประชาชน', done: false },
      { label: 'นำผลตรวจเก่า', done: false },
    ],
  },
  {
    id: '2', title: 'ตรวจเลือด', facility: 'คลินิกพิเศษ', address: 'กรุงเทพฯ',
    date: '2026-06-26', time: '13:00', status: 'upcoming',
    preparation: [
      { label: 'งดอาหาร 12 ชม.', done: false },
    ],
  },
];

export default function AppointmentsPage() {
  const [view, setView] = useState<ViewType>('list');
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [loading] = useState(false);

  if (loading) {
    return (
      <ShellLayout topBar={<span>Mo-nut</span>} bottomNav={bottomNav}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          <Skeleton height="2rem" width="60%" />
          <Skeleton height="6rem" />
          <Skeleton height="6rem" />
        </div>
      </ShellLayout>
    );
  }

  if (view === 'detail' && selected) {
    return (
      <ShellLayout
        topBar={
          <button onClick={() => { setView('list'); setSelected(null); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: typography.base, color: colors.primary, fontFamily: typography.fontFamily }}
          >
            ← กลับ / Back
          </button>
        }
        bottomNav={bottomNav}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          <div>
            <h1 style={{ margin: 0, fontSize: typography['2xl'] }}>{selected.title}</h1>
            <StatusBadge
              status={selected.status === 'confirmed' ? 'success' : selected.status === 'cancelled' ? 'error' : 'info'}
              label={selected.status === 'confirmed' ? 'ยืนยันแล้ว' : selected.status === 'cancelled' ? 'ยกเลิก' : 'กำลังจะมาถึง'}
            />
          </div>

          <Card>
            <p style={{ margin: 0, fontWeight: typography.medium }}>{selected.facility}</p>
            <p style={{ margin: 0, color: colors.textSecondary, fontSize: typography.sm }}>{selected.address}</p>
            <p style={{ margin: `${spacing[1]} 0 0`, fontWeight: typography.semibold }}>
              {new Date(selected.date).toLocaleDateString('th-TH')} · {selected.time}
            </p>
          </Card>

          <Card>
            <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>📋 เตรียมตัว / Preparation</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
              {selected.preparation.map((item, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], cursor: 'pointer', fontSize: typography.base, minHeight: '44px' }}>
                  <input type="checkbox" checked={item.done} readOnly style={{ width: '20px', height: '20px' }} />
                  {item.label}
                </label>
              ))}
            </div>
          </Card>

          {/* Travel Link */}
          <a href={`https://maps.google.com/?q=${encodeURIComponent(selected.facility + ' ' + selected.address)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: spacing[2], color: colors.primary, padding: spacing[3], textDecoration: 'none', fontWeight: typography.medium, minHeight: '44px' }}
          >
            🗺️ เปิดแผนที่ / Open Map
          </a>
        </div>
      </ShellLayout>
    );
  }

  // List view
  return (
    <ShellLayout topBar={<span style={{ fontWeight: 700 }}>📅 นัดหมาย</span>} bottomNav={bottomNav}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {MOCK_APPOINTMENTS.length === 0 ? (
          <EmptyState icon="📅" title="ไม่มีนัดหมาย" description="ไม่มีนัดหมายที่กำลังจะมาถึง / No upcoming appointments" />
        ) : (
          <>
            <h2 style={{ margin: 0, fontSize: typography.lg }}>กำลังจะมาถึง / Upcoming</h2>
            {MOCK_APPOINTMENTS.map((appt) => (
              <Card key={appt.id} onClick={() => { setSelected(appt); setView('detail'); }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: typography.semibold }}>{appt.title}</p>
                    <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>
                      {appt.facility}
                    </p>
                    <p style={{ margin: `${spacing[1]} 0 0`, fontSize: typography.sm }}>
                      {appt.date} · {appt.time}
                    </p>
                  </div>
                  <StatusBadge
                    status={appt.status === 'confirmed' ? 'success' : 'info'}
                    label={appt.status === 'confirmed' ? 'ยืนยัน' : 'รอยืนยัน'}
                  />
                </div>
              </Card>
            ))}

            {/* Past appointments */}
            <h2 style={{ margin: 0, fontSize: typography.lg, color: colors.textTertiary }}>
              ที่ผ่านมา / Past
            </h2>
            <Card>
              <div style={{ textAlign: 'center', padding: spacing[4], color: colors.textTertiary }}>
                ไม่มีประวัติ / No history
              </div>
            </Card>
          </>
        )}
      </div>
    </ShellLayout>
  );
}

const bottomNav = (
  <>
    <NavItem icon="🏠" label="วันนี้" />
    <NavItem icon="📅" label="นัดหมาย" active />
    <NavItem icon="💊" label="ยา" />
    <NavItem icon="❤️" label="สุขภาพ" />
    <NavItem icon="👤" label="โปรไฟล์" />
  </>
);
