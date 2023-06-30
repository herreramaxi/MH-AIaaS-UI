import { AuditModel } from "./audit.model";

export interface Endpoint extends AuditModel {
    id?: number;
    name: string;
    description?: string;
    modelId?: number;
    workflowId?: number;
    modelName?: string;
    workflowName?: string;
    isEnabled?: boolean;
    authenticationType?: number;
    apiKey?: string;
}