import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AuthModule } from '../auth/auth.module';
import { CaregiverModule } from '../caregiver/caregiver.module';

@Module({
  imports: [AuthModule, CaregiverModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
