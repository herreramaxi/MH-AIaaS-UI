import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, SortDescriptor, orderBy, State } from '@progress/kendo-data-query';
import { MlModelService } from '../core/services/ml-model.service';

@Component({
  selector: 'app-ml-model-list',
  templateUrl: './ml-model-list.component.html',
  styleUrls: ['./ml-model-list.component.css']
})
export class MlModelListComponent implements OnInit {
  public view: any;
  private data: any;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private router: Router, private service: MlModelService) { }

  ngOnInit(): void {

    this.service.getMlModels().subscribe(data => {
      if (!data) return;
      this.data = data;
      // this.view = process(data, this.gridState);
      this.loadData();
    })

  }

  public addHandler(args: AddEvent): void {
    this.router.navigate(['/ml-model-create']);
  }

  public editHandler(args: AddEvent): void {
    var editDataItem = args.dataItem;
    this.router.navigate(['/models',editDataItem.id]);
  }

  public filter: CompositeFilterDescriptor;
  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.view = filterBy(this.data, filter);
  }


  public sort: SortDescriptor[] = [
    {
      field: "Name",
      dir: "asc",
    },
  ];

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }

  private loadData(): void {
    this.view = {
      data: orderBy(this.data, this.sort),
      total: this.data.length,
    };
  }
}