import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { workflowChange, workflowChangeType as workflowChangeActionType, workflowChangedError, workflowChangedSuccess, workflowLoad, workflowLoadSuccess, workflowPublish, workflowPublishSuccess, workflowPublishType, workflowRun, workflowRunSuccess, workflowSave, workflowSavedSuccess } from '../actions/workflow.actions';

@Injectable()
export class WorkflowEffects {

    loadWorkflow$ = createEffect(() => this.actions$.pipe(
        ofType(workflowLoad),
        switchMap((action) => this.service.getWorkflowById(action.workflowId)
            .pipe(
                map(response => {

                    console.log("WorkflowEffects-loadWorkflow")
                    return workflowLoadSuccess(response)
                }),
                catchError(() => EMPTY)
            ))
    ));

    workflowChanged$ = createEffect(() => this.actions$.pipe(
        ofType(workflowChange),
        concatMap((action) => this.service.validate(action.workflow)
            .pipe(
                map(response => {

                    console.log("WorkflowEffects-workflowChanged")
                    // return ({ type: workflowChangedSuccessName, payload: workflow }) }) ,
                    return workflowChangedSuccess(response)
                }),
                catchError((response: any) => {
                    console.log(`Error on action ${workflowChangeActionType} - workflowChangedError`)
                    console.log(response)
                    return of(workflowChangedError({ error: response.error }))
                })
            ))
    ));


    workflowSaved$ = createEffect(() => this.actions$.pipe(
        ofType(workflowSave),
        exhaustMap((action) => this.service.save(action.workflow)
            .pipe(
                map(response => {

                    console.log("WorkflowEffects-workflowSaved")
                    // return ({ type: workflowChangedSuccessName, payload: workflow }) }) ,
                    return workflowSavedSuccess(response)
                }),
                catchError(() => {
                    console.log(`Error on action ${workflowChangeActionType}`)
                    return EMPTY
                })
            ))
    ));

    workflowRun$ = createEffect(() => this.actions$.pipe(
        ofType(workflowRun),
        exhaustMap((action) => this.service.run(action.workflow)
            .pipe(
                map(response => {
                    debugger
                    console.log("WorkflowEffects-workflowRun")
                    // return ({ type: workflowChangedSuccessName, payload: workflow }) }) ,
                    return workflowRunSuccess(response)
                }),
                catchError(() => {
                    console.log(`Error on action ${workflowChangeActionType}`)
                    return EMPTY
                })
            ))
    ));

    workflowPublish$ = createEffect(() => this.actions$.pipe(
        ofType(workflowPublish),
        exhaustMap((action) => this.service.publish(action.workflow)
            .pipe(
                map(response => {
                    debugger
                    console.log("WorkflowEffects-workflowPublish")
                    // return ({ type: workflowChangedSuccessName, payload: workflow }) }) ,
                    return workflowPublishSuccess(response)
                }),
                catchError((error) => {
                    console.log(error)
                    console.log(`Error on action ${workflowPublishType}`)
                    return EMPTY
                })
            ))
    ));

    constructor(
        private actions$: Actions,
        private service: WorkflowService
    ) { }
}