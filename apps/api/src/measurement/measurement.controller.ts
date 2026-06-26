import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { CaregiverAuthorizationGuard } from '../caregiver/guards/caregiver-authorization.guard';
import { HealthMeasurement, MeasurementType } from '@mo-nut/domain';

@Controller('measurements')
@UseGuards(FirebaseAuthGuard)
export class MeasurementController {
  constructor(private measurementService: MeasurementService) {}

  /**
   * Create measurement with validation
   */
  @Post()
  async create(@Req() req: any, @Body() body: any) {
    const measurement: HealthMeasurement = {
      ...body,
      patientId: body.patientId || req.user.uid,
      timezone: body.timezone || 'Asia/Bangkok',
      source: body.source || { type: 'manual' },
      recordedByUserId: body.recordedByUserId || req.user.uid,
    };

    const created = await this.measurementService.create(measurement, req.user.uid);
    return {
      data: created,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * List measurements for a patient
   */
  @Get('patient/:patientId')
  @UseGuards(CaregiverAuthorizationGuard)
  async list(
    @Param('patientId') patientId: string,
    @Query('type') type?: MeasurementType,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: number
  ) {
    const opts: any = {};
    if (type) opts.type = type;
    if (from) opts.from = from;
    if (to) opts.to = to;
    if (limit) opts.limit = Number(limit);

    const measurements = await this.measurementService.listPatientMeasurements(patientId, opts);
    return {
      data: { measurements },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Retrieve single measurement
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    const measurement = await this.measurementService.findById(id);
    if (!measurement) throw new NotFoundException(`Measurement ${id} not found`);

    return {
      data: measurement,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Update measurement
   */
  @Patch(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    const existing = await this.measurementService.findById(id);
    if (!existing) throw new NotFoundException(`Measurement ${id} not found`);

    const updated = {
      ...existing,
      ...body,
      id: existing.id,
      version: existing.version + 1,
    };

    const result = await this.measurementService.update(updated);
    return {
      data: result,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Soft delete measurement
   */
  @Delete(':id')
  async softDelete(@Req() req: any, @Param('id') id: string) {
    await this.measurementService.softDelete(id, req.user.uid);
    return {
      data: { success: true },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Compute BMI from weight and height values
   */
  @Post('bmi')
  async computeBmi(@Body() body: { value: { weight_kg?: number; height_cm?: number } }) {
    const bmi = this.measurementService.computeBmiPublic(body.value);
    return {
      data: { bmi },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}