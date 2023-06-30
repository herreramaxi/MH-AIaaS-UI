import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AddEvent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CompositeFilterDescriptor, filterBy, SortDescriptor, orderBy, State } from '@progress/kendo-data-query';
import { EndpointService } from 'src/app/core/services/endpoint.service';


@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css']
})
export class EndpointListComponent implements OnInit {
  public view: any;
  private data: any;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private router: Router, private endpointService: EndpointService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.GetDatasets();

  }

  private GetDatasets() {
    this.endpointService.getEndpoints().subscribe(data => {
      if (!data)
        return;
      this.data = data;
      // this.view = process(data, this.gridState);
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

  public removeHandler(args: AddEvent): void {

    var editDataItem = args.dataItem;

    this.endpointService.remove(editDataItem.id).subscribe(data => {

      this.GetDatasets();

      this.notificationService.show({
        content: "Endpoint successfully deleted",
        position: { horizontal: "center", vertical: "top" },
        animation: { type: "fade", duration: 500 },
        closable: false,
        type: { style: "success", icon: true },
      });
    });
  }

  public filter: CompositeFilterDescriptor;
  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.view = filterBy(this.data, filter);
  }


  public sort: SortDescriptor[] = [
    {
      field: "Name",
      dir: "asc",
    },
  ];

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }

  private loadData(): void {
    this.view = {
      data: orderBy(this.data, this.sort),
      total: this.data.length,
    };
  }


 
}