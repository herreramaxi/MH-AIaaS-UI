import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { RouterStepComponent } from './router-step/router-step.component';
import { EditStepComponent } from './standard-step/edit-step/edit-step.component';
import { StandardStepComponent } from './standard-step/standard-step.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { BasicSettingsStepComponent } from './dataset-create/basic-settings-step/basic-settings-step.component';
import { FileSelectionStepComponent } from './dataset-create/file-selection-step/file-selection-step.component';
import { SchemaStepComponent } from './dataset-create/schema-step/schema-step.component';

import { AngularKendoModule } from './angular.kendo.modules';
import { AngularMaterialModule } from './angular.material.modules';
import { HomeComponent } from './home/home.component';
import { DialogChangeNameComponent } from './ml-workflow-designer/dialog-change-name/dialog-change-name.component';
import { WorkflowCreateComponent } from './workflow-create/workflow-create.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { MlModelListComponent } from './ml-model-list/ml-model-list.component';
import { MlModelEditComponent } from './ml-model-edit/ml-model-edit.component';
import { EndpointListComponent } from './endpoint-list/endpoint-list.component';
import { EndpointEditComponent } from './endpoint-edit/endpoint-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserProfileComponent,
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
    SchemaStepComponent,
    WorkflowListComponent,
    WorkflowCreateComponent,
    HomeComponent,
    DialogChangeNameComponent,
    MlModelListComponent,
    MlModelEditComponent,
    EndpointListComponent,
    EndpointEditComponent
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
    AngularKendoModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.api.serverUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    AuthGuardByRole
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

