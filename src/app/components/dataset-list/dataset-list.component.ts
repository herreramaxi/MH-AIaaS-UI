import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { State, process, CompositeFilterDescriptor, filterBy, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DatasetService } from 'src/app/core/services/dataset.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.css']
})

export class DatasetListComponent implements OnInit {
  public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  public itemToRemove: any;
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
    this.router.navigate(['/datasets', editDataItem.id]);
  }
  public viewHandler(args: AddEvent): void { }

  public removeHandler(args: RemoveEvent): void {
    this.itemToRemove = args.dataItem;
  }
  public removeHandler2(args: AddEvent): void {
    // this.removeConfirmationSubject.next(shouldRemove);

    this.itemToRemove = null;


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

  public confirmRemove(shouldRemove: boolean): void {
    // this.removeConfirmationSubject.next(shouldRemove);

    var dataItemId = this.itemToRemove.id;
    this.itemToRemove = null;

    if (!shouldRemove) return;

    this.datasetService.remove(dataItemId).subscribe(data => {

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
}