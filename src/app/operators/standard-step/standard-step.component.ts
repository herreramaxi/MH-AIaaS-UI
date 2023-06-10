import { Component, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { ConfigData, EditStepComponent } from './edit-step/edit-step.component';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { OperatorType } from 'src/app/core/models/enums/enums';
import { MlModelService } from 'src/app/core/services/ml-model.service';
import { ModelEvaluationComponent } from '../model-evaluation/model-evaluation.component';
import { EditCleanOperatorComponent } from '../edit-clean-operator/edit-clean-operator.component';

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
  isFailed?: boolean;
  validationMessage: string;
  modelMetricsId?: number;
  operatorType?: OperatorType;

  constructor(private matdialog: MatDialog, private operatorSupportService: OperatorSupportService, private mlModelService: MlModelService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.name = this.data.name;
    this.isFailed = this.data.isFailed;
    this.validationMessage = this.data.validationMessage;

    var operatorTypeString = this.type as keyof typeof OperatorType;
    this.operatorType = OperatorType[operatorTypeString ?? OperatorType.Nop]
    this.data.color = this.operatorSupportService.getColor(this.operatorType);
    this.data.icon = this.operatorSupportService.getIcon(this.operatorType);

    // if (this.name === "CleanData") {

    // }

    // if (this.parent?.data.name === "Dataset") {
    //   var config = this.parent.data.config.find((x: any) => x.name === "SelectedColumns");

    //   if (!config) return;

    // }

    if (this.operatorType === OperatorType.Evaluate && this.data?.parameters) {
      this.modelMetricsId = this.data.parameters["ModelMetricsId"]
    }
  }

  onDelete() {
    this.destroy(false);
  }

  onEdit() {
    debugger

    var componentTemplate: any = EditStepComponent;

    if (this.operatorType === OperatorType.Clean) {
      componentTemplate = EditCleanOperatorComponent;
    }

    const dialogRef = this.matdialog.open(componentTemplate, {
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

    if (!this.modelMetricsId) return;

    this.mlModelService.getMlModelMetrics(this.modelMetricsId).subscribe(modelMetrics => {

      const dialogRef = this.matdialog.open(ModelEvaluationComponent, {
        data: modelMetrics,
        width: '900px'
      });
    })

  }
}
