import type { RemarksDto } from "./JsonDto";
import type { ClientCoDto } from "./ProfileDto";
import type { ServiceDto } from "./ServiceDto";
import type { FeeType, InvoiceStatusCode, PaymentStatusCode, SvcTypeId, SvcTypeLabel, TaskStatusCode, WorkflowStatusCode } from "./enums";

export interface TaskDto {
    taskId: number;
    svcYear: number;
    svcId: number;
    svcTypeId: SvcTypeId;
    ownerId: number;

    svcProviderId?: number;
    picId?: number;
    closingStock?: number;
    dateDue?: Date;
    dateReady?: Date;
    dateQueriesReceived?: Date;
    dateQueriesReplied?: Date;
    dateAuditPageSigned?: Date;
    dateTaxPageSigned?: Date;
    dateCosecAccPageSigned?: Date;
    dateSendbackClient?: Date;
    dateSendbackAuditor?: Date;
    dateReportScanned?: Date;
    dateLate?: Date;
    dateDocsReceived?: Date;
    dateDraftReviewed?: Date;
    dateDraftReturned?: Date;
    dateClientSigned?: Date;
    dateSubmitted?: Date;

    submission1?: string;
    revision1?: string;
    revision2?: string;
    revisionMth11?: string;
    engagementType?: string;
    feeType?: FeeType;
    fee?: number;
    feePaidDate?: Date;
    taskStatusCode: TaskStatusCode; // required

    invoiceNo?: string;
    invoiceAmount?: number;
    invoiceStatusCode?: InvoiceStatusCode;
    paymentStatusCode?: PaymentStatusCode;

    workflowStatusCode?: WorkflowStatusCode;
    remarks: RemarksDto[]; // required
}

type xtraAssignment = { 
    picName: string, 
    svcProviderName: string 
    defaultPicName: string, 
    defaultSvcProviderName: string 
};

export type TaskClientDto = TaskDto & ServiceDto & ClientCoDto & xtraAssignment

export interface TaskFilterDto {
    listOfSvcTypeIds: SvcTypeId[];
    listOfYears: number[];
    taskId: number;
    ownerId: number;
}

export interface TaskCreationEntry extends TaskDto {
    listOfSvcYears: string;
}

export type TaskCreationDto = {
    service: Record<SvcTypeLabel, TaskCreationEntry>
}
