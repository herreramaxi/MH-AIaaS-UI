import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { Store } from '@ngrx/store';
import { OperatorType } from 'src/app/core/models/enums/enums';
import { DatasetService } from 'src/app/core/services/dataset.service';
import { MlModelService } from 'src/app/core/services/ml-model.service';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { WebSocketRouterService } from 'src/app/core/services/websocket-router.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { AppState } from 'src/app/state-management/reducers/reducers';
import { ModelEvaluationComponent } from '../model-evaluation/model-evaluation.component';
import { DataVisualizationDialogComponent } from './data-visualization-dialog/data-visualization-dialog.component';
import { EditCleanOperatorComponent } from './edit-clean-operator/edit-clean-operator.component';
import { EditDatasetMetadataComponent } from './edit-dataset-metadata/edit-dataset-metadata.component';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';
import { EditNormalizeOperatorComponent } from './edit-normalize-operator/edit-normalize-operator.component';
import { ConfigData, EditStepComponent } from './edit-step/edit-step.component';
import { EditTrainModelComponent } from './edit-train-model/edit-train-model.component';

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
  operatorType?: OperatorType;
  showEdit?: boolean;

  constructor(private matdialog: MatDialog,
    private operatorSupportService: OperatorSupportService,
    private mlModelService: MlModelService,
    private store: Store<AppState>,
    private workflowService: WorkflowService,
    private datasetService: DatasetService,
    private websocketRouterService: WebSocketRouterService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.name = this.data.name;
    var operatorTypeString = this.type as keyof typeof OperatorType;
    this.operatorType = OperatorType[operatorTypeString ?? OperatorType.Nop]
    this.data.color = this.operatorSupportService.getColor(this.operatorType);
    this.data.icon = this.operatorSupportService.getIcon(this.operatorType);
    this.showEdit = this.operatorType !== OperatorType.Evaluate;

    this.websocketRouterService.workflowNodeRunHistoryEvent.subscribe((workflowNodeRunUpdate: any) => {
      if (this.data.nodeGuid && this.data.nodeGuid !== workflowNodeRunUpdate?.nodeGuid) return;

      this.data.status = workflowNodeRunUpdate.status;
      this.data.statusDetail = workflowNodeRunUpdate.statusDetail;
      this.data.datasetColumns = workflowNodeRunUpdate.datasetColumns;
      this.data.parameters = workflowNodeRunUpdate.nodeParameters;
    })
  }

  areMetricsAvailable() {
    return this.operatorType === OperatorType.Evaluate &&
      this.data?.parameters &&
      this.data.parameters["ModelMetricsId"] > 0
  }

  isPreviewAvailable() {
    if (this.operatorType == OperatorType.Dataset) {
      return this.data?.config &&
        this.data.config.find((x: any) => x.name === "Dataset")?.value;
    }

    return this.operatorType !== OperatorType.Evaluate &&
      this.data?.parameters &&
      this.data.parameters["WorkflowDataViewId"] > 0
  }

  onDelete() {
    console.log("onDelete")
    this.destroy(false);
    this.operatorSupportService.notifyOperatorSave(this);
    // this.store.dispatch(operatorSaved());
  }

  onEdit() {
    if (this.operatorType === OperatorType.Evaluate) return;

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
    if (this.operatorType === OperatorType.Dataset) {
      componentTemplate = EditDatasetComponent;
    }

    const dialogRef = this.matdialog.open(componentTemplate, {
      data: this.data,
      width: '550px'
    });
    let sub = dialogRef.beforeClosed().subscribe(data => {
      console.log("dialogRef.beforeClosed()")
      if (data) {
        this.data.config = data;

        // this.store.dispatch(operatorSaved());
        this.operatorSupportService.notifyOperatorSave(this);
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
    if (this.operatorType === OperatorType.Dataset) {
      const datasetId = this.data.config.find((x: any) => x.name === "Dataset")?.value
      if (!datasetId) return;

      this.datasetService.getFilePreview(datasetId).subscribe(data => {
        if (!data) return;

        const dialogRef = this.matdialog.open(DataVisualizationDialogComponent, {
          data: data,
          width: '1200px',
          height: '700px',
          autoFocus: "first-heading"
        });
      });

      return;
    }

    const workflowDataViewId = this.data?.parameters["WorkflowDataViewId"]
    if (!workflowDataViewId) return;

    this.workflowService.getPreview(workflowDataViewId).subscribe(data => {
      if (!data) return;

      const dialogRef = this.matdialog.open(DataVisualizationDialogComponent, {
        data: data,
        width: '1200px',
        height: '700px',
        autoFocus: "first-heading"
      });
    });
  }
}
