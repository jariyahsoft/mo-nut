import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService, FirebaseAuthPayload, DomainUserStatus } from '../auth.service';

/**
 * Firebase Auth Guard — validates Bearer tokens and attaches user context.
 */
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization format');
    }

    const token = parts[1];

    try {
      // Verify Firebase token
      const firebaseUser = await this.authService.verifyToken(token);

      // Check user status (active/suspended)
      const domainUser = await this.authService.checkUserStatus(firebaseUser.uid);

      if (domainUser.status === 'suspended') {
        throw new UnauthorizedException('Account suspended');
      }

      if (domainUser.status === 'pending_verification') {
        throw new UnauthorizedException('Email not verified');
      }

      // Attach user context to request
      request.user = {
        ...firebaseUser,
        domainUser,
      };

      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
