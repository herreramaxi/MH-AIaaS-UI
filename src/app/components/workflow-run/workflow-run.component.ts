import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WebSocketRouterService } from 'src/app/core/services/websocket-router.service';
import { WorkflowRunHistoryService } from 'src/app/core/services/workflow-run-history-service';

@Component({
  selector: 'app-workflow-run',
  templateUrl: './workflow-run.component.html',
  styleUrls: ['./workflow-run.component.css']
})
export class WorkflowRunComponent implements OnChanges {

  @Input()
  workflowId?: number;

  runHistory?: any;

  constructor(private workflowRunHistoryService: WorkflowRunHistoryService, private websocketRouterService: WebSocketRouterService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['workflowId'];

    if (!change || !change.currentValue) {
      return;
    }

    this.websocketRouterService.workflowRunHistoryEvent.subscribe((workflowRunHistory: any) => {
      console.log(`ReceiveWorkflowRunHistoryUpdate:`);
      console.log(workflowRunHistory)

      if (this.workflowId !== workflowRunHistory?.workflowId) return;

      this.loadData(workflowRunHistory);
      // Handle the incoming message as needed
    })

    this.workflowRunHistoryService.getLatestWorkflowRunHistory(change.currentValue).subscribe(data => {
      console.log(data)

      if (!data) return;

      this.loadData(data);
    })
  }

  private loadData(data: any) {
    this.runHistory = data;
  }
}
