/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { permission_scope } from './permission_scope';
export type create_caregiver_invitation_request = {
    invitation_channel: create_caregiver_invitation_request.invitation_channel;
    invitee_contact: string;
    invitee_display_name: string;
    relationship_role: create_caregiver_invitation_request.relationship_role;
    permission_scopes: Array<permission_scope>;
    expires_at: string;
};
export namespace create_caregiver_invitation_request {
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
}

