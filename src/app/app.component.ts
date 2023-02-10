import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AIaaS_UI';

  message = '';
  isAuthenticated$ = this.auth.isAuthenticated$;
  constructor(public auth: AuthService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getAdminResource().subscribe((response) => {
      const { data, error } = response;

      if (data) {
        this.message = JSON.stringify(data, null, 2);
      }

      if (error) {
        this.message = JSON.stringify(error, null, 2);
      }
    });
  }
}
