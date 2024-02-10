import { ServiceStatusCode, ServiceType } from "./enums"
import type { RemarksDto } from "./JsonDto";

export interface ServiceDto {
    svcId: number;
    svcTypeId: ServiceType;
    ownerId: number;
    defaultSvcProviderId: number | null;
    defaultPicId: number | null;
    remarks: RemarksDto[];
    svcStatusCode: ServiceStatusCode;
}

type ServiceKeys = keyof typeof ServiceType
export type ServiceDataset = Record<ServiceKeys, ServiceDto | null>

export class ServiceFilterDto {
    svcId: number;
    svcTypeId: ServiceType;
    listOfSvcTypeIds: ServiceType[];
    ownerId: number;
}