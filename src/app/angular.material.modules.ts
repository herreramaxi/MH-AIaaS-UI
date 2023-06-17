import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    exports: [
        MatMenuModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatNativeDateModule,
        MatDialogModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        // MaterialFileInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        MatSelectModule,
        MatSlideToggleModule
    ]
}
)

export class AngularMaterialModule { }