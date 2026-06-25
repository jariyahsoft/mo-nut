/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { permission_scope } from './permission_scope';
export type caregiver_invitation = {
    invitation_id: string;
    patient_id: string;
    invitation_channel: caregiver_invitation.invitation_channel;
    invitee_contact: string;
    invitee_display_name: string;
    relationship_role: caregiver_invitation.relationship_role;
    permission_scopes: Array<permission_scope>;
    status: caregiver_invitation.status;
    expires_at: string;
    created_at: string;
    invitation_token_preview: string;
};
export namespace caregiver_invitation {
    export enum invitation_channel {
        SMS = 'sms',
        EMAIL = 'email',
        QR = 'qr',
        LINK = 'link',
    }
    export enum relationship_role {
        PRIMARY = 'primary',
        BACKUP = 'backup',
        TRANSPORT = 'transport',
    }
    export enum status {
        PENDING = 'pending',
        ACCEPTED = 'accepted',
        REVOKED = 'revoked',
        EXPIRED = 'expired',
    }
}

