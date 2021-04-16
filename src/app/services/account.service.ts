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
	let x = this.http.get(`${baseUrl}/account/${id}/view`);
	console.log(x);
	return x;
  }
  
  updateAccount(id: any, data: any): Observable<any> {
	  console.log(data);
	  return this.http.put(`${baseUrl}/account/${id}/update`, data);
  }
  
  
  getAllAccounts(): Observable<any> {
	  return this.http.get(`${baseUrl}/admin/getaccounts`);
  }
  
  deleteAccount(data: any): Observable<any> {
	  return this.http.delete(`${baseUrl}/admin/remove/${data}`);
  }
  
  searchAccount(data: any): Observable<any> {
	  return this.http.get(`${baseUrl}/admin/search/${data}`);
  }
  
  createAccount(data: any): Observable<any> {
	  return this.http.post(`${baseUrl}/admin/create`, data);
  }
  
  
}
