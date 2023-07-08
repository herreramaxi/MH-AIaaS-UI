import { Component } from '@angular/core';
import { PageChangeEvent, PagerSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor, process } from '@progress/kendo-data-query';
import { State } from '@progress/kendo-data-query/dist/npm/state';

@Component({
  selector: 'app-kendo-grid-list',
  templateUrl: './kendo-grid-list.component.html',
  styleUrls: ['./kendo-grid-list.component.css']
})
export class KendoGridListComponent {
  public view: any;
  public gridData: any[];
  public sizes = [5, 10, 20, 50, 100];
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

  public loadData(): void {
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
