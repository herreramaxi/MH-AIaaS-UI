import { Injectable } from '@angular/core';
import { OperatorType } from '../models/enums/enums';
import { DatasetOperatorComponent } from 'src/app/operators/dataset-operator/dataset-operator.component';
import { StandardStepComponent } from 'src/app/operators/standard-step/standard-step.component';

@Injectable({
  providedIn: 'root'
})
export class OperatorSupportService {

  constructor() { }

  getTemplate(type: OperatorType): any {
    // op.type === "dataset" ? StandardStepComponent : RouterStepComponent;
    switch (type) {
      case OperatorType.Dataset: return DatasetOperatorComponent;
      default: return StandardStepComponent;
    }
  }

  getIcon(type: OperatorType): any {
    switch (type) {
      case OperatorType.Dataset: return "dataset";
      case OperatorType.Clean: return "cleaning_services";
      case OperatorType.Split: return "call_split";
      case OperatorType.Train: return "model_training";
      case OperatorType.Evaluate: return "analytics";
      default: return "calculate"
    }
  }

  getColor(type: OperatorType): any {
    switch (type) {
      case OperatorType.Dataset: return "#00b894";
      case OperatorType.Clean: return "#e84393";
      default: return "#e17055"
    }
  }
}
