// enums profile
export enum ProfileEntityClass {
    CLIENT = 1,
    SERVICE_PROVIDER = 2,
}

export enum ProfileEntityType{
    INDIVIDUAL = 1,
    COMPANY = 2,
}

export enum ProfileEntitySubtype {
    SDN_BHD = 200,
    SOLE_PROP = 201,
    PARTNERSHIP = 202,
    LLP = 203,
}

export enum ContactType {
    LAND_LINE = 1,
    HAND_PHONE = 2,
    EMAIL = 3,
}

export enum EntityStatus {
    ACTIVE = 1,
    DORMANT = 2, // company
    STRIKE_OFF = 3, // company
}

export enum ProfileStatus {
    PRE_ACTIVATION = 1,
    ACTIVE = 2,
    RESIGNED = 3,
}

// relations
export enum RelationType {
   Staff = 1, 
}

// enums services
export enum ServiceType {
    ACCOUNT = 100,
    TAX = 200,
    AUDIT = 300,
    COSEC = 400,
    FORM_C = 201,
    FORM_E = 202,
    CP204 = 203,
}

export enum ServiceStatusCode {
    ACTIVE = 1,
    SUSPENDED = 2,
}

export enum FeeType {
    ACC_MONTHLY = 1000,
    TAX_AGENT_FEE = 2000,
    CP204 = 2030,
} 

export enum TaskStatusCode {
    // ACC
    // TAX
    // AUDIT
    // COSEC

}
export enum InvoiceStatusCode {

}

export enum PaymentStatusCode {

}

// enums helpers
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
