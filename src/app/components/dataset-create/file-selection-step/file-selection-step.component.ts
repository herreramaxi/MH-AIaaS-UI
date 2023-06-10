import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FileRestrictions, FileInfo } from "@progress/kendo-angular-upload";

@Component({
  selector: 'app-file-selection-step',
  templateUrl: './file-selection-step.component.html',
  styleUrls: ['./file-selection-step.component.css']
})
export class FileSelectionStepComponent {

  @Input()
  formGroup: FormGroup
  @Input()
  firstFormGroup: FormGroup
  @Input()
  stepper: MatStepper;
  constructor(private http: HttpClient) {
    // this.firstFormGroup.con
    console.log("contructor")
  }
  // ngOnInit(): void {
  //   this.firstFormGroup.get("datasetName")?.valueChanges.subscribe(x=> {
  //          this.uploadSaveUrl = "api/dataset/upload"  + x;
  //          console.log( this.uploadSaveUrl )
  //   })
  // }

  public myRestrictions: FileRestrictions = {
    allowedExtensions: ["csv"],
  };

}

