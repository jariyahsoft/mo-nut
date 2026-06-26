import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('consent')
@UseGuards(FirebaseAuthGuard)
export class ConsentController {
  constructor(private consentService: ConsentService) {}

  /**
   * Get required consents for the current user.
   */
  @Get('required')
  async getRequired(@Req() req: any) {
    const consents = await this.consentService.getRequiredConsents(req.user.uid);
    const allAccepted = consents.every((c) => c.accepted);

    return {
      data: { consents, allAccepted },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Accept a specific consent.
   */
  @Post('accept')
  async acceptConsent(
    @Req() req: any,
    @Body() body: { type: string; version: string },
  ) {
    const record = await this.consentService.acceptConsent(
      req.user.uid,
      body.type,
      body.version,
      req.ip,
      req.headers['user-agent'],
    );

    return {
      data: record,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
