import { AuditModel } from "./audit.model";
import { Workflow } from "./workflow.model";

export interface MlModel extends AuditModel {
    id: number;
    workflowId: number;
    name: string;
    fileName: string;
    size: number;
    isPublished?: boolean;
    // workflow: Workflow;
}