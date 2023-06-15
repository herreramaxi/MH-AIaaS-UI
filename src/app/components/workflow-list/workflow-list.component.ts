import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CompositeFilterDescriptor, filterBy, orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { WorkflowService } from 'src/app/core/services/workflow.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {
  public view: any;
  private data: any;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private router: Router, private service: WorkflowService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.GetWorkflows();

  }

  private GetWorkflows() {
    this.service.getWorkflows().subscribe(data => {
      if (!data)
        return;
      this.data = data;
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
    console.log(args.dataItem)
    var editDataItem = args.dataItem;
    this.router.navigate(['/workflow-designer', editDataItem.id]);
  }


  public removeHandler(args: AddEvent): void {
    var editDataItem = args.dataItem;

    this.service.remove(editDataItem.id).subscribe(data => {

      this.GetWorkflows();

      this.notificationService.show({
        content: "Workflow successfully deleted",
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