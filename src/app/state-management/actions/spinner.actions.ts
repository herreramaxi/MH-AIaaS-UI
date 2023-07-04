import { createAction } from "@ngrx/store";

export const spinnerLoadType = '[Spinner] Load';
export const spinnerFInishType = '[Spinner] Finish';
export const spinnerLoad = createAction(spinnerLoadType);
export const spinnerFinish = createAction(spinnerFInishType);