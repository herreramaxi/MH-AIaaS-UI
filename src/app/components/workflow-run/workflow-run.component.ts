import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { environment } from 'src/environments/environment';

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
  hubConnection: HubConnection;

  constructor(private workflowService: WorkflowService) { }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['workflowId'];

    if (!change || !change.currentValue) {
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.api.serverUrl}/workflow-run-history-hub`)
      .build();

    this.hubConnection.start().then(() => {
      console.log('SignalR connection started.');
    }).catch(err => {
      console.error('Error starting SignalR connection:', err);
    });

    // Register event handler to receive messages from the hub
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(`Received message: ${message}`);
      // Handle the incoming message as needed
    });

    this.hubConnection.on('ReceiveWorkflowRunHistoryUpdate', (workflowRunHistory: any) => {
      console.log(`ReceiveWorkflowRunHistoryUpdate:`);
      console.log(workflowRunHistory)

      this.loadData(workflowRunHistory);
      // Handle the incoming message as needed
    });

    this.workflowService.getLatestWorkflowRunHistory(change.currentValue).subscribe(data => {
      console.log(data)

      if (!data) return;

      this.loadData(data);
    })
  }


  private loadData(data: any) {
    this.runHistory = data;
    if (data.minutes) {
      this.duration = `${data.minutes} minutes, ${data.seconds} seconds`;
    } else if (data.seconds) {

      this.duration = `${data.seconds} seconds, ${data.milliseconds} milliseconds`;
    } else {
      this.duration = `${data.milliseconds} milliseconds`;
    }
  }
}
