import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  initMetadata,
  updateMetadata,
  NotFoundError,
  VersionConflictError,
  DuplicateError,
  RepositoryError,
} from '../dist/index.js';

/**
 * In-memory User Repository for testing
 */
class InMemoryUserRepository {
  constructor() {
    this.users = new Map();
  }

  async findById(id) {
    return this.users.get(id) || null;
  }

  async findByIdentityRef(provider, providerId) {
    for (const user of this.users.values()) {
      const match = user.identityRefs.find(
        (ref) => ref.provider === provider && ref.providerId === providerId
      );
      if (match) return user;
    }
    return null;
  }

  async create(user) {
    // Check for duplicate identity
    const existing = await this.findByIdentityRef(
      user.identityRefs[0].provider,
      user.identityRefs[0].providerId
    );
    if (existing) {
      throw new DuplicateError('User', 'identityRef', user.identityRefs[0].providerId);
    }

    this.users.set(user.id, user);
    return user;
  }

  async update(user) {
    const existing = this.users.get(user.id);
    if (!existing) {
      throw new NotFoundError('User', user.id);
    }

    if (existing.version !== user.version - 1) {
      throw new VersionConflictError('User', user.version - 1, existing.version);
    }

    this.users.set(user.id, user);
    return user;
  }

  async softDelete(id, deletedBy) {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundError('User', id);
    }

    user.deletedAt = new Date().toISOString();
    user.deletedBy = deletedBy;
    this.users.set(id, user);
  }

  async list(options) {
    let users = Array.from(this.users.values());

    if (options.status) {
      users = users.filter((u) => u.status === options.status);
    }

    const limit = options.limit || 50;
    users = users.slice(0, limit);

    return { users, nextCursor: undefined };
  }
}

/**
 * In-memory Patient Repository for testing
 */
class InMemoryPatientRepository {
  constructor() {
    this.patients = new Map();
  }

  async findById(id) {
    return this.patients.get(id) || null;
  }

  async findByOwner(ownerId) {
    return Array.from(this.patients.values()).filter(
      (p) => p.accountOwnerUserId === ownerId
    );
  }

  async create(patient) {
    this.patients.set(patient.id, patient);
    return patient;
  }

  async update(patient) {
    const existing = this.patients.get(patient.id);
    if (!existing) {
      throw new NotFoundError('Patient', patient.id);
    }

    if (existing.version !== patient.version - 1) {
      throw new VersionConflictError('Patient', patient.version - 1, existing.version);
    }

    this.patients.set(patient.id, patient);
    return patient;
  }

  async softDelete(id, deletedBy) {
    const patient = this.patients.get(id);
    if (!patient) {
      throw new NotFoundError('Patient', id);
    }

    patient.deletedAt = new Date().toISOString();
    patient.deletedBy = deletedBy;
    this.patients.set(id, patient);
  }
}

/**
 * In-memory Facility Repository for testing
 */
class InMemoryFacilityRepository {
  constructor() {
    this.facilities = new Map();
  }

  async findById(id) {
    return this.facilities.get(id) || null;
  }

  async search(options) {
    let facilities = Array.from(this.facilities.values());

    if (options.query) {
      const query = options.query.toLowerCase();
      facilities = facilities.filter((f) => f.name.toLowerCase().includes(query));
    }

    const limit = options.limit || 50;
    facilities = facilities.slice(0, limit);

    return { facilities, nextCursor: undefined };
  }

  async create(facility) {
    this.facilities.set(facility.id, facility);
    return facility;
  }

  async update(facility) {
    const existing = this.facilities.get(facility.id);
    if (!existing) {
      throw new NotFoundError('Facility', facility.id);
    }

    if (existing.version !== facility.version - 1) {
      throw new VersionConflictError('Facility', facility.version - 1, existing.version);
    }

    this.facilities.set(facility.id, facility);
    return facility;
  }
}

