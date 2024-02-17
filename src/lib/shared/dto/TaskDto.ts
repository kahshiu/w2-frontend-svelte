import type { RemarksDto, newRemarks } from "./JsonDto";
import type { ClientCoDto } from "./ProfileDto";
import type { ServiceDto } from "./ServiceDto";
import type { FeeType, InvoiceStatusCode, SvcTypeId, SvcTypeLabel, TaskStatusCode, WorkflowStatusCode, YesNo } from "./enums";

export interface TaskDto {
    taskId: number,
    svcYear: number,
    svcId: number,
    svcTypeId: SvcTypeId,
    ownerId: number,
    picId: number,
    svcProviderId: number,
    taskStatusCode: TaskStatusCode,
    workflowStatusCode: WorkflowStatusCode,

    feeType: FeeType,
    fee: number,
    engagementType: string,
    closingStock: YesNo,
    dateAuditDue: string | null,
    dateReadyAudit: string | null,
    dateQueriesReceived: string | null,
    dateQueriesReplied: string | null,
    dateAuditPageSigned: string | null,
    dateTaxPageSigned: string | null,
    dateCosecAccPageSigned: string | null,
    dateSendbackClient: string | null,
    dateSendbackAuditor: string | null,
    dateReportScanned: string | null,
    dateLateFiling: string | null,
    isLateFiling: YesNo,
    accountByUs: number,
    dateDocsIn: string | null,
    dateDraftReview: string | null,
    dateDraftReturn: string | null,
    dateClientSigned: string | null,
    isFeePaid: YesNo,
    dateSubmission: string | null,
    hasManagementAcc: YesNo,
    dateManagementAcc: string | null,
    hasTaxDraft1: YesNo,
    dateTaxDraft1: string | null,
    hasAuditDraft: YesNo,
    dateAuditDraft: string | null,
    dateTaxDraftWip: string | null,
    dateTaxDraftToReview: string | null,
    dateTaxDraftFromReview: string | null,
    dateTaxDraftToClient: string | null,
    dateTaxDraftSignedBack: string | null,

    submission1: string,
    revision1: string,
    revision2: string,
    revisionMth11: string,

    invoiceNo: string,
    invoiceAmount: number,
    invoiceDate: string | null,
    paymentNote: string,
    paymentDate: string | null,
    invoiceStatusCode: InvoiceStatusCode,
    remarks: RemarksDto[],
}

type xtraAssignment = { 
    picName: string, 
    svcProviderName: string 
    defaultPicName: string, 
    defaultSvcProviderName: string 
};

export type TaskClientDto = TaskDto & ServiceDto & ClientCoDto & xtraAssignment & cp204Years;

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

export type cp204Years = {
    svcYearNext: number;
    svcTypeIdNext: SvcTypeId,
    submission1Next: string,
    revision1Next: string,
    revision2Next: string,
    revisionMth11Next: string,

    svcYearPrev: number;
    svcTypeIdPrev: SvcTypeId,
    submission1Prev: string,
    revision1Prev: string,
    revision2Prev: string,
    revisionMth11Prev: string,
}
