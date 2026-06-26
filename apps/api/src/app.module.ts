import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthModule } from "./auth/auth.module.js";
import { ConsentModule } from "./consent/consent.module.js";
import { PatientModule } from "./patient/patient.module.js";
import { CaregiverModule } from "./caregiver/caregiver.module.js";

@Module({
  imports: [AuthModule, ConsentModule, PatientModule, CaregiverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
