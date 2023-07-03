import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Component({
  selector: 'app-basic-settings-step',
  templateUrl: './basic-settings-step.component.html',
  styleUrls: ['./basic-settings-step.component.css']
})
export class BasicSettingsStepComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  constructor(private service: DatasetService) { }
  ngOnInit(): void {
    this.formGroup.get("file")?.valueChanges.subscribe(x => {
      if (!x || x.length < 1 || !x[0]?.name) return;

      if (!this.formGroup.get("datasetName")?.value) {
        this.formGroup.get("datasetName")?.patchValue(x[0].name);
      }
    })
  }
}
