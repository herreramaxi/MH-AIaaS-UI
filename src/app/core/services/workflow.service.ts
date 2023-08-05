import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workflow } from '../models/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient) { }

  getPreview(workflowDataViewId: any) {
    return this.http.get<any>(`api/workflows/getPreview/${workflowDataViewId}`);
  }

  getWorkflowById(id: number) {
    return this.http.get<Workflow>(`api/workflows/${id}`);
  }

  getWorkflows() {
    return this.http.get<Workflow[]>('api/workflows');
  }

  createWorkflow(useSampleTemplate = false) {
    return this.http.post<Workflow>('api/workflows', useSampleTemplate);
  }

  rename(workflow: any) {
    return this.http.post<Workflow>('api/workflows/rename', workflow);
  }

  getOperators() {
    return this.http.get<any[]>('api/operators');
  }

  save(workflow: Workflow) {
    return this.http.put<Workflow>('api/workflows', workflow);
  }

  remove(id: number) {
    return this.http.delete<Workflow>(`api/workflows/${id}`);
  }

  run(workflow: Workflow, generateIntermediateData: boolean = false) {
    return this.http.post<Workflow>('api/workflows/run', { ...workflow, generateIntermediateData: generateIntermediateData });
  }

  publish(workflow: Workflow) {
    return this.http.post<Workflow>(`api/workflows/publish`, workflow);
  }
}
