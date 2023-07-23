import { AuditModel } from "./audit.model";

export interface ModelMetrics extends AuditModel {
    id: number;
    mLModelId: number;
    metricType: number;
    data: string;
}