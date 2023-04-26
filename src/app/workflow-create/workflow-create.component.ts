import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { WorkflowService } from '../core/services/workflow.service';
import { DialogChangeNameComponent } from '../ml-workflow-designer/dialog-change-name/dialog-change-name.component';

@Component({
  selector: 'app-workflow-create',
  templateUrl: './workflow-create.component.html',
  styleUrls: ['./workflow-create.component.css']
})

export class WorkflowCreateComponent implements OnInit {
  name: string;
  constructor(public dialog: MatDialog, private service: WorkflowService) {
    // this.name =  'workflow - created - 24-04-23'
  }

  ngOnInit(): void {
    this.service.createWorkflow().subscribe(data => {
      if (!data?.name) return;

      this.name = data.name;
    })
  }
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogChangeNameComponent, {
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }
}