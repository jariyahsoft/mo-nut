import { Injectable } from '@nestjs/common';

export interface ConsentRecord {
  id: string;
  userId: string;
  type: 'terms' | 'privacy' | 'health_data';
  version: string;
  accepted: boolean;
  acceptedAt: string;
  ipAddress?: string | undefined;
  userAgent?: string | undefined;
}

export interface ConsentRequirement {
  type: string;
  version: string;
  title: string;
  titleTh: string;
  required: boolean;
  accepted: boolean;
}

@Injectable()
export class ConsentService {
  // In production, consents are persisted to Firestore via repository
  private consents: Map<string, ConsentRecord> = new Map();

  /**
   * Get consent requirements for onboarding.
   */
  async getRequiredConsents(userId: string): Promise<ConsentRequirement[]> {
    const accepted = Array.from(this.consents.values())
      .filter((c) => c.userId === userId && c.accepted)
      .map((c) => c.type);

    return [
      {
        type: 'terms',
        version: '1.0',
        title: 'Terms of Service',
        titleTh: 'ข้อกำหนดการใช้บริการ',
        required: true,
        accepted: accepted.includes('terms'),
      },
      {
        type: 'privacy',
        version: '1.0',
        title: 'Privacy Notice',
        titleTh: 'นโยบายความเป็นส่วนตัว',
        required: true,
        accepted: accepted.includes('privacy'),
      },
      {
        type: 'health_data',
        version: '1.0',
        title: 'Health Data Consent',
        titleTh: 'ความยินยอมข้อมูลสุขภาพ',
        required: true,
        accepted: accepted.includes('health_data'),
      },
    ];
  }

  /**
   * Accept a consent document.
   */
  async acceptConsent(
    userId: string,
    type: string,
    version: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ConsentRecord> {
    const record: ConsentRecord = {
      id: `${userId}:${type}:${version}`,
      userId,
      type: type as ConsentRecord['type'],
      version,
      accepted: true,
      acceptedAt: new Date().toISOString(),
      ...(ipAddress ? { ipAddress } : {}),
      ...(userAgent ? { userAgent } : {}),
    };

    this.consents.set(record.id, record);
    return record;
  }

  /**
   * Check if all required consents are accepted.
   */
  async hasAcceptedRequired(userId: string): Promise<boolean> {
    const required = await this.getRequiredConsents(userId);
    return required.every((r) => r.accepted);
  }
}
