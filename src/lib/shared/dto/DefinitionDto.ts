import type { ServiceKeys } from "./ServiceDto";

export interface DefinitionDto<L = string, T = any> {
    label: L;
    code: T;
}

export interface DefinitionStore {
    entityType: DefinitionDto[]
    entitySubtype: DefinitionDto[]
    contactType: DefinitionDto[]
    entityStatus: DefinitionDto[]
    profileStatus: DefinitionDto[]
    serviceStatusCode: DefinitionDto[]
    relationType: DefinitionDto[]
    serviceType: DefinitionDto<ServiceKeys, number>[]
}