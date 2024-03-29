import type { SvcStatusCode, SvcTypeId } from "./enums"
import type { RemarksDto } from "./JsonDto";

export interface ServiceDto {
    svcId: number;
    svcTypeId: SvcTypeId;
    ownerId: number;
    defaultSvcProviderId: number | null;
    defaultPicId: number | null;
    remarks: RemarksDto[];
    svcStatusCode: SvcStatusCode;
}

export interface ServiceFilterDto {
    svcId: number;
    svcTypeId: SvcTypeId;
    listOfSvcTypeIds: SvcTypeId[];
    ownerId: number;
}

export interface ServiceEngagedDto {
    accStatusCode: SvcStatusCode;
    auditStatusCode: SvcStatusCode;
    cosecStatusCode: SvcStatusCode;
    formeStatusCode: SvcStatusCode;
    formcStatusCode: SvcStatusCode;
    cp204StatusCode: SvcStatusCode;
}