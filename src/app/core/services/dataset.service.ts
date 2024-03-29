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

  getById(id: number) {
    return this.http.get<Dataset>(`api/datasets/${id}`);
  }

  getFilePreview(id: number) {
    return this.http.get<any[]>(`api/datasets/getFilePreview/${id}`);
  }

  createDataset(dataset: any) {
    return this.http.post('api/datasets', dataset);
  }

  uploadDataset(file: any, id: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('datasetId', id);

    return this.http.post(`api/datasets/upload`, formData, file.name);
  }

  remove(id: number) {
    return this.http.delete(`api/datasets/${id}`);
  }
  getDatasetColumns(datasetId: any) {
    return this.http.get<ColumnSetting[]>(`api/datasets/${datasetId}/columns`);
  }
  getAvailableDataTypes() {
    return this.http.get<any[]>('api/datasets/getAvailableDataTypes');
  }

  downloadOriginalFile(datasetId: number) {
    return this.http.get(`api/datasets/DownloadOriginalFile/${datasetId}`, { responseType: 'blob' });
  }

  downloadDataviewFile(datasetId: number) {
    return this.http.get(`api/datasets/DownloadBinaryIdvFile/${datasetId}`, { responseType: 'blob' });
  }  
}
