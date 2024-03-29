import { NgModule } from "@angular/core";
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ListBoxModule } from "@progress/kendo-angular-listbox";
import { NotificationModule } from '@progress/kendo-angular-notification';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from "@progress/kendo-angular-icons";
@NgModule({
    exports: [
        GridModule,
        InputsModule,
        UploadsModule,
        ButtonsModule,
        NotificationModule,
        ListBoxModule,
        DropDownListModule,
        DialogsModule,
        LayoutModule,
        IconsModule 
    ]
}
)

export class AngularKendoModule { }