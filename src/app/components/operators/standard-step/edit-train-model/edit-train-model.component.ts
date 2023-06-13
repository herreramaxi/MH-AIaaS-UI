import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { EditStepComponent } from '../edit-step/edit-step.component';
import { StandardStepData } from '../standard-step.component';

@Component({
  selector: 'app-edit-train-model',
  templateUrl: './edit-train-model.component.html',
  styleUrls: ['./edit-train-model.component.css']
})
export class EditTrainModelComponent  implements OnInit {

  formGroup: FormGroup;
  datasetColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<EditStepComponent>,
    private service: OperatorSupportService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {    
    debugger
    const label = this.data.config?.find((x: any) => x.name === "Label")?.value;
    this.datasetColumns = this.data.datasetColumns ?? [];

    this.formGroup = this.formBuilder.group({
      "Label": [label, Validators.required],
      // SelectedColumns: this.formBuilder.array(this.selectedColumns)
    });

  }

  onSave() {   
    debugger
    this.dialogref.close(this.data.config.map((config:any )=> {
      return {
        ...config,
        value: this.formGroup.value[config.name]
      }
    }));
  }

}
