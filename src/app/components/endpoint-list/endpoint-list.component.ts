import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { EndpointService } from 'src/app/core/services/endpoint.service';
import { KendoGridListComponent } from 'src/app/core/components/kendo-grid-list/kendo-grid-list.component';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css']
})
export class EndpointListComponent extends KendoGridListComponent implements OnInit {
  itemToRemove: any;

  constructor(private router: Router, private endpointService: EndpointService, private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.GetDatasets();
  }

  private GetDatasets() {
    this.endpointService.getEndpoints().subscribe(data => {
      if (!data)
        return;
      this.gridData = data;
      this.loadData();
    });
  }

  public addHandler(args: AddEvent): void {
    this.router.navigate(['/endpointCreate']);
  }

  public editHandler(args: AddEvent): void {
    var editDataItem = args.dataItem;
    this.router.navigate(['/endpoint', editDataItem.id]);
  }

  public removeHandler(args: RemoveEvent): void {
    this.itemToRemove = args.dataItem;
  }

  public confirmRemove(shouldRemove: boolean): void {
    var dataItemId = this.itemToRemove.id;
    this.itemToRemove = null;

    if (!shouldRemove) return;

    this.endpointService.remove(dataItemId).subscribe(data => {
      this.GetDatasets();
      this.notificationService.ShowSuccess("Endpoint successfully deleted");
    });
  }
}