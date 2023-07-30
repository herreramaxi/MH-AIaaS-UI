import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WebSocketRouterService } from 'src/app/core/services/websocket-router.service';
import { WorkflowRunHistoryService } from 'src/app/core/services/workflow-run-history-service';

@Component({
  selector: 'app-workflow-run',
  templateUrl: './workflow-run.component.html',
  styleUrls: ['./workflow-run.component.css']
})
export class WorkflowRunComponent implements OnInit {//OnChanges {

  @Input()
  workflowId: number;
  runHistory?: any;

  constructor(private workflowRunHistoryService: WorkflowRunHistoryService, private websocketRouterService: WebSocketRouterService) {
  }
  ngOnInit(): void {

    this.websocketRouterService.workflowRunHistoryEvent.subscribe((workflowRunHistory: any) => {
      console.log(`ReceiveWorkflowRunHistoryUpdate:`);
      console.log(workflowRunHistory)

      if (this.workflowId !== workflowRunHistory?.workflowId) return;

      this.loadData(workflowRunHistory);
    })

    this.workflowRunHistoryService.getLatestWorkflowRunHistory(this.workflowId).subscribe(data => {
      console.log(data)

      if (!data) return;

      this.loadData(data);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['workflowId'];

    if (!change || !change.currentValue) {
      return;
    }


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
