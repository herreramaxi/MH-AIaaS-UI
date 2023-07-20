import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListBoxToolbarConfig } from '@progress/kendo-angular-listbox';
import { DatasetService } from 'src/app/core/services/dataset.service';
import { EditStepComponent } from '../../standard-step/edit-step/edit-step.component';
import { StandardStepData } from '../../standard-step/standard-step.component';

@Component({
  selector: 'app-edit-dataset',
  templateUrl: './edit-dataset.component.html',
  styleUrls: ['./edit-dataset.component.css']
})
export class EditDatasetComponent implements OnInit {

  formGroup: FormGroup;
  datasets: any;
  public toolbarSettings: ListBoxToolbarConfig = {
    position: "right",
    tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"],
  };

  availableColumns: string[];
  selectedColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: StandardStepData,
    private dialogref: MatDialogRef<EditStepComponent>,
    private service: DatasetService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.service.getDatasets().subscribe(data => {
      this.datasets = data;
    })

    const selectedDatasetId = this.data.config.find(x => x.name === "Dataset")?.value;
    this.selectedColumns = this.data.config.find(x => x.name === "SelectedColumns")?.value ?? [];

    this.formGroup = this.formBuilder.group({
      Dataset: [selectedDatasetId, Validators.required],
      SelectedColumns: this.formBuilder.array(this.selectedColumns)
    });

    if (selectedDatasetId) {
      this.loadDatasetAvailableColumns(selectedDatasetId);
    }

    this.formGroup.get("Dataset")?.valueChanges.subscribe(x => {

      if (!x) return;

      this.selectedColumns = [];
      this.loadDatasetAvailableColumns(x);
    })
  }

  private loadDatasetAvailableColumns(selectedDatasetId: any) {
    this.service.getDatasetColumns(selectedDatasetId).subscribe(columns => {
      if (!columns)
        return;

      this.availableColumns = columns.filter(x => !this.selectedColumns.includes(x.columnName)).map(x => x.columnName);
    });
  }

  onSave() {
    this.formGroup.value["SelectedColumns"].value = this.selectedColumns;

    this.dialogref.close(this.data.config.map(config => {
      return {
        ...config,
        value: config.name === "SelectedColumns" ? this.formGroup.value[config.name].value : this.formGroup.value[config.name]
      }
    }));
  }

}
