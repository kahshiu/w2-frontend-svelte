import type { EntityStatus, EntityClass, EntitySubtype, EntityType, ProfileStatus } from "./enums"
import type { ContactDto, DirectorDto, RemarksDto } from "./JsonDto"
import type { RelationDto } from "./RelationDto"
import type { ServiceEngagedDto } from "./ServiceDto"

export interface ProfileDto {
    entityId: number
    entityName: string
    entityClass: EntityClass
    entityType: EntityType
    entitySubtype: EntitySubtype
    personIc: string
    coRegNoOld: string
    coRegNoNew: string
    dateIncorp: string | null // Date
    dateCommence: string | null // Date
    yearEndMth: number;
    arDueMth: number;
    incomeTaxBranch: string
    incomeTaxNo: string
    employerNo: string
    directorDetails: DirectorDto
    contactDetails: ContactDto[]
    remarks: RemarksDto[]
    entityStatus: EntityStatus
    profileStatus: ProfileStatus
}

export interface ProfileFilterDto {
    listOfEntityId: number[];
    listOfEntityType: EntityType[];
    listOfEntitySubtype: EntitySubtype[];
    listOfEntityStatus: EntityStatus[];
    listOfProfileStatus: ProfileStatus[];
    entityId: number;
    entityName: string;
    entityClass: EntityClass;
    entityType: EntityType;
    entityIdentifier: string;
    incomeTaxNo: string;
    incomeTaxBranch: string;
    employerNo: string;
}

export type StaffDto = (ProfileDto & RelationDto & { coId: number })

export type SvcProviderCoDto = ProfileDto & { staff: StaffSvelteDto[] }

export type ClientCoDto = ProfileDto
    // & { staff: StaffSvelteDto[] } 
    // & { services: ServiceDto[] }

export type ClientCoServices = ClientCoDto & ServiceEngagedDto;

export type ClientIndiDto = ProfileDto

export interface StaffSvelteDto {
    coId: number
    entityId: number
    staffName: string
    staffStatus: EntityStatus
    staffNotes: string
    contactEmail: string
    contactHandphone: string
    contactNotes: string
}