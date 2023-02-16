import { Component } from '@angular/core';
import { NgFlowchart, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
import { StandardStepComponent } from '../standard-step/standard-step.component';
import { RouteStepComponent } from './route-step/route-step.component';

@Component({
  selector: 'app-router-step',
  templateUrl: './router-step.component.html',
  styleUrls: ['./router-step.component.scss']
})
export class RouterStepComponent extends NgFlowchartStepComponent {



  routeData = {
    name: 'Route',
    icon: 'alt_route',
    color: '#2980b9',
    config: [
      {
        name: 'Route Expression',
        description: 'Javascript route expression',
        type: 'text',
        value: 'true'
      }
    ]
  }

  override ngOnInit(): void {
  }

  onDelete() {
    this.destroy(true);
  }

  override getDropPositionsForStep(pendingStep: NgFlowchart.PendingStep): NgFlowchart.DropPosition[] {
    if (pendingStep.template !== RouteStepComponent) {
      return ['ABOVE', 'LEFT', 'RIGHT'];
    }
    else {
      return ['BELOW'];
    }
  }

  onAddRoute() {
    let route = {
      ...this.routeData
    }
    

    this.addChild({
      template: StandardStepComponent,
      type: 'route',
      data: route
    }, {
      sibling: true
    });
  }

}
