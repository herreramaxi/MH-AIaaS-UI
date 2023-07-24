import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KendoGridListComponent } from 'src/app/core/components/kendo-grid-list/kendo-grid-list.component';
import { WorkflowRunHistoryService } from 'src/app/core/services/workflow-run-history-service';

@Component({
  selector: 'app-workflow-jobs',
  templateUrl: './workflow-jobs.component.html',
  styleUrls: ['./workflow-jobs.component.css']
})
export class WorkflowJobsComponent extends KendoGridListComponent implements OnInit {
  workflowId?: number;

  constructor(private service: WorkflowRunHistoryService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {    
    this.workflowId = this.route.snapshot.params['id'];
    this.getWorkflowJobs();
  }
  getWorkflowJobs() {
    this.service.getAll(this.workflowId).subscribe(data => {
      if (!data) return;

      this.gridData = data;
      this.loadData();
    })
  }
}
