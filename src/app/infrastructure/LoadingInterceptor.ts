import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable, finalize } from "rxjs";
import { spinnerFinish, spinnerLoad } from "../state-management/actions/spinner.actions";
import { AppState } from "../state-management/reducers/reducers";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog, private store: Store<AppState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showSpinner();

        return next.handle(request).pipe(
            finalize(() => {
                this.hideSpinner();
            })
        );
    }

    private showSpinner(): void {
        setTimeout(() => {
            this.store.dispatch(spinnerLoad());
        });
    }

    private hideSpinner(): void {
        // this.dialog.closeAll();
        setTimeout(() => {
            this.store.dispatch(spinnerFinish());
        });


    }

}
