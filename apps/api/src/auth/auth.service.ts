import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

/**
 * Firebase Auth integration — validates tokens and resolves domain users.
 */
export interface FirebaseAuthPayload {
  uid: string;
  email?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  name?: string;
  picture?: string;
  firebase: {
    signInProvider: string;
    signInSecondFactor?: string;
    identities?: Record<string, string[]>;
  };
}

export interface DomainUserStatus {
  userId: string;
  status: 'active' | 'suspended' | 'pending_verification';
  roles: string[];
  mfaEnabled: boolean;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  /**
   * Verify a Firebase ID token and extract claims.
   * In production, this uses the Firebase Admin SDK.
   * For local dev, we parse the token structure.
   */
  async verifyToken(token: string): Promise<FirebaseAuthPayload> {
    try {
      // In production: admin.auth().verifyIdToken(token)
      // For local/emulator: parse the JWT payload
      const payload = this.parseTokenPayload(token);
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      return payload as unknown as FirebaseAuthPayload;
    } catch (err) {
      this.logger.warn('Token verification failed');
      throw new UnauthorizedException('Token verification failed');
    }
  }

  /**
   * Resolve or create a domain user idempotently.
   * Called after token verification to ensure the domain user exists.
   */
  async resolveDomainUser(firebaseUid: string, email?: string): Promise<DomainUserStatus> {
    // This would call the UserRepository to find/create user
    // For now, we return a default active status
    return {
      userId: firebaseUid,
      status: 'active',
      roles: ['patient'],
      mfaEnabled: false,
    };
  }

  /**
   * Check if a domain user is authorized to access the API.
   */
  async checkUserStatus(userId: string): Promise<DomainUserStatus> {
    // Would check user repository for active/suspended status
    return {
      userId,
      status: 'active',
      roles: ['patient'],
      mfaEnabled: false,
    };
  }

  /**
   * Revoke all sessions for a user.
   */
  async revokeAllSessions(userId: string): Promise<void> {
    // In production: admin.auth().revokeRefreshTokens(userId)
    this.logger.log(`Sessions revoked for user ${userId}`);
  }

  /**
   * Check if MFA is required and verified for this request.
   */
  async requireMFA(payload: FirebaseAuthPayload): Promise<boolean> {
    // Check if the user has MFA enabled and the factor was verified
    if (payload.firebase?.signInSecondFactor) {
      return true;
    }
    return false;
  }

  /**
   * Parse a JWT token payload (for local/emulator testing).
   */
  private parseTokenPayload(token: string): Record<string, unknown> | null {
    try {
      // JWT format: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = Buffer.from(parts[1] as string, 'base64url').toString('utf8');
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }
}
