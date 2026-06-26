'use client';

import { useState } from 'react';
import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge, EmptyState } from '../../lib/design/components';
import { colors, spacing, typography, shape } from '../../lib/design/tokens';

interface Dose {
  time: string;
  status: 'pending' | 'taken' | 'skipped' | 'missed';
}

interface Medication {
  id: string;
  name: string; genericName: string; strength: string; form: string;
  instructions: string; schedule: string; doses: Dose[]; hasPhoto: boolean;
}

const MOCK_MEDS: Medication[] = [
  { id: '1', name: 'Metformin', genericName: 'Metformin HCl', strength: '500mg', form: 'tablet', instructions: 'หลังอาหารเช้า-เย็น', schedule: '08:00, 20:00', hasPhoto: true,
    doses: [{ time: '08:00', status: 'taken' }, { time: '20:00', status: 'pending' }],
  },
  { id: '2', name: 'Amlodipine', genericName: 'Amlodipine', strength: '5mg', form: 'tablet', instructions: 'เช้า', schedule: '07:00', hasPhoto: false,
    doses: [{ time: '07:00', status: 'taken' }],
  },
];

export default function MedicationsPage() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selected, setSelected] = useState<Medication | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  if (view === 'detail' && selected) {
    return (
      <ShellLayout
        topBar={
          <button onClick={() => { setView('list'); setSelected(null); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.primary, fontFamily: typography.fontFamily, fontSize: typography.base }}
          >← กลับ / Back</button>
        }
        bottomNav={bottomNav}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          <div>
            <h1 style={{ margin: 0, fontSize: typography['2xl'] }}>{selected.name} {selected.strength}</h1>
            <p style={{ margin: 0, color: colors.textSecondary }}>{selected.genericName} · {selected.form}</p>
          </div>

          <Card>
            <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>📋 วิธีใช้ / Instructions</h2>
            <p style={{ margin: 0 }}>{selected.instructions}</p>
            <p style={{ margin: `${spacing[1]} 0 0`, fontSize: typography.sm, color: colors.textSecondary }}>เวลา: {selected.schedule}</p>
          </Card>

          <Card>
            <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>💊 รอบวันนี้ / Today&apos;s Doses</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
              {selected.doses.map((dose, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], padding: spacing[2], background: colors.bgSecondary, borderRadius: shape.md }}>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: dose.status === 'taken' ? colors.success : dose.status === 'missed' ? colors.danger : dose.status === 'skipped' ? colors.warning : colors.border,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', flexShrink: 0,
                  }}>
                    {dose.status === 'taken' ? '✓' : dose.status === 'skipped' ? '−' : ''}
                  </span>
                  <span style={{ flex: 1 }}>{dose.time}</span>
                  <StatusBadge
                    status={dose.status === 'taken' ? 'success' : dose.status === 'missed' ? 'error' : dose.status === 'skipped' ? 'warning' : 'neutral'}
                    label={dose.status === 'taken' ? 'กินแล้ว' : dose.status === 'missed' ? 'ไม่ได้รับ' : dose.status === 'skipped' ? 'ข้าม' : 'รอ'}
                  />
                  {dose.status === 'pending' && (
                    <div style={{ display: 'flex', gap: spacing[1] }}>
                      <Button size="sm" variant="primary" disabled={pendingAction === dose.time}
                        onClick={() => setPendingAction(dose.time)}>
                        {pendingAction === dose.time ? '⏳' : 'กินแล้ว'}
                      </Button>
                      <Button size="sm" variant="ghost">ข้าม</Button>
                    </div>
                  )}
                  <div style={{ position: 'relative' }}>
                    <span>⋮</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {!selected.hasPhoto && (
            <Card>
              <StatusBadge status="warning" label="ไม่มีรูปถ่ายยา / No photo" />
              <p style={{ fontSize: typography.sm, color: colors.textSecondary, marginTop: spacing[1] }}>
                ถ่ายรูปยาเพื่อช่วยให้จดจำได้ง่ายขึ้น
              </p>
              <Button variant="secondary" size="sm">📷 ถ่ายรูปยา</Button>
            </Card>
          )}

          <Card>
            <h2 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>📜 ประวัติ / History</h2>
            <p style={{ color: colors.textSecondary, fontSize: typography.sm, margin: 0 }}>
              Schedule changes are preserved; dose events are immutable after action.
            </p>
          </Card>
        </div>
      </ShellLayout>
    );
  }

  return (
    <ShellLayout topBar={<span style={{ fontWeight: 700 }}>💊 ยา / Medications</span>} bottomNav={bottomNav}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {/* Dose summary */}
        <Card>
          <h2 style={{ margin: 0, fontSize: typography.base }}>วันนี้ / Today</h2>
          <p style={{ fontSize: typography['2xl'], fontWeight: typography.bold, margin: 0 }}>
            {MOCK_MEDS.reduce((sum, m) => sum + m.doses.filter(d => d.status === 'taken').length, 0)}
            <span style={{ fontSize: typography.base, fontWeight: typography.normal, color: colors.textSecondary }}>
              {' '}/ {MOCK_MEDS.reduce((sum, m) => sum + m.doses.length, 0)} มื้อ
            </span>
          </p>
        </Card>

        {MOCK_MEDS.length === 0 ? (
          <EmptyState icon="💊" title="ไม่มีรายการยา" description="No medications" />
        ) : (
          MOCK_MEDS.map((med) => (
            <Card key={med.id} onClick={() => { setSelected(med); setView('detail'); }}>
              <div style={{ display: 'flex', gap: spacing[3] }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: shape.md,
                  background: colors.primaryBg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
                }}>
                  {med.hasPhoto ? '💊' : '📦'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: typography.semibold }}>{med.name} {med.strength}</p>
                  <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>
                    {med.instructions}
                  </p>
                  <div style={{ display: 'flex', gap: spacing[1], marginTop: spacing[1] }}>
                    {med.doses.map((d, i) => (
                      <StatusBadge key={i}
                        status={d.status === 'taken' ? 'success' : d.status === 'missed' ? 'error' : d.status === 'skipped' ? 'warning' : 'neutral'}
                        label={d.time}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}

        <Button variant="primary" style={{ width: '100%' }}>➕ เพิ่มยา / Add Medication</Button>
      </div>
    </ShellLayout>
  );
}

const bottomNav = (
  <>
    <NavItem icon="🏠" label="วันนี้" />
    <NavItem icon="📅" label="นัดหมาย" />
    <NavItem icon="💊" label="ยา" active />
    <NavItem icon="❤️" label="สุขภาพ" />
    <NavItem icon="👤" label="โปรไฟล์" />
  </>
);
