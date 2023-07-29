import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { NgFlowchart, NgFlowchartCanvasDirective, NgFlowchartStepRegistry } from '@joelwenzel/ng-flowchart';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ClipboardService } from 'ngx-clipboard';
import { Observable } from 'rxjs';
import { Workflow } from 'src/app/core/models';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { workflowChange, workflowLoad, workflowRun, workflowSave } from 'src/app/state-management/actions/workflow.actions';
import { AppState } from 'src/app/state-management/reducers/reducers';
import { selectOperatorSaved, selectWorkflow, selectWorkflowIsModelGenerated, selectWorkflowIsPublished, selectWorkflowStatus, selectWorkflowValidated } from 'src/app/state-management/reducers/workflow.reducers';
import { DialogChangeNameComponent } from './dialog-change-name/dialog-change-name.component';
import { PublishWorkflowComponent } from './publish-workflow/publish-workflow.component';

@Component({
  selector: 'app-ml-workflow-designer',
  templateUrl: './ml-workflow-designer.component.html',
  styleUrls: ['./ml-workflow-designer.component.scss']
})

export class MlWorkflowDesignerComponent implements OnInit {
  @ViewChild(NgFlowchartCanvasDirective) chart: NgFlowchartCanvasDirective;

  workflow$: Observable<Workflow | undefined>;
  workflowValidated$: Observable<Workflow | undefined>;
  operatorSaved$: Observable<Date | undefined>;
  workflowStatus$: Observable<string | undefined>;
  isModelGenerated$: Observable<boolean | undefined>;
  isPublished$: Observable<boolean | undefined>;

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
    private operatorService: OperatorSupportService,
    private store: Store<AppState>,
    private clipboardService: ClipboardService,

    private actions$: Actions,
  ) {

    this.options = new NgFlowchart.Options();
    this.options.manualConnectors = false;

    this.callbacks.onDropStep = (x) => {
      debugger
      console.log("designer-onDropStep")
      this.triggerWorkflowChange();
    };

    // this.callbacks.afterDeleteStep = (x) => {
    //   debugger
    //   console.log("designer-afterDeleteStep")
    //   this.triggerWorkflowChange();
    // }

    this.callbacks.onDropError = (x) => {
      console.log(`onDropError: ${x.error.message}`);
      console.log(x.error);

    }
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

  publishWorkflow() {
    const dialogRef = this.dialog.open(PublishWorkflowComponent, {
      data: { workflow: this.workflow },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !this.workflow) return;
    });
  }

  private triggerWorkflowChange() {
    const json = this.chart.getFlow().toJSON();
    console.log("triggerWorkflowChange:")
    console.log(json)

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
        node.data.status = validatedNode.data.status;
        node.data.statusDetail = validatedNode.data.statusDetail;
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

  cleanTree(node: any): any {
    if (!node) return node;

    if (node.data) {
      node.data.status = undefined;
      node.data.statusDetail = undefined;
      node.data.parameters = undefined;
    }

    const child = node.children?.find((o: any) => true);
    return this.cleanTree(child);
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
    this.isModelGenerated$ = this.store.select(selectWorkflowIsModelGenerated);
    this.isPublished$ = this.store.select(selectWorkflowIsPublished);

    this.workflow$.subscribe(m => {
      console.log("designer-workflow")      
      if (!m) return;

      this.workflow = m;

      if (this.workflow.root) {
        this.chart.getFlow().upload(this.workflow.root);
      }
    })

    this.workflowValidated$.subscribe(m => {      
      if (!m) return;

      console.log("designer-workflowValidated")
      this.validate(m);
    })

    this.operatorSaved$.subscribe(data => {
      if(!data) return

      console.log("designer-operatorSaved")
      this.triggerWorkflowChange();
    });



    this.activatedRoute.paramMap.subscribe(params => {
      var id = +this.activatedRoute.snapshot.params['id'];

      this.store.dispatch(workflowLoad({ workflowId: id }));
    });
  }

  downloadFlow() {
    let json = this.chart.getFlow().toJSON(4);
    if (!json) return;

    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (this.workflow?.name ?? "workflow") + ".json";
    a.click();
    window.URL.revokeObjectURL(url);
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

      this.store.dispatch(workflowLoad({ workflowId: this.workflow.id }));
    });
  };

  copyWorkflow() {
    const json = this.chart.getFlow().toJSON();
    this.clipboardService.copy(json ?? "");
  }

  pasteWorkflow() {

    navigator.clipboard.readText()
      .then(clipboardContent => {
        const tree = JSON.parse(clipboardContent);

        this.cleanTree(tree.root);
        this.chart.getFlow().upload(tree);
        console.log("designer-pasteWorkflow")
        this.triggerWorkflowChange();
      })
      .catch(error => {
        console.error('Failed to read clipboard content:', error);
      });
  }
}

