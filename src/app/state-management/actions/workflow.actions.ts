import { createAction, props } from '@ngrx/store';
import { Workflow } from 'src/app/core/models';

export const workflowLoadType = '[WorkflowDesigner] Load';
export const workflowLoadSuccessType = '[WorkflowDesigner] Load Success';
export const workflowChangeType = '[WorkflowDesigner] Change';
export const workflowChangedSuccessType = '[WorkflowDesigner] Changed Success';
export const workflowChangedErrorType = '[WorkflowDesigner] Changed Error';
export const workflowSaveType = '[WorkflowDesigner] Save';
export const workflowSavedSuccessType = '[WorkflowDesigner] Saved Success';
export const workflowRunType = '[WorkflowDesigner] Run';
export const workflowRunSuccessType = '[WorkflowDesigner] Run Success';
export const workflowPublishType = '[WorkflowDesigner] Publish';
export const workflowPublishSuccessType = '[WorkflowDesigner] Publish Success';

export const operatorSavedType = '[Operator Page] Saved';

export const workflowLoad = createAction(workflowLoadType, props<{ workflowId: number }>());
export const workflowLoadSuccess = createAction(workflowLoadSuccessType, props<any>());
export const workflowChange = createAction(workflowChangeType, props<{ workflow: Workflow }>());
export const workflowChangedSuccess = createAction(workflowChangedSuccessType, props<any>());
export const workflowChangedError = createAction(workflowChangedErrorType, props<{ error: string }>());
export const workflowSave = createAction(workflowSaveType, props<{ workflow: Workflow }>());
export const workflowSavedSuccess = createAction(workflowSavedSuccessType, props<any>());
export const workflowRun = createAction(workflowRunType, props<{ workflow: Workflow }>());
export const workflowRunSuccess = createAction(workflowRunSuccessType, props<any>());

export const workflowPublish = createAction(workflowPublishType, props<{ workflow: Workflow }>());
export const workflowPublishSuccess = createAction(workflowPublishSuccessType, props<any>());

export const operatorSaved = createAction(operatorSavedType);