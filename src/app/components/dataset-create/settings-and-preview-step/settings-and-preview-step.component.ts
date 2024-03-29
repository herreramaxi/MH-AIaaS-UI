import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-settings-and-preview-step',
  templateUrl: './settings-and-preview-step.component.html',
  styleUrls: ['./settings-and-preview-step.component.css']
})
export class SettingsAndPreviewStepComponent implements OnInit {

  @Input()
  formGroup: FormGroup
  @Input()
  secondFormGroup: FormGroup
  @Input()
  stepper: MatStepper;

  fileAnalysis: any;
  color: ThemePalette = 'primary';
  delimiterSubscription?: Subscription;
  missingRealsAsNaNsSubscription?: Subscription;
  datasetPreview?: any;

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.SubscribeToDelimiterChanges();
    this.SubscribeToMissingRealsChanges();

    this.stepper.selectionChange.subscribe(x => {
      if (x.selectedIndex === 1) {
        var fileInput = this.secondFormGroup.get("file")?.value;
        var file = fileInput[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        this.RequestPreview(formData, file.name, true)
      }
    })
  }

  private SubscribeToMissingRealsChanges() {
    this.missingRealsAsNaNsSubscription = this.formGroup.get("missingRealsAsNaNs")?.valueChanges.subscribe(x => {
      var fileInput = this.secondFormGroup.get("file")?.value;
      var file = fileInput[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('delimiter', this.formGroup.get("delimiter")?.value);
      formData.append('missingRealsAsNaNs', x);

      this.RequestPreview(formData, file.name, false);
    });
  }

  private SubscribeToDelimiterChanges() {
    this.delimiterSubscription = this.formGroup.get("delimiter")?.valueChanges.subscribe(x => {
      var fileInput = this.secondFormGroup.get("file")?.value;
      var file = fileInput[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('delimiter', x);
      formData.append('missingRealsAsNaNs', this.formGroup.get("missingRealsAsNaNs")?.value);
      this.RequestPreview(formData, file.name, false);
    });
  }

  private RequestPreview(formData: any, fileName: any, inferDelimiter = false) {
    this.http.post('api/datasets/preview', formData, fileName)
      .subscribe({
        next: (res: any) => {          
          this.fileAnalysis = res;
          this.datasetPreview = { ...res };
          this.formGroup.get("fileAnalysis")?.patchValue(this.fileAnalysis);

          if (inferDelimiter) {
            this.delimiterSubscription?.unsubscribe();
            this.formGroup.get("delimiter")?.setValue(this.fileAnalysis.delimiter ?? ',', { onlySelf: true, emitEvent: false });
            this.SubscribeToDelimiterChanges();
          }
        },
        error: (e: any) => {
          console.log(e)
          this.notificationService.ShowError("There was an error when trying to preview the dataset => " + e.error);
        }
      })
  }
}
