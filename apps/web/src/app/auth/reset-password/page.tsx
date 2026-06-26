'use client';

import { useState } from 'react';
import { colors, spacing, typography } from '../../../lib/design/tokens';
import { Card, FormField, Input, Button } from '../../../lib/design/components';
import { FirebaseAuthClient } from '../../../lib/auth/firebase-auth';

const auth = new FirebaseAuthClient();

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.resetPassword(email);
      setSent(true);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setSent(true); // Don't reveal if email exists
      } else {
        setError(err.message || 'Reset failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: colors.bgSecondary, padding: spacing[4],
    }}>
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: spacing[6] }}>
          <h1 style={{ fontSize: typography['2xl'], margin: 0 }}>Mo-nut</h1>
          <p style={{ color: colors.textSecondary, margin: `${spacing[1]} 0 0` }}>
            ตั้งรหัสผ่านใหม่ / Reset Password
          </p>
        </div>

        {sent ? (
          <div role="status" style={{ padding: spacing[4], textAlign: 'center' }}>
            <p style={{ fontWeight: typography.medium }}>
              ✅ ส่งลิงก์ตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณแล้ว
            </p>
            <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
              หากมีอีเมลนี้ในระบบ คุณจะได้รับอีเมลภายในไม่กี่นาที
            </p>
            <a href="/auth/login" style={{ color: colors.primary, display: 'inline-block', marginTop: spacing[4] }}>
              กลับไปหน้าเข้าสู่ระบบ / Back to Sign In
            </a>
          </div>
        ) : (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <p style={{ fontSize: typography.sm, color: colors.textSecondary }}>
              กรอกอีเมลที่ใช้สมัครสมาชิก เราจะส่งลิงก์ตั้งรหัสผ่านใหม่ให้คุณ
            </p>

            {error && (
              <div role="alert" style={{ padding: spacing[3], background: colors.errorBg, borderRadius: '8px', color: colors.error, fontSize: typography.sm }}>
                {error}
              </div>
            )}

            <FormField label="อีเมล / Email" required>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
            </FormField>

            <Button variant="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? '⏳ กำลังส่ง...' : 'ส่งลิงก์ / Send Reset Link'}
            </Button>

            <a href="/auth/login" style={{ textAlign: 'center', color: colors.textTertiary, fontSize: typography.sm }}>
              กลับ / Back to Sign In
            </a>
          </form>
        )}
      </Card>
    </div>
  );
}
