import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment as env, environment } from '../environments/environment';
import { AngularKendoModule } from './angular.kendo.modules';
import { AngularMaterialModule } from './angular.material.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicSettingsStepComponent } from './components/dataset-create/basic-settings-step/basic-settings-step.component';
import { DatasetCreateComponent } from './components/dataset-create/dataset-create.component';
import { SchemaStepComponent } from './components/dataset-create/schema-step/schema-step.component';
import { SettingsAndPreviewStepComponent } from './components/dataset-create/settings-and-preview-step/settings-and-preview-step.component';
import { DatasetEditComponent } from './components/dataset-edit/dataset-edit.component';
import { DatasetListComponent } from './components/dataset-list/dataset-list.component';
import { DatasetPreviewComponent } from './components/dataset-preview/dataset-preview.component';
import { DatasetViewDetailsComponent } from './components/dataset-view-details/dataset-view-details.component';
import { DatasetViewPreviewComponent } from './components/dataset-view-preview/dataset-view-preview.component';
import { DatasetViewSchemaComponent } from './components/dataset-view-schema/dataset-view-schema.component';
import { DatasetViewComponent } from './components/dataset-view/dataset-view.component';
import { EndpointEditConfigurationComponent } from './components/endpoint-edit/endpoint-edit-configuration/endpoint-edit-configuration.component';
import { EndpointEditConsumeComponent } from './components/endpoint-edit/endpoint-edit-consume/endpoint-edit-consume.component';
import { EndpointEditTestComponent } from './components/endpoint-edit/endpoint-edit-test/endpoint-edit-test.component';
import { EndpointEditComponent } from './components/endpoint-edit/endpoint-edit.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { MlModelEditComponent } from './components/ml-model-edit/ml-model-edit.component';
import { MlModelListComponent } from './components/ml-model-list/ml-model-list.component';
import { DialogChangeNameComponent } from './components/ml-workflow-designer/dialog-change-name/dialog-change-name.component';
import { MlWorkflowDesignerComponent } from './components/ml-workflow-designer/ml-workflow-designer.component';
import { PublishWorkflowComponent } from './components/ml-workflow-designer/publish-workflow/publish-workflow.component';
import { CustomStepComponent } from './components/operators/custom-step/custom-step.component';
import { ModelEvaluationComponent } from './components/operators/model-evaluation/model-evaluation.component';
import { OperatorStatusComponent } from './components/operators/operator-status/operator-status.component';
import { DataVisualizationDialogComponent } from './components/operators/standard-step/data-visualization-dialog/data-visualization-dialog.component';
import { EditCleanOperatorComponent } from './components/operators/standard-step/edit-clean-operator/edit-clean-operator.component';
import { EditDatasetMetadataComponent } from './components/operators/standard-step/edit-dataset-metadata/edit-dataset-metadata.component';
import { EditDatasetComponent } from './components/operators/standard-step/edit-dataset/edit-dataset.component';
import { EditNormalizeOperatorComponent } from './components/operators/standard-step/edit-normalize-operator/edit-normalize-operator.component';
import { EditStepComponent } from './components/operators/standard-step/edit-step/edit-step.component';
import { EditTrainModelComponent } from './components/operators/standard-step/edit-train-model/edit-train-model.component';
import { StandardStepComponent } from './components/operators/standard-step/standard-step.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorkflowCreateComponent } from './components/workflow-create/workflow-create.component';
import { WorkflowJobDetailsComponent } from './components/workflow-job-details/workflow-job-details.component';
import { WorkflowJobsComponent } from './components/workflow-jobs/workflow-jobs.component';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { WorkflowRunComponent } from './components/workflow-run/workflow-run.component';
import { EllipsisTextComponent } from './core/components/ellipsis-text/ellipsis-text.component';
import { KendoGridListComponent } from './core/components/kendo-grid-list/kendo-grid-list.component';
import { LabelValueComponent } from './core/components/label-value/label-value.component';
import { ResponseTimePipe } from './core/pipes/response-time-pipe';
import { StorageSizePipe } from './core/pipes/storage-size-pipe';
import { BaseUrlInterceptor } from './infrastructure/BaseUrlInterceptor';
import { ErrorInterceptor } from './infrastructure/ErrorInterceptor';
import { LoadingInterceptor } from './infrastructure/LoadingInterceptor';
import { AuthGuardByRole } from './infrastructure/auth-guard-by-role';
import { WorkflowEffects } from './state-management/effects/workflow.effects';
import { reducers } from './state-management/reducers/reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserProfileComponent,
    HeaderComponent,
    MlWorkflowDesignerComponent,
    CustomStepComponent,
    StandardStepComponent,
    EditStepComponent,
    DatasetListComponent,
    DatasetEditComponent,
    DatasetCreateComponent,
    SettingsAndPreviewStepComponent,
    BasicSettingsStepComponent,
    SchemaStepComponent,
    WorkflowListComponent,
    WorkflowCreateComponent,
    HomeComponent,
    DialogChangeNameComponent,
    MlModelListComponent,
    MlModelEditComponent,
    EndpointListComponent,
    EndpointEditComponent,
    EditDatasetComponent,
    OperatorStatusComponent,
    ModelEvaluationComponent,
    EditCleanOperatorComponent,
    EditTrainModelComponent,
    EditNormalizeOperatorComponent,
    EditDatasetMetadataComponent,
    PublishWorkflowComponent,
    EndpointEditConfigurationComponent,
    EndpointEditTestComponent,
    EndpointEditConsumeComponent,
    EllipsisTextComponent,
    DatasetViewComponent,
    DatasetViewDetailsComponent,
    DatasetViewSchemaComponent,
    DatasetViewPreviewComponent,
    DatasetPreviewComponent,
    DataVisualizationDialogComponent,
    KendoGridListComponent,
    WorkflowRunComponent,
    ResponseTimePipe,
    StorageSizePipe,
    WorkflowJobsComponent,
    LabelValueComponent,
    WorkflowJobDetailsComponent,
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
    LayoutModule,
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.api.serverUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    AuthGuardByRole,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

