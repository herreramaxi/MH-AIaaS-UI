import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Component({
  selector: 'app-basic-settings-step',
  templateUrl: './basic-settings-step.component.html',
  styleUrls: ['./basic-settings-step.component.css']
})
export class BasicSettingsStepComponent {
  @Input()
  formGroup: FormGroup

  constructor(private service: DatasetService) { }

  
}
