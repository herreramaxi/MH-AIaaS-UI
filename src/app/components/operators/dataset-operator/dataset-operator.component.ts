import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@auth0/auth0-angular';
import { NgFlowchart, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { Store } from '@ngrx/store';
import { OperatorType } from 'src/app/core/models/enums/enums';
import { DatasetService } from 'src/app/core/services/dataset.service';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { operatorSaved } from 'src/app/state-management/actions/workflow.actions';
import { DataVisualizationDialogComponent } from '../standard-step/data-visualization-dialog/data-visualization-dialog.component';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';

@Component({
  selector: 'app-dataset-operator',
  templateUrl: './dataset-operator.component.html',
  styleUrls: ['./dataset-operator.component.css']
})
export class DatasetOperatorComponent extends NgFlowchartStepComponent {
  name: string;
  isFailed?: boolean;
  validationMessage: string;

  constructor(private matdialog: MatDialog,
    private operatorSupportService: OperatorSupportService,
    private store: Store<AppState>,
    private datasetService: DatasetService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.name = this.data.name;
    this.data.color = this.operatorSupportService.getColor(OperatorType.Dataset);
    this.data.icon = this.operatorSupportService.getIcon(OperatorType.Dataset);

    this.isFailed = this.data.isFailed;
    this.validationMessage = this.data.validationMessage;
  }

  onDelete() {
    this.destroy(false);
  }

  onEdit() {

    const dialogRef = this.matdialog.open(EditDatasetComponent, {
      data: this.data,
      width: '550px',
      // height: '500px'
    });

    let sub = dialogRef.beforeClosed().subscribe(data => {

      if (data) {
        this.data.config = data;

        this.store.dispatch(operatorSaved());
      }

      sub.unsubscribe();
    })
  }

  override getDropPositionsForStep(step: NgFlowchart.Step | NgFlowchart.Connector): NgFlowchart.DropPosition[] {
    return ['BELOW'];
  }

  isPreviewAvailableDataset() {
    return this.data?.config &&
      this.data.config.find((x: any) => x.name === "Dataset")?.value
  }

  visualizePreviewDataset() {
    const datasetId = this.data.config.find((x: any) => x.name === "Dataset")?.value
    if (!datasetId) return;

    this.datasetService.getFilePreview(datasetId).subscribe(data => {
      if (!data) return;

      const dialogRef = this.matdialog.open(DataVisualizationDialogComponent, {
        data: data,
        width: '1200px',
        autoFocus: "first-heading"
      });

    })

  }
}
