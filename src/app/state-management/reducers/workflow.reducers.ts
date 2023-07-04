import { Action, ActionReducerMap, createReducer, on } from "@ngrx/store";
import * as moment from 'moment';
import { Workflow } from "src/app/core/models";
import { operatorSaved, workflowChange, workflowChangedError, workflowChangedSuccess, workflowLoad, workflowLoadSuccess, workflowPublish, workflowPublishSuccess, workflowRun, workflowRunFailed, workflowRunSuccess, workflowSave, workflowSavedSuccess } from "../actions/workflow.actions";
import { AppState } from "./reducers";

export interface WorkflowState {
    workflow?: Workflow;
    workflowValidated?: Workflow;
    isModelGenerated?: boolean;
    operatorSaved?: boolean;
    status?: string;
    error?: string;
}

export const initialState: WorkflowState = {
    workflow: undefined,
    workflowValidated: undefined,
    status: undefined,
    error: undefined,
    isModelGenerated: false
};

export const workflowReducer = createReducer(
    initialState,
    on(workflowLoad, (state, action) => {
        console.log("workflowReducer-workflowLoad")
        return ({ ...state })
    }),
    on(workflowChange, (state) => {
        console.log("workflowReducer-workflowChange")
        return ({ ...state })
    }),
    on(workflowLoadSuccess, (state, result) => {
        console.log("workflowReducer-workflowLoadSuccess")
        console.log(`isModelGenerated: ${result.isModelGenerated}`)
        return ({ workflow: result, operatorSaved: false, isModelGenerated: result.isModelGenerated })
    }),
    on(workflowChangedSuccess, (state, result) => {

        console.log("workflowReducer-workflowChangedSuccess")
        return ({ workflowValidated: result, isModelGenerated: result.isModelGenerated })
    }),
    on(workflowChangedError, (state, result: any) => {

        console.log("workflowReducer-workflowChangedError")
        console.log(`error: ${result}`)
        console.log(result)
        return ({ ...state, error: result, status: 'Processing failed...' })
    }),
    on(operatorSaved, (state) => {
        console.log("workflowReducer-operatorSaved")
        return ({ ...state, operatorSaved: true })
    }),
    on(workflowSave, (state) => {

        console.log("workflowReducer-workflowSave")
        return ({ ...state, status: "Saving..." })
    }),
    on(workflowSavedSuccess, (state, result) => {

        console.log("workflowReducer-workflowSaveSuccess")
        return ({ ...state, status: `Saved at ${moment(new Date(result.modifiedOn)).format("H:MM:ss")}` })
    }),
    on(workflowRun, (state) => {

        console.log("workflowReducer-workflowRun")
        return ({ ...state, status: "Running..." })
    }),
    on(workflowRunSuccess, (state, result) => {

        console.log("workflowReducer-workflowRunSuccess")
        return ({ ...state, workflowValidated: result, isModelGenerated: result.isModelGenerated, status: `Finished running` })
    }),
    on(workflowRunFailed, (state, result: any) => {

        console.log("workflowReducer-workflowRunFailed")
        console.log(`error: ${result}`)
        console.log(result)
        return ({ ...state, error: result, status: 'Running failed...' })
    }),
    on(workflowPublish, (state) => {
        console.log("workflowReducer-workflowPublish")
        return ({ ...state, status: "Publishing..." })
    }),
    on(workflowPublishSuccess, (state, result) => {
        console.log("workflowReducer-workflowPublishSuccess")
        return ({ ...state, status: `Finished publishing` })
    }),
);

export function reducer(state: WorkflowState | undefined, action: Action): any {
    return workflowReducer(state, action);
}

export const selectWorkflow = (appState: AppState) => appState.workflowState.workflow;
export const selectWorkflowValidated = (appState: AppState) => appState.workflowState.workflowValidated;
export const selectWorkflowStatus = (appState: AppState) => appState.workflowState.status;
export const selectOperatorSaved = (appState: AppState) => appState.workflowState.operatorSaved;
export const selectWorkflowError = (appState: AppState) => appState.workflowState.error;
export const selectWorkflowIsModelGenerated = (appState: AppState) => appState.workflowState.isModelGenerated;
