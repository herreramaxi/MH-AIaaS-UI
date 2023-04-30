import { AuditModel } from "./audit.model";

export interface Dataset extends AuditModel{
    id: number;
    name: string;
    description: string;
}