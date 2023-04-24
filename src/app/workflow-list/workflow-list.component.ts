import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { WorkflowService } from '../core/services/workflow.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent  implements OnInit {
  public view: any;
  private data: any;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private router: Router, private datasetService: WorkflowService) { }

  ngOnInit(): void {

    this.datasetService.getWorkflows().subscribe(data => {
      if (!data) return;
      this.data = data;
      // this.view = process(data, this.gridState);
      this.loadData();
    })

  }

  public addHandler(args: AddEvent): void {
    this.router.navigate(['/workflowCreate']);
  }

  public editHandler(args: AddEvent): void {
    var editDataItem = args.dataItem;
    this.router.navigate(['/workflowEdit', editDataItem.Id]);
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