// Tests
describe('User Repository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
  });

  it('should create and find user by ID', async () => {
    const user = {
      ...initMetadata('system'),
      identityRefs: [{ provider: 'firebase', providerId: 'firebase-uid-123' }],
      displayName: 'Test User',
      locale: 'th-TH',
      roles: ['patient'],
      status: 'active',
      preferences: {
        timezone: 'Asia/Bangkok',
        notificationPrivacy: 'minimal',
        fontScale: 'normal',
        reducedMotion: false,
      },
      mfaEnabled: false,
    };

    const created = await repo.create(user);
    assert.ok(created.id);

    const found = await repo.findById(created.id);
    assert.equal(found?.displayName, 'Test User');
  });

  it('should find user by identity reference', async () => {
    const user = {
      ...initMetadata(),
      identityRefs: [{ provider: 'firebase', providerId: 'uid-456', email: 'test@example.com' }],
      locale: 'th-TH',
      roles: ['patient'],
      status: 'active',
      preferences: {
        timezone: 'Asia/Bangkok',
        notificationPrivacy: 'minimal',
        fontScale: 'normal',
        reducedMotion: false,
      },
      mfaEnabled: false,
    };

    await repo.create(user);

    const found = await repo.findByIdentityRef('firebase', 'uid-456');
    assert.ok(found);
    assert.equal(found.identityRefs[0].email, 'test@example.com');
  });

  it('should throw error on duplicate identity', async () => {
    const user1 = {
      ...initMetadata(),
      identityRefs: [{ provider: 'firebase', providerId: 'uid-789' }],
      locale: 'th-TH',
      roles: ['patient'],
      status: 'active',
      preferences: {
        timezone: 'Asia/Bangkok',
        notificationPrivacy: 'minimal',
        fontScale: 'normal',
        reducedMotion: false,
      },
      mfaEnabled: false,
    };

    await repo.create(user1);

    const user2 = {
      ...initMetadata(),
      identityRefs: [{ provider: 'firebase', providerId: 'uid-789' }],
      locale: 'th-TH',
      roles: ['caregiver'],
      status: 'active',
      preferences: {
        timezone: 'Asia/Bangkok',
        notificationPrivacy: 'minimal',
        fontScale: 'normal',
        reducedMotion: false,
      },
      mfaEnabled: false,
    };

    await assert.rejects(
      async () => await repo.create(user2),
      (err) => err instanceof DuplicateError
    );
  });

  it('should enforce version conflict on update', async () => {
    const user = {
      ...initMetadata(),
      identityRefs: [{ provider: 'firebase', providerId: 'uid-conflict' }],
      locale: 'th-TH',
      roles: ['patient'],
      status: 'active',
      preferences: {
        timezone: 'Asia/Bangkok',
        notificationPrivacy: 'minimal',
        fontScale: 'normal',
        reducedMotion: false,
      },
      mfaEnabled: false,
    };

    const created = await repo.create(user);

    const staleVersion = { ...created, displayName: 'Stale', version: 1 };
    const updated = await repo.update({ ...updateMetadata(created), displayName: 'Updated' });

    await assert.rejects(
      async () => await repo.update(staleVersion),
      (err) => err instanceof VersionConflictError
    );
  });

  it('should soft delete user', async () => {
    const user = {
      ...initMetadata(),
      identityRefs: [{ provider: 'firebase', providerId: 'uid-delete' }],
      locale: 'th-TH',
      roles: ['patient'],
      status: 'active',
      preferences: {
        timezone: 'Asia/Bangkok',
        notificationPrivacy: 'minimal',
        fontScale: 'normal',
        reducedMotion: false,
      },
      mfaEnabled: false,
    };

    const created = await repo.create(user);
    await repo.softDelete(created.id, 'admin-123');

    const found = await repo.findById(created.id);
    assert.ok(found?.deletedAt);
    assert.equal(found?.deletedBy, 'admin-123');
  });
});

describe('Patient Repository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
  });

  it('should create and find patient by ID', async () => {
    const patient = {
      ...initMetadata('user-123'),
      accountOwnerUserId: 'user-123',
      demographics: {
        firstName: 'Somchai',
        lastName: 'Demo',
        dateOfBirth: '1950-01-15',
      },
      conditions: [],
      allergies: [],
      emergencySettings: {
        sosEnabled: true,
        emergencyContacts: [],
      },
      timezone: 'Asia/Bangkok',
      preferredLanguage: 'th',
    };

    const created = await repo.create(patient);
    const found = await repo.findById(created.id);

    assert.equal(found?.demographics.firstName, 'Somchai');
  });

  it('should find patients by owner', async () => {
    const patient1 = {
      ...initMetadata(),
      accountOwnerUserId: 'owner-123',
      demographics: {},
      conditions: [],
      allergies: [],
      emergencySettings: { sosEnabled: false, emergencyContacts: [] },
      timezone: 'Asia/Bangkok',
      preferredLanguage: 'th',
    };

    const patient2 = {
      ...initMetadata(),
      accountOwnerUserId: 'owner-123',
      demographics: {},
      conditions: [],
      allergies: [],
      emergencySettings: { sosEnabled: false, emergencyContacts: [] },
      timezone: 'Asia/Bangkok',
      preferredLanguage: 'th',
    };

    await repo.create(patient1);
    await repo.create(patient2);

    const patients = await repo.findByOwner('owner-123');
    assert.equal(patients.length, 2);
  });
});

describe('Facility Repository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryFacilityRepository();
  });

  it('should create and search facilities', async () => {
    const facility = {
      ...initMetadata(),
      name: 'Bangkok General Hospital',
      facilityType: 'hospital',
      address: {
        city: 'Bangkok',
        province: 'Bangkok',
        country: 'Thailand',
      },
    };

    await repo.create(facility);

    const results = await repo.search({ query: 'Bangkok' });
    assert.equal(results.facilities.length, 1);
    assert.equal(results.facilities[0].name, 'Bangkok General Hospital');
  });
});

/**
 * In-memory Caregiver Repository for testing
 */
class InMemoryCaregiverRepository {
  constructor() {
    this.invitations = new Map();
    this.relationships = new Map();
  }

  async findInvitationById(id) {
    return this.invitations.get(id) || null;
  }

  async findInvitationByTokenHash(tokenHash) {
    for (const invite of this.invitations.values()) {
      if (invite.tokenHash === tokenHash) return invite;
    }
    return null;
  }

  async createInvitation(invitation) {
    this.invitations.set(invitation.id, invitation);
    return invitation;
  }

  async updateInvitation(invitation) {
    this.invitations.set(invitation.id, invitation);
    return invitation;
  }

  async findRelationship(patientId, caregiverUserId) {
    for (const rel of this.relationships.values()) {
      if (rel.patientId === patientId && rel.caregiverUserId === caregiverUserId && !rel.deletedAt) {
        return rel;
      }
    }
    return null;
  }

  async listPatientRelationships(patientId) {
    return Array.from(this.relationships.values()).filter(
      (rel) => rel.patientId === patientId && !rel.deletedAt
    );
  }

