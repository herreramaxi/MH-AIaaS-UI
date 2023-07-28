import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WorkflowRunStatus } from 'src/app/core/models/enums/enums';

@Component({
  selector: 'app-operator-status',
  templateUrl: './operator-status.component.html',
  styleUrls: ['./operator-status.component.css']
})
export class OperatorStatusComponent implements OnInit {

  @Input()
  status?: WorkflowRunStatus;
  @Input()
  message: string;

  ngOnInit(): void {

    this.message = this.message ?? 'Please configure the operator and run it'
  }

  
  ngOnChanges(changes: SimpleChanges) {
    const status = changes['status'];
    const message = changes['message'];
    
    if (status?.currentValue) {
      this.status = status?.currentValue;
    }

    if (message?.currentValue) {
      this.message = message?.currentValue;
    }
  }
}
