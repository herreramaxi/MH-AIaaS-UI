import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EndpointService } from 'src/app/core/services/endpoint.service';
import { DialogData } from '../dialog-change-name/dialog-change-name.component';
import { Endpoint } from 'src/app/core/models/endpoint.model';
import { AppState } from 'src/app/state-management/reducers/reducers';
import { Store } from '@ngrx/store';
import { workflowPublish } from 'src/app/state-management/actions/workflow.actions';

@Component({
  selector: 'app-publish-workflow',
  templateUrl: './publish-workflow.component.html',
  styleUrls: ['./publish-workflow.component.css']
})
export class PublishWorkflowComponent {
  formGroup: FormGroup;
  authenticationTypes: any[];

  constructor(
    public dialogRef: MatDialogRef<PublishWorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private endpointService: EndpointService,
    private store: Store<AppState>) { }

  ngOnInit(): void {

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

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      authenticationType: undefined
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.formGroup.valid) return;

    var name = this.formGroup.get("name")?.value;
    var description = this.formGroup.get("description")?.value;
    var authenticationType = this.formGroup.get("authenticationType")?.value;

    console.log(name)
    console.log(description)
    console.log(authenticationType)
    const endpointDto: Endpoint = {
      workflowId: this.data.workflow.id,
      name: name,
      description: description,
      authenticationType: authenticationType
    };

    this.store.dispatch(workflowPublish({ endpoint: endpointDto }));
    // this.endpointService.create(endpointDto).subscribe(data => {
    this.dialogRef.close(true);
    // })
  }
}
