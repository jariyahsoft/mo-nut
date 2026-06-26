import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { SttService } from './stt.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('stt')
@UseGuards(FirebaseAuthGuard)
export class SttController {
  constructor(private sttService: SttService) {}

  /**
   * Create STT job for an audio record
   */
  @Post('jobs')
  async createJob(@Req() req: any, @Body() body: { audioRecordId: string; patientId: string; language?: string; glossary?: string[] }) {
    const opts: any = {
      audioRecordId: body.audioRecordId,
      patientId: body.patientId || req.user.uid,
      language: body.language || 'th',
    };
    if (body.glossary !== undefined) opts.glossary = body.glossary;
    const job = await this.sttService.createSttJob(opts);
    return { data: job, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get job status
   */
  @Get('jobs/:id')
  async getJob(@Param('id') id: string) {
    const job = await this.sttService.getJob(id);
    return { data: job, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Get transcript by job
   */
  @Get('jobs/:id/transcript')
  async getTranscript(@Param('id') id: string) {
    const transcript = await this.sttService.getTranscriptByJobId(id);
    return { data: transcript, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Edit transcript
   */
  @Post('transcripts/:id/edit')
  async edit(@Req() req: any, @Param('id') id: string, @Body() body: { text: string }) {
    const transcript = await this.sttService.editTranscript(id, req.user.uid, body.text);
    return { data: transcript, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Confirm transcript
   */
  @Post('transcripts/:id/confirm')
  async confirm(@Req() req: any, @Param('id') id: string) {
    const transcript = await this.sttService.confirmTranscript(id, req.user.uid);
    return { data: transcript, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Create draft from confirmed transcript
   */
  @Post('transcripts/:id/draft')
  async createDraft(@Req() req: any, @Param('id') id: string) {
    const draft = await this.sttService.createDraftFromTranscript(id, req.user.uid);
    return { data: draft, meta: { serverTime: new Date().toISOString() }, error: null };
  }

  /**
   * Retry job
   */
  @Post('jobs/:id/retry')
  async retry(@Param('id') id: string) {
    const job = await this.sttService.retryJob(id);
    return { data: job, meta: { serverTime: new Date().toISOString() }, error: null };
  }
}