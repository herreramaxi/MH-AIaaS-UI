import { NgModule } from "@angular/core";
import { UploadsModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { NotificationModule } from '@progress/kendo-angular-notification';

@NgModule({
    exports: [
        GridModule,
        InputsModule,
        UploadsModule,
        ButtonsModule,
        NotificationModule,
    ]
}
)

export class AngularKendoModule { }