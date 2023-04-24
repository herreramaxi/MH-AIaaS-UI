import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dataset } from '../models/dataset.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient) { }

  getWorkflows() {
    return this.http.get<Dataset[]>('api/workflow');
  }

  // createDataset(dataset: any) {
  //   return this.http.post('api/dataset/create', dataset);
  // }

  // uploadDataset(file: any, id:any) {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   return this.http.post(`api/dataset/upload/${id}`, formData, file.name);
  // }
}
