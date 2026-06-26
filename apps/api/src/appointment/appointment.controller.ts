import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { CaregiverAuthorizationGuard } from '../caregiver/guards/caregiver-authorization.guard';
import { AppointmentStatus, initMetadata, updateMetadata } from '@mo-nut/domain';

@Controller('appointments')
@UseGuards(FirebaseAuthGuard)
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  /**
   * Create new appointment
   */
  @Post()
  async create(@Req() req: any, @Body() body: any) {
    const meta = initMetadata(req.user.uid);
    const appointment = {
      ...meta,
      patientId: body.patientId || req.user.uid,
      facilityId: body.facilityId,
      providerId: body.providerId,
      scheduledAt: body.scheduledAt,
      timezone: body.timezone || 'Asia/Bangkok',
      status: (body.status || 'upcoming') as AppointmentStatus,
      notes: body.notes,
      preparations: body.preparations || [],
      documents: body.documents || [],
      revision: 1,
    };

    const created = await this.appointmentService.create(appointment, req.user.uid);
    return {
      data: created,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * List appointments for a patient (filtered)
   */
  @Get('patient/:patientId')
  @UseGuards(CaregiverAuthorizationGuard)
  async list(
    @Param('patientId') patientId: string,
    @Query('status') status?: AppointmentStatus,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: number
  ) {
    const options: any = {};
    if (status) options.status = status;
    if (from) options.from = from;
    if (to) options.to = to;
    if (limit) options.limit = Number(limit);

    const appointments = await this.appointmentService.listPatientAppointments(patientId, options);

    return {
      data: { appointments },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Get single appointment
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    const appointment = await this.appointmentService.findById(id);
    return {
      data: appointment,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Transition status (reschedule/confirm/complete/cancel)
   */
  @Patch(':id/status')
  async transitionStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { status: AppointmentStatus; note?: string; reason?: string; scheduledAt?: string }
  ) {
    const existing = await this.appointmentService.findById(id);
    if (!existing) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }

    const updated: any = {
      ...existing,
      ...updateMetadata(existing, req.user.uid),
      status: body.status,
      scheduledAt: body.scheduledAt || existing.scheduledAt,
      revision: existing.revision + 1,
    };
    const noteVal = body.note || existing.notes;
    if (noteVal) {
      updated.notes = noteVal;
    }

    const result = await this.appointmentService.update(
      updated as any,
      req.user.uid,
      'status_changed',
      body.reason
    );

    return {
      data: result,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Soft delete appointment
   */
  @Delete(':id')
  @HttpCode(204)
  async softDelete(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body?: { reason?: string }
  ) {
    await this.appointmentService.softDelete(id, req.user.uid, body?.reason);
  }

  /**
   * Get appointment history log
   */
  @Get(':id/history')
  async getHistory(@Param('id') id: string) {
    const history = await this.appointmentService.getHistory(id);
    return {
      data: { history },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
