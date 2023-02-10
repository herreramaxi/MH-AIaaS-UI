import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthGuardByRole implements CanActivate {
   constructor(public auth: AuthService, public router: Router) {
   }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      return new Observable<boolean>(obs => {
         let roles = route.data['roles'] as Array<string>;
         if (roles.length === 0) {
            obs.next(false);
         }

         this.auth.user$.subscribe(user => {
            obs.next(user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].some((x: string) => roles.includes(x)));
         })

      });
   }
}