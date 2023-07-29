import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state-management/reducers/reducers';
import { selectSpinnerIsLoading } from './state-management/reducers/spinner.reducers';
import { DrawerItemExpandedFn, DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import {
  SVGIcon,
  bellIcon,
  calendarIcon,
  circleIcon,
  envelopLinkIcon,
  inboxIcon,
  pencilIcon,
  starOutlineIcon, menuIcon,

} from "@progress/kendo-svg-icons";
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { WebSocketRouterService } from './core/services/websocket-router.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'AIaaS_UI';
  isLoading$: Observable<boolean | undefined>;

  public items: any[] = [
    {
      id: 0,
      text: "Datasets",
      iconClass: "fa-solid fa-table",
      path: 'datasets',
      visible: false
    },
    {
      id: 1,
      separator: true,
    },
    {
      id: 2,
      parentId: 3,
      text: "Workflow list",
      iconClass: "fa-solid fa-table",
      path: "workflows"
    },
    {
      id: 4,
      parentId: 3,
      text: "Run History",
      iconClass: "fa-solid fa-clock-rotate-left",
      path: "workflowJobs"
    },
    {
      id: 3,
      text: "Workflows",
      iconClass: "fa-solid fa-diagram-project"
    },
    {
      separator: true,
    },
    {
      text: "Models",
      icon: "k-i-envelop-link",
      iconClass: "fa-solid fa-microchip",
      path: "models"
    },
    {
      text: "Endpoints",
      icon: "k-i-star-outline",
      iconClass: "fa-solid fa-globe",
      path: "endpoints"
    },
  ];

  panelVisible = false;
  constructor(private store: Store<AppState>, public auth: AuthService, private router: Router, private webSocketRouterService: WebSocketRouterService) {
  }

  ngOnInit(): void {
    this.webSocketRouterService.startConnection();
    this.isLoading$ = this.store.select(selectSpinnerIsLoading);
    this.auth.user$.subscribe(user => {
      if (!user) {
        this.panelVisible = false;
        return;
      }

      if (user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Administrator')) {
        this.panelVisible = true;
      }
    })
  }

  public selected = "Inbox";
  public menuSvg: SVGIcon = bellIcon;
  public expandedIndices = [2];

  public isItemExpanded: DrawerItemExpandedFn = (item): boolean => { 
    return this.expandedIndices.indexOf(item.id) >= 0;
  };

  public onSelect(ev: any): void {
    this.selected = ev.item.text;
    const current = ev.item.id;

    if (this.expandedIndices.indexOf(current) >= 0) {
      this.expandedIndices = this.expandedIndices.filter(
        (id) => id !== current
      );
    } else {
      this.expandedIndices.push(current);
    }

    if (!ev?.item?.path) return;
    this.router.navigate([ev.item.path]);
  }

  @ViewChild('drawer', { static: false }) elementRef: any;
  drawerToggle() {
    this?.elementRef?.toggle();
  }
}
