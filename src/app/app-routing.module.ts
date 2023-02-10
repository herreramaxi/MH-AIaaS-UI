import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthGuardByRole } from './infrastructure/auth-guard-by-role';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: 'public', component: PublicComponent, canActivate: [AuthGuardByRole], data: { roles: ['Administrator'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
