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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
