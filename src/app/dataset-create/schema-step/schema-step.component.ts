import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { Keys } from '@progress/kendo-angular-common';
import { GridDataResult, EditService, CellClickEvent, CellCloseEvent, AddEvent, CancelEvent, SaveEvent, RemoveEvent, GridComponent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Observable, map } from 'rxjs';
import { ColumnSetting } from 'src/app/core/models/coulumn-setting';

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
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  public changes = {};

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {

    this.stepper.selectionChange.subscribe(x => {

      if (x.selectedIndex === 3) {
        var fileAnalysis = this.thirdFormGroup.get("fileAnalysis")?.value;
        console.log('fileAnalysis')
        console.log(fileAnalysis)
        
        if (!fileAnalysis) return;
     
        this.view = process(fileAnalysis.columnsSettings, this.gridState);
      }
    })

  }

  public onStateChange(state: State): void {
    this.gridState = state;

    // this.editService.read();
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
    console.log("cellCloseHandler")
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      args.preventDefault();
    } else if (formGroup.dirty) {
      if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
        return;
      }

      Object.assign(dataItem,  formGroup.value);
      // this.editService.assignValues(dataItem, formGroup.value);
      // this.editService.update(dataItem);
    }
  }

  public createFormGroup(dataItem: ColumnSetting): FormGroup {
    return this.formBuilder.group({
      include: dataItem.include,
      columnName: [dataItem.columnName, Validators.required],
      type: dataItem.type
    });
  }

  public hasChanges(){
return true;
  }
}