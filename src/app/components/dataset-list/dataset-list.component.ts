import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subject } from 'rxjs';
import { DatasetService } from 'src/app/core/services/dataset.service';
import { KendoGridListComponent } from 'src/app/core/components/kendo-grid-list/kendo-grid-list.component';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.css']
})

export class DatasetListComponent extends KendoGridListComponent implements OnInit {
  public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  public itemToRemove: any;

  constructor(private router: Router, private datasetService: DatasetService, private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.GetDatasets();
  }

  private GetDatasets() {
    this.datasetService.getDatasets().subscribe(data => {
      if (!data)
        return;
      this.gridData = data;
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