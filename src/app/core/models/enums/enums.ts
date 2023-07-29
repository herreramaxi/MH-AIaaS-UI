export enum OperatorType {
    Nop = "Nop",
    Dataset = "Dataset",
    Clean = "Clean",
    Split = "Split",
    Train = "Train",
    Evaluate = "Evaluate",
    Normalize = "Normalize",
    EditDataset = "EditDataset"
}

export enum AuthenticationType {
    NA = 0,
    TokenBased = 2,
}

export enum MetricType {
    NA = 0,
    Regression = 1,
    BinaryClassification = 2,
}

export enum WorkflowRunStatus {
    Pending = 0,
    Running = 1,
    Finished = 2,
    Failed = 3
}

export enum WebSocketMessageType
{
    None = 0,
    WorkflowRunHistory=1 ,
    WorkflowNodeRunHistory = 2,
}