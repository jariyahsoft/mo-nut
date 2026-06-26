import { Module } from '@nestjs/common';
import { AdminController, SupportController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdminController, SupportController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}