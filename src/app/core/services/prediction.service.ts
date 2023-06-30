import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  constructor(private http: HttpClient) { }

  getPredictionInputSample(id: any) {
    return this.http.get<any>(`api/predict/getPredictionInputSample/${id}`);
  }

  getPrediction(endpointId: number, predictionInput: any) {
    return this.http.post<any>(`api/predict/predictInputSample/${endpointId}`, predictionInput);
  }
}
