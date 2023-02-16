import { Component, OnInit } from '@angular/core';
import { NgFlowchart, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { RouteStepComponent } from './route-step/route-step.component';

@Component({
  selector: 'app-custom-step',
  templateUrl: './custom-step.component.html',
  styleUrls: ['./custom-step.component.scss'],
})
export class CustomStepComponent
  extends NgFlowchartStepComponent
  implements OnInit {


  routes: { name?: string, condition?: string, sequence?: number }[] = [];

  override ngOnInit(): void { }

  override canDrop(dropEvent: NgFlowchart.DropTarget): boolean {
    return true;
  }

  override canDeleteStep(): boolean {
    return true;
  }

  override getDropPositionsForStep(
    pendingStep: NgFlowchart.PendingStep
  ): NgFlowchart.DropPosition[] {
    if (pendingStep.template !== RouteStepComponent) {
      return ['ABOVE', 'LEFT', 'RIGHT'];
    } else {
      return ['BELOW'];
    }
  }

  onAddRoute() {
    let route = {
      name: 'New Route',
      condition: '',
      sequence: 0,
    };
    let index = this.routes.push(route);
    route.sequence = index;

    this.addChild(
      {
        template: RouteStepComponent,
        type: 'route-step',
        data: route,
      },
      {
        sibling: true,
      }
    );
  }

  delete() {
    //recursively delete
    this.destroy(true);
  }
}
