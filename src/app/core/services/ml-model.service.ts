import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MlModel } from '../models/ml-model.model';
import { ModelMetrics } from '../models/model-metrics';

@Injectable({
  providedIn: 'root'
})
export class MlModelService {

  constructor(private http: HttpClient) { }

  getMlModels() {
    return this.http.get<MlModel[]>('api/mlModels');
  }

  getMlModelById(id: number) {
    return this.http.get<MlModel>(`api/mlModels/${id}`);
  }

  getMlModelMetrics(id: number) {
    return this.http.get<ModelMetrics>(`api/mlModels/getModelMetrics/${id}`);
  }
  
  remove(id: number) {
    return this.http.delete(`api/mlModels/${id}`);
  }

  downloadModel(id: number) {
    return this.http.get(`api/mlModels/Download/${id}`, { responseType: 'blob' });
  }

} 
