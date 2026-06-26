'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, spacing, typography } from '../../../lib/design/tokens';
import { Card, FormField, Input, Button } from '../../../lib/design/components';
import { FirebaseAuthClient } from '../../../lib/auth/firebase-auth';

const auth = new FirebaseAuthClient();

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await auth.registerEmail(email, password, name);
      await auth.bootstrapDomainUser(token);
      setVerificationSent(true);
      // User needs to verify email before proceeding
      router.push('/auth/login?verified=pending');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('อีเมลนี้已经被ใช้แล้ว / Email already registered');
      } else if (err.code === 'auth/weak-password') {
        setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัว / Password too weak (min 6 chars)');
      } else {
        setError(err.message || 'เกิดข้อผิดพลาด / Registration failed');
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
            สมัครสมาชิก / Register
          </p>
        </div>

        {verificationSent && (
          <div role="status" style={{ padding: spacing[3], background: colors.infoBg, borderRadius: '8px', color: colors.info, fontSize: typography.sm, marginBottom: spacing[4] }}>
            ✅ ส่งอีเมลยืนยันแล้ว กรุณาตรวจสอบอีเมลของคุณ / Verification email sent. Please check your inbox.
          </div>
        )}

        {error && (
          <div role="alert" style={{ padding: spacing[3], background: colors.errorBg, borderRadius: '8px', color: colors.error, fontSize: typography.sm, marginBottom: spacing[4] }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          <FormField label="ชื่อ / Display Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="สมชาย ใจดี" />
          </FormField>

          <FormField label="อีเมล / Email" required>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
          </FormField>

          <FormField label="รหัสผ่าน / Password" required>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="อย่างน้อย 6 ตัว" />
          </FormField>

          <Button variant="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? '⏳ กำลังสมัคร...' : 'สมัครสมาชิก / Register'}
          </Button>
        </form>

        <div style={{ marginTop: spacing[4], textAlign: 'center', fontSize: typography.sm }}>
          มีบัญชีแล้ว? / Already have an account?{' '}
          <a href="/auth/login" style={{ color: colors.primary }}>เข้าสู่ระบบ / Sign In</a>
        </div>
      </Card>
    </div>
  );
}
