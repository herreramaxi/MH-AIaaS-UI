import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { EditStepComponent } from '../edit-step/edit-step.component';

@Component({
  selector: 'app-edit-train-model',
  templateUrl: './edit-train-model.component.html',
  styleUrls: ['./edit-train-model.component.css']
})
export class EditTrainModelComponent implements OnInit {

  formGroup: FormGroup;
  datasetColumns: string[];
  tasks: any[];
  trainers: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<EditStepComponent>,
    private service: OperatorSupportService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    debugger

    this.service.getMLTasks().subscribe(data => {
      this.tasks = data;
    })

    const label = this.data.config?.find((x: any) => x.name === "Label")?.value;
    const task = this.data.config?.find((x: any) => x.name === "Task")?.value;
    const trainer = this.data.config?.find((x: any) => x.name === "Trainer")?.value;
    this.datasetColumns = this.data.datasetColumns ?? [];


    if (task) {
      this.service.getTrainers(task).subscribe(y => {
        if (!y) return;

        this.trainers = y;
      })
    }

    this.formGroup = this.formBuilder.group({
      "Label": [label, Validators.required],
      "Task": [task, Validators.required],
      "Trainer": [trainer, Validators.required],
    });

    this.formGroup.get("Task")?.valueChanges.subscribe(x => {
      if (!x) return;

      this.service.getTrainers(x).subscribe(y => {
        if (!y) return;

        this.formGroup.value["Trainer"].value = undefined;
        this.trainers = y;
      })
    })

  }

  onSave() {
    debugger
    this.dialogref.close(this.data.config.map((config: any) => {
      return {
        ...config,
        value: this.formGroup.value[config.name]
      }
    }));
  }

}