  async listCaregiverRelationships(caregiverUserId) {
    return Array.from(this.relationships.values()).filter(
      (rel) => rel.caregiverUserId === caregiverUserId && !rel.deletedAt
    );
  }

  async createRelationship(relationship) {
    // Prevent duplicate active relationship
    const existing = await this.findRelationship(relationship.patientId, relationship.caregiverUserId);
    if (existing && existing.status === 'active') {
      throw new DuplicateError('CareRelationship', 'caregiverUserId', relationship.caregiverUserId);
    }

    // Invariant: Only one primary caregiver active
    if (relationship.role === 'primary' && relationship.status === 'active') {
      const activeRels = await this.listPatientRelationships(relationship.patientId);
      const primary = activeRels.find((rel) => rel.role === 'primary' && rel.status === 'active');
      if (primary) {
        throw new RepositoryError('PRIMARY_CAREGIVER_EXISTS', 'An active primary caregiver already exists for this patient');
      }
    }

    this.relationships.set(relationship.id, relationship);
    return relationship;
  }

  async updateRelationship(relationship) {
    const existing = this.relationships.get(relationship.id);
    if (!existing) {
      throw new NotFoundError('CareRelationship', relationship.id);
    }

    if (existing.version !== relationship.version - 1) {
      throw new VersionConflictError('CareRelationship', relationship.version - 1, existing.version);
    }

    // Dynamic primary caregiver rule check
    if (relationship.role === 'primary' && relationship.status === 'active' && existing.role !== 'primary') {
      const activeRels = await this.listPatientRelationships(relationship.patientId);
      const primary = activeRels.find((rel) => rel.id !== relationship.id && rel.role === 'primary' && rel.status === 'active');
      if (primary) {
        throw new RepositoryError('PRIMARY_CAREGIVER_EXISTS', 'An active primary caregiver already exists for this patient');
      }
    }

    this.relationships.set(relationship.id, relationship);
    return relationship;
  }

  async softDeleteRelationship(id, deletedBy) {
    const rel = this.relationships.get(id);
    if (!rel) {
      throw new NotFoundError('CareRelationship', id);
    }
    rel.deletedAt = new Date().toISOString();
    rel.deletedBy = deletedBy;
    this.relationships.set(id, rel);
  }
}

/**
 * In-memory Consent Repository for testing
 */
class InMemoryConsentRepository {
  constructor(privateCaregiverRepo) {
    this.grants = new Map();
    this.caregiverRepo = privateCaregiverRepo;
  }

  async findById(id) {
    return this.grants.get(id) || null;
  }

  async findActiveGrants(patientId) {
    return Array.from(this.grants.values()).filter(
      (g) => g.patientId === patientId && g.status === 'active' && !g.deletedAt && new Date(g.expiresAt) > new Date()
    );
  }

  async findActiveGrant(patientId, granteeId) {
    for (const g of this.grants.values()) {
      if (
        g.patientId === patientId &&
        g.granteeId === granteeId &&
        g.status === 'active' &&
        !g.deletedAt &&
        new Date(g.expiresAt) > new Date()
      ) {
        return g;
      }
    }
    return null;
  }

  async create(grant) {
    this.grants.set(grant.id, grant);
    return grant;
  }

  async update(grant) {
    const existing = this.grants.get(grant.id);
    if (!existing) {
      throw new NotFoundError('ConsentGrant', grant.id);
    }
    if (existing.version !== grant.version - 1) {
      throw new VersionConflictError('ConsentGrant', grant.version - 1, existing.version);
    }
    this.grants.set(grant.id, grant);
    return grant;
  }

  async evaluatePermission(request) {
    // Self access check
    if (request.actorId === request.patientId) {
      return { allowed: true, reason: 'Owner self access', scopes: ['*'] };
    }

    // Caregiver relationship check
    const rel = await this.caregiverRepo.findRelationship(request.patientId, request.actorId);
    if (!rel || rel.status !== 'active') {
      return { allowed: false, reason: 'No active caregiver relationship', scopes: [] };
    }

    // Consent check
    const consent = await this.findActiveGrant(request.patientId, request.actorId);
    if (!consent) {
      return { allowed: false, reason: 'No active consent grant', scopes: [] };
    }

    const hasScope = consent.scopes.includes(request.action) || consent.scopes.includes('*');
    if (!hasScope) {
      return { allowed: false, reason: `Action ${request.action} not permitted by consent scopes`, scopes: consent.scopes };
    }

    return { allowed: true, reason: 'Access granted by relationship and consent', scopes: consent.scopes };
  }
}

/**
 * In-memory Appointment Repository for testing
 */
class InMemoryAppointmentRepository {
  constructor() {
    this.appointments = new Map();
    this.events = [];
  }

  async findById(id) {
    return this.appointments.get(id) || null;
  }

