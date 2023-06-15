import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatasetOperatorComponent } from 'src/app/components/operators/dataset-operator/dataset-operator.component';
import { StandardStepComponent } from 'src/app/components/operators/standard-step/standard-step.component';
import { OperatorType } from '../models/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class OperatorSupportService {

  constructor(private http: HttpClient) { }

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
    return this.http.get<any[]>('api/operators/getTrainers?task='+ task);
  }
}
