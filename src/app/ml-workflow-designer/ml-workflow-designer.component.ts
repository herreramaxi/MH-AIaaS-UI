import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { NgFlowchart, NgFlowchartCanvasDirective, NgFlowchartStepRegistry } from '@joelwenzel/ng-flowchart';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Workflow } from '../core/models/workflow.model';
import { WorkflowService } from '../core/services/workflow.service';
import { DatasetOperatorComponent } from '../operators/dataset-operator/dataset-operator.component';
import { RouterStepComponent } from '../operators/router-step/router-step.component';
import { StandardStepComponent } from '../operators/standard-step/standard-step.component';
import { DialogChangeNameComponent } from './dialog-change-name/dialog-change-name.component';
import { OperatorType } from '../core/models/enums/enums';
import { OperatorSupportService } from '../core/services/operator-support.service';

@Component({
  selector: 'app-ml-workflow-designer',
  templateUrl: './ml-workflow-designer.component.html',
  styleUrls: ['./ml-workflow-designer.component.css']
})

export class MlWorkflowDesignerComponent implements OnInit {
  @ViewChild(NgFlowchartCanvasDirective)

  chart: NgFlowchartCanvasDirective;
  options: NgFlowchart.Options = new NgFlowchart.Options();
  operations: any[];
  showMenu = false;
  disabled = false;
  workflow?: Workflow;

  constructor(public dialog: MatDialog,
     private service: WorkflowService, 
     private registry: NgFlowchartStepRegistry, 
     private activatedRoute: ActivatedRoute,
      private notificationService: NotificationService,
      private operatorService: OperatorSupportService) {
    // this.operations.push(this.dataset);
  }

  ngOnInit(): void {
    this.service.getOperators().subscribe(ops => {
      this.operations = ops;


      this.operations.forEach((op: any) => {
        op.template = this.operatorService.getTemplate(op.type);
        op.data.icon = this.operatorService.getIcon(op.type);
        op.data.color = this.operatorService.getColor(op.type);
        this.registry.registerStep(op.type, op.template);
      });
      // this.registry.registerStep('route', StandardStepComponent);

    })

    this.activatedRoute.paramMap.subscribe(params => {
      var id = +this.activatedRoute.snapshot.params['id'];

      this.loadWorkflow(id);
    });
  }

  ngAfterViewInit() {
  }

  downloadFlow() {
    console.log("download")
    let json = this.chart.getFlow().toJSON(4);
    var x = window.open();

    if (!x)
      return;

    x.document.open();
    x.document.write('<html><head><title>Flowchart Json</title></head><body><pre>' + json + '</pre></body></html>');
    x.document.close();

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

      if (this.workflow.root)
        this.chart.getFlow().upload(this.workflow.root);
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

  save() {
    if (!this.workflow) return;

    const json = this.chart.getFlow().toJSON();
    this.workflow.root = json;

    this.service.save(this.workflow).subscribe(data => {
      console.log("all good");
      console.log(data)



      this.notificationService.show({
        content: "Workflow successfully saved",
        position: { horizontal: "center", vertical: "top" },
        animation: { type: "fade", duration: 500 },
        closable: false,
        type: { style: "success", icon: true },
      });
    })
  }

  generateModel() {
    if (!this.workflow) return;

    debugger;
    const json = this.chart.getFlow().toJSON();
    this.workflow.root = json;

    this.service.run(this.workflow).subscribe(data => {
      console.log("all good");
      console.log(data)

      if (data?.root) {
        this.workflow = data;
        // this.workflow?.root = data.root;
        if (this.workflow.root)
          this.chart.getFlow().upload(this.workflow.root);
      }

      this.notificationService.show({
        content: "Workflow successfully saved",
        position: { horizontal: "center", vertical: "top" },
        animation: { type: "fade", duration: 500 },
        closable: false,
        type: { style: "success", icon: true },
      });
    })
  }
}