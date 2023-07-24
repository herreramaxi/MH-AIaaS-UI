import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { KendoGridListComponent } from 'src/app/core/components/kendo-grid-list/kendo-grid-list.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent extends KendoGridListComponent implements OnInit {
  itemToRemove: any;

  constructor(private router: Router, private service: WorkflowService, private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.GetWorkflows();
  }

  private GetWorkflows() {
    this.service.getWorkflows().subscribe(data => {
      if (!data)
        return;
      this.gridData = data;
      // this.view = process(data, this.gridState);
      this.loadData();
    });
  }

  public addHandler(args: AddEvent): void {
    this.service.createWorkflow().subscribe(data => {
      if (!data) return;

      this.router.navigate(['/workflow-designer', data.id]);
    })
  }

  public editHandler(args: AddEvent): void {
    var editDataItem = args.dataItem;
    this.router.navigate(['/workflow-designer', editDataItem.id]);
  }

  public removeHandler(args: RemoveEvent): void {
    this.itemToRemove = args.dataItem;
  }

  public confirmRemove(shouldRemove: boolean): void {
    var dataItemId = this.itemToRemove.id;
    this.itemToRemove = null;

    if (!shouldRemove) return;

    this.service.remove(dataItemId).subscribe(data => {
      this.GetWorkflows();
      this.notificationService.ShowSuccess("Workflow successfully deleted");
    });
  }
}