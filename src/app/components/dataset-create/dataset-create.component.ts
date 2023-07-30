import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { DatasetService } from 'src/app/core/services/dataset.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-dataset-create',
  templateUrl: './dataset-create.component.html',
  styleUrls: ['./dataset-create.component.css']
})
export class DatasetCreateComponent {
  @ViewChild('stepper') stepper: MatStepper;

  firstFormGroup = this.formBuilder.group({
    file: ['', Validators.required],
    datasetName: ['', Validators.required],
    datasetDescription: ['']
  });

  thirdFormGroup = this.formBuilder.group({
    delimiter: [',', Validators.required],
    missingRealsAsNaNs: [true, Validators.required],
    fileAnalysis: ['']
  });

  forthFormGroup = this.formBuilder.group({
    schema: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private datasetService: DatasetService, private notificationService: NotificationService, private router: Router) {
  }

  save() {
    var files: any
    files = this.firstFormGroup.get("file")?.value;
    var fileAnalysis: any;

    fileAnalysis = this.thirdFormGroup.get("fileAnalysis")?.value;
    var columnsSettings = fileAnalysis?.columnsSettings;

    var dataset = {
      name: this.firstFormGroup.get("datasetName")?.value,
      description: this.firstFormGroup.get("datasetDescription")?.value,
      delimiter: this.thirdFormGroup.get("delimiter")?.value,
      missingRealsAsNaNs: this.thirdFormGroup.get("missingRealsAsNaNs")?.value,
      columnSettings: columnsSettings,
    };

    this.datasetService.createDataset(dataset).subscribe({
      next: data => {
        if (!data) {
          this.notificationService.ShowError("There was an error when trying to store the dataset");

          return;
        }

        this.datasetService.uploadDataset(files[0], data).subscribe({
          next: x => {
            this.notificationService.ShowSuccess("Dataset successfully created");
            this.router.navigate([`/datasets`]);
          },
          error: err => {
            console.log('Error when uploading file storage', err);
            this.notificationService.ShowError("There was an error when trying to store the file storage");
          }
        });
      },
      error: err => {
        console.log('Error when creating dataset', err);
        this.notificationService.ShowError("There was an error when trying to create the dataset");
      }
    })
  }
}
