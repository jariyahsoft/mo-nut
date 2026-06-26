'use client';

import { useState } from 'react';
import { ShellLayout, NavItem } from '../../lib/design/shell';
import { Card, Button, StatusBadge } from '../../lib/design/components';
import { colors, spacing, typography } from '../../lib/design/tokens';

type CaptureStep = 'select' | 'preview' | 'review';

export default function CapturePage() {
  const [step, setStep] = useState<CaptureStep>('select');
  const [image, setImage] = useState<string | null>(null);
  const [ocrConfidence] = useState(0);
  const [showCameraFallback] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setStep('preview');
    }
  };

  return (
    <ShellLayout
      topBar={
        step !== 'select' ? (
          <button onClick={() => setStep('select')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.primary, fontFamily: typography.fontFamily, fontSize: typography.base }}
          >
            ← กลับ / Back
          </button>
        ) : <span style={{ fontWeight: 700 }}>📷 ถ่ายเอกสาร</span>
      }
      bottomNav={
        <>
          <NavItem icon="🏠" label="วันนี้" />
          <NavItem icon="📅" label="นัดหมาย" />
          <NavItem icon="💊" label="ยา" />
          <NavItem icon="❤️" label="สุขภาพ" />
          <NavItem icon="👤" label="โปรไฟล์" />
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {/* Step 1: Select source */}
        {step === 'select' && (
          <>
            <Card>
              <h2 style={{ margin: 0, fontSize: typography.lg }}>📷 ถ่ายรูป / Take Photo</h2>
              <p style={{ color: colors.textSecondary, fontSize: typography.sm }}>
                ใช้กล้องถ่ายรูปใบสั่งยาหรือเอกสาร
              </p>
              <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[3] }}>
                <label style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[2],
                  padding: spacing[6], border: `2px dashed ${colors.border}`, borderRadius: '12px',
                  cursor: 'pointer', minHeight: '120px', justifyContent: 'center',
                }}>
                  <input type="file" accept="image/*" capture="environment"
                    onChange={handleFileSelect} style={{ display: 'none' }} />
                  <span aria-hidden="true" style={{ fontSize: '2rem' }}>📸</span>
                  <span style={{ fontWeight: typography.medium }}>ถ่ายรูป</span>
                  <span style={{ fontSize: typography.sm, color: colors.textTertiary }}>Take Photo</span>
                </label>

                <label style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[2],
                  padding: spacing[6], border: `2px dashed ${colors.border}`, borderRadius: '12px',
                  cursor: 'pointer', minHeight: '120px', justifyContent: 'center',
                }}>
                  <input type="file" accept="image/*"
                    onChange={handleFileSelect} style={{ display: 'none' }} />
                  <span aria-hidden="true" style={{ fontSize: '2rem' }}>🖼️</span>
                  <span style={{ fontWeight: typography.medium }}>เลือกรูป</span>
                  <span style={{ fontSize: typography.sm, color: colors.textTertiary }}>Choose File</span>
                </label>
              </div>
            </Card>

            {showCameraFallback && (
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0 }}>📵</p>
                  <p>กล้องไม่พร้อมใช้งาน / Camera unavailable</p>
                  <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
                    กรุณาเลือกรูปจากแกลเลอรีแทน / Please select from gallery instead
                  </p>
                </div>
              </Card>
            )}

            <Card>
              <h2 style={{ margin: 0, fontSize: typography.lg }}>✍️ ป้อนด้วยตนเอง / Manual Entry</h2>
              <p style={{ color: colors.textSecondary, fontSize: typography.sm }}>
                กรอกข้อมูลยาหรือเอกสารด้วยตนเอง
              </p>
              <Button variant="secondary" style={{ marginTop: spacing[2], width: '100%' }}>
                ป้อนข้อมูล / Enter Data
              </Button>
            </Card>
          </>
        )}

        {/* Step 2: Preview */}
        {step === 'preview' && image && (
          <Card>
            <img src={image} alt="Preview" style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'contain' }} />
            <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[3] }}>
              <Button variant="secondary" style={{ flex: 1 }} onClick={() => { setStep('select'); setImage(null); }}>
                ถ่ายใหม่ / Retake
              </Button>
              <Button variant="primary" style={{ flex: 1 }} onClick={() => setStep('review')}>
                ใช้รูปนี้ / Use Photo
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: OCR Review */}
        {step === 'review' && (
          <>
            <Card>
              <h2 style={{ margin: 0, fontSize: typography.lg }}>
                ✍️ ทบทวนข้อมูล / Review Data
              </h2>
              {ocrConfidence > 0 && (
                <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
                  ความมั่นใจ: {Math.round(ocrConfidence * 100)}%
                </p>
              )}
            </Card>

            <Card>
              <StatusBadge status="warning" label="🔍 ตรวจสอบก่อนยืนยัน / Review before confirming" />
              <div style={{ marginTop: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
                <div>
                  <p style={{ fontSize: typography.sm, fontWeight: typography.medium, margin: 0 }}>ชื่อยา / Name</p>
                  <p style={{ margin: 0 }}>Metformin</p>
                </div>
                <div>
                  <p style={{ fontSize: typography.sm, fontWeight: typography.medium, margin: 0 }}>ขนาด / Dose</p>
                  <p style={{ margin: 0 }}>500 mg</p>
                </div>
                <div>
                  <p style={{ fontSize: typography.sm, fontWeight: typography.medium, margin: 0 }}>วิธีใช้ / Instructions</p>
                  <p style={{ margin: 0 }}>วันละ 2 เวลา เช้า-เย็น</p>
                </div>
              </div>

              <Button variant="danger" size="sm" style={{ marginTop: spacing[2] }}>
                ⚠️ ไม่ถูกต้อง / Incorrect
              </Button>
            </Card>

            <Card>
              <h3 style={{ margin: '0 0 spacing[2]', fontSize: typography.base }}>
                ต้นฉบับ / Original
              </h3>
              {image && <img src={image} alt="Original" style={{ width: '100%', borderRadius: '8px', maxHeight: '200px', objectFit: 'contain' }} />}
            </Card>

            <Button variant="primary" style={{ width: '100%' }}>
              ✅ ยืนยัน / Confirm
            </Button>
          </>
        )}
      </div>
    </ShellLayout>
  );
}
