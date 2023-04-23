import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from '@progress/kendo-angular-grid';
// import { MaterialFileInputModule } from 'ngx-material-file-input';
import { environment as env, environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomStepComponent } from './custom-step/custom-step.component';
import { RouteStepComponent } from './custom-step/route-step/route-step.component';
import { DatasetCreateComponent } from './dataset-create/dataset-create.component';
import { SettingsAndPreviewStepComponent } from './dataset-create/settings-and-preview-step/settings-and-preview-step.component';
import { DatasetEditComponent } from './dataset-edit/dataset-edit.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { FormStepComponent } from './form-step/form-step.component';
import { AuthGuardByRole } from './infrastructure/auth-guard-by-role';
import { BaseUrlInterceptor } from './infrastructure/BaseUrlInterceptor';
import { HeaderComponent } from './layout/header/header.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { MlWorkflowDesignerComponent } from './ml-workflow-designer/ml-workflow-designer.component';
import { NestedFlowComponent } from './nested-flow/nested-flow.component';
import { PublicComponent } from './public/public.component';
import { RouterStepComponent } from './router-step/router-step.component';
import { EditStepComponent } from './standard-step/edit-step/edit-step.component';
import { StandardStepComponent } from './standard-step/standard-step.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UploadInterceptor } from './infrastructure/UploadInterceptor';
import { BasicSettingsStepComponent } from './dataset-create/basic-settings-step/basic-settings-step.component';
import { FileSelectionStepComponent } from './dataset-create/file-selection-step/file-selection-step.component';
import { SchemaStepComponent } from './dataset-create/schema-step/schema-step.component';
import { NotificationModule } from '@progress/kendo-angular-notification';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserProfileComponent,
    PublicComponent,
    HeaderComponent,
    MlWorkflowDesignerComponent,
    CustomStepComponent,
    FormStepComponent,
    NestedFlowComponent,
    StandardStepComponent,
    EditStepComponent,
    RouterStepComponent,
    RouteStepComponent,
    DatasetListComponent,
    DatasetEditComponent,
    DatasetCreateComponent,
    SettingsAndPreviewStepComponent,
    BasicSettingsStepComponent,
    FileSelectionStepComponent,
    SchemaStepComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth0,
      httpInterceptor: {
        allowedList: [`${env.api.serverUrl}/api/*`]
      },
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgFlowchartModule,
    GridModule,
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
    InputsModule,
    UploadsModule,
    ButtonsModule,
    NotificationModule
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.api.serverUrl },    
    { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    AuthGuardByRole
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

