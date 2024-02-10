import { RelationType } from "./enums";

export interface RelationDto {
    parentId: number;
    entityId: number;
    relationType: RelationType;
    relationDescription: string;
    isNew: boolean;
}

export interface RelationFilterDto {
    parentId: number
    entityId: number
    listOfEntityIds: number[]
    relationType: RelationType
}