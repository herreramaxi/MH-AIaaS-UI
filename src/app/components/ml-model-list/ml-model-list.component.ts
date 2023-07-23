import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { MlModelService } from 'src/app/core/services/ml-model.service';
import { KendoGridListComponent } from 'src/app/core/components/kendo-grid-list/kendo-grid-list.component';

@Component({
  selector: 'app-ml-model-list',
  templateUrl: './ml-model-list.component.html',
  styleUrls: ['./ml-model-list.component.css']
})
export class MlModelListComponent extends KendoGridListComponent implements OnInit {
  public itemToRemove: any;

  constructor(private router: Router, private service: MlModelService,  private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.LoadModels();
  }

  private LoadModels() {
    this.service.getMlModels().subscribe(data => {
      if (!data) return;
      this.gridData = data;
      this.loadData();
    });
  }

  public addHandler(args: AddEvent): void {
    this.router.navigate(['/ml-model-create']);
  }

  public editHandler(args: AddEvent): void {
    var editDataItem = args.dataItem;
    this.router.navigate(['/models',editDataItem.id]);
  }

  public removeHandler(args: RemoveEvent): void {
    this.itemToRemove = args.dataItem;
  }
  
  public confirmRemove(shouldRemove: boolean): void {
    var dataItemId = this.itemToRemove.id;
    this.itemToRemove = null;

    if (!shouldRemove) return;

    this.service.remove(dataItemId).subscribe(data => {

      this.LoadModels();

      this.notificationService.show({
        content: "ML Model successfully deleted",
        position: { horizontal: "center", vertical: "top" },
        animation: { type: "fade", duration: 500 },
        closable: false,
        type: { style: "success", icon: true },
      });
    });
  }
}