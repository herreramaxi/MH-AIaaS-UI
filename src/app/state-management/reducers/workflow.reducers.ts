import { Action, createReducer, on } from "@ngrx/store";
import { Workflow } from "src/app/core/models";
import { workflowChangedError, workflowChangedSuccess, workflowLoadError, workflowLoadSuccess, workflowPublish, workflowPublishFailed, workflowPublishSuccess, workflowRun, workflowRunFailed, workflowRunSuccess, workflowSave, workflowSaveFailed, workflowSavedSuccess } from "../actions/workflow.actions";
import { AppState } from "./reducers";

export interface WorkflowState {
    workflow?: Workflow;
    isModelGenerated?: boolean;
    isPublished?: boolean;
    status?: string;
    error?: string;
}

export const initialState: WorkflowState = {
    workflow: undefined,
    status: undefined,
    error: undefined,
    isModelGenerated: false,
    isPublished: false
};

export const workflowReducer = createReducer(
    initialState,
    on(workflowLoadSuccess, (state, result) => {
        return ({ workflow: result, isModelGenerated: result.isModelGenerated, isPublished: result.isPublished })
    }),
    on(workflowLoadError, (state, result: any) => {
        return ({ ...state, error: result, status: 'Load failed...' })
    }),
    on(workflowChangedSuccess, (state, result) => {
        return ({ workflowValidated: result, isModelGenerated: result.isModelGenerated, isPublished: result.isPublished })
    }),
    on(workflowChangedError, (state, result: any) => {
        return ({ ...state, error: result, status: 'Processing failed...' })
    }),
    on(workflowSave, (state) => {
        return ({ ...state, status: "Saving..." })
    }),
    on(workflowSavedSuccess, (state, result) => {  
        return ({ ...state, status: `Saved at ${result.savedAt}` })
    }),
    on(workflowRun, (state) => {
        return ({ ...state, status: "Running..." })
    }),
    on(workflowRunSuccess, (state, result) => {
        return ({ ...state, workflowValidated: result, isModelGenerated: result.isModelGenerated, status: `Finished running` })
    }),
    on(workflowSaveFailed, (state, result: any) => {
        return ({ ...state, error: result, status: 'Save failed...' })
    }),
    on(workflowRunFailed, (state, result: any) => {
        return ({ ...state, error: result, status: 'Running failed...' })
    }),
    on(workflowPublish, (state) => {
        return ({ ...state, status: "Publishing..." })
    }),
    on(workflowPublishSuccess, (state, result) => {
        console.log("workflowReducer-workflowPublishSuccess")
        return ({ ...state, status: `Finished publishing`, isPublished: true })
    }),
    on(workflowPublishFailed, (state, result: any) => {
        return ({ ...state, error: result, status: 'Publishing failed...' })
    }),
);

export function reducer(state: WorkflowState | undefined, action: Action): any {
    return workflowReducer(state, action);
}

export const selectWorkflow = (appState: AppState) => appState.workflowState.workflow;
export const selectWorkflowStatus = (appState: AppState) => appState.workflowState.status;
// export const selectOperatorSaved = (appState: AppState) => appState.workflowState.operatorSaved;
export const selectWorkflowError = (appState: AppState) => appState.workflowState.error;
export const selectWorkflowIsModelGenerated = (appState: AppState) => appState.workflowState.isModelGenerated;
export const selectWorkflowIsPublished = (appState: AppState) => appState.workflowState.isPublished;
