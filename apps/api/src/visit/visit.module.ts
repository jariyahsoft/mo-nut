import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { AuthModule } from '../auth/auth.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { MedicationModule } from '../medication/medication.module';
import { ChecklistModule } from '../checklist/checklist.module';
import { MeasurementModule } from '../measurement/measurement.module';

@Module({
  imports: [AuthModule, AppointmentModule, MedicationModule, ChecklistModule, MeasurementModule],
  controllers: [VisitController],
  providers: [VisitService],
  exports: [VisitService],
})
export class VisitModule {}