import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { NgFlowchart, NgFlowchartCanvasDirective, NgFlowchartStepRegistry } from '@joelwenzel/ng-flowchart';
import { Store } from '@ngrx/store';
import { ClipboardService } from 'ngx-clipboard';
import { Observable, Subscription, tap } from 'rxjs';
import { Workflow } from 'src/app/core/models';
import { OperatorSupportService } from 'src/app/core/services/operator-support.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { workflowChange, workflowLoad, workflowRun, workflowSave } from 'src/app/state-management/actions/workflow.actions';
import { AppState } from 'src/app/state-management/reducers/reducers';
import { selectWorkflow, selectWorkflowIsModelGenerated, selectWorkflowIsPublished, selectWorkflowStatus } from 'src/app/state-management/reducers/workflow.reducers';
import { v4 as uuid4 } from 'uuid';
import { DialogChangeNameComponent } from './dialog-change-name/dialog-change-name.component';
import { PublishWorkflowComponent } from './publish-workflow/publish-workflow.component';
import { WebSocketRouterService } from 'src/app/core/services/websocket-router.service';

@Component({
  selector: 'app-ml-workflow-designer',
  templateUrl: './ml-workflow-designer.component.html',
  styleUrls: ['./ml-workflow-designer.component.scss']
})

export class MlWorkflowDesignerComponent implements OnInit, OnDestroy {
  @ViewChild(NgFlowchartCanvasDirective) chart: NgFlowchartCanvasDirective;

  generateIntermediateData = true;
  workflowId?: number;
  workflow$: Observable<Workflow | undefined>;
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
    private webSocketRouterService: WebSocketRouterService
  ) {
    this.options = new NgFlowchart.Options();
    this.options.manualConnectors = false;

    this.callbacks.onDropStep = (x) => {
      x.step.data.nodeGuid = uuid4();
      console.log("designer-onDropStep")
      this.triggerWorkflowChange();
    };

    // this.callbacks.afterDeleteStep = (x) => {
    //   console.log("designer-afterDeleteStep")
    //   //   this.triggerWorkflowChange();
    // }

    this.callbacks.onDropError = (x) => {
      console.log(`onDropError: ${x.error.message}`);
      console.log(x.error);
    }
  }

  private workflowSubscription: Subscription;
  private routeSubscription: Subscription;
  ngOnInit(): void {

    // open websocket connection
    this.webSocketRouterService.startConnection();

    this.workflow$ = this.store.select(selectWorkflow);
    this.workflowStatus$ = this.store.select(selectWorkflowStatus);
    this.isModelGenerated$ = this.store.select(selectWorkflowIsModelGenerated);
    this.isPublished$ = this.store.select(selectWorkflowIsPublished);

    this.service.getOperators().subscribe(ops => {
      this.operations = ops;

      this.operations.forEach((op: any) => {
        op.template = this.operatorService.getTemplate(op.type);
        op.data.icon = this.operatorService.getIcon(op.type);
        op.data.color = this.operatorService.getColor(op.type);
        this.registry.registerStep(op.type, op.template);
      });
    });

    this.operatorService.operatorSaveEvent.subscribe(node => {
      this.triggerWorkflowChange();
    });

    this.workflowSubscription = this.workflow$.subscribe(data => {
      if (!data || data.id != this.workflowId) return;

      this.workflow = data;
      var flow = this.getFlow();
      if (!flow || !this.workflow.root) return;

      flow.upload(this.workflow.root).then(() => {
        console.log("uploaded")
      });
    });

    this.workflowId = +this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(workflowLoad({ workflowId: this.workflowId }));
  }

  ngOnDestroy(): void {
    this.workflowSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();

    console.log("designer ngOnDestroy()")
    // stopping websocket connection
    this.webSocketRouterService.ngOnDestroy();
  }

  save() {
    if (!this.workflow) return;

    const json = this.getWorkflowJson();
    if (!json) return;

    this.store.dispatch(workflowSave({ workflow: { ...this.workflow, root: json } }));
  }

  runWorkflow() {
    if (!this.workflow) return;

    const json = this.getWorkflowJson();
    this.store.dispatch(workflowRun({ workflow: { ...this.workflow, root: json }, generateIntermediateData: this.generateIntermediateData }));
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
    const json = this.getWorkflowJson();
    console.log("triggerWorkflowChange:")
    console.log(json)

    if (!json || !this.workflow) { return; }

    this.store.dispatch(workflowChange({ workflow: { ...this.workflow, root: json } }));
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
      const validatedNode = this.getNodeFromTree(validatedTreeNode, node)

      if (validatedNode?.data) {
        node.data.status = validatedNode.data.status;
        node.data.statusDetail = validatedNode.data.statusDetail;
        node.data.parameters = validatedNode.data.parameters;
        node.data.datasetColumns = validatedNode.data.datasetColumns;

        if (!node.data.nodeGuid) {
          //exceptional case: if UI was not able to generate guid, so I will assign what backend has generated
          node.data.nodeGuid = validatedNode.data.nodeGuid;
        }
      }
    }

    const child = node.children?.find((o: any) => true);
    return this.traverse(child, validatedTreeNode);
  }

  getNodeFromTree(validatedTreeNode: any, node: any): any {
    if (!validatedTreeNode ||
      (validatedTreeNode.data && (validatedTreeNode.data.nodeGuid === node.data.nodeGuid)) ||
      validatedTreeNode.id === node.id) return validatedTreeNode;

    const child = validatedTreeNode.children?.find((o: any) => true);
    return this.getNodeFromTree(child, node)
  }

  cleanTree(node: any): any {
    if (!node) return node;

    if (node.data) {
      node.data.nodeGuid = uuid4();
      node.data.status = undefined;
      node.data.statusDetail = undefined;
      node.data.parameters = undefined;
    }

    const child = node.children?.find((o: any) => true);
    return this.cleanTree(child);
  }

  downloadFlow() {
    var json = this.getWorkflowJson(4);
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
    var flow = this.getFlow();
    if (!flow || !flow.getRoot()) return;

    flow.clear();
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
    const json = this.getWorkflowJson();
    this.clipboardService.copy(json ?? "");
  }

  pasteWorkflow() {
    navigator.clipboard.readText()
      .then(async clipboardContent => {
        const tree = JSON.parse(clipboardContent);

        this.cleanTree(tree.root);
        var flow = this.getFlow();

        if (!flow) {
          console.log("not able to retrieve flow");
          return;
        }

        await flow.upload(tree).then(() => {
          console.log("designer-pasteWorkflow")
          this.triggerWorkflowChange();
        });
      })
      .catch(error => {
        console.error('Failed to read clipboard content:', error);
      });
  }

  private getWorkflowJson(indent?: number) {
    return this.getFlow()?.toJSON(indent);
  }

  private getFlow() {
    return this.chart?.getFlow();
  }
}

