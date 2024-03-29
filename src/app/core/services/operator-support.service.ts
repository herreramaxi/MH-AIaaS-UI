import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { StandardStepComponent } from 'src/app/components/operators/standard-step/standard-step.component';
import { OperatorType } from '../models/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class OperatorSupportService {

  @Output()
  operatorSaveEvent = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getTemplate(type: OperatorType): any {
    return StandardStepComponent;
    // op.type === "dataset" ? StandardStepComponent : RouterStepComponent;
    // switch (type) {
    //   case OperatorType.Dataset: return DatasetOperatorComponent;
    //   default: return StandardStepComponent;
    // }
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
      // case OperatorType.Dataset: return "#00b894";
      case OperatorType.Dataset: return "#00B894";
      case OperatorType.EditDataset: return "#00B894";
      case OperatorType.Clean: return "#e17055";
      case OperatorType.Normalize: return "#e17055";
      case OperatorType.Split: return "#e84393";
      case OperatorType.Train: return "#e84393";
      case OperatorType.Evaluate: return "#3498db";
      default: return "#e17055"
    }
  }

  getCleaningModes() {
    return this.http.get<any[]>('api/operators/getCleaningModes');
  }

  getNormalizerModes() {
    return this.http.get<any[]>('api/operators/getNormalizerModes');
  }

  getMLTasks() {
    return this.http.get<any[]>('api/operators/getMLTasks');
  }

  getTrainers(task: string) {
    return this.http.get<any[]>('api/operators/getTrainers?task=' + task);
  }

  getAvailableDataTypes() {
    return this.http.get<any[]>('api/operators/getAvailableDataTypes');
  }

  getCategoricalTypes() {
    return this.http.get<any[]>('api/operators/getCategoricalTypes');
  }

  notifyOperatorSave(node: any) {
    this.operatorSaveEvent.emit(node);
  }
}
