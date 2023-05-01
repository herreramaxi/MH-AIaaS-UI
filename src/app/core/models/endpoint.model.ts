import { AuditModel } from "./audit.model";

export interface Endpoint extends AuditModel {
    id: number;
    name: string;
    modelId: number;
    workflowId: number;
    modelName: string;
    workflowName: string;
    isEnabled: boolean;
    authenticationMethod: string;
    apiKey: string;
}