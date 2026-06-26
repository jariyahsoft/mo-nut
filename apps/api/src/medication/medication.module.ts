import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { ScheduleEngineService } from './schedule-engine.service';
import { AuthModule } from '../auth/auth.module';
import { CaregiverModule } from '../caregiver/caregiver.module';

@Module({
  imports: [AuthModule, CaregiverModule],
  controllers: [MedicationController],
  providers: [MedicationService, ScheduleEngineService],
  exports: [MedicationService, ScheduleEngineService],
})
export class MedicationModule {}
