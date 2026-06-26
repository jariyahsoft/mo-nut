/**
 * Firebase Auth Client — email/password, Google sign-in, phone OTP, session management.
 *
 * Supports feature-flagged Phone OTP (off by default).
 */

import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  User,
  Auth,
  getIdToken,
  updateProfile,
} from 'firebase/auth';

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '__FIREBASE_API_KEY__',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '__FIREBASE_AUTH_DOMAIN__',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '__FIREBASE_PROJECT_ID__',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '__FIREBASE_STORAGE_BUCKET__',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '__FIREBASE_MESSAGING_SENDER_ID__',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '__FIREBASE_APP_ID__',
};

export type AuthProvider = 'email' | 'google' | 'phone';

export interface AuthResult {
  user: User;
  token: string;
  isNewUser: boolean;
}

export class FirebaseAuthClient {
  private app: FirebaseApp;
  private auth: Auth;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  /**
   * Register with email/password
   */
  async registerEmail(email: string, password: string, displayName?: string): Promise<AuthResult> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);

    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }

    // Send verification email
    await sendEmailVerification(credential.user);

    const token = await getIdToken(credential.user);
    return { user: credential.user, token, isNewUser: true };
  }

  /**
   * Sign in with email/password
   */
  async loginEmail(email: string, password: string): Promise<AuthResult> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const token = await getIdToken(credential.user);
    return { user: credential.user, token, isNewUser: false };
  }

  /**
   * Sign in with Google
   */
  async loginGoogle(): Promise<AuthResult> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    const token = await getIdToken(credential.user);
    return { user: credential.user, token, isNewUser: false };
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Send email verification
   */
  async sendVerification(): Promise<void> {
    if (this.auth.currentUser) {
      await sendEmailVerification(this.auth.currentUser);
    }
  }

  /**
   * Sign out
   */
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  /**
   * Get current Firebase ID token
   */
  async getToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (!user) return null;
    return await getIdToken(user, true); // Force refresh
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Listen for auth state changes
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  /**
   * Bootstrap domain user on the API after Firebase auth
   */
  async bootstrapDomainUser(token: string): Promise<any> {
    const response = await fetch('/api/v1/auth/bootstrap', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Domain user bootstrap failed');
    }

    return response.json();
  }

  /**
   * Get current auth status from API
   */
  async checkAuthStatus(token: string): Promise<any> {
    const response = await fetch('/api/v1/auth/status', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Auth check failed');
    }

    return response.json();
  }

  /**
   * Revoke all sessions
   */
  async revokeSessions(token: string): Promise<void> {
    await fetch('/api/v1/auth/revoke-sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
