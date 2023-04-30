import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent } from '@progress/kendo-angular-grid';
import { DatasetService } from '../core/services/dataset.service';
import { State, process, CompositeFilterDescriptor, filterBy, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { NotificationService } from '@progress/kendo-angular-notification';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.css']
})

export class DatasetListComponent implements OnInit {
  public view: any;
  private data: any;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private router: Router, private datasetService: DatasetService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.GetDatasets();

  }

  private GetDatasets() {
    this.datasetService.getDatasets().subscribe(data => {
      if (!data)
        return;
      this.data = data;
      // this.view = process(data, this.gridState);
      this.loadData();
    });
  }

  public addHandler(args: AddEvent): void {
    this.router.navigate(['/datasetCreate']);
  }

  public editHandler(args: AddEvent): void {
    var editDataItem = args.dataItem;
    this.router.navigate(['/datasetEdit', editDataItem.id]);
  }

  public removeHandler(args: AddEvent): void {

    var editDataItem = args.dataItem;

    this.datasetService.remove(editDataItem.id).subscribe(data => {

      this.GetDatasets();

      this.notificationService.show({
        content: "Dataset successfully deleted",
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