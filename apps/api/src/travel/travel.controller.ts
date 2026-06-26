import { Controller, Post, Get, Patch, Body, Param, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { TravelService, EmergencyProfile } from './travel.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('travel')
@UseGuards(FirebaseAuthGuard)
export class TravelController {
  constructor(private travelService: TravelService) {}

  /**
   * Grant location consent
   */
  @Post('consent')
  async grantConsent(@Req() req: any, @Body() body: { optIn: boolean; method: 'settings' | 'consent_flow' }) {
    const consent = await this.travelService.grantLocationConsent(req.user.uid, body.optIn, body.method);
    return { data: consent, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get consent status
   */
  @Get('consent')
  async getConsent(@Req() req: any) {
    const consent = await this.travelService.getLocationConsent(req.user.uid);
    return { data: consent, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Create travel plan
   */
  @Post('plans')
  async createPlan(@Req() req: any, @Body() body: any) {
    const plan = await this.travelService.createTravelPlan(
      req.user.uid,
      body.destinationFacilityName,
      body.destinationAddress,
      body.appointmentId,
      body.originAddress
    );
    return { data: plan, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get travel plan with map link
   */
  @Get('plans/:id')
  async getPlan(@Param('id') id: string) {
    const plan = await this.travelService.getTravelPlan(id);
    if (!plan) throw new NotFoundException(`Travel plan ${id} not found`);

    const mapLink = this.travelService.generateMapLink(plan);
    return { data: { ...plan, mapLink }, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Update travel status (Traveling / Arrived)
   */
  @Patch('plans/:id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: 'pending' | 'traveling' | 'arrived' }) {
    const plan = await this.travelService.updateTravelStatus(id, body.status);
    return { data: plan, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}

@Controller('emergency-profile')
@UseGuards(FirebaseAuthGuard)
export class EmergencyProfileController {
  constructor(private travelService: TravelService) {}

  /**
   * Upsert Emergency Profile (opt-in for offline use)
   */
  @Post()
  async upsert(@Req() req: any, @Body() body: EmergencyProfile) {
    const profile = await this.travelService.upsertEmergencyProfile({
      ...body,
      patientId: body.patientId || req.user.uid,
    });
    return { data: profile, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get Emergency Profile (with optional QR-safe mode)
   */
  @Get()
  async get(@Req() req: any, @Body() body?: { qrSafeOnly?: boolean }) {
    const profile = await this.travelService.getEmergencyProfile(req.user.uid, body?.qrSafeOnly);
    return { data: profile, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get QR-safe Emergency Profile (for emergency responders)
   */
  @Get('qr-safe')
  async getQrSafe(@Req() req: any) {
    const profile = await this.travelService.getEmergencyProfile(req.user.uid, true);
    return { data: profile, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}