import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { ConfigData, EditStepComponent } from './edit-step/edit-step.component';

export type StandardStepData = {
  name: string,
  icon: string,
  color: string,
  config: Array<ConfigData>
}

@Component({
  selector: 'app-standard-step',
  templateUrl: './standard-step.component.html',
  styleUrls: ['./standard-step.component.scss']
})
export class StandardStepComponent extends NgFlowchartStepComponent {


  name: string;


  constructor(private matdialog: MatDialog) {
    super();
  }

  override ngOnInit(): void {
    debugger;
    this.name = this.data.name;
    console.log(`ngOnInit: ${this.name}`)
    console.log(this.data)
  }

  onDelete() {
    this.destroy(false);
  }

  onEdit() {
    const dialogRef = this.matdialog.open(EditStepComponent, {
      data: this.data,
      width: '500px'
    });
    let sub = dialogRef.beforeClosed().subscribe(data => {
      if (data) {
        this.data.config = data;
      }

      sub.unsubscribe();
    })
  }

}
