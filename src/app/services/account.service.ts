import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  
  getAccount(id: any): Observable<any> {
	return this.http.get(`${baseUrl}/account/${id}/view`);
  }
  
  updateAccount(id: any, data: any): Observable<any> {
	  return this.http.put(`${baseUrl}/account/${id}/update`, data);
  }
  
  
  getAllAccounts(): Observable<any> {
	  return this.http.get(`${baseUrl}/admin/getaccounts`);
  }
  
  
}
