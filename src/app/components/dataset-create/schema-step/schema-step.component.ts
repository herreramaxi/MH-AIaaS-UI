import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { Keys } from '@progress/kendo-angular-common';
import { CellClickEvent, CellCloseEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, State, orderBy } from '@progress/kendo-data-query';
import { ColumnSetting } from 'src/app/core/models/column-setting';
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
  private data: any;
  availableDataTypes: any[];
  public gridState: State = {
    sort: [
      {
        field: "columnName",
        dir: "asc",
      },
    ],
    skip: 0,
    take: 5,
  };

  public sort: SortDescriptor[] = [
    {
      field: "columnName",
      dir: "asc",
    },
  ];

  public changes = {};
  constructor(private formBuilder: FormBuilder, private datasetService: DatasetService) { }

  public ngOnInit(): void {
    this.datasetService.getAvailableDataTypes().subscribe((x: any) => {
      if (!x) return;

      this.availableDataTypes = x;
    })
    this.stepper.selectionChange.subscribe(x => {

      if (x.selectedIndex === 2) {
        var fileAnalysis = this.thirdFormGroup.get("fileAnalysis")?.value;
        console.log('fileAnalysis')
        console.log(fileAnalysis)

        if (!fileAnalysis) return;


        this.data = fileAnalysis.columnsSettings;
        this.loadData();
      }
    })

  }

  public onStateChange(state: State): void {
    this.gridState = state;
  }

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
  public cellClickHandler(args: CellClickEvent): void {
    console.log("cellClickHandler")
    console.log(args.isEdited)

    if (!args.isEdited) {
      args.sender.editCell(
        args.rowIndex,
        args.columnIndex,
        this.createFormGroup(args.dataItem)
      );
    }
  }

  public cellCloseHandler(args: CellCloseEvent): void {
    debugger
    console.log("cellCloseHandler")
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      args.preventDefault();
    } else if (formGroup.dirty) {
      if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
        return;
      }

      Object.assign(dataItem, formGroup.value);     
    }
  }

  public createFormGroup(dataItem: ColumnSetting): FormGroup {
    return this.formBuilder.group({
      include: dataItem.include,
      columnName: [dataItem.columnName, Validators.required],
      type: dataItem.type
    });
  }

  public hasChanges() {
    return true;
  }
}