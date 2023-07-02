import { AuditModel } from "./audit.model";

export interface Dataset extends AuditModel {
    id: number;
    name: string;
    description: string;
    fileName?: string;
    size?: number;
    dataViewFileName?: string;
    dataViewFileSize?: number;
}