  async listPatientAppointments(patientId, options = {}) {
    let list = Array.from(this.appointments.values()).filter(
      (app) => app.patientId === patientId && !app.deletedAt
    );

    if (options.status) {
      list = list.filter((app) => app.status === options.status);
    }

    if (options.from) {
      list = list.filter((app) => app.scheduledAt >= options.from);
    }

    if (options.to) {
      list = list.filter((app) => app.scheduledAt <= options.to);
    }

    // Sorting by scheduledAt DESC
    list.sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt));

    const limit = options.limit || 50;
    list = list.slice(0, limit);

    return { appointments: list, nextCursor: undefined };
  }

  async create(appointment, event) {
    this.appointments.set(appointment.id, appointment);
    this.events.push(event);
    return appointment;
  }

  async update(appointment, event) {
    const existing = this.appointments.get(appointment.id);
    if (!existing) {
      throw new NotFoundError('Appointment', appointment.id);
    }

    if (existing.version !== appointment.version - 1) {
      throw new VersionConflictError('Appointment', appointment.version - 1, existing.version);
    }

    this.appointments.set(appointment.id, appointment);
    this.events.push(event);
    return appointment;
  }

  async softDelete(id, event, deletedBy) {
    const app = this.appointments.get(id);
    if (!app) {
      throw new NotFoundError('Appointment', id);
    }

    app.deletedAt = new Date().toISOString();
    app.deletedBy = deletedBy;
    this.appointments.set(id, app);
    this.events.push(event);
  }

  async listHistory(appointmentId) {
    return this.events.filter((ev) => ev.appointmentId === appointmentId);
  }
}

describe('Caregiver Repository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryCaregiverRepository();
  });

  it('should manage caregiver invitations with token hashes', async () => {
    const invite = {
      ...initMetadata('patient-owner'),
      patientId: 'patient-a',
      inviteeEmail: 'caregiver@example.com',
      role: 'primary',
      scopes: ['patient.read', 'appointment.read'],
      tokenHash: 'hashed-token-xyz',
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      status: 'pending',
      invitedByUserId: 'patient-owner',
    };

    await repo.createInvitation(invite);

    const found = await repo.findInvitationByTokenHash('hashed-token-xyz');
    assert.ok(found);
    assert.equal(found.inviteeEmail, 'caregiver@example.com');
    assert.equal(found.status, 'pending');

    // One-time acceptance transition
    found.status = 'accepted';
    found.acceptedAt = new Date().toISOString();
    found.acceptedByUserId = 'caregiver-123';
    await repo.updateInvitation(found);

    const updated = await repo.findInvitationById(invite.id);
    assert.equal(updated.status, 'accepted');
  });

  it('should prevent duplicate active Relationships', async () => {
    const rel1 = {
      ...initMetadata(),
      patientId: 'patient-a',
      caregiverUserId: 'caregiver-123',
      role: 'backup',
      scopes: ['patient.read'],
      status: 'active',
      validFrom: new Date().toISOString(),
    };

    await repo.createRelationship(rel1);

    const rel2 = {
      ...initMetadata(),
      patientId: 'patient-a',
      caregiverUserId: 'caregiver-123',
      role: 'viewer',
      scopes: ['patient.read'],
      status: 'active',
      validFrom: new Date().toISOString(),
    };

    await assert.rejects(
      async () => await repo.createRelationship(rel2),
      (err) => err instanceof DuplicateError
    );
  });

  it('should enforce single active Primary caregiver constraint', async () => {
    const primary1 = {
      ...initMetadata(),
      patientId: 'patient-a',
      caregiverUserId: 'caregiver-1',
      role: 'primary',
      scopes: ['patient.read'],
      status: 'active',
      validFrom: new Date().toISOString(),
    };

    await repo.createRelationship(primary1);

    const primary2 = {
      ...initMetadata(),
      patientId: 'patient-a',
      caregiverUserId: 'caregiver-2',
      role: 'primary',
      scopes: ['patient.read'],
      status: 'active',
      validFrom: new Date().toISOString(),
    };

    await assert.rejects(
      async () => await repo.createRelationship(primary2),
      (err) => err.code === 'PRIMARY_CAREGIVER_EXISTS'
    );
  });
});

describe('Consent Repository', () => {
  let caregiverRepo;
  let consentRepo;

  beforeEach(() => {
    caregiverRepo = new InMemoryCaregiverRepository();
    consentRepo = new InMemoryConsentRepository(caregiverRepo);
  });

  it('should evaluate permissions based on active relation and active consent', async () => {
    const caregiverId = 'caregiver-123';
    const patientId = 'patient-456';

    // 1. Evaluate without relation or consent
    let result = await consentRepo.evaluatePermission({
      actorId: caregiverId,
      patientId: patientId,
      action: 'appointment.read',
    });
    assert.equal(result.allowed, false);

    // 2. Setup active caregiver relationship, still no consent
    await caregiverRepo.createRelationship({
      ...initMetadata(),
      patientId,
      caregiverUserId: caregiverId,
      role: 'backup',
      scopes: ['appointment.read'],
      status: 'active',
      validFrom: new Date().toISOString(),
    });

    result = await consentRepo.evaluatePermission({
      actorId: caregiverId,
      patientId: patientId,
      action: 'appointment.read',
    });
    assert.equal(result.allowed, false);

    // 3. Create expired active consent
    const expiredConsent = {
      ...initMetadata(),
      patientId,
      granteeId: caregiverId,
      purposes: ['caregiver_coordination'],
      scopes: ['appointment.read'],
      policyVersion: '1.0',
      status: 'active',
      validFrom: new Date().toISOString(),
      expiresAt: new Date(Date.now() - 3600000).toISOString(),
    };
    await consentRepo.create(expiredConsent);

    result = await consentRepo.evaluatePermission({
      actorId: caregiverId,
      patientId: patientId,
      action: 'appointment.read',
    });
    assert.equal(result.allowed, false);

    // 4. Update to active unexpired consent
    const updated = {
      ...expiredConsent,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      version: 2,
    };
    await consentRepo.update(updated);

    result = await consentRepo.evaluatePermission({
      actorId: caregiverId,
      patientId: patientId,
      action: 'appointment.read',
    });
    assert.equal(result.allowed, true);

    // 5. Test scope evaluation negative case
    result = await consentRepo.evaluatePermission({
      actorId: caregiverId,
      patientId: patientId,
      action: 'medication.write',
    });
    assert.equal(result.allowed, false);
  });
});

