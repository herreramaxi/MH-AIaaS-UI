import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListBoxToolbarConfig } from '@progress/kendo-angular-listbox';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { EditStepComponent } from '../edit-step/edit-step.component';

@Component({
  selector: 'app-edit-dataset-metadata',
  templateUrl: './edit-dataset-metadata.component.html',
  styleUrls: ['./edit-dataset-metadata.component.css']
})
export class EditDatasetMetadataComponent implements OnInit {
  public toolbarSettings: ListBoxToolbarConfig = {
    position: "right",
    tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"],
  };

  formGroup: FormGroup;
  dataTypes: any[];

  availableColumns: string[];
  categoricalTypes: any[];
  selectedColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<EditStepComponent>,
    private service: OperatorSupportService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    debugger
    this.service.getAvailableDataTypes().subscribe(data => {
      this.dataTypes = data;
    })

    this.service.getCategoricalTypes().subscribe(data => {
      this.categoricalTypes = data;
    })

    const dataType = this.data.config.find((x: any) => x.name === "DataType")?.value;
    const categorical = this.data.config.find((x: any) => x.name === "Categorical")?.value;
    this.selectedColumns = this.data.config.find((x: any) => x.name === "SelectedColumns")?.value ?? [];

    this.availableColumns = (this.data.datasetColumns ?? []).filter((x: any) => !this.selectedColumns.includes(x));
    this.formGroup = this.formBuilder.group({
      "DataType": [dataType],
      "Categorical": [categorical],
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
