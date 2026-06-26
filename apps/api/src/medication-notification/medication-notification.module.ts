import { Module } from '@nestjs/common';
import { MedicationNotificationController } from './medication-notification.controller';
import { MedicationNotificationService } from './medication-notification.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MedicationNotificationController],
  providers: [MedicationNotificationService],
  exports: [MedicationNotificationService],
})
export class MedicationNotificationModule {}