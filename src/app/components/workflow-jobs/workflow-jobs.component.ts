import { Component, OnInit } from '@angular/core';
import { KendoGridListComponent } from 'src/app/core/components/kendo-grid-list/kendo-grid-list.component';
import { WorkflowRunHistoryService } from 'src/app/core/services/workflow-run-history-service';

@Component({
  selector: 'app-workflow-jobs',
  templateUrl: './workflow-jobs.component.html',
  styleUrls: ['./workflow-jobs.component.css']
})
export class WorkflowJobsComponent extends KendoGridListComponent  implements  OnInit {

  constructor(private service: WorkflowRunHistoryService) {
    super();
  }

  ngOnInit(): void {
    this.getWorkflowJobs();
  }
  getWorkflowJobs() {
    this.service.getAll().subscribe(data => {
      if (!data) return;

      this.gridData = data;
      this.loadData();
    })
  }
}
