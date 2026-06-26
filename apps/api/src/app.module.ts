import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthModule } from "./auth/auth.module.js";
import { ConsentModule } from "./consent/consent.module.js";
import { PatientModule } from "./patient/patient.module.js";
import { CaregiverModule } from "./caregiver/caregiver.module.js";
import { AppointmentModule } from "./appointment/appointment.module.js";
import { DocumentModule } from "./document/document.module.js";
import { NotificationModule } from "./notification/notification.module.js";
import { MedicationModule } from "./medication/medication.module.js";
import { DoseModule } from "./dose/dose.module.js";
import { MedicationNotificationModule } from "./medication-notification/medication-notification.module.js";
import { MeasurementModule } from "./measurement/measurement.module.js";
import { ChecklistModule } from "./checklist/checklist.module.js";
import { TodayModule } from "./today/today.module.js";
import { VisitModule } from "./visit/visit.module.js";
import { SttModule } from "./stt/stt.module.js";
import { ReportModule } from "./report/report.module.js";
import { TravelModule } from "./travel/travel.module.js";

@Module({
  imports: [
    AuthModule,
    ConsentModule,
    PatientModule,
    CaregiverModule,
    AppointmentModule,
    DocumentModule,
    NotificationModule,
    MedicationModule,
    DoseModule,
    MedicationNotificationModule,
    MeasurementModule,
    ChecklistModule,
    TodayModule,
    VisitModule,
    SttModule,
    ReportModule,
    TravelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
