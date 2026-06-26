'use client';

import { useState } from 'react';
import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge, EmptyState, FormField, Input } from '../../lib/design/components';
import { colors, spacing, typography, shape } from '../../lib/design/tokens';

type MeasType = 'weight' | 'glucose' | 'blood_pressure' | 'pulse';

const MOCK_MEASUREMENTS = [
  { id: '1', type: 'weight' as MeasType, value: '70.5 kg', date: '26 มิ.ย. 2026', time: '07:30' },
  { id: '2', type: 'glucose' as MeasType, value: '120 mg/dL', date: '26 มิ.ย. 2026', time: '07:30', context: 'fasting' },
  { id: '3', type: 'blood_pressure' as MeasType, value: '120/80 mmHg', date: '25 มิ.ย. 2026', time: '19:00' },
  { id: '4', type: 'weight' as MeasType, value: '71.0 kg', date: '25 มิ.ย. 2026', time: '07:30' },
];

export default function MeasurementsPage() {
  const [filter, setFilter] = useState<MeasType | 'all'>('all');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = filter === 'all' ? MOCK_MEASUREMENTS : MOCK_MEASUREMENTS.filter(m => m.type === filter);

  const measureTypes: { key: MeasType; label: string; icon: string }[] = [
    { key: 'weight', label: 'น้ำหนัก', icon: '⚖️' },
    { key: 'glucose', label: 'น้ำตาล', icon: '🩸' },
    { key: 'blood_pressure', label: 'ความดัน', icon: '❤️' },
    { key: 'pulse', label: 'ชีพจร', icon: '💓' },
  ];

  return (
    <ShellLayout topBar={<span style={{ fontWeight: 700 }}>❤️ สุขภาพ / Health</span>} bottomNav={bottomNav}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {/* Type filter */}
        <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('all')}
            style={filterBtn(filter === 'all')}>ทั้งหมด</button>
          {measureTypes.map(mt => (
            <button key={mt.key} onClick={() => setFilter(mt.key)}
              style={filterBtn(filter === mt.key)}>
              {mt.icon} {mt.label}
            </button>
          ))}
        </div>

        {/* Add button */}
        <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? '✕ ย่อ / Collapse' : '➕ เพิ่มข้อมูล / Add Measurement'}
        </Button>

        {/* Add form */}
        {showAdd && (
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
              <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
                {measureTypes.map(mt => (
                  <label key={mt.key} style={{ display: 'flex', alignItems: 'center', gap: spacing[1], cursor: 'pointer', minHeight: '44px' }}>
                    <input type="radio" name="type" value={mt.key} defaultChecked={mt.key === 'weight'} style={{ width: '20px', height: '20px' }} />
                    {mt.icon} {mt.label}
                  </label>
                ))}
              </div>
              <FormField label="ค่า / Value" required>
                <Input placeholder="เช่น 70.5" />
              </FormField>
              <FormField label="หมายเหตุ / Note">
                <Input placeholder="ก่อนอาหาร / หลังอาหาร" />
              </FormField>
              <Button variant="primary">บันทึก / Save</Button>
            </div>
          </Card>
        )}

        {/* Chart summary (text alternative for accessibility) */}
        <Card>
          <h2 style={{ margin: 0, fontSize: typography.base }}>
            {filter === 'all' ? 'ล่าสุด / Recent' : measureTypes.find(m => m.key === filter)?.label}
          </h2>
          {filter === 'weight' || filter === 'all' ? (
            <div style={{ marginTop: spacing[2], padding: spacing[2], background: colors.bgSecondary, borderRadius: shape.md }}>
              <p style={{ margin: 0, fontSize: typography.sm, fontWeight: typography.medium }}>📊 แนวโน้มน้ำหนัก / Weight Trend</p>
              <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>
                26 มิ.ย.: 70.5 kg | 25 มิ.ย.: 71.0 kg | 24 มิ.ย.: 71.2 kg
              </p>
            </div>
          ) : null}
        </Card>

        {/* Measurement history */}
        <Card>
          <h2 style={{ margin: 0, fontSize: typography.base }}>📋 ประวัติ / History</h2>
          {filtered.length === 0 ? (
            <EmptyState icon="📊" title="ไม่มีข้อมูล" description="No measurements recorded" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], marginTop: spacing[2] }}>
              {filtered.map((m) => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: spacing[2], background: colors.bgSecondary, borderRadius: shape.md }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: typography.medium }}>
                      {measureTypes.find(t => t.key === m.type)?.icon} {m.value}
                    </p>
                    <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>
                      {m.date} {m.time} {m.context ? `· ${m.context}` : ''}
                    </p>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.textTertiary, padding: spacing[1] }}>⋮</button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </ShellLayout>
  );
}

function filterBtn(active: boolean): React.CSSProperties {
  return {
    padding: `${spacing[1]} ${spacing[3]}`,
    borderRadius: '20px',
    border: `1px solid ${active ? colors.primary : colors.border}`,
    background: active ? colors.primary : colors.surface,
    color: active ? '#fff' : colors.text,
    cursor: 'pointer',
    fontFamily: typography.fontFamily,
    fontSize: typography.sm,
    fontWeight: active ? typography.semibold : typography.normal,
    minHeight: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
  };
}

const bottomNav = (
  <>
    <NavItem icon="🏠" label="วันนี้" />
    <NavItem icon="📅" label="นัดหมาย" />
    <NavItem icon="💊" label="ยา" />
    <NavItem icon="❤️" label="สุขภาพ" active />
    <NavItem icon="👤" label="โปรไฟล์" />
  </>
);
