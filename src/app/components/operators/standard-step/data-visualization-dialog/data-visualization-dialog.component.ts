import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelEvaluationComponent } from '../../model-evaluation/model-evaluation.component';

@Component({
  selector: 'app-data-visualization-dialog',
  templateUrl: './data-visualization-dialog.component.html',
  styleUrls: ['./data-visualization-dialog.component.css']
})
export class DataVisualizationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datasetPreview: any, private dialogref: MatDialogRef<ModelEvaluationComponent>) { }
}
