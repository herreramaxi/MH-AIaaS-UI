import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';
import { AddChildOptions, NgFlowchart, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { OperatorType } from 'src/app/core/models/enums/enums';

@Component({
  selector: 'app-dataset-operator',
  templateUrl: './dataset-operator.component.html',
  styleUrls: ['./dataset-operator.component.css']
})
export class DatasetOperatorComponent extends NgFlowchartStepComponent {
  name: string;
  isValid?: boolean;
  validationMessage: string;

  constructor(private matdialog: MatDialog, private operatorSupportService: OperatorSupportService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    debugger;
    this.name = this.data.name;
    this.data.color = this.operatorSupportService.getColor(OperatorType.Dataset);
    this.data.icon = this.operatorSupportService.getIcon(OperatorType.Dataset);

    this.isValid = this.data.isValid;
    this.validationMessage = this.data.validationMessage;
    console.log(`ngOnInit: ${this.name}`)
    console.log(this.data)
  }

  onDelete() {
    this.destroy(false);
  }

  onEdit() {
    debugger;
    const dialogRef = this.matdialog.open(EditDatasetComponent, {
      data: this.data,
      width: '700px',
      height: '500px'
    });

    let sub = dialogRef.beforeClosed().subscribe(data => {

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
