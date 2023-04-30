import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MlModel } from '../models/ml-model.model';

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
} 
