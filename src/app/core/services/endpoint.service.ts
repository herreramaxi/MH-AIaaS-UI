import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from '../models/endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(private http: HttpClient) { }

  getEndpoints() {
    return this.http.get<Endpoint[]>('api/endpoints');
  }

  getById(id: number) {
    return this.http.get<Endpoint>(`api/endpoints/${id}`);
  }

  create(endpoint: Endpoint) {
    return this.http.post<Endpoint>(`api/endpoints`, endpoint);
  }

  remove(id: number) {
    return this.http.delete<Endpoint>(`api/endpoints/${id}`);
  }
}
