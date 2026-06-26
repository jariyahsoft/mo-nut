import { Controller, Post, Get, Body, Param, Req, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { VisitService, RecordingRequest } from './visit.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('visit')
@UseGuards(FirebaseAuthGuard)
export class VisitController {
  constructor(private visitService: VisitService) {}

  /**
   * Start visit mode — returns aggregated context
   */
  @Post(':appointmentId/start')
  async start(@Req() req: any, @Param('appointmentId') appointmentId: string) {
    const context = await this.visitService.startVisit(req.user.uid, appointmentId);
    return { data: context, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Update visit notes (offline-safe)
   */
  @Post(':appointmentId/notes')
  async updateNotes(@Req() req: any, @Param('appointmentId') appointmentId: string, @Body() body: { notes: string }) {
    const context = await this.visitService.updateNotes(appointmentId, body.notes);
    return { data: context, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Start audio recording (consent required)
   */
  @Post('recordings/start')
  async startRecording(@Req() req: any, @Body() body: RecordingRequest) {
    const record = await this.visitService.startRecording({
      ...body,
      consentConfirmedBy: req.user.uid,
    });
    return { data: record, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Update recording duration
   */
  @Post('recordings/:id/duration')
  async updateDuration(@Param('id') id: string, @Body() body: { durationSeconds: number }) {
    const record = await this.visitService.updateRecordingDuration(id, body.durationSeconds);
    return { data: record, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * List patient recordings
   */
  @Get('recordings/patient/:patientId')
  async listPatient(@Param('patientId') patientId: string) {
    const recordings = await this.visitService.listPatientRecordings(patientId);
    return { data: { recordings }, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}