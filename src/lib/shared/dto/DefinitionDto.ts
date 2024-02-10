export interface DefinitionDto {
    label: string;
    code: any;
}

export interface DefinitionStore {
    entityType: DefinitionDto[]
    entitySubtype: DefinitionDto[]
    contactType: DefinitionDto[]
    entityStatus: DefinitionDto[]
    profileStatus: DefinitionDto[]
    serviceStatusCode: DefinitionDto[]
    relationType: DefinitionDto[]
    serviceType: DefinitionDto[]
}