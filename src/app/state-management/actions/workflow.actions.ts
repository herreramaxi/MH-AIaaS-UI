import { createAction, props } from '@ngrx/store';
import { Workflow } from 'src/app/core/models';
import { Endpoint } from 'src/app/core/models/endpoint.model';

export const workflowLoadType = '[WorkflowDesigner] Load';
export const workflowLoadSuccessType = '[WorkflowDesigner] Load Success';
export const workflowLoadErrorType = '[WorkflowDesigner] Load Error';
export const workflowChangeType = '[WorkflowDesigner] Change';
export const workflowChangedSuccessType = '[WorkflowDesigner] Changed Success';
export const workflowChangedErrorType = '[WorkflowDesigner] Changed Error';
export const workflowSaveType = '[WorkflowDesigner] Save';
export const workflowSavedSuccessType = '[WorkflowDesigner] Saved Success';
export const workflowSaveFailedType = '[WorkflowDesigner] Save Failed';
export const workflowRunType = '[WorkflowDesigner] Run';
export const workflowRunSuccessType = '[WorkflowDesigner] Run Success';
export const workflowRunFailedType = '[WorkflowDesigner] Run Failed';
export const workflowPublishType = '[WorkflowDesigner] Publish';
export const workflowPublishSuccessType = '[WorkflowDesigner] Publish Success';
export const workflowPublishFailedType = '[WorkflowDesigner] Publish Failed';

// export const operatorSavedType = '[Operator Page] Saved';

export const workflowLoad = createAction(workflowLoadType, props<{ workflowId: number }>());
export const workflowLoadSuccess = createAction(workflowLoadSuccessType, props<any>());
export const workflowLoadError = createAction(workflowLoadErrorType, props<{ error: string }>());

export const workflowChange = createAction(workflowChangeType, props<{ workflow: Workflow }>());
export const workflowChangedSuccess = createAction(workflowChangedSuccessType, props<any>());
export const workflowChangedError = createAction(workflowChangedErrorType, props<{ error: string }>());
export const workflowSave = createAction(workflowSaveType, props<{ workflow: Workflow }>());
export const workflowSavedSuccess = createAction(workflowSavedSuccessType, props<any>());
export const workflowSaveFailed = createAction(workflowSaveFailedType, props<{ error: string }>());
export const workflowRun = createAction(workflowRunType, props<{ workflow: Workflow }>());
export const workflowRunSuccess = createAction(workflowRunSuccessType, props<any>());
export const workflowRunFailed = createAction(workflowRunFailedType, props<{ error: string }>());

export const workflowPublish = createAction(workflowPublishType, props<{ endpoint: Endpoint }>());
export const workflowPublishSuccess = createAction(workflowPublishSuccessType, props<any>());
export const workflowPublishFailed = createAction(workflowPublishFailedType, props<{ error: string }>());
