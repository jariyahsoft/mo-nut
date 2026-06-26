import { Module } from '@nestjs/common';
import { TodayController } from './today.controller';
import { TodayService } from './today.service';
import { AuthModule } from '../auth/auth.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { MedicationModule } from '../medication/medication.module';
import { ChecklistModule } from '../checklist/checklist.module';
import { MeasurementModule } from '../measurement/measurement.module';
import { CaregiverModule } from '../caregiver/caregiver.module';

@Module({
  imports: [
    AuthModule,
    AppointmentModule,
    MedicationModule,
    ChecklistModule,
    MeasurementModule,
    CaregiverModule,
  ],
  controllers: [TodayController],
  providers: [TodayService],
  exports: [TodayService],
})
export class TodayModule {}