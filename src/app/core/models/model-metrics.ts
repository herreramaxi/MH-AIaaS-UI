import { AuditModel } from "./audit.model";
import { Workflow } from "./workflow.model";

export interface ModelMetrics extends AuditModel {
    id: number;
    mLModelId: number;
    metricType: number;
    data: string;
}