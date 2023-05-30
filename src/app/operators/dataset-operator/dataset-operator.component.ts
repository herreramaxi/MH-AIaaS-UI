import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { NgFlowchart, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';

@Component({
  selector: 'app-dataset-operator',
  templateUrl: './dataset-operator.component.html',
  styleUrls: ['./dataset-operator.component.css']
})
export class DatasetOperatorComponent extends NgFlowchartStepComponent {


  name: string;


  constructor(private matdialog: MatDialog) {
    super();
  }

  override ngOnInit(): void {
    this.name = this.data.name;
    console.log(`ngOnInit: ${this.name}`)
    console.log(this.data)
  }

  onDelete() {
    this.destroy(false);
  }

  onEdit() {
    const dialogRef = this.matdialog.open(EditDatasetComponent, {
      data: this.data,
      width: '700px',
      height: '500px'
    });
    debugger
    let sub = dialogRef.beforeClosed().subscribe(data => {
      debugger
      if (data) {
        this.data.config = data;
      }

      sub.unsubscribe();
    })
  }

  override getDropPositionsForStep(step: NgFlowchart.Step | NgFlowchart.Connector): NgFlowchart.DropPosition[] {
    return ['BELOW'];
  
  }

}