describe('Appointment Repository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryAppointmentRepository();
  });

  it('should create and transition appointment status and record history log', async () => {
    const patientId = 'patient-123';
    const app = {
      ...initMetadata('user-owner'),
      patientId,
      facilityId: 'facility-999',
      scheduledAt: new Date(Date.now() + 86400000).toISOString(),
      timezone: 'Asia/Bangkok',
      status: 'upcoming',
      notes: 'Routine checkup',
      preparations: [{ id: 'p1', description: 'Fast 8 hours', isCompleted: false }],
      documents: [],
      revision: 1,
    };

    const event = {
      ...initMetadata('user-owner'),
      appointmentId: app.id,
      type: 'created',
      newValue: 'upcoming',
      actorId: 'user-owner',
      occurredAt: new Date().toISOString(),
    };

    await repo.create(app, event);

    const found = await repo.findById(app.id);
    assert.equal(found.status, 'upcoming');

    // Transition status to confirmed
    const updatedApp = {
      ...updateMetadata(found, 'user-owner'),
      status: 'confirmed',
      revision: 2,
    };

    const eventTransition = {
      ...initMetadata('user-owner'),
      appointmentId: app.id,
      type: 'status_changed',
      oldValue: 'upcoming',
      newValue: 'confirmed',
      actorId: 'user-owner',
      occurredAt: new Date().toISOString(),
      reason: 'User confirmed appointment reminder',
    };

    await repo.update(updatedApp, eventTransition);

    const updated = await repo.findById(app.id);
    assert.equal(updated.status, 'confirmed');

    const history = await repo.listHistory(app.id);
    assert.equal(history.length, 2);
    assert.equal(history[1].type, 'status_changed');
    assert.equal(history[1].newValue, 'confirmed');
  });
});

/**
 * In-memory Medication Repository for testing
 */
class InMemoryMedicationRepository {
  constructor() {
    this.medications = new Map();
  }

  async findById(id) {
    return this.medications.get(id) || null;
  }

  async listPatientMedications(patientId, options = {}) {
    let list = Array.from(this.medications.values()).filter(
      (med) => med.patientId === patientId && !med.deletedAt
    );

    if (options.status) {
      list = list.filter((med) => med.status === options.status);
    }

    const limit = options.limit || 50;
    list = list.slice(0, limit);

    return { medications: list, nextCursor: undefined };
  }

  async create(medication) {
    this.medications.set(medication.id, medication);
    return medication;
  }

  async update(medication) {
    const existing = this.medications.get(medication.id);
    if (!existing) {
      throw new NotFoundError('Medication', medication.id);
    }

    if (existing.version !== medication.version - 1) {
      throw new VersionConflictError('Medication', medication.version - 1, existing.version);
    }

    this.medications.set(medication.id, medication);
    return medication;
  }

  async softDelete(id, deletedBy) {
    const med = this.medications.get(id);
    if (!med) {
      throw new NotFoundError('Medication', id);
    }
    med.deletedAt = new Date().toISOString();
    med.deletedBy = deletedBy;
    this.medications.set(id, med);
  }
}

/**
 * In-memory Medication Schedule Repository for testing
 */
class InMemoryMedicationScheduleRepository {
  constructor() {
    this.schedules = new Map();
  }

  async findById(id) {
    return this.schedules.get(id) || null;
  }

  async listMedicationSchedules(medicationId) {
    return Array.from(this.schedules.values())
      .filter((s) => s.medicationId === medicationId)
      .sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom));
  }

  async findActiveSchedule(medicationId) {
    const schedules = await this.listMedicationSchedules(medicationId);
    return schedules.find((s) => s.active) || null;
  }

  async create(schedule) {
    this.schedules.set(schedule.id, schedule);
    return schedule;
  }

  async update(schedule) {
    const existing = this.schedules.get(schedule.id);
    if (!existing) {
      throw new NotFoundError('MedicationSchedule', schedule.id);
    }

    if (existing.version !== schedule.version - 1) {
      throw new VersionConflictError('MedicationSchedule', schedule.version - 1, existing.version);
    }

    this.schedules.set(schedule.id, schedule);
    return schedule;
  }
}

/**
 * In-memory Dose Repository for testing
 */
class InMemoryDoseRepository {
  constructor() {
    this.doses = new Map();
    this.events = [];
  }

  async findById(id) {
    return this.doses.get(id) || null;
  }

  async findByScheduleAndDueAt(scheduleId, dueAt) {
    for (const dose of this.doses.values()) {
      if (dose.scheduleId === scheduleId && dose.dueAt === dueAt) {
        return dose;
      }
    }
    return null;
  }

  async listPatientDoses(patientId, options = {}) {
    let list = Array.from(this.doses.values()).filter((d) => d.patientId === patientId);

    if (options.status) {
      list = list.filter((d) => d.status === options.status);
    }

    if (options.from) {
      list = list.filter((d) => d.dueAt >= options.from);
    }

    if (options.to) {
      list = list.filter((d) => d.dueAt <= options.to);
    }

    list.sort((a, b) => b.dueAt.localeCompare(a.dueAt));

    const limit = options.limit || 50;
    list = list.slice(0, limit);

    return { doses: list, nextCursor: undefined };
  }

