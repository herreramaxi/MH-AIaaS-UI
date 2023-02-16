import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthGuardByRole } from './infrastructure/auth-guard-by-role';
import { MlWorkflowDesignerComponent } from './ml-workflow-designer/ml-workflow-designer.component';
import { PublicComponent } from './public/public.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {    path: '', component: MlWorkflowDesignerComponent  },
  {
    path: 'public', component: PublicComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] }
  },
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
