import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgFlowchart, NgFlowchartCanvasDirective, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';

export type NestedData = {
  nested: any;
};

@Component({
  selector: 'app-nested-flow',
  templateUrl: './nested-flow.component.html',
  styleUrls: ['./nested-flow.component.scss'],
})
export class NestedFlowComponent
  extends NgFlowchartStepComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(NgFlowchartCanvasDirective)
  nestedCanvas: NgFlowchartCanvasDirective | undefined;

  @ViewChild('canvasContent')
  stepContent: ElementRef<HTMLElement> | undefined;

  callbacks: NgFlowchart.Callbacks = {
    afterRender: () => {
      this.canvas.reRender(true);
    },
  };

  options: NgFlowchart.Options = {
    stepGap: 40,
    rootPosition: 'TOP_CENTER',
    zoom: {
      mode: 'DISABLED',
    },
    dragScroll: ['RIGHT'],
    manualConnectors: true,
  };

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.addAlternateClass();
  }

  ngOnDestroy() { }

  // add nested-alt class to alternate nested flows for better visibility
  addAlternateClass(): void {
    const parentCanvasWrapperClasses = (
      this.canvas.viewContainer.element.nativeElement as HTMLElement
    ).parentElement?.classList;
    if (
      parentCanvasWrapperClasses?.contains('nested-flow-step') &&
      !parentCanvasWrapperClasses.contains('nested-alt')
    ) {
      this.nativeElement.classList.add('nested-alt');
    }
  }

  override shouldEvalDropHover(coords: number[], stepToDrop: NgFlowchart.Step): boolean {
    const canvasRect = this.stepContent?.nativeElement.getBoundingClientRect();
    return canvasRect !== undefined && !this.areCoordsInRect(coords, canvasRect);
  }

  override toJSON() {
    const json = super.toJSON();
    return {
      ...json,
      data: {
        ...this.data,
        nested: this.nestedCanvas?.getFlow().toObject(),
      },
    };
  }

  override canDrop(dropEvent: NgFlowchart.DropTarget): boolean {
    return true;
  }

  override canDeleteStep(): boolean {
    return true;
  }

  override async onUpload(data: NestedData) {
    if (!this.nestedCanvas) {
      return;
    }
    await this.nestedCanvas.getFlow().upload(data.nested);
  }

  private areCoordsInRect(coords: number[], rect: Partial<DOMRect>): boolean {
    if (!rect.left || !rect.width || !rect.top || !rect.height)
      return false

    return (
      this.isNumInRange(coords[0], rect.left, rect.left + rect.width) &&
      this.isNumInRange(coords[1], rect.top, rect.top + rect.height)
    );
  }

  private isNumInRange(num: number, start: number, end: number): boolean {
    return num >= start && num <= end;
  }
}
