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
  
  getAuthenticationInfo(id: number) {
    return this.http.get<any>(`api/endpoints/getAuthenticationInfo/${id}`);
  }

  tokenBasedGetToken() {
    return this.http.get<any>(`api/endpoints/tokenBasedGetToken`);
  }

  getAuthenticationTypes() {
    return this.http.get<any[]>('api/endpoints/getAuthenticationTypes');
  }

  create(endpoint: Endpoint) {
    return this.http.post<Endpoint>(`api/endpoints`, endpoint);
  }
  
  update(endpoint: Endpoint) {
    return this.http.put<Endpoint>(`api/endpoints`, endpoint);
  }

  updateAuthenticationInfo(endpointAuthentication: any) {
    return this.http.put<any>(`api/endpoints/updateAuthentication`, endpointAuthentication);
  }

  remove(id: number) {
    return this.http.delete<Endpoint>(`api/endpoints/${id}`);
  }
}
