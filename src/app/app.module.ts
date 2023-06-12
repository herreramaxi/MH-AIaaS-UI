import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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

import { StoreModule } from '@ngrx/store';
import { AngularKendoModule } from './angular.kendo.modules';
import { AngularMaterialModule } from './angular.material.modules';
import { BasicSettingsStepComponent } from './components/dataset-create/basic-settings-step/basic-settings-step.component';
import { DatasetCreateComponent } from './components/dataset-create/dataset-create.component';
import { FileSelectionStepComponent } from './components/dataset-create/file-selection-step/file-selection-step.component';
import { SchemaStepComponent } from './components/dataset-create/schema-step/schema-step.component';
import { SettingsAndPreviewStepComponent } from './components/dataset-create/settings-and-preview-step/settings-and-preview-step.component';
import { DatasetEditComponent } from './components/dataset-edit/dataset-edit.component';
import { DatasetListComponent } from './components/dataset-list/dataset-list.component';
import { EndpointEditComponent } from './components/endpoint-edit/endpoint-edit.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { MlModelEditComponent } from './components/ml-model-edit/ml-model-edit.component';
import { MlModelListComponent } from './components/ml-model-list/ml-model-list.component';
import { DialogChangeNameComponent } from './components/ml-workflow-designer/dialog-change-name/dialog-change-name.component';
import { CustomStepComponent } from './components/operators/custom-step/custom-step.component';
import { DatasetOperatorComponent } from './components/operators/dataset-operator/dataset-operator.component';
import { EditDatasetComponent } from './components/operators/dataset-operator/edit-dataset/edit-dataset.component';
import { EditCleanOperatorComponent } from './components/operators/edit-clean-operator/edit-clean-operator.component';
import { FormStepComponent } from './components/operators/form-step/form-step.component';
import { ModelEvaluationComponent } from './components/operators/model-evaluation/model-evaluation.component';
import { NestedFlowComponent } from './components/operators/nested-flow/nested-flow.component';
import { OperatorStatusComponent } from './components/operators/operator-status/operator-status.component';
import { RouteStepComponent } from './components/operators/router-step/route-step/route-step.component';
import { RouterStepComponent } from './components/operators/router-step/router-step.component';
import { EditStepComponent } from './components/operators/standard-step/edit-step/edit-step.component';
import { StandardStepComponent } from './components/operators/standard-step/standard-step.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorkflowCreateComponent } from './components/workflow-create/workflow-create.component';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { BaseUrlInterceptor } from './infrastructure/BaseUrlInterceptor';
import { AuthGuardByRole } from './infrastructure/auth-guard-by-role';
import { HeaderComponent } from './components/layout/header/header.component';
import { MlWorkflowDesignerComponent } from './components/ml-workflow-designer/ml-workflow-designer.component';
import { EffectsModule } from '@ngrx/effects';
import { reducers, workflowReducer } from './state-management/reducers/workflow.reducers';
import { WorkflowEffects } from './state-management/effects/workflow.effects';

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
    EndpointEditComponent,
    DatasetOperatorComponent,
    EditDatasetComponent,
    OperatorStatusComponent,
    ModelEvaluationComponent,
    EditCleanOperatorComponent
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
    AngularMaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([WorkflowEffects]),
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

