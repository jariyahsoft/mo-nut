'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, spacing, typography } from '../../../lib/design/tokens';
import { Card, FormField, Input, Button } from '../../../lib/design/components';
import { FirebaseAuthClient } from '../../../lib/auth/firebase-auth';

const auth = new FirebaseAuthClient();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await auth.loginEmail(email, password);
      await auth.bootstrapDomainUser(token);
      router.push('/today');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง / Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('ลองอีกครั้งในภายหลัง / Too many attempts. Try again later.');
      } else if (err.code === 'auth/user-disabled') {
        setError('บัญชีนี้ถูกระงับ / Account suspended');
      } else {
        setError(err.message || 'เกิดข้อผิดพลาด / Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const { token } = await auth.loginGoogle();
      await auth.bootstrapDomainUser(token);
      router.push('/today');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        // User closed popup — not an error
      } else {
        setError(err.message || 'Google sign-in failed');
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
            เข้าสู่ระบบ / Sign In
          </p>
        </div>

        {error && (
          <div role="alert" style={{ padding: spacing[3], background: colors.errorBg, borderRadius: '8px', color: colors.error, fontSize: typography.sm, marginBottom: spacing[4] }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          <FormField label="อีเมล / Email" required>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
          </FormField>

          <FormField label="รหัสผ่าน / Password" required>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </FormField>

          <Button variant="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? '⏳ กำลังเข้า...' : 'เข้าสู่ระบบ / Sign In'}
          </Button>
        </form>

        <div style={{ marginTop: spacing[4], textAlign: 'center' }}>
          <p style={{ color: colors.textTertiary, fontSize: typography.sm }}>หรือ / Or</p>
          <Button variant="secondary" onClick={handleGoogleLogin} disabled={loading} style={{ width: '100%' }}>
            {loading ? '⏳' : 'G'} เข้าสู่ระบบด้วย Google
          </Button>
        </div>

        <div style={{ marginTop: spacing[4], display: 'flex', flexDirection: 'column', gap: spacing[2], textAlign: 'center', fontSize: typography.sm }}>
          <a href="/auth/register" style={{ color: colors.primary }}>สมัครสมาชิก / Register</a>
          <a href="/auth/reset-password" style={{ color: colors.textTertiary }}>ลืมรหัสผ่าน? / Forgot password?</a>
        </div>
      </Card>
    </div>
  );
}
