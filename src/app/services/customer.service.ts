import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface BackendCustomer {
  CustomerID?: string | { UUID: string; Valid: boolean };
  id?: string;
  FirstName?: string;
  first_name?: string;
  LastName?: string;
  last_name?: string;
  Email?: string;
  email?: string;
  Role?: string;
  role?: string;
  IsActive?: boolean;
  is_active?: boolean;
}

export interface PaginatedResponse {
  total: number;
  limit: number;
  offset: number;
  data: BackendCustomer[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No JWT token found! Please login first.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

// getCustomers(limit: number, offset: number, filters: any = {}): Observable<any> {
//   let params = new HttpParams()
//     .set('limit', limit.toString())
//     .set('offset', offset.toString());

//   if (filters.search) {
//     params = params.set('search', filters.search);
//   }

//   if (filters.first_name) {
//     params = params.set('first_name', filters.first_name);
//   }
//   if (filters.last_name) {
//     params = params.set('last_name', filters.last_name);
//   }
//   if (filters.email) {
//     params = params.set('email', filters.email);
//   }
//   if (filters.role) {
//     params = params.set('role', filters.role);
//   }

//   return this.http.get(`${this.apiUrl}`, { params });
// }


getCustomers(limit: number, offset: number, filters: any = {}): Observable<any> {
  let params = new HttpParams()
    .set('limit', limit.toString())
    .set('offset', offset.toString());

  if (filters.search) {
    params = params.set('search', filters.search);
  }

  if (filters.first_name) {
    params = params.set('first_name', filters.first_name);
  }
  if (filters.last_name) {
    params = params.set('last_name', filters.last_name);
  }
  if (filters.email) {
    params = params.set('email', filters.email);
  }
  if (filters.role) {
    params = params.set('role', filters.role);
  }

  const headers = this.getAuthHeaders();

  return this.http.get<any>(this.apiUrl, { headers, params });
}


  getCustomerById(customerId: string | number): Observable<BackendCustomer> {
    const headers = this.getAuthHeaders();
    return this.http.get<BackendCustomer>(`${this.apiUrl}/${customerId}`, { headers })
      .pipe(catchError(err => throwError(() => err)));
  }

  createCustomer(customer: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, customer, { headers })
      .pipe(catchError(err => throwError(() => err)));
  }

  updateCustomer(customerId: string | number, customerData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${customerId}`, customerData, { headers })
      .pipe(catchError(err => throwError(() => err)));
  }

  deleteCustomer(customerId: string): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.delete<any>(`${this.apiUrl}/${customerId}`, { headers });
}

}
export function getCustomerId(c: BackendCustomer): string {
  if (typeof c.CustomerID === 'string') return c.CustomerID;
  if (c.CustomerID && 'UUID' in c.CustomerID) return c.CustomerID.UUID;
  if (c.id) return c.id;
  return '';
}