  async create(dose) {
    this.doses.set(dose.id, dose);
    return dose;
  }

  async recordAction(occurrenceId, action, actorId, note, correctionReason) {
    const dose = this.doses.get(occurrenceId);
    if (!dose) {
      throw new NotFoundError('DoseOccurrence', occurrenceId);
    }

    const now = new Date().toISOString();
    const existingEvents = this.events.filter((e) => e.occurrenceId === occurrenceId);
    const hasFinalAction = existingEvents.some((e) => e.eventType === 'action' || e.eventType === 'correction');

    // Idempotency check: if current status is already the target action, return the most recent matching event
    if (dose.status === action) {
      const matchingEvent = [...existingEvents]
        .reverse()
        .find((e) => e.action === action);
      if (matchingEvent) {
        return { dose, event: matchingEvent };
      }
    }

    let eventType = 'action';
    if (hasFinalAction) {
      // This is a correction
      if (!correctionReason) {
        throw new RepositoryError('CORRECTION_REASON_REQUIRED', 'Correction events must include a reason');
      }
      eventType = 'correction';
    }

    const event = {
      ...initMetadata(actorId),
      occurrenceId,
      medicationId: dose.medicationId,
      patientId: dose.patientId,
      eventType,
      action,
      actorId,
      occurredAt: now,
      note,
      correctionReason,
    };

    this.events.push(event);

    // Update dose status
    dose.status = action;
    dose.respondedAt = now;
    dose.actorId = actorId;
    if (note) dose.note = note;
    this.doses.set(occurrenceId, dose);

    return { dose, event };
  }

  async listEvents(occurrenceId) {
    return this.events.filter((e) => e.occurrenceId === occurrenceId);
  }

  async listMedicationEvents(medicationId) {
    return this.events.filter((e) => e.medicationId === medicationId);
  }
}

/**
 * In-memory Measurement Repository for testing
 */
class InMemoryMeasurementRepository {
  constructor() {
    this.measurements = new Map();
  }

  async findById(id) {
    return this.measurements.get(id) || null;
  }

  async listPatientMeasurements(patientId, options = {}) {
    let list = Array.from(this.measurements.values()).filter(
      (m) => m.patientId === patientId && !m.deletedAt
    );

    if (options.measurementType) {
      list = list.filter((m) => m.measurementType === options.measurementType);
    }

    if (options.from) {
      list = list.filter((m) => m.measuredAt >= options.from);
    }

    if (options.to) {
      list = list.filter((m) => m.measuredAt <= options.to);
    }

    list.sort((a, b) => b.measuredAt.localeCompare(a.measuredAt));

    const limit = options.limit || 50;
    list = list.slice(0, limit);

    return { measurements: list, nextCursor: undefined };
  }

  async create(measurement) {
    const validation = this.validateMeasurement(measurement.measurementType, measurement.value);
    if (!validation.valid) {
      throw new RepositoryError('VALIDATION_FAILED', validation.errors.join(', '));
    }

    this.measurements.set(measurement.id, measurement);
    return measurement;
  }

  async update(measurement) {
    const existing = this.measurements.get(measurement.id);
    if (!existing) {
      throw new NotFoundError('HealthMeasurement', measurement.id);
    }

    if (existing.version !== measurement.version - 1) {
      throw new VersionConflictError('HealthMeasurement', measurement.version - 1, existing.version);
    }

    const validation = this.validateMeasurement(measurement.measurementType, measurement.value);
    if (!validation.valid) {
      throw new RepositoryError('VALIDATION_FAILED', validation.errors.join(', '));
    }

    this.measurements.set(measurement.id, measurement);
    return measurement;
  }

  async softDelete(id, deletedBy) {
    const measurement = this.measurements.get(id);
    if (!measurement) {
      throw new NotFoundError('HealthMeasurement', id);
    }
    measurement.deletedAt = new Date().toISOString();
    measurement.deletedBy = deletedBy;
    this.measurements.set(id, measurement);
  }

  validateMeasurement(measurementType, value) {
    const errors = [];

    switch (measurementType) {
      case 'weight':
        if (!value.weight_kg || value.weight_kg <= 0 || value.weight_kg > 500) {
          errors.push('Weight must be between 0 and 500 kg');
        }
        break;
      case 'height':
        if (!value.height_cm || value.height_cm <= 0 || value.height_cm > 300) {
          errors.push('Height must be between 0 and 300 cm');
        }
        break;
      case 'pulse':
        if (!value.bpm || value.bpm <= 0 || value.bpm > 300) {
          errors.push('Pulse must be between 0 and 300 bpm');
        }
        break;
      case 'glucose':
        if (!value.glucose_mg_dl || value.glucose_mg_dl <= 0 || value.glucose_mg_dl > 1000) {
          errors.push('Glucose must be between 0 and 1000 mg/dL');
        }
        if (!value.context) {
          errors.push('Glucose measurement requires context');
        }
        break;
      case 'blood_pressure':
        if (!value.systolic_mmhg || value.systolic_mmhg <= 0 || value.systolic_mmhg > 300) {
          errors.push('Systolic must be between 0 and 300 mmHg');
        }
        if (!value.diastolic_mmhg || value.diastolic_mmhg <= 0 || value.diastolic_mmhg > 200) {
          errors.push('Diastolic must be between 0 and 200 mmHg');
        }
        break;
      default:
        errors.push(`Unknown measurement type: ${measurementType}`);
    }

    return { valid: errors.length === 0, errors };
  }
}

