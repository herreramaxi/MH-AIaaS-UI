import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService as KendoNotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationService: KendoNotificationService) { }

  public ShowSuccess(message: string) {
    this.notificationService.show({
      content: message,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 500 },
      closable: false,
      hideAfter: 5000,
      type: { style: "success", icon: true },
      cssClass: "notification-message"
    });
  }

  public ShowError(errorMessage: string) {
    this.notificationService.show({
      content: errorMessage,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 500 },
      closable: true,
      hideAfter: 8000,
      type: { style: "error", icon: true }
    });
  }

  public ShowErrorResponse(errorResponse: HttpErrorResponse) {

    if (errorResponse.error.errors) {
      var errorMessage = errorResponse.error.errors.title ?? "One or more validation errors occurred."
      const errors: string[] = [];

      Object.keys(errorResponse.error.errors).forEach((prop) => {
        var errorMessages = errorResponse.error.errors[prop];
        errors.push(errorMessages)

        console.log(prop, errorResponse.error.errors[prop]);
      });

      this.notificationService.show({
        content: errorMessage + ' Errors: ' + errors.join(','),
        position: { horizontal: "center", vertical: "top" },
        animation: { type: "fade", duration: 500 },
        closable: true,
        hideAfter: 10000,
        type: { style: "error", icon: true },
        cssClass: "notification-message"
      });
      return;
    }

    this.notificationService.show({
      content: errorResponse.message,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 500 },
      closable: true,
      hideAfter: 10000,
      type: { style: "error", icon: true },
      cssClass: "notification-message"
    });
  }
}
