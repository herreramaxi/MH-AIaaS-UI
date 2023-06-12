import { Action, ActionReducerMap, createReducer, on } from "@ngrx/store";
import { Workflow } from "src/app/core/models";
import { operatorSaved, workflowChange, workflowChangedSuccess, workflowLoad, workflowLoadSuccess, workflowRun, workflowRunSuccess, workflowSave, workflowSavedSuccess } from "../actions/workflow.actions";
import * as moment from 'moment';

export interface WorkflowState {
    workflow?: Workflow;
    workflowValidated?: Workflow;
    isLoading?: boolean;
    isLoadingSuccess?: boolean;
    isLoadingFailure?: boolean;
    operatorSaved?: boolean;
    status?: string;
}

export const initialState: WorkflowState = {
    workflow: undefined,
    workflowValidated: undefined,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    status: undefined
};

export const workflowReducer = createReducer(
    initialState,
    on(workflowLoad, (state, action) => {
        console.log("workflowReducer-workflowLoad")
        return ({ ...state, isLoading: true })
    }),
    on(workflowChange, (state) => {
        console.log("workflowReducer-workflowChange")
        return ({ ...state, isLoading: true })
    }),
    on(workflowLoadSuccess, (state, result) => {
        console.log("workflowReducer-workflowLoadSuccess")
        return ({ workflow: result, isLoading: false, isLoadingSuccess: true, operatorSaved: false })
    }),
    on(workflowChangedSuccess, (state, result) => {
        
        console.log("workflowReducer-workflowChangedSuccess")
        return ({ workflowValidated: result, isLoading: false, isLoadingSuccess: true })
    }),
    on(operatorSaved, (state) => {
        console.log("workflowReducer-operatorSaved")
        return ({ ...state, isLoading: true, operatorSaved: true })
    }),
    on(workflowSave, (state) => {
        
        console.log("workflowReducer-workflowSave")
        return ({ ...state, isLoading: true, status: "Saving..." })
    }),
    on(workflowSavedSuccess, (state, result) => {
        
        console.log("workflowReducer-workflowSaveSuccess")
        return ({ ...state, isLoading: false, isLoadingSuccess: true, status: `Saved at ${moment(new Date(result.modifiedOn)).format("H:MM:ss")}` })
    }),
    on(workflowRun, (state) => {
        
        console.log("workflowReducer-workflowRun")
        return ({ ...state, isLoading: true, status: "Running..." })
    }),
    on(workflowRunSuccess, (state, result) => {
        
        console.log("workflowReducer-workflowRunSuccess")
        return ({ ...state, workflowValidated: result, isLoading: false, isLoadingSuccess: true, status: `Finished running` })
    }),
);

export function reducer(state: WorkflowState | undefined, action: Action): any {
    return workflowReducer(state, action);
}

export const reducers: ActionReducerMap<AppState> = {
    workflowState: workflowReducer,
};

export const selectWorkflow = (appState: AppState) => appState.workflowState.workflow;
export const selectWorkflowValidated = (appState: AppState) => appState.workflowState.workflowValidated;
export const selectWorkflowStatus = (appState: AppState) => appState.workflowState.status;
export const selectOperatorSaved = (appState: AppState) => appState.workflowState.operatorSaved;

export interface AppState {
    workflowState: WorkflowState;
}