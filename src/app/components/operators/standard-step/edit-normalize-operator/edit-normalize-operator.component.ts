import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListBoxToolbarConfig } from '@progress/kendo-angular-listbox';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { EditStepComponent } from '../edit-step/edit-step.component';

@Component({
  selector: 'app-edit-normalize-operator',
  templateUrl: './edit-normalize-operator.component.html',
  styleUrls: ['./edit-normalize-operator.component.css']
})
export class EditNormalizeOperatorComponent implements OnInit {
  public toolbarSettings: ListBoxToolbarConfig = {
    position: "right",
    tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"],
  };

  formGroup: FormGroup;
  modes: any;

  availableColumns: string[];
  selectedColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<EditStepComponent>,
    private service: OperatorSupportService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.service.getNormalizerModes().subscribe(data => {
      this.modes = data;
    })

    const modeId = this.data.config.find((x: any) => x.name === "Normalization mode")?.value;
    this.selectedColumns = this.data.config.find((x: any) => x.name === "SelectedColumns")?.value ?? [];

    this.availableColumns = (this.data.datasetColumns ?? []).filter((x: any) => !this.selectedColumns.includes(x));
    this.formGroup = this.formBuilder.group({
      "Normalization mode": [modeId, Validators.required],
      SelectedColumns: this.formBuilder.array(this.selectedColumns)
    });

  }

  onSave() {
    this.formGroup.value["SelectedColumns"].value = this.selectedColumns;

    this.dialogref.close(this.data.config.map((config: any) => {
      return {
        ...config,
        value: config.name === "SelectedColumns" ? this.formGroup.value[config.name].value : this.formGroup.value[config.name]
      }
    }));
  }

}
