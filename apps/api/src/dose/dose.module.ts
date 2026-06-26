import { Module } from '@nestjs/common';
import { DoseController } from './dose.controller';
import { DoseService } from './dose.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DoseController],
  providers: [DoseService],
  exports: [DoseService],
})
export class DoseModule {}
