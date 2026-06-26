import { Controller, Post, Get, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Bootstrap a domain user after Firebase authentication.
   * Idempotent — safe to call on every login.
   */
  @Post('bootstrap')
  @UseGuards(FirebaseAuthGuard)
  async bootstrapUser(@Req() req: any) {
    const firebaseUser = req.user;
    const domainUser = await this.authService.resolveDomainUser(
      firebaseUser.uid,
      firebaseUser.email,
    );
    return {
      data: {
        userId: domainUser.userId,
        status: domainUser.status,
        roles: domainUser.roles,
        mfaEnabled: domainUser.mfaEnabled,
        isNewUser: false, // Would be determined by UserRepository
      },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Get current user profile and domain status.
   */
  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  async getMe(@Req() req: any) {
    const firebaseUser = req.user;
    return {
      data: {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        domainUser: firebaseUser.domainUser,
      },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Revoke all sessions (password change, suspicious activity).
   */
  @Post('revoke-sessions')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(200)
  async revokeSessions(@Req() req: any) {
    await this.authService.revokeAllSessions(req.user.uid);
    return {
      data: { success: true },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Check authentication status (used for session validation).
   */
  @Get('status')
  @UseGuards(FirebaseAuthGuard)
  async authStatus(@Req() req: any) {
    return {
      data: {
        authenticated: true,
        userId: req.user.uid,
        status: req.user.domainUser.status,
        mfaRequired: await this.authService.requireMFA(req.user),
      },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
