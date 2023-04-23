import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  getPublicResource() {
    return this.http.get('api/messages/public');
  }

  getProtectedResource() {
    return this.http.get('api/messages/protected');
  }

  getAdminResource() {
    return this.http.get('api/messages/admin');
  }
}
