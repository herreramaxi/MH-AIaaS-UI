import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColumnSetting } from '../models/column-setting';
import { Dataset } from '../models/dataset.model';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  constructor(private http: HttpClient) { }

  getDatasets() {
    return this.http.get<Dataset[]>('api/datasets');
  }

  createDataset(dataset: any) {
    return this.http.post('api/datasets', dataset);
  }

  uploadDataset(file: any, id:any) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`api/datasets/upload/${id}`, formData, file.name);
  }

  remove(id: number) {
    return this.http.delete(`api/datasets/${id}`);
  }  
  getDatasetColumns(datasetId: any) {
    return this.http.get<ColumnSetting[]>(`api/datasets/${datasetId}/columns`);
  }

}
