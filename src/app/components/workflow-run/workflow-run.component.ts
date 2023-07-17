import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WorkflowService } from 'src/app/core/services/workflow.service';

@Component({
  selector: 'app-workflow-run',
  templateUrl: './workflow-run.component.html',
  styleUrls: ['./workflow-run.component.css']
})
export class WorkflowRunComponent implements OnChanges {

  @Input()
  workflowId?: number;
  runHistory?: any;
  duration?: string;

  constructor(private workflowService: WorkflowService) { }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['workflowId'];

    if (!change || !change.currentValue) {
      return;
    }

    this.workflowService.getLatestWorkflowRunHistory(change.currentValue).subscribe(data => {
      console.log(data)

      if (!data) return;

      this.runHistory = data;
      if (data.minutes) {
        this.duration = `${data.minutes} minutes, ${data.seconds} seconds`
      } else if (data.seconds) {

        this.duration = `${data.seconds} seconds, ${data.milliseconds} milliseconds`
      } else {
        this.duration = `${data.milliseconds} milliseconds`
      }
    })
  }

}
