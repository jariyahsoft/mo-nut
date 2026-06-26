import { Module } from '@nestjs/common';
import { TravelController, EmergencyProfileController } from './travel.controller';
import { TravelService } from './travel.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TravelController, EmergencyProfileController],
  providers: [TravelService],
  exports: [TravelService],
})
export class TravelModule {}