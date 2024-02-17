import type { ContactDto, RemarksDto, newRemarks } from "./JsonDto";
import type { ClientCoDto } from "./ProfileDto";
import type { ServiceDto } from "./ServiceDto";
import type { EntityStatus, EntitySubtype, FeeType, InvoiceStatusCode, ProfileStatus, SvcTypeId, SvcTypeLabel, TaskStatusCode, WorkflowStatusCode, YesNo } from "./enums";

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

    // ACC: fields + assignment + remarks
    feeType: FeeType,
    fee: number | null,
    engagementType: string,

    // AUDIT: fields + assignment + invoice + remarks
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

    // COSEC: no fields + assignment + remarks
    // FORM_E: fields + fees + dateSubmission + assignment + invoice + remarks
    accountByUs: number,
    dateDocsIn: string | null,
    dateDraftReview: string | null,
    dateDraftReturn: string | null,
    dateClientSigned: string | null,
    isFeePaid: YesNo,
    dateSubmission: string | null,

    // FORM_C: fields + fees + dateSubmission + assignment + invoice + remarks
    hasManagementAcc: YesNo,
    dateManagementAcc: string | null,
    hasTaxDraft1: YesNo,
    dateTaxDraft1: string | null,
    hasAuditDraft: YesNo, // corrected
    dateAuditDraft: string | null, // corrected
    dateTaxDraftWip: string | null,
    dateTaxDraftToReview: string | null,
    dateTaxDraftFromReview: string | null,
    dateTaxDraftToClient: string | null,
    dateTaxDraftSignedBack: string | null,

    // CP204: 3years + assignment + invoice + remarks
    submission1: string,
    revision1: string,
    revision2: string,
    revisionMth11: string,

    // invoice
    invoiceNo: string,
    invoiceAmount: number | null,
    invoiceDate: string | null,
    paymentNote: string,
    paymentDate: string | null,
    invoiceStatusCode: InvoiceStatusCode,

    // remarks
    remarks: RemarksDto[],
}


export interface TaskFilterDto {
    listOfSvcTypeIds: SvcTypeId[];
    listOfYears: number[];
    taskId: number;
    ownerId: number;
}

// SECTION: client task creation by years 
export interface TaskCreationEntry extends TaskDto {
    listOfSvcYears: string;
}

export type TaskCreationDto = {
    service: Record<SvcTypeLabel, TaskCreationEntry>
}

// SECTION: client task display/ update
export type TaskAssignmentNames = { 
    picName: string, 
    svcProviderName: string 
    defaultPicName: string, 
    defaultSvcProviderName: string 
};

export type TaskCp204Years = {
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

export type TaskClientDto = TaskDto & ServiceDto & ClientCoDto & TaskAssignmentNames & TaskCp204Years;

export type EditTaskDto = 
    ClientCoDto // client company details
    & ServiceDto // task-folder details 
    & TaskDto  // task details
    & TaskAssignmentNames // matched names of assigned pic, sp
    & TaskCp204Years // special handling of cp204
    & newRemarks // from frontend 

export type TaskAssignmentDto = {
    taskId: number,
    svcYear: number,
    svcId: number,
    svcTypeId: SvcTypeId,

    taskStatusCode: TaskStatusCode,
    workflowStatus: WorkflowStatusCode,
    MyInvoiceStatusCode: InvoiceStatusCode,

    entityId: number
    entitySubtype: EntitySubtype
    entityName: string
    contactDetails: ContactDto[]
    coRegNoOld: string
    coRegNoNew: string
    dateIncorp: string | null // Date
    dateCommence: string | null // Date
    yearEndMth: number
    arDueMth: number

    incomeTaxBranch: string
    incomeTaxNo: string
    employerNo: string
    entityStatus: EntityStatus
    profileStatus: ProfileStatus

    picName: string, 
    picContacts: ContactDto[],
    spName: string 
    spContacts: ContactDto[]
}