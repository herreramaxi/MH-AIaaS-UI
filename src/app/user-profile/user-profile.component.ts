import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { MessageService } from '../core/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private auth: AuthService, private messageService: MessageService) {

    messageService.getAdminResource().subscribe(data => {
      console.log("getAdminResource")
      console.log(data)
    })

    messageService.getProtectedResource().subscribe(data => {
      console.log("getProtectedResource")
      console.log(data)
    })

    messageService.getPublicResource().subscribe(data => {
      console.log("getPublicResource")
      console.log(data)
    })
  }

  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));


}
