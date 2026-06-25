import {
  assertFirebaseEnvironment,
  buildFirebaseWebEnvironment,
  isPrivilegedRole,
  readFirebaseProjects,
} from "./firebase-config.mjs";

async function main() {
  const projects = await readFirebaseProjects();

  for (const [appEnv, config] of Object.entries(projects.environments ?? {})) {
    await assertFirebaseEnvironment({
      appEnv,
      projectId: config.project_id,
      storageBucket: config.storage_bucket,
      requireLiveMatch: true,
    });
  }

  const localWebConfig = buildFirebaseWebEnvironment({ appEnv: "local" });
  if (!localWebConfig.useEmulators) {
    throw new Error("Local web Firebase config must use emulators");
  }

  if (localWebConfig.phoneOtpEnabled) {
    throw new Error("Phone OTP must stay disabled in local environment");
  }

  if (!localWebConfig.requirePrivilegedMfa) {
    throw new Error("Privileged MFA cannot be disabled by default");
  }

  for (const role of ["admin", "auditor", "support"]) {
    if (!isPrivilegedRole(role)) {
      throw new Error(`Expected privileged role ${role} to require MFA`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
