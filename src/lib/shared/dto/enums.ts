// **************
// static objects
// **************
export const MyEntityType = {
    INDIVIDUAL: 1,
    COMPANY: 2,
} as const

export const MyEntityClass = {
    CLIENT: 1,
    SERVICE_PROVIDER: 2,
} as const

export const MyEntitySubtype = {
    SDN_BHD: 200,
    SOLE_PROP: 201,
    PARTNERSHIP: 202,
    LLP: 203,
} as const

export const MyContactType = {
    LAND_LINE: 1,
    HAND_PHONE: 2,
    EMAIL: 3,
} as const

export const MyMonth = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
}

export const MyEntityStatus = {
    ACTIVE: 1,
    DORMANT: 2,
    STRIKE_OFF: 3,
} as const

export const MyProfileStatus = {
    PRE_ACTIVATION: 1,
    ACTIVE: 2,
    RESIGNED: 3,
} as const

export const MyRelationType = {
    STAFF: 1,
} as const

export const MySvcTypeId = {
    ACCOUNT: 100,
    // TAX: 200,
    AUDIT: 300,
    COSEC: 400,
    FORM_C: 201,
    FORM_E: 202,
    CP204: 203,
} as const

export const MySvcStatusCode = {
    ACTIVE: 1,
    SUSPENDED: 2,
} as const

export const MyFeeType = {
    ACC_MONTHLY: 1000,
    TAX_AGENT_FEE: 2000,
    CP204: 2030,
} as const

export const MyTaskStatusCode = {
    ACTIVE: 100,
    KIV: 900,
} as const

export const MyYesNo = {
    YES: 1,
    NO: 0,
}

export const MyInvoiceStatusCode = {
    TASK_IN_PROGRESS: 0,
    INVOICE_PENDING: 10,
    INVOICE_ISSUED: 20,
    PAYMENT_DONE: 30,
} as const

export const MyPaymentStatusCode = {
    NOT_STARTED: 0,
    PENDING: 10,
    PAID: 20,
} as const

export const MyWorkflowStatusCode = {
    KICKSTARTED: 1,
    WORK_IN_PROGRESS: 10,
    COMPLETED: 20,
    PAID: 30,
} as const

// *************************
// object to web consumables
// *************************
export interface DefinitionDto<E> {
    code: E[keyof E],
    label: keyof E
}

export interface DefinitionDto2 {
    code: number;
    label: string
}

type FnEnumToObj = <E extends Record<string, number>>(definitionEnum: E) => DefinitionDto<E>[]
export const enumToObj: FnEnumToObj = (definitionEnum) => {
    const result = [];
    for (const key in definitionEnum) {
        const code = definitionEnum[key];
        const label = key;
        result.push({ code, label })
    }
    return result;
}

export const store = {
    entityType: enumToObj(MyEntityType),
    entityClass: enumToObj(MyEntityClass),
    entitySubtype: enumToObj(MyEntitySubtype),
    contactType: enumToObj(MyContactType),
    entityStatus: enumToObj(MyEntityStatus),
    profileStatus: enumToObj(MyProfileStatus),
    relationType: enumToObj(MyRelationType),
    svcTypeId: enumToObj(MySvcTypeId),
    svcStatusCode: enumToObj(MySvcStatusCode),
    feeType: enumToObj(MyFeeType),
    yesNo: enumToObj(MyYesNo),
    taskStatusCode: enumToObj(MyTaskStatusCode),
    workflowStatusCode: enumToObj(MyWorkflowStatusCode),
    invoiceStatusCode: enumToObj(MyInvoiceStatusCode),
    paymentStatusCode: enumToObj(MyPaymentStatusCode),
}

// **************
// typing objects
// **************
export type EntityType = (typeof MyEntityType)[keyof typeof MyEntityType]
export type EntityClass = (typeof MyEntityClass)[keyof typeof MyEntityClass]
export type EntitySubtype = (typeof MyEntitySubtype)[keyof typeof MyEntitySubtype]
export type ContactType = (typeof MyContactType)[keyof typeof MyContactType]
export type EntityStatus = (typeof MyEntityStatus)[keyof typeof MyEntityStatus]
export type ProfileStatus = (typeof MyProfileStatus)[keyof typeof MyProfileStatus]
export type RelationType = (typeof MyRelationType)[keyof typeof MyRelationType]

export type SvcTypeLabel = keyof typeof MySvcTypeId;
export type SvcTypeId = (typeof MySvcTypeId)[SvcTypeLabel]
export type SvcStatusCode = (typeof MySvcStatusCode)[keyof typeof MySvcStatusCode]
export type FeeType = (typeof MyFeeType)[keyof typeof MyFeeType]
export type YesNo = (typeof MyYesNo)[keyof typeof MyYesNo]
export type TaskStatusCode = (typeof MyTaskStatusCode)[keyof typeof MyTaskStatusCode]
export type InvoiceStatusCode = (typeof MyInvoiceStatusCode)[keyof typeof MyInvoiceStatusCode]
export type WorkflowStatusCode = (typeof MyWorkflowStatusCode)[keyof typeof MyWorkflowStatusCode]
export type PaymentStatusCode = (typeof MyPaymentStatusCode)[keyof typeof MyPaymentStatusCode]

export type EnumStore = typeof store;

export enum HttpStatusCode {
    OK = 200,
    OK_CREATED = 201,
    NO_CONTENT = 204,
    BAD_RESPONSE = 400,
    UNAUTHORISED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ALLOWED = 405,
    CONFLICT = 409,
    GONE = 410,
    SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
}
