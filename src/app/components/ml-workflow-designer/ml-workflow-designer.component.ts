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
import { Store, select } from '@ngrx/store';
import { workflowChange, workflowLoad, workflowLoadType, workflowRun, workflowSave } from 'src/app/state-management/actions/workflow.actions';
import { AppState, selectOperatorSaved, selectWorkflow, selectWorkflowStatus, selectWorkflowValidated } from 'src/app/state-management/reducers/workflow.reducers';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ml-workflow-designer',
  templateUrl: './ml-workflow-designer.component.html',
  styleUrls: ['./ml-workflow-designer.component.css']
})

export class MlWorkflowDesignerComponent implements OnInit {
  @ViewChild(NgFlowchartCanvasDirective)

  chart: NgFlowchartCanvasDirective;
  options: NgFlowchart.Options;
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
    private operatorService: OperatorSupportService,
    // private store: Store<{ workflow: Workflow }
    private store: Store<AppState>
  ) {

    this.options = new NgFlowchart.Options();
    this.options.manualConnectors = false;

    this.callbacks.onDropStep = (x) => {
      console.log(`onDropStep: ${x.step.data.name}`)

      this.triggerWorkflowChange();
    };

    this.callbacks.afterDeleteStep = (x) => {
      console.log(`afterDeleteStep: ${x.data.name}`);
      this.triggerWorkflowChange();
    }

    this.callbacks.onDropError = (x) => {
      console.log(`onDropError: ${x.error.message}`);
      console.log(x.error);

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

  save() {
    if (!this.workflow) return;


    const json = this.chart.getFlow().toJSON();

    this.store.dispatch(workflowSave({ workflow: { ...this.workflow, root: json } }));
  }

  runWorkflow() {
    if (!this.workflow) return;

    const json = this.chart.getFlow().toJSON();
    this.store.dispatch(workflowRun({ workflow: { ...this.workflow, root: json } }));
  }

  private triggerWorkflowChange() {
    const json = this.chart.getFlow().toJSON();
    if (this.workflow) {


      this.store.dispatch(workflowChange({ workflow: { ...this.workflow, root: json } }));
    }
  }

  validate(validatedWorkflow: any) {
    if (!validatedWorkflow?.root) {
      console.log("no root node found from validated tree")
      return
    }

    var flow = this.chart.getFlow();
    var tree = flow.toObject();

    const validatedTree = JSON.parse(validatedWorkflow?.root);
    this.traverse(tree?.root, validatedTree.root);
  }

  traverse(node: any, validatedTreeNode: any): any {
    if (!node) return node;

    if (node.data) {
      const validatedNode = this.getNodeFromTree(validatedTreeNode, node.id)

      if (validatedNode?.data) {
        node.data.isFailed = validatedNode.data.isFailed;
        node.data.validationMessage = validatedNode.data.validationMessage;
        node.data.parameters = validatedNode.data.parameters;
        node.data.datasetColumns = validatedNode.data.datasetColumns;
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
    });


    // this.data$ = this.store.pipe(select(selectWorkflow));
    this.workflow$ = this.store.select(selectWorkflow);
    this.workflowValidated$ = this.store.select(selectWorkflowValidated);
    this.operatorSaved$ = this.store.select(selectOperatorSaved);
    this.workflowStatus$ = this.store.select(selectWorkflowStatus);

    this.activatedRoute.paramMap.subscribe(params => {
      var id = +this.activatedRoute.snapshot.params['id'];

      console.log("dispatch workflowLoad")
      this.store.dispatch(workflowLoad({ workflowId: id }));
      // this.loadWorkflow(id);


    });

    this.workflow$.subscribe(m => {
      if (!m) return;


      console.log("this.workflow$.subscribe")

      this.workflow = m;

      if (this.workflow.root) {
        this.chart.getFlow().upload(this.workflow.root);
      }
    })


    this.workflowValidated$.subscribe(m => {
      if (!m) return;


      console.log("this.workflowValidated$.subscribe")

      this.validate(m);
    })

    this.operatorSaved$.subscribe(data => {

      if (!data) return;

      this.triggerWorkflowChange();
    });
  }

  workflow$: Observable<Workflow | undefined>;
  workflowValidated$: Observable<Workflow | undefined>;
  operatorSaved$: Observable<boolean | undefined>;
  workflowStatus$: Observable<string | undefined>;

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

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  openDialog(): void {
    if (!this.workflow)
      return;

    const dialogRef = this.dialog.open(DialogChangeNameComponent, {
      data: { workflow: this.workflow },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !this.workflow) return;

      console.log("loadWorkflow from openDialog")
      this.loadWorkflow(this.workflow.id);
    });
  };

}


