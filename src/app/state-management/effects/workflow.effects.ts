import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { workflowChange, workflowChangeType as workflowChangeActionType, workflowChangedSuccess, workflowLoad, workflowLoadSuccess, workflowRun, workflowRunSuccess, workflowSave, workflowSavedSuccess } from '../actions/workflow.actions';

@Injectable()
export class WorkflowEffects {

    loadWorkflow$ = createEffect(() => this.actions$.pipe(
        ofType(workflowLoad),
        exhaustMap((action) => this.service.getWorkflowById(action.workflowId)
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
        exhaustMap((action) => this.service.validate(action.workflow)
            .pipe(
                map(response => {
                    
                    console.log("WorkflowEffects-workflowChanged")
                    // return ({ type: workflowChangedSuccessName, payload: workflow }) }) ,
                    return workflowChangedSuccess(response)
                }),
                catchError(() => {
                    console.log(`Error on action ${workflowChangeActionType}`)
                    return EMPTY
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
    constructor(
        private actions$: Actions,
        private service: WorkflowService
    ) { }
}