import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { NgFlowchart, NgFlowchartCanvasDirective, NgFlowchartStepRegistry } from '@joelwenzel/ng-flowchart';
import { Workflow } from '../core/models/workflow.model';
import { WorkflowService } from '../core/services/workflow.service';
import { CustomStepComponent } from '../custom-step/custom-step.component';
import { RouteStepComponent } from '../custom-step/route-step/route-step.component';
import { FormStepComponent } from '../form-step/form-step.component';
import { NestedFlowComponent } from '../nested-flow/nested-flow.component';
import { RouterStepComponent } from '../router-step/router-step.component';
import { StandardStepComponent } from '../standard-step/standard-step.component';
import { DialogChangeNameComponent } from './dialog-change-name/dialog-change-name.component';

@Component({
  selector: 'app-ml-workflow-designer',
  templateUrl: './ml-workflow-designer.component.html',
  styleUrls: ['./ml-workflow-designer.component.css']
})
export class MlWorkflowDesignerComponent implements OnInit {

  @ViewChild(NgFlowchartCanvasDirective)
  chart: NgFlowchartCanvasDirective;


  options: NgFlowchart.Options = new NgFlowchart.Options();

  uploadSample = '{"root":{"id":"s1610071839395","type":"router","data":{"name":"Router","icon":"router","color":"#3498db"},"children":[{"id":"s1610071842234","type":"route","data":{"name":"Route","icon":"alt_route","color":"#2980b9","config":[{"name":"Route Expression","description":"Javascript route expression","type":"text","value":"!!payload?.orders"}]},"children":[{"id":"s1610071904557","type":"assign","data":{"name":"Variable","icon":"calculate","color":"#00b894","config":[{"name":"Variable Name","description":"The name of the new or existing variable","type":"text","value":"myOrders"},{"name":"Value","description":"Javascript expression for the value","type":"text","value":"payload.orders.filter(order => order.ownerId == 123)"}]},"children":[{"id":"s1610071954438","type":"execute","data":{"name":"Execute","icon":"code","color":"#e17055","config":[{"name":"Snippet","description":"Javascript snippet to execute","type":"textarea","value":"//do some cool stuff"}]},"children":[]}]},{"id":"s1610072459400","type":"notification","data":{"name":"Notification","icon":"notifications","color":"#e84393","config":[{"name":"Email To","description":"Recipients of the notification","type":"text"},{"name":"Subject","description":"Subject of the notification","type":"text"},{"name":"Body","description":"Message body content","type":"textarea"}]},"children":[]}]},{"id":"s1610071842634","type":"route","data":{"name":"Route","icon":"alt_route","color":"#2980b9","config":[{"name":"Route Expression","description":"Javascript route expression","type":"text","value":"!payload || !payload.orders"}]},"children":[{"id":"s1610071885134","type":"notification","data":{"name":"Notification","icon":"notifications","color":"#e84393","config":[{"name":"Email To","description":"Recipients of the notification","type":"text","value":"wenzje07@gmail.com"},{"name":"Subject","description":"Subject of the notification","type":"text","value":"Invalid payload"},{"name":"Body","description":"Message body content","type":"textarea","value":"No orders found on payload"}]},"children":[]}]}]}}';

  operations = [
    {
      name: 'Assign',
      type: 'assign',
      data: {
        name: 'Variable',
        icon: 'calculate',
        color: '#00b894',
        config: [
          {
            name: 'Variable Name',
            description: 'The name of the new or existing variable',
            type: 'text'
          },
          {
            name: 'Value',
            description: 'Javascript expression for the value',
            type: 'text'
          }
        ]
      },
      template: StandardStepComponent
    },
    {
      name: 'Execute',
      type: 'execute',
      data: {
        name: 'Execute',
        icon: 'code',
        color: '#e17055',
        config: [
          {
            name: 'Snippet',
            description: 'Javascript snippet to execute',
            type: 'textarea',
            value: 'payload.filter(order => order.owner == \'me\')'
          }
        ]
      },
      template: StandardStepComponent
    },
    {
      name: 'Notification',
      type: 'notification',
      data: {
        name: 'Notification',
        icon: 'notifications',
        color: '#e84393',
        config: [
          {
            name: 'Email To',
            description: 'Recipients of the notification',
            type: 'text'
          },
          {
            name: 'Subject',
            description: 'Subject of the notification',
            type: 'text'
          },
          {
            name: 'Body',
            description: 'Message body content',
            type: 'textarea'
          }
        ]
      },

      template: StandardStepComponent
    },
    {
      name: 'Router',
      type: 'router',
      data: {
        name: 'Router',
        icon: 'router',
        color: '#3498db'
      },

      template: RouterStepComponent
    }
  ]

  showMenu = false;
  disabled = false;
  workflow?: Workflow;

  constructor(public dialog: MatDialog, private service: WorkflowService, private registry: NgFlowchartStepRegistry, private activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.operations.forEach(op => {
      this.registry.registerStep(op.type, op.template);
    });
    this.registry.registerStep('route', StandardStepComponent);
   
    this.activatedRoute.paramMap.subscribe(params => {
      var id = +this.activatedRoute.snapshot.params['id'];

      this.loadWorkflow(id);
    });
  }

  ngAfterViewInit() {

  }

  downloadFlow() {

    let json = this.chart.getFlow().toJSON(4);
    var x = window.open();

    if (!x)
      return;

    x.document.open();
    x.document.write('<html><head><title>Flowchart Json</title></head><body><pre>' + json + '</pre></body></html>');
    x.document.close();

  }

  uploadFlow() {
    this.chart.getFlow().upload(this.uploadSample);
  }

  clearCanvas() {
    if (this.chart.getFlow().getRoot()) {
      this.chart.getFlow().clear();
    }
  }

  onGapChanged(event: any) {

    this.options = {
      ...this.options,
      stepGap: parseInt(event.target.value)
    };
  }

  onSequentialChange(event: any) {
    this.options = {
      ...this.options,
      isSequential: event.target.checked
    }
  }

  loadWorkflow(id: number) {
    this.service.getWorkflowById(id).subscribe(data => {
      this.workflow = data;
    })
  }

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  openDialog(): void {
    if (!this.workflow)
      return;

    const dialogRef = this.dialog.open(DialogChangeNameComponent, {
      data: { workflow: this.workflow },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !this.workflow) return;

      this.loadWorkflow(this.workflow.id);
    });
  };
}