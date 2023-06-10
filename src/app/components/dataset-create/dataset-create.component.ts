import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NotificationService } from '@progress/kendo-angular-notification';
import { FileRestrictions, FileInfo } from "@progress/kendo-angular-upload";
import { Router } from '@angular/router';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Component({
  selector: 'app-dataset-create',
  templateUrl: './dataset-create.component.html',
  styleUrls: ['./dataset-create.component.css']
})
export class DatasetCreateComponent {
  @ViewChild('stepper') stepper: MatStepper;

  firstFormGroup = this.formBuilder.group({
    datasetName: ['', Validators.required],
    datasetDescription: ['']
  });

  secondFormGroup = this.formBuilder.group({
    file: ['', Validators.required],
  });

  thirdFormGroup = this.formBuilder.group({
    delimiter: [',', Validators.required],
    fileAnalysis: ['']
  });

  forthFormGroup = this.formBuilder.group({
    schema: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private datasetService: DatasetService, private notificationService: NotificationService, private router: Router) {
  }

  save() {
    var files: any
    files = this.secondFormGroup.get("file")?.value;
    var fileAnalysis: any;

    fileAnalysis = this.thirdFormGroup.get("fileAnalysis")?.value;
    var columnsSettings = fileAnalysis?.columnsSettings;

    var dataset = {
      name: this.firstFormGroup.get("datasetName")?.value,
      description: this.firstFormGroup.get("datasetDescription")?.value,
      delimiter: this.thirdFormGroup.get("delimiter")?.value,
      columnSettings: columnsSettings,
    };

    this.datasetService.createDataset(dataset).subscribe({
      next: data => {
        if (!data) {
          this.notificationService.show({
            content: "There was an error when trying to store the dataset",
            position: { horizontal: "center", vertical: "top" },
            animation: { type: "fade", duration: 500 },
            closable: false,
            type: { style: "error", icon: true },
          });

          return;
        }

        this.datasetService.uploadDataset(files[0], data).subscribe({
          next: x => {
            this.notificationService.show({
              content: "Dataset successfully created",
              position: { horizontal: "center", vertical: "top" },
              animation: { type: "fade", duration: 500 },
              closable: false,
              type: { style: "success", icon: true },
            });

            this.router.navigate([`/datasets`]);
          },
          error: err => {
            console.log('Error when uploading file storage', err);

            this.notificationService.show({
              content: "There was an error when trying to store the file storage",
              position: { horizontal: "center", vertical: "top" },
              animation: { type: "fade", duration: 500 },
              closable: false,
              type: { style: "error", icon: true },
            });
          }
        });
      },
      error: err => {
        console.log('Error when creating dataset', err);

        this.notificationService.show({
          content: "There was an error when trying to create the dataset",
          position: { horizontal: "center", vertical: "top" },
          animation: { type: "fade", duration: 500 },
          closable: false,
          type: { style: "error", icon: true },
        });
      }
    })
  }
}
