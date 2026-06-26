import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { CaregiverService } from '../caregiver.service';

/**
 * Central caregiving authorization guard.
 * Checks that the caregiver user has an active relationship with the target patient
 * and has the required scope for the requested operation.
 *
 * Attach metadata with requiredScope using SetMetadata.
 */
@Injectable()
export class CaregiverAuthorizationGuard implements CanActivate {
  constructor(private caregiverService: CaregiverService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const user = request.user;
    const patientId = request.params.patientId || request.body?.patientId;

    // Self-access is always allowed
    if (user.uid === patientId) {
      return true;
    }

    // Get the required scope from route metadata
    const requiredScope = Reflect.getMetadata('requiredScope', context.getHandler()) || 'patient.read';

    const result = await this.caregiverService.checkAuthorization(user.uid, patientId, requiredScope);

    if (!result.authorized) {
      throw new ForbiddenException(result.reason);
    }

    // Attach relationship context to request
    request.caregiverContext = {
      patientId,
      scope: requiredScope,
    };

    return true;
  }
}
