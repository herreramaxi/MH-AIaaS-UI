export interface Dataset {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdOn: Date;
    ModifiedBy: string;
    ModifiedOn?: Date;
}