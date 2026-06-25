/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type command_ack = {
    command_id: string;
    status: command_ack.status;
    resource_id: string;
};
export namespace command_ack {
    export enum status {
        ACCEPTED = 'accepted',
    }
}

