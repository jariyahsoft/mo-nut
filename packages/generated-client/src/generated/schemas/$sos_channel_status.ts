/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $sos_channel_status = {
    properties: {
        channel: {
            type: 'Enum',
            isRequired: true,
        },
        delivery_status: {
            type: 'Enum',
            isRequired: true,
        },
        detail: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
