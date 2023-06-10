import { Component } from '@angular/core';
import { NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';

@Component({
  selector: 'app-route-step',
  templateUrl: './route-step.component.html',
  styleUrls: ['./route-step.component.scss']
})
export class RouteStepComponent extends NgFlowchartStepComponent {



  override ngOnInit(): void {
  }

}
