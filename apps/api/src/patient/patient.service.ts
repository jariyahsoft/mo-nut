import { Injectable, NotFoundException } from '@nestjs/common';

export interface PatientProfile {
  userId: string;
  patientId: string;
  displayName?: string;
  dateOfBirth?: string;
  conditions?: string[];
  allergies?: string[];
  facilities?: { id: string; name: string; patientNumber?: string; careRight?: string }[];
  emergencyContacts?: { name: string; relationship: string; phone: string }[];
  locale: string;
  fontScale: 'normal' | 'large' | 'extra-large';
  elderlyMode: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DataRequest {
  id: string;
  userId: string;
  type: 'export' | 'deletion';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestedAt: string;
}

@Injectable()
export class PatientService {
  // In production: persist via PatientRepository
  private profiles: Map<string, PatientProfile> = new Map();
  private dataRequests: Map<string, DataRequest> = new Map();

  /**
   * Get or create patient profile.
   */
  async getProfile(userId: string): Promise<PatientProfile | null> {
    return this.profiles.get(userId) ?? null;
  }

  /**
   * Create or update patient profile.
   */
  async upsertProfile(profile: PatientProfile): Promise<PatientProfile> {
    const existing = this.profiles.get(profile.userId);
    profile.createdAt = existing?.createdAt ?? new Date().toISOString();
    profile.updatedAt = new Date().toISOString();
    this.profiles.set(profile.userId, profile);
    return profile;
  }

  /**
   * Request account data export.
   */
  async requestDataExport(userId: string): Promise<DataRequest> {
    const request: DataRequest = {
      id: `export-${Date.now()}`,
      userId,
      type: 'export',
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };
    this.dataRequests.set(request.id, request);
    return request;
  }

  /**
   * Request account deletion.
   * Does not immediately purge data — follows policy.
   */
  async requestDeletion(userId: string): Promise<DataRequest> {
    const request: DataRequest = {
      id: `deletion-${Date.now()}`,
      userId,
      type: 'deletion',
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };
    this.dataRequests.set(request.id, request);
    return request;
  }
}
