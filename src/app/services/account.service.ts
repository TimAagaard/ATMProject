import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  
  // Get an account by ID
  getAccount(id: any): Observable<any> {
	let x = this.http.get(`${baseUrl}/account/${id}/view`);
	console.log(x);
	return x;
  }
  
  // Update an account's data
  updateAccount(id: any, data: any): Observable<any> {
	  console.log(data);
	  return this.http.put(`${baseUrl}/account/${id}/update`, data);
  }
  
  // Retrieve all accounts
  getAllAccounts(): Observable<any> {
	  return this.http.get(`${baseUrl}/admin/getaccounts`);
  }
  
  // Delete an account by ID
  deleteAccount(data: any): Observable<any> {
	  return this.http.delete(`${baseUrl}/admin/remove/${data}`);
  }
  
  // Search for an account based on id, first_name, OR last_name
  searchAccount(data: any): Observable<any> {
	  return this.http.get(`${baseUrl}/admin/search/${data}`);
  }
  
  // Create a new account
  createAccount(data: any): Observable<any> {
	  return this.http.post(`${baseUrl}/admin/create`, data);
  }
  
}
