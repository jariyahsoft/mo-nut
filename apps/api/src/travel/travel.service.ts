import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { initMetadata, updateMetadata } from '@mo-nut/domain';
import * as crypto from 'crypto';

export interface LocationConsent {
  patientId: string;
  optIn: boolean;
  optInAt: string;
  optInMethod: 'settings' | 'consent_flow';
}

export interface TravelPlan {
  id: string;
  patientId: string;
  appointmentId?: string;
  originAddress?: string;
  destinationAddress: string;
  destinationFacilityName: string;
  estimatedTravelMinutes: number;
  registrationBufferMinutes: number;
  parkingBufferMinutes: number;
  status: 'pending' | 'traveling' | 'arrived';
  mapProvider: 'mock' | 'google' | 'apple';
}

export interface EmergencyProfile {
  patientId: string;
  optInOffline: boolean;
  bloodType?: string;
  allergies?: string[];
  conditions?: string[];
  medications?: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  qrToken?: string;
  updatedAt: string;
}

@Injectable()
export class TravelService {
  private consents: Map<string, LocationConsent> = new Map();
  private travelPlans: Map<string, TravelPlan> = new Map();
  private emergencyProfiles: Map<string, EmergencyProfile> = new Map();

  /**
   * Grant location consent (opt-in required)
   */
  async grantLocationConsent(patientId: string, optIn: boolean, method: 'settings' | 'consent_flow'): Promise<LocationConsent> {
    const consent: LocationConsent = {
      patientId,
      optIn,
      optInAt: new Date().toISOString(),
      optInMethod: method,
    };
    this.consents.set(patientId, consent);
    return consent;
  }

  /**
   * Get location consent status
   */
  async getLocationConsent(patientId: string): Promise<LocationConsent | null> {
    return this.consents.get(patientId) || null;
  }

  /**
   * Create travel plan with map provider adapter.
   * No PHI sent to map provider — only address and coordinates.
   */
  async createTravelPlan(
    patientId: string,
    destinationFacilityName: string,
    destinationAddress: string,
    appointmentId?: string,
    originAddress?: string
  ): Promise<TravelPlan> {
    // Check location consent before any travel operation
    const consent = await this.getLocationConsent(patientId);
    if (!consent || !consent.optIn) {
      throw new BadRequestException('Location consent required to create travel plan');
    }

    const id = `travel-${crypto.randomUUID().slice(0, 8)}`;
    const plan: TravelPlan = {
      id,
      patientId,
      destinationFacilityName,
      destinationAddress,
      estimatedTravelMinutes: 30, // Mock value
      registrationBufferMinutes: 15,
      parkingBufferMinutes: 10,
      status: 'pending',
      mapProvider: 'mock',
    };

    if (appointmentId) plan.appointmentId = appointmentId;
    if (originAddress) plan.originAddress = originAddress;

    this.travelPlans.set(id, plan);
    return plan;
  }

  /**
   * Generate web map link (no PHI in request)
   * Falls back to address-only if geolocation fails
   */
  generateMapLink(plan: TravelPlan): string {
    const query = encodeURIComponent(`${plan.destinationFacilityName} ${plan.destinationAddress}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  /**
   * Update travel status (Traveling, Arrived)
   */
  async updateTravelStatus(id: string, status: 'pending' | 'traveling' | 'arrived'): Promise<TravelPlan> {
    const plan = this.travelPlans.get(id);
    if (!plan) throw new NotFoundException(`Travel plan ${id} not found`);

    plan.status = status;
    this.travelPlans.set(id, plan);
    return plan;
  }

  /**
   * Get travel plan
   */
  async getTravelPlan(id: string): Promise<TravelPlan | null> {
    return this.travelPlans.get(id) || null;
  }

  /**
   * Create or update Emergency Profile (opt-in required for offline use)
   */
  async upsertEmergencyProfile(profile: EmergencyProfile): Promise<EmergencyProfile> {
    if (!profile.optInOffline) {
      throw new BadRequestException('Opt-in required for offline emergency profile');
    }

    profile.updatedAt = new Date().toISOString();

    // Generate QR token for the profile
    profile.qrToken = crypto.createHash('sha256')
      .update(`${profile.patientId}-${profile.updatedAt}-${crypto.randomBytes(8).toString('hex')}`)
      .digest('hex')
      .slice(0, 16);

    this.emergencyProfiles.set(profile.patientId, profile);
    return profile;
  }

  /**
   * Get Emergency Profile (returns only QR-safe fields if requested)
   */
  async getEmergencyProfile(patientId: string, qrSafeOnly: boolean = false): Promise<Partial<EmergencyProfile> | null> {
    const profile = this.emergencyProfiles.get(patientId);
    if (!profile) return null;

    if (qrSafeOnly) {
      const qrSafe: Partial<EmergencyProfile> = {
        patientId: profile.patientId,
      };
      if (profile.bloodType) qrSafe.bloodType = profile.bloodType;
      if (profile.allergies) qrSafe.allergies = profile.allergies;
      if (profile.conditions) qrSafe.conditions = profile.conditions;
      if (profile.medications) qrSafe.medications = profile.medications;
      if (profile.emergencyContactName) qrSafe.emergencyContactName = profile.emergencyContactName;
      if (profile.emergencyContactPhone) qrSafe.emergencyContactPhone = profile.emergencyContactPhone;
      return qrSafe;
    }
    return profile;
  }

  /**
   * Generate tel: link for direct emergency call
   */
  generateTelLink(phoneNumber: string): string {
    return `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;
  }
}