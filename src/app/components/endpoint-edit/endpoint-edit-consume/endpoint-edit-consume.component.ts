import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationType } from 'src/app/core/models/enums/enums';
import { EndpointService } from 'src/app/core/services/endpoint.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-endpoint-edit-consume',
  templateUrl: './endpoint-edit-consume.component.html',
  styleUrls: ['./endpoint-edit-consume.component.css']
})
export class EndpointEditConsumeComponent implements OnInit {
  @Input()
  endpointId: number;

  authenticationTypes: any[];
  formGroup: FormGroup;
  endpointAuthentication?: any;
  endpointURL: string;

  constructor(private endpointService: EndpointService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.endpointURL = `${environment.api.serverUrl}/api/predict/${this.endpointId}`

    this.endpointService.getAuthenticationTypes().subscribe(x => {
      if (!x) return;

      this.authenticationTypes = x.map(y => {
        return {
          id: +y.id,
          name: y.name,
          description: y.description,
        }
      });
    });

    this.load(this.endpointId);


  }

  load(id: number) {
    if (id <= 0) return;

    this.endpointService.getAuthenticationInfo(id).subscribe(data => {
      if (!data) return;

      this.endpointAuthentication = data;
      this.formGroup = this.formBuilder.group({
        authenticationType: data.authenticationType,
        apiKey: [data.apiKey, this.apiKeyValidator]
      });

      this.formGroup.get("authenticationType")?.valueChanges.subscribe(x => {
        debugger

        if (x == (AuthenticationType.TokenBased as number)) {
          this.tokenBasedGetToken();
          return;
        }

        this.formGroup.get("apiKey")?.patchValue(undefined);
      }
      );
    })
  }

  onSubmit(): void {
    if (!this.formGroup.valid || !this.endpointAuthentication) return;

    var authenticationType = this.formGroup.get("authenticationType")?.value;
    var apiKey = this.formGroup.get("apiKey")?.value;

    this.endpointAuthentication.authenticationType = authenticationType;
    this.endpointAuthentication.apiKey = apiKey;

    this.endpointService.updateAuthenticationInfo(this.endpointAuthentication).subscribe(data => {
      // this.dialogRef.close(true);
      if (!data) return

      this.load(this.endpointId);
    })
  }

  isApiKeyRequired(): boolean {
    const authenticationTypeControl = this.formGroup.get('authenticationType');
    if (!authenticationTypeControl) return false;

    return authenticationTypeControl.value === (AuthenticationType.TokenBased as number) && authenticationTypeControl.dirty;
  }

  apiKeyValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.parent) {
      const authenticationTypeControl = control.parent.get('authenticationType');
      if (authenticationTypeControl && authenticationTypeControl.value === (AuthenticationType.TokenBased as number) && !control.value) {
        return { apiKeyRequired: true };
      }
    }
    return null;
  }

  tokenBasedGetToken() {
    this.endpointService.tokenBasedGetToken().subscribe(data => {
      console.log(data)
      if (!data?.token) return;

      this.formGroup.get("apiKey")?.patchValue(data.token);
    })

  }

  get apiKey() { return this.formGroup.get('apiKey'); }

}
