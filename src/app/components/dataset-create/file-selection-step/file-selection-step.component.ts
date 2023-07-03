import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-file-selection-step',
  templateUrl: './file-selection-step.component.html',
  styleUrls: ['./file-selection-step.component.css']
})
export class FileSelectionStepComponent implements OnInit {

  @Input()
  formGroup: FormGroup
  @Input()
  firstFormGroup: FormGroup
  @Input()
  stepper: MatStepper;
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.formGroup.get("file")?.valueChanges.subscribe(x => {
      if (!x || x.length <1 || !x[0]?.name) return;

      this.firstFormGroup.get("datasetName")?.patchValue(x[0].name);
    })
  }
}

