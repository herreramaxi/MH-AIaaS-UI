import { AuditModel } from "./audit.model";
import { Workflow } from "./workflow.model";

export interface MlModel extends AuditModel {
    id: number;
    name: string;
    status: string;
    workflow: Workflow;
}