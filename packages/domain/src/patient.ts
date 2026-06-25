import { EntityMetadata, SoftDeletable, DataSource } from './metadata.js';

/**
 * Patient Profile entity
 *
 * Portable domain model representing a patient's health profile.
 */

export interface Allergy {
  substance: string; // e.g., 'Penicillin', 'Peanuts'
  severity?: 'mild' | 'moderate' | 'severe';
  reaction?: string; // e.g., 'Rash', 'Anaphylaxis'
  verifiedAt?: string;
  source?: DataSource;
}

export interface Condition {
  name: string; // e.g., 'Type 2 Diabetes', 'Hypertension'
  icdCode?: string; // ICD-10 or ICD-11 code
  diagnosedAt?: string; // ISO 8601 date
  status?: 'active' | 'resolved' | 'in-remission';
  notes?: string;
  source?: DataSource;
}

export interface EmergencyContact {
  name: string;
  relationship: string; // e.g., 'Spouse', 'Child', 'Friend'
  phoneNumber: string;
  isPrimary: boolean;
}

export interface Demographics {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // ISO 8601 date (YYYY-MM-DD)
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  nationalId?: string; // Encrypted/masked
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface EmergencySettings {
  sosEnabled: boolean;
  emergencyContacts: EmergencyContact[];
  medicalConditionSummary?: string; // Brief summary for emergency responders
  emergencyCardPhotoUrl?: string; // Reference to stored emergency card image
}

export interface PatientProfile extends EntityMetadata, SoftDeletable {
  // Ownership
  accountOwnerUserId: string; // User ID who owns this patient profile

  // Demographics
  demographics: Demographics;

  // Medical information
  conditions: Condition[];
  allergies: Allergy[];

  // Emergency
  emergencySettings: EmergencySettings;

  // Settings
  timezone: string; // IANA timezone for appointments/medication schedules
  preferredLanguage: string; // e.g., 'th', 'en'
}

/**
 * Healthcare Facility entity
 */
export interface HealthcareFacility extends EntityMetadata {
  name: string;
  facilityType?: 'hospital' | 'clinic' | 'pharmacy' | 'laboratory' | 'other';
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  contact?: {
    phoneNumber?: string;
    email?: string;
    website?: string;
  };
  // For future use
  operatingHours?: Record<string, unknown>;
}

/**
 * Patient Repository Interface
 */
export interface PatientRepository {
  /**
   * Find patient by ID
   */
  findById(id: string): Promise<PatientProfile | null>;

  /**
   * Find patients owned by a user
   */
  findByOwner(ownerId: string): Promise<PatientProfile[]>;

  /**
   * Create a new patient profile
   */
  create(patient: PatientProfile): Promise<PatientProfile>;

  /**
   * Update an existing patient profile
   * Uses optimistic concurrency
   */
  update(patient: PatientProfile): Promise<PatientProfile>;

  /**
   * Soft delete a patient profile
   */
  softDelete(id: string, deletedBy?: string): Promise<void>;
}

/**
 * Facility Repository Interface
 */
export interface FacilityRepository {
  /**
   * Find facility by ID
   */
  findById(id: string): Promise<HealthcareFacility | null>;

  /**
   * Search facilities by name or location
   */
  search(options: {
    query?: string;
    near?: { latitude: number; longitude: number; radiusKm: number };
    limit?: number;
    cursor?: string;
  }): Promise<{ facilities: HealthcareFacility[]; nextCursor?: string }>;

  /**
   * Create a new facility
   */
  create(facility: HealthcareFacility): Promise<HealthcareFacility>;

  /**
   * Update an existing facility
   */
  update(facility: HealthcareFacility): Promise<HealthcareFacility>;
}
