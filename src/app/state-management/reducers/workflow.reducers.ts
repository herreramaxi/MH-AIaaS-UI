import { Action, createReducer, on } from "@ngrx/store";
import * as moment from 'moment';
import { Workflow } from "src/app/core/models";
import { operatorSaved, workflowChange, workflowChangedError, workflowChangedSuccess, workflowLoad, workflowLoadError, workflowLoadSuccess, workflowPublish, workflowPublishFailed, workflowPublishSuccess, workflowRun, workflowRunFailed, workflowRunSuccess, workflowSave, workflowSaveFailed, workflowSavedSuccess } from "../actions/workflow.actions";
import { AppState } from "./reducers";

export interface WorkflowState {
    workflow?: Workflow;
    workflowValidated?: Workflow;
    isModelGenerated?: boolean;
    isPublished?: boolean;
    operatorSaved?: Date;
    status?: string;
    error?: string;
}

export const initialState: WorkflowState = {
    workflow: undefined,
    workflowValidated: undefined,
    status: undefined,
    error: undefined,
    isModelGenerated: false,
    isPublished: false
};

export const workflowReducer = createReducer(
    initialState,
    on(workflowLoad, (state, action) => {
        console.log("workflowReducer-workflowLoad")
        return ({ ...state })
    }),
    on(workflowLoadSuccess, (state, result) => {
        console.log("workflowReducer-workflowLoadSuccess")
        console.log(`isModelGenerated: ${result.isModelGenerated}`)
        console.log(`isPublished: ${result.isPublished}`)
        return ({ workflow: result, isModelGenerated: result.isModelGenerated, isPublished: result.isPublished })
    }),
    on(workflowLoadError, (state, result: any) => {

        console.log("workflowReducer-workflowLoadError")
        console.log(`error: ${result}`)
        console.log(result)
        return ({ ...state, error: result, status: 'Load failed...' })
    }),
    // on(workflowChange, (state) => {
    //     console.log("workflowReducer-workflowChange")
    //     return ({ ...state })
    // }),
    on(workflowChangedSuccess, (state, result) => {

        console.log("workflowReducer-workflowChangedSuccess")
        return ({ workflowValidated: result, isModelGenerated: result.isModelGenerated, isPublished: result.isPublished })
    }),
    on(workflowChangedError, (state, result: any) => {

        console.log("workflowReducer-workflowChangedError")
        console.log(`error: ${result}`)
        console.log(result)
        return ({ ...state, error: result, status: 'Processing failed...' })
    }),
    on(operatorSaved, (state) => {
        console.log("workflowReducer-operatorSaved")
        return ({ ...state, operatorSaved: new Date() })
    }),
    on(workflowSave, (state) => {

        console.log("workflowReducer-workflowSave")
        return ({ ...state, status: "Saving..." })
    }),
    on(workflowSavedSuccess, (state, result) => {

        console.log("workflowReducer-workflowSaveSuccess")
        return ({ ...state, workflowValidated: result, status: `Saved at ${moment(new Date(result.modifiedOn)).format("H:MM:ss")}` })
    }),
    on(workflowRun, (state) => {

        console.log("workflowReducer-workflowRun")
        return ({ ...state, status: "Running..." })
    }),
    on(workflowRunSuccess, (state, result) => {

        console.log("workflowReducer-workflowRunSuccess")
        return ({ ...state, workflowValidated: result, isModelGenerated: result.isModelGenerated, status: `Finished running` })
    }),
    on(workflowSaveFailed, (state, result: any) => {

        console.log("workflowReducer-workflowSaveFailed")
        console.log(`error: ${result}`)
        console.log(result)
        return ({ ...state, error: result, status: 'Save failed...' })
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
        return ({ ...state, status: `Finished publishing`, isPublished: true })
    }),
    on(workflowPublishFailed, (state, result: any) => {

        console.log("workflowReducer-workflowPublishFailed")
        console.log(`error: ${result}`)
        console.log(result)
        return ({ ...state, error: result, status: 'Publishing failed...' })
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
export const selectWorkflowIsPublished = (appState: AppState) => appState.workflowState.isPublished;
