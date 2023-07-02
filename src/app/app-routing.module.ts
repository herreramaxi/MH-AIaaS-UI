import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardByRole } from './infrastructure/auth-guard-by-role';
import { DatasetCreateComponent } from './components/dataset-create/dataset-create.component';
import { DatasetEditComponent } from './components/dataset-edit/dataset-edit.component';
import { DatasetListComponent } from './components/dataset-list/dataset-list.component';
import { EndpointEditComponent } from './components/endpoint-edit/endpoint-edit.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { HomeComponent } from './components/home/home.component';
import { MlModelEditComponent } from './components/ml-model-edit/ml-model-edit.component';
import { MlModelListComponent } from './components/ml-model-list/ml-model-list.component';
import { MlWorkflowDesignerComponent } from './components/ml-workflow-designer/ml-workflow-designer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { DatasetViewComponent } from './components/dataset-view/dataset-view.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardByRole] },
  { path: 'datasets', component: DatasetListComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'datasets/:id', component: DatasetViewComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'datasetEdit/:id', component: DatasetEditComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'datasetCreate', component: DatasetCreateComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'workflows', component: WorkflowListComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'workflow-designer/:id', component: MlWorkflowDesignerComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'models', component: MlModelListComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'models/:id', component: MlModelEditComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'endpoints', component: EndpointListComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'endpoints/:id', component: EndpointEditComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
