import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { EndpointService } from 'src/app/core/services/endpoint.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { workflowChange, workflowChangeType as workflowChangeActionType, workflowLoad, workflowLoadError, workflowLoadSuccess, workflowPublish, workflowPublishFailed, workflowPublishSuccess, workflowRun, workflowRunFailed, workflowRunSuccess, workflowRunType, workflowSave, workflowSaveFailed, workflowSavedSuccess } from '../actions/workflow.actions';
import { AppState } from '../reducers/reducers';

@Injectable()
export class WorkflowEffects {

    loadWorkflow$ = createEffect(() => this.actions$.pipe(
        ofType(workflowLoad),
        concatMap((action) => this.service.getWorkflowById(action.workflowId)
            .pipe(
                map(response => {
                    return workflowLoadSuccess(response)
                }),
                catchError((response: any) => {
                    console.log(`Error on action ${workflowChangeActionType} - workflowChangedError`)
                    console.log(response)
                    return of(workflowLoadError({ error: response.error }))
                })
            ))
    ));

    workflowChanged$ = createEffect(() => this.actions$.pipe(
        ofType(workflowChange),
        concatMap((action) => this.service.save(action.workflow)
            .pipe(
                map(response => {
                    return workflowSavedSuccess(response)
                }),
                catchError((response: any) => {
                    console.log(`Error on action ${workflowChangeActionType} - workflowChangedError`)
                    console.log(response)
                    return of(workflowSaveFailed({ error: response.error }))
                })
            ))
    ));

    workflowSaved$ = createEffect(() => this.actions$.pipe(
        ofType(workflowSave),
        concatMap((action) => this.service.save(action.workflow)
            .pipe(
                map(response => {
                    return workflowSavedSuccess(response)
                }),
                catchError((response: any) => {
                    console.log(`Error on action ${workflowRunType}`)
                    return of(workflowSaveFailed({ error: response.error }))
                })
            ))
    ));

    workflowRun$ = createEffect(() => this.actions$.pipe(
        ofType(workflowRun),
        concatMap((action) => this.service.run(action.workflow)
            .pipe(
                map(response => {
                    return workflowRunSuccess(response)
                }),
                catchError((response: any) => {
                    console.log(`Error on action ${workflowRunType}`)
                    return of(workflowRunFailed({ error: response.error }))
                })
            ))
    ));

    workflowPublish$ = createEffect(() => this.actions$.pipe(
        ofType(workflowPublish),
        concatMap((action) => this.endpointService.create(action.endpoint)
            .pipe(
                map(response => {
                    return workflowPublishSuccess(response)
                }),
                catchError((response: any) => {
                    console.log(`Error on action ${workflowRunType}`)
                    return of(workflowPublishFailed({ error: response.error }))
                })
            ))
    ));

    constructor(
        private actions$: Actions,
        private service: WorkflowService,
        private endpointService: EndpointService,
        private store: Store<AppState>
    ) { }
}