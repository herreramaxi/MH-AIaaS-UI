import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { PageChangeEvent, PagerSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor, State, process } from '@progress/kendo-data-query';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Component({
  selector: 'app-schema-step',
  templateUrl: './schema-step.component.html',
  styleUrls: ['./schema-step.component.css']
})

export class SchemaStepComponent implements OnInit {
  @Input()
  formGroup: FormGroup
  @Input()
  thirdFormGroup: FormGroup
  @Input()
  stepper: MatStepper;

  public view: any;
  private gridData: any[];
  availableDataTypes: any[];
  public sizes = [5, 10, 20, 50, 100];
  public gridState: State = {
    sort: [     
    ],
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

  constructor(private formBuilder: FormBuilder, private datasetService: DatasetService) {
  }

  public ngOnInit(): void {
    this.datasetService.getAvailableDataTypes().subscribe((x: any) => {
      if (!x) return;

      this.availableDataTypes = x;
    })
    this.stepper.selectionChange.subscribe(x => {

      if (x.selectedIndex === 2) {
        var fileAnalysis = this.thirdFormGroup.get("fileAnalysis")?.value;   

        if (!fileAnalysis) return;

        this.gridData = fileAnalysis.columnsSettings;
        this.loadData();
      }
    })
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

  public onStateChange(state: State): void {
    this.gridState = state;
  }
}