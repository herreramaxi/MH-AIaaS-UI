import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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
  header:any;
  rows:any ;

  constructor(private http: HttpClient) {
    // this.firstFormGroup.con
    console.log("contructor")
  }

  ngOnInit(): void {
    console.log("oninit")
    console.log(this.stepper.selectedIndex)
    this.stepper.selectionChange.subscribe(x => {

      console.log(`selectionChange: ` + x)
      console.log(x)
      console.log(x.selectedIndex)

      if (x.selectedIndex === 2) {
        var fileInput = this.secondFormGroup.get("file")?.value;
        console.log('fileInput')
        console.log(fileInput)
        var file = fileInput[0];
        console.log(file)
        if (!file) return;

        console.log(file)

        console.log(file.name)

        const formData = new FormData();
        formData.append('file', file);

        this.http.post('api/datasets/preview', formData, file.name)
          .subscribe((res:any) => {
            console.log(res);
            this.fileAnalysis = res;


            this.header = res.header;
            this.rows =  res.data.slice(1);

            this.formGroup.get("fileAnalysis")?.patchValue(this.fileAnalysis);
          })
      }
    })
  }
}