describe('Medication Repository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryMedicationRepository();
  });

  it('should create and find medication by ID', async () => {
    const medication = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      displayName: 'Metformin 500mg',
      genericName: 'Metformin',
      form: 'tablet',
      strength: '500mg',
      instructions: 'Take with food',
      status: 'active',
      source: 'manual',
      images: [],
      activeScheduleIds: [],
    };

    const created = await repo.create(medication);
    assert.ok(created.id);

    const found = await repo.findById(created.id);
    assert.equal(found?.displayName, 'Metformin 500mg');
  });

  it('should list medications by patient and status', async () => {
    const med1 = {
      ...initMetadata(),
      patientId: 'patient-123',
      displayName: 'Med1',
      genericName: 'Generic1',
      form: 'tablet',
      strength: '10mg',
      instructions: 'Take daily',
      status: 'active',
      source: 'manual',
      images: [],
      activeScheduleIds: [],
    };

    const med2 = {
      ...initMetadata(),
      patientId: 'patient-123',
      displayName: 'Med2',
      genericName: 'Generic2',
      form: 'capsule',
      strength: '20mg',
      instructions: 'Take twice daily',
      status: 'paused',
      source: 'manual',
      images: [],
      activeScheduleIds: [],
    };

    await repo.create(med1);
    await repo.create(med2);

    const allMeds = await repo.listPatientMedications('patient-123');
    assert.equal(allMeds.medications.length, 2);

    const activeMeds = await repo.listPatientMedications('patient-123', { status: 'active' });
    assert.equal(activeMeds.medications.length, 1);
    assert.equal(activeMeds.medications[0].displayName, 'Med1');
  });
});

describe('Medication Schedule Repository', () => {
  let scheduleRepo;
  let medRepo;

  beforeEach(() => {
    scheduleRepo = new InMemoryMedicationScheduleRepository();
    medRepo = new InMemoryMedicationRepository();
  });

  it('should preserve dose history when schedules change', async () => {
    const medication = {
      ...initMetadata(),
      patientId: 'patient-123',
      displayName: 'Med1',
      genericName: 'Generic1',
      form: 'tablet',
      strength: '10mg',
      instructions: 'Take daily',
      status: 'active',
      source: 'manual',
      images: [],
      activeScheduleIds: [],
    };

    const med = await medRepo.create(medication);

    // Create initial schedule
    const schedule1 = {
      ...initMetadata(),
      medicationId: med.id,
      patternType: 'daily_times',
      timezone: 'Asia/Bangkok',
      localTimes: ['08:00', '20:00'],
      effectiveFrom: new Date().toISOString(),
      active: true,
    };

    const createdSchedule1 = await scheduleRepo.create(schedule1);

    // Create new schedule that supersedes the first
    const schedule2 = {
      ...initMetadata(),
      medicationId: med.id,
      patternType: 'daily_times',
      timezone: 'Asia/Bangkok',
      localTimes: ['09:00', '21:00'], // Changed times
      effectiveFrom: new Date(Date.now() + 86400000).toISOString(),
      active: true,
    };

    await scheduleRepo.create(schedule2);

    // Mark old schedule as superseded
    const updatedSchedule1 = {
      ...updateMetadata(createdSchedule1),
      active: false,
      supersededByScheduleId: schedule2.id,
      effectiveTo: schedule2.effectiveFrom,
    };

    await scheduleRepo.update(updatedSchedule1);

    // Verify both schedules exist in history
    const history = await scheduleRepo.listMedicationSchedules(med.id);
    assert.equal(history.length, 2);
    assert.equal(history[0].active, true); // Newest first
    assert.equal(history[1].active, false); // Old schedule marked inactive
    assert.equal(history[1].supersededByScheduleId, schedule2.id);
  });
});

