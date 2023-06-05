import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { ConfigData, EditStepComponent } from './edit-step/edit-step.component';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { OperatorType } from 'src/app/core/models/enums/enums';
import { MlModelService } from 'src/app/core/services/ml-model.service';
import { ModelEvaluationComponent } from '../model-evaluation/model-evaluation.component';

export type StandardStepData = {
  name: string,
  icon: string,
  color: string,
  config: Array<ConfigData>
}

@Component({
  selector: 'app-standard-step',
  templateUrl: './standard-step.component.html',
  styleUrls: ['./standard-step.component.scss']
})
export class StandardStepComponent extends NgFlowchartStepComponent {
  name: string;
  isValid?: boolean;
  validationMessage: string;
  modelMetricsId?: number;

  constructor(private matdialog: MatDialog, private operatorSupportService: OperatorSupportService, private mlModelService: MlModelService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.name = this.data.name;
    this.isValid = this.data.isValid;
    this.validationMessage = this.data.validationMessage;

    debugger;
    var operatorTypeString = this.type as keyof typeof OperatorType;
    var operatorType = OperatorType[operatorTypeString ?? OperatorType.Nop]
    this.data.color = this.operatorSupportService.getColor(operatorType);
    this.data.icon = this.operatorSupportService.getIcon(operatorType);

    console.log(`ngOnInit: ${this.name}`)
    console.log(this.data)
    console.log(`print parent`)
    console.log(this.parent)


    if (this.name === "CleanData") {
      debugger;

    }

    if (this.parent?.data.name === "Dataset") {
      var config = this.parent.data.config.find((x: any) => x.name === "SelectedColumns");

      if (!config) return;

      console.log(`selected columns found on node ${this.name}: ${config.value}`)
    }

    if (operatorType === OperatorType.Evaluate) {
      this.modelMetricsId = this.data.parameters["ModelMetricsId"]
    }
  }

  onDelete() {
    this.destroy(false);
  }

  onEdit() {
    debugger;
    const dialogRef = this.matdialog.open(EditStepComponent, {
      data: this.data,
      width: '500px'
    });
    let sub = dialogRef.beforeClosed().subscribe(data => {
      if (data) {
        this.data.config = data;
      }

      sub.unsubscribe();
    })
  }

  visualizeMetrics() {
    debugger;
    if (!this.modelMetricsId) return;

    this.mlModelService.getMlModelMetrics(this.modelMetricsId).subscribe(modelMetrics => {
    

      const dialogRef = this.matdialog.open(ModelEvaluationComponent, {
        data: modelMetrics,
        width: '1000px'
      });
      // let sub = dialogRef.beforeClosed().subscribe(data => {
      //   if (data) {
      //     this.data.config = data;
      //   }

      //   sub.unsubscribe();
      // })

    })

  }
}
