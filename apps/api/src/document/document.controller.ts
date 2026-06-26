import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  HttpCode,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { OcrService } from './ocr.service';
import { AppointmentService } from '../appointment/appointment.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { initMetadata } from '@mo-nut/domain';

@Controller('documents')
@UseGuards(FirebaseAuthGuard)
export class DocumentController {
  constructor(
    private documentService: DocumentService,
    private ocrService: OcrService,
    private appointmentService: AppointmentService
  ) {}

  /**
   * Initiate chunked upload session
   */
  @Post('initiate')
  async initiate(@Req() req: any, @Body() body: any) {
    if (!body.filename || !body.mimeType || !body.fileSize || !body.checksum) {
      throw new BadRequestException('Missing required initiate parameters');
    }

    const patientId = body.patientId || req.user.uid;

    const asset = await this.documentService.initiateUpload({
      patientId,
      filename: body.filename,
      mimeType: body.mimeType,
      fileSize: Number(body.fileSize),
      checksum: body.checksum,
      uploadedBy: req.user.uid,
    });

    return {
      data: asset,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Upload single chunk
   */
  @Post(':id/chunks/:index')
  @UseInterceptors(FileInterceptor('chunk'))
  async uploadChunk(
    @Param('id') assetId: string,
    @Param('index') chunkIndex: string,
    @UploadedFile() file: any,
    @Body('checksum') checksum: string
  ) {
    if (!file || !file.buffer || !checksum) {
      throw new BadRequestException('Missing chunk file buffer or checksum');
    }

    const result = await this.documentService.uploadChunk(
      assetId,
      Number(chunkIndex),
      file.buffer,
      checksum
    );

    return {
      data: result,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Complete upload and auto-trigger OCR job
   */
  @Post(':id/complete')
  async complete(
    @Req() req: any,
    @Param('id') assetId: string,
    @Body() body: { totalChunks: number; checksum: string }
  ) {
    if (!body.totalChunks || !body.checksum) {
      throw new BadRequestException('Missing totalChunks or checksum');
    }

    const asset = await this.documentService.completeUpload(
      assetId,
      body.totalChunks,
      body.checksum
    );

    // Auto-create OCR job once upload matches checksum successfully
    const ocrJob = await this.ocrService.createOcrJob(asset.id, asset.patientId);

    return {
      data: { asset, ocrJob },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Get OCR Job status
   */
  @Get('jobs/:jobId')
  async getOcrJob(@Param('jobId') jobId: string) {
    const job = await this.ocrService.getJob(jobId);
    if (!job) throw new NotFoundException(`OCR Job ${jobId} not found`);

    return {
      data: job,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Get extracted draft
   */
  @Get('jobs/:jobId/draft')
  async getDraft(@Param('jobId') jobId: string) {
    const draft = await this.ocrService.getDraftForJob(jobId);
    if (!draft) throw new NotFoundException(`No draft found for job ${jobId}`);

    return {
      data: draft,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Confirm draft and trigger the appointment creation
   */
  @Post('drafts/:draftId/confirm')
  @HttpCode(200)
  async confirmDraft(@Req() req: any, @Param('draftId') draftId: string) {
    const confirmedDraft = await this.ocrService.confirmDraft(draftId, req.user.uid);

    // Create the actual appointment from confirmed draft payload
    const payload = confirmedDraft.payload as any;
    const appointmentMeta = initMetadata(req.user.uid);

    const appointment = {
      ...appointmentMeta,
      patientId: confirmedDraft.patientId,
      facilityId: payload.facility || 'Unknown Facility',
      scheduledAt: payload.scheduledAt || new Date().toISOString(),
      timezone: payload.timezone || 'Asia/Bangkok',
      status: 'upcoming' as const,
      notes: payload.title || 'Extracted Appointment',
      preparations: payload.preparations || [],
      documents: [{
        id: confirmedDraft.id,
        name: 'เอกสารจากการสแกน / Scanned Document',
        mimeType: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
      }],
      revision: 1,
    };

    await this.appointmentService.create(appointment, req.user.uid);

    return {
      data: { draft: confirmedDraft, appointment },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
