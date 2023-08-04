export interface Workflow {
    id: number;
    name: string;
    description: string;
    isPublished?: boolean;
    root: string;
    createdBy?: string;
    createdOn?: Date;
    modifiedBy?: string;
    modifiedOn?: Date;
}