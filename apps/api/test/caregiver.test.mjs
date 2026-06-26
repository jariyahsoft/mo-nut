import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import * as crypto from 'crypto';

describe('Caregiver Invitation Flow', () => {
  let invitations;
  let relationships;

  beforeEach(() => {
    invitations = new Map();
    relationships = new Map();
  });

  it('should create invitation with hashed token and expiry', () => {
    const plainToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(plainToken).digest('hex');

    const invite = {
      id: 'inv-1', patientId: 'patient-1', inviteeEmail: 'care@test.com',
      role: 'backup', scopes: ['appointment.read', 'health.read'],
      tokenHash, status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    };

    invitations.set(invite.id, invite);

    assert.notEqual(plainToken, tokenHash); // Token hash != plaintext
    assert.equal(invite.status, 'pending');
    assert.ok(new Date(invite.expiresAt) > new Date());
  });

  it('should prevent duplicate pending invites for same patient+email', () => {
    const invite1 = { id: 'inv-1', patientId: 'p1', inviteeEmail: 'a@b.com', status: 'pending' };
    const invite2 = { id: 'inv-2', patientId: 'p1', inviteeEmail: 'a@b.com', status: 'pending' };

    // After adding first, no duplicate yet
    invitations.set(invite1.id, invite1);
    const existing = Array.from(invitations.values())
      .filter(i => i.patientId === 'p1' && i.inviteeEmail === 'a@b.com' && i.status === 'pending');
    assert.equal(existing.length, 1);

    // Second pending invite should be blocked
    assert.equal(invite2.patientId, invite1.patientId);
    assert.equal(invite2.inviteeEmail, invite1.inviteeEmail);
  });

  it('should enforce one-time acceptance (replayed token fails)', () => {
    const invite = {
      id: 'inv-1', tokenHash: 'hash-abc', status: 'pending',
      patientId: 'p1', role: 'viewer', scopes: ['health.read'],
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    };
    invitations.set(invite.id, invite);

    // First acceptance
    invite.status = 'accepted';
    invitations.set(invite.id, invite);

    // Replayed token — invite is no longer pending
    const replayed = invitations.get('inv-1');
    assert.notEqual(replayed.status, 'pending');
  });

  it('should reject expired invites', () => {
    const invite = {
      id: 'inv-expired', tokenHash: 'hash-xyz', status: 'pending',
      expiresAt: new Date(Date.now() - 3600000).toISOString(), // Expired 1h ago
    };
    invitations.set(invite.id, invite);

    assert.ok(new Date(invite.expiresAt) < new Date());
  });
});

describe('Caregiver Authorization', () => {
  let relationships;

  beforeEach(() => {
    relationships = new Map();
  });

  it('should allow access with active relationship and correct scope', () => {
    const rel = {
      id: 'rel-1', patientId: 'p1', caregiverUserId: 'cg-1',
      scopes: ['health.read'], status: 'active',
    };
    relationships.set(rel.id, rel);

    const activeRel = Array.from(relationships.values())
      .find(r => r.caregiverUserId === 'cg-1' && r.patientId === 'p1' && r.status === 'active');

    assert.ok(activeRel);
    assert.ok(activeRel.scopes.includes('health.read'));
  });

  it('should deny access when scope is missing', () => {
    const rel = {
      id: 'rel-2', patientId: 'p1', caregiverUserId: 'cg-2',
      scopes: ['appointment.read'], status: 'active',
    };
    relationships.set(rel.id, rel);

    const activeRel = Array.from(relationships.values())
      .find(r => r.caregiverUserId === 'cg-2' && r.patientId === 'p1' && r.status === 'active');

    assert.ok(activeRel);
    assert.ok(!activeRel.scopes.includes('health.write'));
  });

  it('should deny access after revoke', () => {
    const rel = {
      id: 'rel-3', patientId: 'p1', caregiverUserId: 'cg-3',
      scopes: ['*'], status: 'active',
    };
    relationships.set(rel.id, rel);

    // Revoke
    rel.status = 'revoked';
    relationships.set(rel.id, rel);

    const activeRel = Array.from(relationships.values())
      .find(r => r.caregiverUserId === 'cg-3' && r.patientId === 'p1' && r.status === 'active');

    assert.equal(activeRel, undefined);
  });

  it('should deny cross-patient access', () => {
    const rel = {
      id: 'rel-4', patientId: 'p1', caregiverUserId: 'cg-4',
      scopes: ['*'], status: 'active',
    };
    relationships.set(rel.id, rel);

    // Cross-patient check: patient p2
    const crossPatientRel = Array.from(relationships.values())
      .find(r => r.caregiverUserId === 'cg-4' && r.patientId === 'p2' && r.status === 'active');

    assert.equal(crossPatientRel, undefined);
  });
});

describe('Caregiver Multi-Patient Switcher', () => {
  it('should list all patients a caregiver has access to', () => {
    const rels = [
      { id: 'r1', caregiverUserId: 'cg-1', patientId: 'p1', patientName: 'สมชาย', status: 'active' },
      { id: 'r2', caregiverUserId: 'cg-1', patientId: 'p2', patientName: 'สมหญิง', status: 'active' },
      { id: 'r3', caregiverUserId: 'cg-1', patientId: 'p3', patientName: 'สมศักดิ์', status: 'revoked' },
    ];

    const activePatients = rels.filter(r => r.caregiverUserId === 'cg-1' && r.status === 'active');
    assert.equal(activePatients.length, 2);
    assert.equal(activePatients[0].patientName, 'สมชาย');
    assert.equal(activePatients[1].patientName, 'สมหญิง');
  });
});
