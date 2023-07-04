import { ActionReducerMap } from "@ngrx/store";
import { WorkflowState, workflowReducer } from "./workflow.reducers";
import { SpinnerState, spinnerReducer } from "./spinner.reducers";

export interface AppState {
    workflowState: WorkflowState;
    spinnerState: SpinnerState;
}

export const reducers: ActionReducerMap<AppState> = {
    workflowState: workflowReducer,
    spinnerState: spinnerReducer
};