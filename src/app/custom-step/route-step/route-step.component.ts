import { Component, OnInit } from '@angular/core';
import { NgFlowchart, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';

@Component({
  selector: 'app-route-step',
  templateUrl: './route-step.component.html',
  styleUrls: ['./route-step.component.scss'],
})
export class RouteStepComponent
  extends NgFlowchartStepComponent
  implements OnInit
{
  override ngOnInit(): void {}

  override getDropPositionsForStep(step: NgFlowchart.Step): NgFlowchart.DropPosition[] {
    if (step.type !== 'route-step') {
      return ['BELOW'];
    } else {
      return ['LEFT', 'RIGHT'];
    }
  }

  override isValidConnectorDropTarget() {
    return true;
  }
}
