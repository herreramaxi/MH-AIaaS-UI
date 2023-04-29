export interface Workflow {
    id: number;
    name: string;
    description: string;
    root: string;
    createdBy?: string;
    createdOn?: Date;
    ModifiedBy?: string;
    ModifiedOn?: Date;
}