import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  initMetadata,
  updateMetadata,
  NotFoundError,
  VersionConflictError,
  DuplicateError,
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

assert.ok(true, 'Domain repository tests complete');
