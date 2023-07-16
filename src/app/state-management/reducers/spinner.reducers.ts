import { Action, createReducer, on } from "@ngrx/store";
import { spinnerFinish, spinnerLoad } from "../actions/spinner.actions";
import { AppState } from "./reducers";

export interface SpinnerState {
    isLoading: boolean;
}

export const initialState: SpinnerState = {
    isLoading: false
};

export const spinnerReducer = createReducer(
    initialState,
    on(spinnerLoad, (state, action) => {
        return ({ isLoading: true })
    }),
    on(spinnerFinish, (state) => {
        return ({ isLoading: false })
    })
);


export function reducer(state: SpinnerState | undefined, action: Action): any {
    return spinnerReducer(state, action);
}

export const selectSpinnerIsLoading = (appState: AppState) => appState.spinnerState.isLoading;
