import { Component, Input, OnInit } from '@angular/core';
import { PageChangeEvent, PagerSettings, ScrollMode } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor, State, process } from '@progress/kendo-data-query';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Component({
  selector: 'app-dataset-view-schema',
  templateUrl: './dataset-view-schema.component.html',
  styleUrls: ['./dataset-view-schema.component.css']
})
export class DatasetViewSchemaComponent implements OnInit {

  @Input()
  datasetId: number;

  scrollable: ScrollMode = "virtual";
  availableDataTypes: any[];
  gridData: any[];
  header?: any[];

  public view: any;
  public sizes = [5, 15, 20, 50, 100];
  public gridState: State = {
    sort: [],
    filter: {
      logic: "and",
      filters: []
    },
    skip: 0,
    take: 100,
  };

  public pageable: PagerSettings = {
    info: true,
    type: 'input',
    pageSizes: true,
    previousNext: true,
    position: 'bottom'
  }


  constructor(private datasetService: DatasetService) { }

  public ngOnInit(): void {
    this.datasetService.getDatasetColumns(this.datasetId).subscribe(data => {
      if (!data) return;

      this.gridData = data;
      this.loadData();
    })
  }

  private loadData(): void {
    this.view = process(this.gridData, this.gridState)
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.gridState.sort = sort;
    this.loadData();
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
}
