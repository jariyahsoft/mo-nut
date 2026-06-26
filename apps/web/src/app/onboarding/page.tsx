'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, spacing, typography } from '../../lib/design/tokens';
import { Card, Button } from '../../lib/design/components';

interface ConsentItem {
  type: string;
  title: string;
  titleTh: string;
  required: boolean;
  accepted: boolean;
}

const REQUIRED_CONSENTS: ConsentItem[] = [
  {
    type: 'terms',
    title: 'Terms of Service',
    titleTh: 'ข้อกำหนดการใช้บริการ',
    required: true,
    accepted: false,
  },
  {
    type: 'privacy',
    title: 'Privacy Notice',
    titleTh: 'นโยบายความเป็นส่วนตัว',
    required: true,
    accepted: false,
  },
  {
    type: 'health_data',
    title: 'Health Data Consent',
    titleTh: 'ความยินยอมข้อมูลสุขภาพ',
    required: true,
    accepted: false,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [consents, setConsents] = useState<ConsentItem[]>(REQUIRED_CONSENTS);
  const [step, setStep] = useState<'consent' | 'profile'>('consent');

  const toggleConsent = (type: string) => {
    setConsents(consents.map((c) =>
      c.type === type ? { ...c, accepted: !c.accepted } : c
    ));
  };

  const allRequiredAccepted = consents.filter(c => c.required).every(c => c.accepted);

  if (step === 'consent') {
    return (
      <div style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: colors.bgSecondary, padding: spacing[4],
      }}>
        <Card style={{ maxWidth: '480px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: spacing[6] }}>
            <h1 style={{ fontSize: typography['2xl'], margin: 0 }}>ยินดีต้อนรับ / Welcome</h1>
            <p style={{ color: colors.textSecondary, marginTop: spacing[1] }}>
              กรุณายอมรับข้อกำหนดก่อนเริ่มใช้งาน
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            {consents.map((c) => (
              <label
                key={c.type}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing[3],
                  padding: spacing[3],
                  background: c.accepted ? colors.primaryBg : colors.bgSecondary,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: `1px solid ${c.accepted ? colors.primaryLight : colors.border}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={c.accepted}
                  onChange={() => toggleConsent(c.type)}
                  style={{ width: '22px', height: '22px', marginTop: '2px', flexShrink: 0 }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: typography.semibold }}>{c.titleTh}</p>
                  <p style={{ margin: 0, fontSize: typography.sm, color: colors.textSecondary }}>{c.title}</p>
                  <p style={{ fontSize: typography.sm, color: colors.textTertiary, marginTop: spacing[1] }}>
                    {c.type === 'terms' && 'ข้อตกลงในการใช้บริการ Mo-nut'}
                    {c.type === 'privacy' && 'นโยบายการเก็บและใช้ข้อมูลส่วนบุคคล'}
                    {c.type === 'health_data' && 'การยินยอมให้เก็บและใช้ข้อมูลสุขภาพเพื่อการดูแลรักษา'}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <Button
            variant="primary"
            disabled={!allRequiredAccepted}
            style={{ width: '100%', marginTop: spacing[6] }}
            onClick={() => setStep('profile')}
          >
            {allRequiredAccepted ? 'ต่อไป / Continue' : 'กรุณายอมรับข้อกำหนด'}
          </Button>
        </Card>
      </div>
    );
  }

  // Profile setup step
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: colors.bgSecondary, padding: spacing[4],
    }}>
      <Card style={{ maxWidth: '480px', width: '100%' }}>
        <h2 style={{ margin: 0, fontSize: typography.lg }}>ตั้งค่าโปรไฟล์ / Profile Setup</h2>
        <p style={{ color: colors.textSecondary, fontSize: typography.sm, marginTop: spacing[1] }}>
          ข้อมูลพื้นฐานสำหรับการดูแลสุขภาพ
        </p>

        <div style={{ marginTop: spacing[4], display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: spacing[2], cursor: 'pointer', minHeight: '44px' }}>
            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
            <span>โหมดผู้สูงอายุ / Elderly Mode (ข้อความใหญ่ขึ้น)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: spacing[2], cursor: 'pointer', minHeight: '44px' }}>
            <span>ขนาดตัวอักษร / Font Scale:</span>
            <select style={{ padding: spacing[2], border: `1px solid ${colors.border}`, borderRadius: '8px', fontFamily: typography.fontFamily }}>
              <option>ปกติ / Normal</option>
              <option>ใหญ่ / Large</option>
              <option>ใหญ่พิเศษ / Extra Large</option>
            </select>
          </label>
        </div>

        <Button
          variant="primary"
          style={{ width: '100%', marginTop: spacing[6] }}
          onClick={() => router.push('/today')}
        >
          เริ่มใช้งาน / Start
        </Button>
      </Card>
    </div>
  );
}
