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
    NA=0,
    TokenBased = 2,
}

export enum MetricType {
    NA=0,
    Regression = 1,
    BinaryClassification = 2,
}