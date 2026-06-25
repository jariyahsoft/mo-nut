/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $command_ack = {
    properties: {
        command_id: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        resource_id: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
