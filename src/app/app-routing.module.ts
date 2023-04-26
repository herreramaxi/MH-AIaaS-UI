import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { DatasetCreateComponent } from './dataset-create/dataset-create.component';
import { DatasetEditComponent } from './dataset-edit/dataset-edit.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardByRole } from './infrastructure/auth-guard-by-role';
import { MlWorkflowDesignerComponent } from './ml-workflow-designer/ml-workflow-designer.component';
import { PublicComponent } from './public/public.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WorkflowCreateComponent } from './workflow-create/workflow-create.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'public', component: PublicComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'datasets', component: DatasetListComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'datasetEdit/:id', component: DatasetEditComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'datasetCreate', component: DatasetCreateComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'workflows', component: WorkflowListComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
  { path: 'workflow-designer/:id', component: MlWorkflowDesignerComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
