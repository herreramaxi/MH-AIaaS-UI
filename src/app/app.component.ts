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



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public customIcon: SVGIcon = {
    name: 'custom',
    content: `<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>`,
    viewBox: '0 0 512 512',
  };

  datasetIcon: SVGIcon = {
    name: "dataset",
    content: `<path d="M416 416H288V288h128v128zm64-352v384c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h64V0h64v32h128V0h64v32h64c17.6 0 32 14.4 32 32zm-32 128H64v255.9l.1.1 383.9-.1V192zm0-127.9c-.1-.1-.1-.1 0 0l-64-.1v32h-64V64H192v32h-64V64H64.1l-.1.1V160h384V64.1z" />`,
    viewBox: "0 0 512 512"
  }


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
  constructor(private store: Store<AppState>, public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
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
    // return item?.isItemExpanded ?? false;
    return this.expandedIndices.indexOf(item.id) >= 0;
  };

  // public items: Array<DrawerItem> = items;

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
