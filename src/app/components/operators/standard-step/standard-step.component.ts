import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { Store } from '@ngrx/store';
import { OperatorType } from 'src/app/core/models/enums/enums';
import { MlModelService } from 'src/app/core/services/ml-model.service';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { operatorSaved } from 'src/app/state-management/actions/workflow.actions';
import { AppState } from 'src/app/state-management/reducers/workflow.reducers';
import { EditCleanOperatorComponent } from './edit-clean-operator/edit-clean-operator.component';
import { ModelEvaluationComponent } from '../model-evaluation/model-evaluation.component';
import { ConfigData, EditStepComponent } from './edit-step/edit-step.component';
import { EditTrainModelComponent } from './edit-train-model/edit-train-model.component';
import { EditNormalizeOperatorComponent } from './edit-normalize-operator/edit-normalize-operator.component';
import { EditDatasetMetadataComponent } from './edit-dataset-metadata/edit-dataset-metadata.component';

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
  operatorType?: OperatorType;

  constructor(private matdialog: MatDialog,
    private operatorSupportService: OperatorSupportService,
    private mlModelService: MlModelService,
    private store: Store<AppState>) {
    super();
  }

  override ngOnInit(): void {

    super.ngOnInit();

    console.log("ngOnInit: " + this.operatorType)

    this.name = this.data.name;
    this.isFailed = this.data.isFailed;
    this.validationMessage = this.data.validationMessage;

    var operatorTypeString = this.type as keyof typeof OperatorType;
    this.operatorType = OperatorType[operatorTypeString ?? OperatorType.Nop]
    this.data.color = this.operatorSupportService.getColor(this.operatorType);
    this.data.icon = this.operatorSupportService.getIcon(this.operatorType);
  }

  areMetricsAvailable() {
    return this.operatorType === OperatorType.Evaluate &&
      this.data?.parameters &&
      this.data.parameters["ModelMetricsId"] > 0
  }

  onDelete() {
    this.destroy(false);
  }

  onEdit() {
    var componentTemplate: any = EditStepComponent;

    if (this.operatorType === OperatorType.Clean) {
      componentTemplate = EditCleanOperatorComponent;
    }
    if (this.operatorType === OperatorType.Train) {
      componentTemplate = EditTrainModelComponent;
    }
    if (this.operatorType === OperatorType.Normalize) {
      componentTemplate = EditNormalizeOperatorComponent;
    }
    if (this.operatorType === OperatorType.EditDataset) {
      componentTemplate = EditDatasetMetadataComponent;
    }

    const dialogRef = this.matdialog.open(componentTemplate, {
      data: this.data,
      width: '500px'
    });
    let sub = dialogRef.beforeClosed().subscribe(data => {
      if (data) {
        this.data.config = data;

        this.store.dispatch(operatorSaved());
      }

      sub.unsubscribe();
    })
  }

  visualizeMetrics() {
    const modelMetricsId = this.data?.parameters["ModelMetricsId"]
    if (!modelMetricsId) return;

    this.mlModelService.getMlModelMetrics(modelMetricsId).subscribe(modelMetrics => {

      const dialogRef = this.matdialog.open(ModelEvaluationComponent, {
        data: modelMetrics,
        width: '900px'
      });
    })

  }
}
