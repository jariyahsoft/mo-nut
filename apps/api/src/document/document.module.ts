import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { OcrService } from './ocr.service';
import { AuthModule } from '../auth/auth.module';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [AuthModule, AppointmentModule],
  controllers: [DocumentController],
  providers: [DocumentService, OcrService],
  exports: [DocumentService, OcrService],
})
export class DocumentModule {}
