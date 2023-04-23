import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dataset } from '../models/dataset.model';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(private http: HttpClient) { }

  getDatasets() {
    return this.http.get<Dataset[]>('api/dataset');
  }

  createDataset(dataset: any) {
    return this.http.post('api/dataset/create', dataset);
  }

  uploadDataset(file: any, id:any) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`api/dataset/upload/${id}`, formData, file.name);
  }
}
