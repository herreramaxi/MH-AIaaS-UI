import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SignalRService } from 'src/app/core/services/signalr-service';
import { WorkflowRunHistoryService } from 'src/app/core/services/workflow-run-history-service';

@Component({
  selector: 'app-workflow-run',
  templateUrl: './workflow-run.component.html',
  styleUrls: ['./workflow-run.component.css']
})
export class WorkflowRunComponent implements OnChanges, OnDestroy {

  @Input()
  workflowId?: number;

  runHistory?: any;

  constructor(private workflowRunHistoryService: WorkflowRunHistoryService, private signalRService: SignalRService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['workflowId'];

    if (!change || !change.currentValue) {
      return;
    }

    this.signalRService.startConnection();
    this.signalRService.registerHandlerReceiveWorkflowRunHistoryUpdate((workflowRunHistory: any) => {
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

  ngOnDestroy(): void {
    this.signalRService.removeHandlerReceiveWorkflowRunHistoryUpdate();
  }

  private loadData(data: any) {
    this.runHistory = data;
  }
}
