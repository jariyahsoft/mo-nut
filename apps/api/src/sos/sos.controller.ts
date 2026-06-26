import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { SosService, SosActivationRequest, DeliveryResult } from './sos.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('sos')
@UseGuards(FirebaseAuthGuard)
export class SosController {
  constructor(private sosService: SosService) {}

  /**
   * Activate SOS (idempotent per actor within short window)
   */
  @Post('activate')
  async activate(@Req() req: any, @Body() body: { location?: any }) {
    const event = await this.sosService.activate({
      patientId: body.location?.patientId || req.user.uid,
      initiatedBy: req.user.uid,
      location: body.location,
    });
    return {
      data: {
        event,
        disclaimer: this.sosService.getDisclaimer(),
      },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Record delivery result (success/failure)
   */
  @Post('events/:id/delivery')
  async recordDelivery(@Param('id') id: string, @Body() body: DeliveryResult) {
    await this.sosService.recordDelivery(id, body);
    return { data: { success: true }, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Cancel SOS
   */
  @Post('events/:id/cancel')
  async cancel(@Req() req: any, @Param('id') id: string) {
    const event = await this.sosService.cancel(id, req.user.uid);
    return { data: event, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Resolve SOS
   */
  @Post('events/:id/resolve')
  async resolve(@Req() req: any, @Param('id') id: string) {
    const event = await this.sosService.resolve(id, req.user.uid);
    return { data: event, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Update SOS status
   */
  @Post('events/:id/status')
  async updateStatus(
    @Body() body: { status: 'dispatched' | 'responded'; respondedBy?: string }
  ) {
    const { id } = body as any;
    const event = await this.sosService.updateStatus(
      id,
      body.status,
      undefined,
      body.respondedBy
    );
    return { data: event, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get SOS event
   */
  @Get('events/:id')
  async getEvent(@Param('id') id: string) {
    const event = await this.sosService.findById(id);
    return { data: event, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * List patient SOS events
   */
  @Get('patient/:patientId')
  async listPatient(@Param('patientId') patientId: string) {
    const events = await this.sosService.listPatientEvents(patientId);
    return { data: { events }, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}