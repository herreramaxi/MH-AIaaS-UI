import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkflowRunHistoryService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>('api/workflowJobs').pipe(
            map((x: any[]) => {
                return x.map(y => {
                    y.startDate = y.startDate ? new Date(y.startDate) : y.startDate;
                    y.endDate = y.endDate ? new Date(y.endDate) : y.endDate;
                    y.createdOn = y.createdOn ? new Date(y.createdOn) : y.createdOn;
                    y.ModifiedOn = y.ModifiedOn ? new Date(y.ModifiedOn) : y.ModifiedOn;
                    return y;
                })

            })
        )
    }
    
  getLatestWorkflowRunHistory(workflowId: number) {
    return this.http.get<any>(`api/workflows/getLatestWorkflowRunHistory/${workflowId}`);
  }

}