import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Endpoint } from 'src/app/core/models/endpoint.model';
import { EndpointService } from 'src/app/core/services/endpoint.service';

@Component({
  selector: 'app-endpoint-edit-configuration',
  templateUrl: './endpoint-edit-configuration.component.html',
  styleUrls: ['./endpoint-edit-configuration.component.css']
})
export class EndpointEditConfigurationComponent implements OnInit {
  endpoint?: Endpoint;
  formGroup?: FormGroup;
  @Input()
  endpointId: number;

  constructor(private activatedRoute: ActivatedRoute, private endpointService: EndpointService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.load(this.endpointId);
  }

  load(id: number) {
    if (id <= 0) return;

    this.endpointService.getById(id).subscribe(data => {
      if (!data) return;

      this.endpoint = data;
      this.formGroup = this.formBuilder.group({
        name: [data.name, Validators.required],
        description: data.description,
        authenticationType: data.authenticationType,
        apiKey: data.apiKey,
        isEnabled: data.isEnabled,
        createdBy: [{ value:data.createdBy, disabled: true }],
        createdOn: [{ value: data.createdOn, disabled: true }],
        modifiedBy:[{ value: data.modifiedBy, disabled: true }],
        modifiedOn: [{ value:data.modifiedOn, disabled: true }],
      });

    })
  }
  color: ThemePalette = 'primary';
  onSubmit(): void {
    if (!this.formGroup?.valid || !this.endpoint) return;

    var name = this.formGroup.get("name")?.value;
    var description = this.formGroup.get("description")?.value;
    var authenticationType = this.formGroup.get("authenticationType")?.value;
    var apiKey = this.formGroup.get("apiKey")?.value;
    var isEnabled = this.formGroup.get("isEnabled")?.value;
    console.log(name)
    console.log(description)
    console.log(authenticationType)
    console.log(apiKey)
    console.log(isEnabled)

    this.endpoint.name = name;
    this.endpoint.description = description;
    this.endpoint.authenticationType = authenticationType;
    this.endpoint.apiKey = apiKey;
    this.endpoint.isEnabled = isEnabled;

    this.endpointService.update(this.endpoint).subscribe(data => {
      // this.dialogRef.close(true);
      if (!data) return

      this.load(this.endpointId);
    })
  }

  public formControlValue(name: string){
    return this.formGroup?.get(name)?.value;
  }
}
