/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { platform } from './platform';
export type device_session = {
    session_id: string;
    user_id: string;
    status: device_session.status;
    issued_at: string;
    expires_at: string;
    last_seen_at: string;
    device_name: string;
    platform: platform;
    current: boolean;
};
export namespace device_session {
    export enum status {
        ACTIVE = 'active',
        REVOKED = 'revoked',
    }
}

