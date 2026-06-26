'use client';

import { ShellLayout, NavItem, SOSButton } from '../lib/design/shell';
import { Button, Card, StatusBadge, FormField, Input, EmptyState } from '../lib/design/components';

export function DesignSystemDemo() {
  return (
    <ShellLayout
      topBar={
        <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Mo-nut</span>
      }
      bottomNav={
        <>
          <NavItem icon="🏠" label="วันนี้" active />
          <NavItem icon="📅" label="นัดหมาย" badge={3} />
          <NavItem icon="💊" label="ยา" />
          <NavItem icon="❤️" label="สุขภาพ" />
          <NavItem icon="👤" label="โปรไฟล์" />
        </>
      }
      sideNav={
        <div style={{ padding: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Mo-nut</h2>
          <NavItem icon="🏠" label="วันนี้" active />
          <NavItem icon="📅" label="นัดหมาย" />
          <NavItem icon="💊" label="ยา" />
          <NavItem icon="❤️" label="สุขภาพ" />
          <NavItem icon="👤" label="โปรไฟล์" />
          <div style={{ marginTop: '2rem' }}>
            <SOSButton />
          </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>สวัสดี / Hello</h1>
        <p style={{ color: '#475569', margin: 0 }}>
          Mo-nut Design System — พร้อมใช้งาน / Ready
        </p>

        {/* Button variants */}
        <Card>
          <h2 style={{ margin: '0 0 0.75rem' }}>Buttons</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Card>

        {/* Status badges */}
        <Card>
          <h2 style={{ margin: '0 0 0.75rem' }}>Status Badges</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <StatusBadge status="success" label="สำเร็จ / Success" />
            <StatusBadge status="warning" label="รอ / Pending" />
            <StatusBadge status="error" label="ผิดพลาด / Error" />
            <StatusBadge status="info" label="ข้อมูล / Info" />
            <StatusBadge status="neutral" label="ปกติ / Normal" />
          </div>
        </Card>

        {/* Form example */}
        <Card>
          <h2 style={{ margin: '0 0 0.75rem' }}>Form</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField label="ชื่อยา / Medication Name" required>
              <Input placeholder="เช่น Metformin 500mg" />
            </FormField>
            <FormField label="ขนาด / Dosage" error="กรุณากรอกขนาดยา">
              <Input placeholder="500 mg" error />
            </FormField>
            <Button variant="primary">บันทึก / Save</Button>
          </div>
        </Card>

        {/* Empty state */}
        <Card>
          <EmptyState
            icon="💊"
            title="ไม่มียาที่กำลังใช้"
            description="เพิ่มยาตัวแรกของคุณโดยกดปุ่มด้านล่าง"
            action={<Button variant="primary">เพิ่มยา / Add Medication</Button>}
          />
        </Card>
      </div>
    </ShellLayout>
  );
}
