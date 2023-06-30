import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListBoxToolbarConfig } from '@progress/kendo-angular-listbox';
import { DatasetService } from 'src/app/core/services/dataset.service';
import { EditStepComponent } from '../edit-step/edit-step.component';
import { StandardStepData } from '../standard-step.component';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';

@Component({
  selector: 'app-edit-clean-operator',
  templateUrl: './edit-clean-operator.component.html',
  styleUrls: ['./edit-clean-operator.component.css']
})
export class EditCleanOperatorComponent implements OnInit {
  public toolbarSettings: ListBoxToolbarConfig = {
    position: "right",
    tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"],
  };


  formGroup: FormGroup;
  cleanModes: any;

  availableColumns: string[];
  selectedColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<EditStepComponent>,
    private service: OperatorSupportService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.service.getCleaningModes().subscribe(data => {
      this.cleanModes = data;
    })

    const cleanModeId = this.data.config.find((x: any) => x.name === "Cleaning mode")?.value;
    this.selectedColumns = this.data.config.find((x: any) => x.name === "SelectedColumns")?.value ?? [];

    this.availableColumns = (this.data.datasetColumns ?? []).filter((x: any) => !this.selectedColumns.includes(x));
    this.formGroup = this.formBuilder.group({
      "Cleaning mode": [cleanModeId, Validators.required],
      SelectedColumns: this.formBuilder.array(this.selectedColumns)
    });

  }

  onSave() {

    this.formGroup.value["SelectedColumns"].value = this.selectedColumns;

    // this.dialogref.close(this.data.config.map(config => {
    //   return {
    //     ...config,
    //     value: this.formGroup.value[config.name].value
    //   }
    // }));

    this.dialogref.close(this.data.config.map((config: any) => {
      return {
        ...config,
        value: config.name === "SelectedColumns" ? this.formGroup.value[config.name].value : this.formGroup.value[config.name]
      }
    }));
  }

}
