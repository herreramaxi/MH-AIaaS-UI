import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KendoGridListComponent } from 'src/app/core/components/kendo-grid-list/kendo-grid-list.component';
import { WorkflowRunHistoryService } from 'src/app/core/services/workflow-run-history-service';

@Component({
  selector: 'app-workflow-job-details',
  templateUrl: './workflow-job-details.component.html',
  styleUrls: ['./workflow-job-details.component.css']
})
export class WorkflowJobDetailsComponent extends KendoGridListComponent implements OnInit {
  workflowRunId?: number;

  constructor(private service: WorkflowRunHistoryService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.workflowRunId = this.route.snapshot.params['id'];
    this.getWorkflowJobDetails();
  }
  getWorkflowJobDetails() {
    if (!this.workflowRunId) return;

    this.service.getWorkflowJobDetails(this.workflowRunId).subscribe(data => {
      if (!data) return;

      this.gridData = data;
      this.loadData();
    })
  }
}
