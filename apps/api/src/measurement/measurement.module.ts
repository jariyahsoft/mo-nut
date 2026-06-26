import { Module } from '@nestjs/common';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';
import { AuthModule } from '../auth/auth.module';
import { CaregiverModule } from '../caregiver/caregiver.module';

@Module({
  imports: [AuthModule, CaregiverModule],
  controllers: [MeasurementController],
  providers: [MeasurementService],
  exports: [MeasurementService],
})
export class MeasurementModule {}