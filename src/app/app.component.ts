import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state-management/reducers/reducers';
import { selectSpinnerIsLoading } from './state-management/reducers/spinner.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AIaaS_UI';
  isLoading$: Observable<boolean | undefined>;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectSpinnerIsLoading);
  }


}
