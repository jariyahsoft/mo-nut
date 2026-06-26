import { Module } from '@nestjs/common';
import { ChecklistController, QuestionController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ChecklistController, QuestionController],
  providers: [ChecklistService],
  exports: [ChecklistService],
})
export class ChecklistModule {}