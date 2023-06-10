import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { NgFlowchart, NgFlowchartCanvasDirective, NgFlowchartStepRegistry } from '@joelwenzel/ng-flowchart';
import { NotificationService } from '@progress/kendo-angular-notification';

import { Workflow } from 'src/app/core/models';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';
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
  operations: any[];
  showMenu = false;
  disabled = false;
  workflow?: Workflow;
  callbacks: NgFlowchart.Callbacks = {};

  constructor(public dialog: MatDialog,
    private service: WorkflowService,
    private registry: NgFlowchartStepRegistry,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private operatorService: OperatorSupportService) {

    this.callbacks.onLinkConnector = () => {
      console.log("onLinkConnector")
    }

    this.callbacks.afterRender = () => {
      console.log("afterRender")
    }
    this.callbacks.onDropStep = (x) => {
      console.log(`onDropStep: ${x.step.data.name}`)

      this.validate2()

      //yes

    };


    this.callbacks.afterDeleteStep = (x) => {
      //yes      
      console.log(`afterDeleteStep: ${x.data.name}`);
      this.validate2()
    }
  }

  validate2() {
    if (!this.workflow) return;

    const json = this.chart.getFlow().toJSON();
    this.workflow.root = json;

    this.service.validate(this.workflow).subscribe(data => {
      if (!data?.root) {
        console.log("no root node found from webapi tree")
        return
      }

      const validatedTree = JSON.parse(data?.root);
      console.log(validatedTree)

      if (!validatedTree?.root) {
        console.log("no root node found from validated tree")
        return
      }

      var flow = this.chart.getFlow();
      var tree = flow.toObject();
      this.traverse(tree?.root, validatedTree.root);

    })
  }

  traverse(node: any, validatedTreeNode: any): any {
    if (!node) return node;

    if (node.data) {
      const validatedNode = this.getNodeFromTree(validatedTreeNode, node.id)

      if (validatedNode?.data) {
        node.data.isFailed = validatedNode.data.isFailed;
        node.data.validationMessage = validatedNode.data.validationMessage;
      }
    }

    const child = node.children?.find((o: any) => true);
    return this.traverse(child, validatedTreeNode);
  }

  getNodeFromTree(node: any, id: any): any {
    if (!node || node.id === id) return node;

    const child = node.children?.find((o: any) => true);
    return this.getNodeFromTree(child, id)
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

      if (this.workflow.root) {
        this.chart.getFlow().upload(this.workflow.root);
      }
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



