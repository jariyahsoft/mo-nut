import { EntityMetadata, SoftDeletable } from './metadata.js';

/**
 * User entity - represents an authenticated account
 *
 * Portable domain model that does not depend on Firebase types.
 */

export type AccountStatus = 'active' | 'suspended' | 'deleted' | 'pending_verification';

export type UserRole = 'patient' | 'caregiver' | 'clinician' | 'admin' | 'support' | 'org_staff';

export interface IdentityReference {
  provider: 'firebase' | 'google' | 'apple' | 'email';
  providerId: string; // UID from the provider
  email?: string;
  phoneNumber?: string;
}

export interface User extends EntityMetadata, SoftDeletable {
  // Identity mapping
  identityRefs: IdentityReference[]; // Multiple auth methods for same user

  // Profile
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  locale: string; // e.g., 'th-TH', 'en-US'

  // Access control
  roles: UserRole[];
  status: AccountStatus;

  // Settings
  preferences: {
    timezone: string; // IANA timezone
    notificationPrivacy: 'minimal' | 'summary' | 'full';
    fontScale: 'normal' | 'large' | 'extra-large';
    reducedMotion: boolean;
  };

  // Audit
  lastLoginAt?: string;
  lastActivityAt?: string;
  mfaEnabled: boolean;
}

/**
 * User Repository Interface
 *
 * Does not expose Firebase types - all operations use portable domain models.
 */
export interface UserRepository {
  /**
   * Find user by domain ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find user by Firebase UID (or other provider ID)
   * This is the primary mapping from authentication to domain user
   */
  findByIdentityRef(provider: string, providerId: string): Promise<User | null>;

  /**
   * Create a new user
   * If a user with the same identity already exists, throws DuplicateError
   */
  create(user: User): Promise<User>;

  /**
   * Update an existing user
   * Uses optimistic concurrency - throws VersionConflictError if version mismatch
   */
  update(user: User): Promise<User>;

  /**
   * Soft delete a user
   */
  softDelete(id: string, deletedBy?: string): Promise<void>;

  /**
   * List users (with pagination)
   */
  list(options: {
    limit?: number;
    cursor?: string;
    status?: AccountStatus;
  }): Promise<{ users: User[]; nextCursor?: string }>;
}
