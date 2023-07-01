import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthGuardByRole  {
   constructor(public auth: AuthService, public router: Router) {
   }

   redirectToLogin() {
      this.auth.loginWithRedirect({
         appState: {
            target: '/',
         },
         authorizationParams: {
            prompt: 'login',
         },
      });
   }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      return new Observable<boolean>(obs => {
         const roles = route.data['roles'] as Array<string>;

         this.auth.user$.subscribe(user => {
            if (!user) {
               // this.router.navigate(['/login']);
               this.redirectToLogin()
               obs.next(false);
            }

            //authenticated but not roles were passed
            if (!roles || roles.length === 0) {
               obs.next(true);
            }

            const hasRequiredRoles = user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].some((x: string) => roles.includes(x))

            if (!hasRequiredRoles) {
               this.redirectToLogin()
               // this.router.navigate(['/login']);
               obs.next(false);
            }

            obs.next(true);
         })

      });
   }
}