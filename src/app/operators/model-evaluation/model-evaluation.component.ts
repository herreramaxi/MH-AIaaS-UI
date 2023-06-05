import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-model-evaluation',
  templateUrl: './model-evaluation.component.html',
  styleUrls: ['./model-evaluation.component.css']
})
export class ModelEvaluationComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public modelMetrics: any, private dialogref: MatDialogRef<ModelEvaluationComponent>) { }

  metrics: any;

  ngOnInit(): void {
    console.log(this.modelMetrics)

    this.metrics = JSON.parse(this.modelMetrics.data);
  }
}