describe('Dose Repository', () => {
  let doseRepo;

  beforeEach(() => {
    doseRepo = new InMemoryDoseRepository();
  });

  it('should enforce idempotent dose actions', async () => {
    const dose = {
      ...initMetadata(),
      scheduleId: 'sched-123',
      medicationId: 'med-123',
      patientId: 'patient-123',
      dueAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      status: 'due',
    };

    await doseRepo.create(dose);

    // Record action first time
    const result1 = await doseRepo.recordAction(dose.id, 'taken', 'user-123', 'Took with breakfast');
    assert.equal(result1.dose.status, 'taken');
    assert.equal(result1.event.eventType, 'action');

    // Record same action again (idempotent)
    const result2 = await doseRepo.recordAction(dose.id, 'taken', 'user-123');
    assert.equal(result2.dose.status, 'taken');
    assert.equal(result2.event.id, result1.event.id); // Same event returned

    const events = await doseRepo.listEvents(dose.id);
    assert.equal(events.length, 1); // Only one action event
  });

  it('should allow correction events after first action', async () => {
    const dose = {
      ...initMetadata(),
      scheduleId: 'sched-123',
      medicationId: 'med-123',
      patientId: 'patient-123',
      dueAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      status: 'due',
    };

    await doseRepo.create(dose);

    // Record initial action
    await doseRepo.recordAction(dose.id, 'taken', 'user-123');

    // Record correction
    const correctionResult = await doseRepo.recordAction(
      dose.id,
      'skipped',
      'user-123',
      'Actually forgot to take it',
      'User realized they did not actually take the medication'
    );

    assert.equal(correctionResult.dose.status, 'skipped');
    assert.equal(correctionResult.event.eventType, 'correction');
    assert.ok(correctionResult.event.correctionReason);

    const events = await doseRepo.listEvents(dose.id);
    assert.equal(events.length, 2); // action + correction
    assert.equal(events[0].eventType, 'action');
    assert.equal(events[1].eventType, 'correction');
  });

  it('should require correction reason for correction events', async () => {
    const dose = {
      ...initMetadata(),
      scheduleId: 'sched-123',
      medicationId: 'med-123',
      patientId: 'patient-123',
      dueAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      status: 'due',
    };

    await doseRepo.create(dose);

    // Record initial action
    await doseRepo.recordAction(dose.id, 'taken', 'user-123');

    // Try to record correction without reason
    await assert.rejects(
      async () => await doseRepo.recordAction(dose.id, 'skipped', 'user-123'),
      (err) => err.code === 'CORRECTION_REASON_REQUIRED'
    );
  });

  it('should find dose by schedule and due time for idempotency', async () => {
    const dueAt = new Date().toISOString();
    const dose = {
      ...initMetadata(),
      scheduleId: 'sched-123',
      medicationId: 'med-123',
      patientId: 'patient-123',
      dueAt,
      timezone: 'Asia/Bangkok',
      status: 'scheduled',
    };

    await doseRepo.create(dose);

    const found = await doseRepo.findByScheduleAndDueAt('sched-123', dueAt);
    assert.ok(found);
    assert.equal(found.id, dose.id);
  });
});

describe('Measurement Repository', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryMeasurementRepository();
  });

  it('should validate and create weight measurement', async () => {
    const measurement = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'weight',
      measuredAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { weight_kg: 70.5 },
    };

    const created = await repo.create(measurement);
    assert.ok(created.id);
    assert.equal(created.value.weight_kg, 70.5);
  });

  it('should reject invalid measurement values', async () => {
    const invalidWeight = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'weight',
      measuredAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { weight_kg: -5 }, // Invalid negative weight
    };

    await assert.rejects(
      async () => await repo.create(invalidWeight),
      (err) => err.code === 'VALIDATION_FAILED'
    );
  });

  it('should validate glucose measurement with context', async () => {
    const glucose = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'glucose',
      measuredAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { glucose_mg_dl: 120, context: 'fasting' },
    };

    const created = await repo.create(glucose);
    assert.equal(created.value.glucose_mg_dl, 120);
    assert.equal(created.value.context, 'fasting');
  });

  it('should require glucose context', async () => {
    const glucoseNoContext = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'glucose',
      measuredAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { glucose_mg_dl: 120 }, // Missing context
    };

    await assert.rejects(
      async () => await repo.create(glucoseNoContext),
      (err) => err.code === 'VALIDATION_FAILED' && err.message.includes('context')
    );
  });

  it('should validate blood pressure measurement', async () => {
    const bp = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'blood_pressure',
      measuredAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { systolic_mmhg: 120, diastolic_mmhg: 80, pulse_bpm: 72, context: 'resting' },
    };

    const created = await repo.create(bp);
    assert.equal(created.value.systolic_mmhg, 120);
    assert.equal(created.value.diastolic_mmhg, 80);
  });

  it('should filter measurements by type and date range', async () => {
    const baseDate = new Date('2026-06-20T08:00:00Z');

    const weight1 = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'weight',
      measuredAt: new Date(baseDate.getTime()).toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { weight_kg: 70 },
    };

    const weight2 = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'weight',
      measuredAt: new Date(baseDate.getTime() + 86400000).toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { weight_kg: 71 },
    };

    const glucose = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'glucose',
      measuredAt: new Date(baseDate.getTime() + 43200000).toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { glucose_mg_dl: 110, context: 'fasting' },
    };

    await repo.create(weight1);
    await repo.create(weight2);
    await repo.create(glucose);

    const allMeasurements = await repo.listPatientMeasurements('patient-123');
    assert.equal(allMeasurements.measurements.length, 3);

    const weightOnly = await repo.listPatientMeasurements('patient-123', { measurementType: 'weight' });
    assert.equal(weightOnly.measurements.length, 2);

    const dateRange = await repo.listPatientMeasurements('patient-123', {
      from: weight1.measuredAt,
      to: glucose.measuredAt,
    });
    assert.equal(dateRange.measurements.length, 2); // weight1 and glucose, not weight2
  });

  it('should enforce version conflicts on measurement updates', async () => {
    const measurement = {
      ...initMetadata('user-123'),
      patientId: 'patient-123',
      measurementType: 'weight',
      measuredAt: new Date().toISOString(),
      timezone: 'Asia/Bangkok',
      source: { type: 'manual' },
      recordedByUserId: 'user-123',
      value: { weight_kg: 70 },
    };

    const created = await repo.create(measurement);

    const updated = await repo.update({
      ...updateMetadata(created),
      value: { weight_kg: 71 },
    });

    assert.equal(updated.value.weight_kg, 71);

    // Try to update with stale version
    await assert.rejects(
      async () => await repo.update({ ...created, value: { weight_kg: 72 } }),
      (err) => err instanceof VersionConflictError
    );
  });
});

assert.ok(true, 'Domain repository tests complete');
