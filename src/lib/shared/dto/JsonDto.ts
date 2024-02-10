import { ContactType } from "./enums"

export interface ContactDto {
    name: string;
    type: ContactType;
    contact: string;
    note: string;
    isPrimary: boolean;
}

export interface DirectorDto {
    name: string;
    ic: string;
    login: string;
    pwd: string;
}

export interface RemarksDto {
    date: Date;
    remarks: string;
}

export type newRemarks = { newRemarks: string }