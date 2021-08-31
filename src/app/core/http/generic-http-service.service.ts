import { PatchRequestBody } from './../../../models/patch-request-body.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getData(url: string, params?: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + url, {params});
  }

  getById(url: string, id: string, params?: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}${url}${id}`, {params});
  }

  createItem(url: string, item: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + url, item);
  }

  updateItem(url: string, id: string, item: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}${url}${id}`, item);
  }

  deleteItem(url: string, id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}${url}${id}`);
  }

  patchItem(url: string, id: string, item: PatchRequestBody[]): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}${url}${id}`, item);
  }

}
