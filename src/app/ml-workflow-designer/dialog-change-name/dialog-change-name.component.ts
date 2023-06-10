import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { Workflow } from 'src/app/core/models/workflow.model'

export interface DialogData {
  workflow: Workflow;
}

@Component({
  selector: 'app-dialog-change-name',
  templateUrl: './dialog-change-name.component.html',
  styleUrls: ['./dialog-change-name.component.css']
})
export class DialogChangeNameComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogChangeNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private service: WorkflowService
  ) {

  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [this.data.workflow.name, Validators.required],
      description: [this.data.workflow.description]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.formGroup.valid) return;

    var name = this.formGroup.get("name")?.value;
    var description = this.formGroup.get("description")?.value;
    const workflow: any = { id: this.data.workflow.id, name: name, description: description };

    this.service.rename(workflow).subscribe(data => {
      this.dialogRef.close(true);
    })
  }
}
