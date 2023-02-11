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

}
