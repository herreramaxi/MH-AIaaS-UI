import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StandardStepData } from '../standard-step.component';

export type ConfigData = {
  name: string,
  description: string,
  type: 'text' | 'number' | 'checkbox' | 'textarea',
  value?: any,
  default?: any
}

@Component({
  selector: 'app-edit-step',
  templateUrl: './edit-step.component.html',
  styleUrls: ['./edit-step.component.scss']
})
export class EditStepComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: StandardStepData, private dialogref: MatDialogRef<EditStepComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup(this.data.config.reduce((acc: any, config: any) => {
      acc[config.name] = new FormControl((config.value ?? config.default) || '', []);
      return acc;
    }, {}))
  }

  onSave() {

    this.dialogref.close(this.data.config.map(config => {
      return {
        ...config,
        value: this.form.value[config.name]
      }
    }));
  }

}
