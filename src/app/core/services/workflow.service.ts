import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workflow } from '../models/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  getWorkflowById(id: number) {
    return this.http.get<Workflow>(`api/workflows/${id}`);
  }

  constructor(private http: HttpClient) { }

  getWorkflows() {
    return this.http.get<Workflow[]>('api/workflows');
  }

  createWorkflow() {
    return this.http.post<Workflow>('api/workflows', null);
  }

  rename(workflow: any) {
    return this.http.post<Workflow>('api/workflows/rename', workflow);
  }



  // uploadDataset(file: any, id:any) {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   return this.http.post(`api/dataset/upload/${id}`, formData, file.name);
  // }
}
