import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageChangeEvent, PagerSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor, State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-dataset-preview',
  templateUrl: './dataset-preview.component.html',
  styleUrls: ['./dataset-preview.component.css']
})
export class DatasetPreviewComponent implements OnChanges {

  @Input()
  datasetPreview: any;

  @Input()
  pageSize: number;

  gridData: any[];
  header: any[];
  public view: any;
  public gridState: State = {
    sort: [],
    filter: {
      logic: "and",
      filters: []
    },
    skip: 0,
    take: 20,
  };

  public pageable: PagerSettings = {
    info: true,
    type: 'input',
    pageSizes: true,
    previousNext: true,
    position: 'bottom'
  }

  ngOnChanges(changes: SimpleChanges) {
    this.handleDatasetPreviewChange(changes);
    this.handlePageSizeChange(changes);
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.gridState.sort = sort;
    this.loadData();
  }

  private loadData(): void {
    this.view = process(this.gridData, this.gridState)
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.gridState.filter = filter;
    this.loadData();
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.gridState.skip = skip;
    this.gridState.take = take;
    this.loadData();
  }

  handleDatasetPreviewChange(changes: SimpleChanges) {
    const change = changes['datasetPreview'];

    if (!change.currentValue) {
      return;
    }

    const datasetPreview = change.currentValue;
    this.header = datasetPreview.header;

    if (!this.header) return;
    if (!datasetPreview.rows) return;

    const objects = datasetPreview.rows.map((row: any) => {
      const obj = {} as any;

      this.header.forEach((property: any, index: any) => {
        obj[property] = row[index];
      });
      return obj;
    });

    this.gridData = objects;
    this.loadData();
  }

  handlePageSizeChange(changes: SimpleChanges) {
    const change = changes['pageSize'];

    if (!change.currentValue) {
      return;
    }

    this.gridState.take = change.currentValue;
    this.loadData();
  }
}
