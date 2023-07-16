import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { Store } from '@ngrx/store';
import { OperatorType } from 'src/app/core/models/enums/enums';
import { MlModelService } from 'src/app/core/services/ml-model.service';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { operatorSaved } from 'src/app/state-management/actions/workflow.actions';
import { ModelEvaluationComponent } from '../model-evaluation/model-evaluation.component';
import { EditCleanOperatorComponent } from './edit-clean-operator/edit-clean-operator.component';
import { EditDatasetMetadataComponent } from './edit-dataset-metadata/edit-dataset-metadata.component';
import { EditNormalizeOperatorComponent } from './edit-normalize-operator/edit-normalize-operator.component';
import { ConfigData, EditStepComponent } from './edit-step/edit-step.component';
import { EditTrainModelComponent } from './edit-train-model/edit-train-model.component';
import { AppState } from 'src/app/state-management/reducers/reducers';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { DatasetPreviewComponent } from '../../dataset-preview/dataset-preview.component';
import { DataVisualizationDialogComponent } from './data-visualization-dialog/data-visualization-dialog.component';
import { DatasetService } from 'src/app/core/services/dataset.service';

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
    private store: Store<AppState>,
    private workflowService: WorkflowService) {
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
  }

  areMetricsAvailable() {
    return this.operatorType === OperatorType.Evaluate &&
      this.data?.parameters &&
      this.data.parameters["ModelMetricsId"] > 0
  }

  isPreviewAvailable() {
    return this.operatorType !== OperatorType.Evaluate &&
      this.data?.parameters &&
      this.data.parameters["WorkflowDataViewId"] > 0
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

  visualizePreview() {
    const workflowDataViewId = this.data?.parameters["WorkflowDataViewId"]
    if (!workflowDataViewId) return;

    this.workflowService.getPreview(workflowDataViewId).subscribe(data => {
      if (!data) return;

      const dialogRef = this.matdialog.open(DataVisualizationDialogComponent, {
        data: data,
        width: '1200px',
        autoFocus: "first-heading"
      });

    })

  }

}
