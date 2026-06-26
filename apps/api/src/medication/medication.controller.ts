import { Controller, Get, Post, Patch, Body, Param, Query, Req, UseGuards, NotFoundException, ConflictException } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { ScheduleEngineService } from './schedule-engine.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { CaregiverAuthorizationGuard } from '../caregiver/guards/caregiver-authorization.guard';
import { Medication, MedicationSchedule, MedicationStatus, initMetadata, updateMetadata } from '@mo-nut/domain';

@Controller('medications')
@UseGuards(FirebaseAuthGuard)
export class MedicationController {
  constructor(
    private medicationService: MedicationService,
    private scheduleEngineService: ScheduleEngineService
  ) {}

  /**
   * Create medication
   */
  @Post()
  async create(@Req() req: any, @Body() body: any) {
    const meta = initMetadata(req.user.uid);
    const medication: Medication = {
      ...meta,
      patientId: body.patientId || req.user.uid,
      displayName: body.displayName,
      genericName: body.genericName,
      form: body.form,
      strength: body.strength,
      instructions: body.instructions,
      status: (body.status || 'active') as MedicationStatus,
      source: body.source || 'manual',
      images: body.images || [],
      activeScheduleIds: body.activeScheduleIds || [],
      inventory: body.inventory,
      warningText: body.warningText,
    };

    const created = await this.medicationService.create(medication);

    // If schedule rule is passed, initialize active schedule
    if (body.schedule) {
      const scheduleMeta = initMetadata(req.user.uid);
      const schedule: MedicationSchedule = {
        ...scheduleMeta,
        medicationId: created.id,
        patternType: body.schedule.patternType,
        timezone: body.schedule.timezone || 'Asia/Bangkok',
        localTimes: body.schedule.localTimes || ['08:00'],
        daysOfWeek: body.schedule.daysOfWeek,
        dayOfMonth: body.schedule.dayOfMonth,
        effectiveFrom: new Date().toISOString(),
        active: true,
      };
      await this.medicationService.createSchedule(schedule);

      // Auto-update active IDs list
      created.activeScheduleIds = [schedule.id];
      await this.medicationService.update({
        ...created,
        version: created.version + 1,
      });
    }

    return {
      data: created,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * List medications
   */
  @Get('patient/:patientId')
  @UseGuards(CaregiverAuthorizationGuard)
  async list(@Param('patientId') patientId: string, @Query('status') status?: MedicationStatus) {
    const medications = await this.medicationService.listPatientMedications(patientId, status);
    return {
      data: { medications },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Retrieve medication
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    const medication = await this.medicationService.findById(id);
    if (!medication) throw new NotFoundException(`Medication ${id} not found`);

    return {
      data: medication,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Update/supersede schedule rule (history-preserving)
   */
  @Patch(':id/schedule')
  async updateSchedule(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    const med = await this.medicationService.findById(id);
    if (!med) throw new NotFoundException(`Medication ${id} not found`);

    const activeSchedule = await this.medicationService.findActiveSchedule(id);

    const newScheduleMeta = initMetadata(req.user.uid);
    const newSchedule: MedicationSchedule = {
      ...newScheduleMeta,
      medicationId: med.id,
      patternType: body.patternType,
      timezone: body.timezone || 'Asia/Bangkok',
      localTimes: body.localTimes || ['08:00'],
      daysOfWeek: body.daysOfWeek,
      dayOfMonth: body.dayOfMonth,
      effectiveFrom: new Date().toISOString(),
      active: true,
    };

    if (activeSchedule) {
      // Supersede old schedule: old is marked inactive, new added
      await this.medicationService.supersedeSchedule(activeSchedule.id, newSchedule);
    } else {
      await this.medicationService.createSchedule(newSchedule);
    }

    // Link new active schedule reference to medication
    const updatedMed = {
      ...med,
      ...updateMetadata(med, req.user.uid),
      activeScheduleIds: [newSchedule.id],
    };
    await this.medicationService.update(updatedMed);

    return {
      data: newSchedule,
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * Generate dose occurrences (batches)
   */
  @Post(':id/generate-doses')
  async generateDoses(@Req() req: any, @Param('id') id: string, @Body() body: { days?: number }) {
    const med = await this.medicationService.findById(id);
    if (!med) throw new NotFoundException(`Medication ${id} not found`);

    const activeSchedule = await this.medicationService.findActiveSchedule(id);
    if (!activeSchedule) {
      throw new ConflictException(`No active schedule found for medication ${id}`);
    }

    const generated = await this.scheduleEngineService.generateOccurrences(
      activeSchedule,
      med.patientId,
      body.days || 7
    );

    return {
      data: { count: generated.length, occurrences: generated },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }

  /**
   * List occurrences
   */
  @Get('patient/:patientId/occurrences')
  @UseGuards(CaregiverAuthorizationGuard)
  async listOccurrences(@Param('patientId') patientId: string) {
    const occurrences = await this.medicationService.listPatientOccurrences(patientId);
    return {
      data: { occurrences },
      meta: { serverTime: new Date().toISOString() },
      error: null,
    };
  }
}
