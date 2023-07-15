import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { NotificationService } from "../core/services/notification.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    debugger;
                    this.notificationService.ShowErrorResponse(error);
                    return throwError(() => error);
                })
            );
    }
}
