import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { DoseService } from './dose.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('doses')
@UseGuards(FirebaseAuthGuard)
export class DoseController {
  constructor(private doseService: DoseService) {}

  /**
   * Record a dose action (Taken, Snooze, Skip, Report issue).
   * Idempotent: same action for same occurrence returns previous result.
   * Correction: changing after final action requires correctionReason.
   */
  @Post('actions')
  async recordAction(
    @Req() req: any,
    @Body() body: { occurrenceId: string; action: string; note?: string; correctionReason?: string }
  ) {
    const opts: any = {
      occurrenceId: body.occurrenceId,
      action: body.action,
      actorId: req.user.uid,
    };
    if (body.note !== undefined) opts.note = body.note;
    if (body.correctionReason !== undefined) opts.correctionReason = body.correctionReason;
    const result = await this.doseService.recordAction(opts);

    return {
      data: result,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
