import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Backend paginated response type
// export interface BackendCustomer {
//   CustomerID?: string;
//   id?: string;
//   FirstName?: string;
//   first_name?: string;
//   LastName?: string;
//   last_name?: string;
//   Email?: string;
//   email?: string;
//   Role?: string;
//   role?: string;
//   IsActive?: boolean;
//   is_active?: boolean;
// }


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

  // ✅ Get customers with pagination
  getCustomers(limit: number, offset: number): Observable<PaginatedResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<PaginatedResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`, { headers })
      .pipe(
        catchError(err => {
          console.error('Error fetching customers:', err);
          return throwError(() => err);
        })
      );
  }

  // ✅ Get single customer
  getCustomerById(customerId: string | number): Observable<BackendCustomer> {
    const headers = this.getAuthHeaders();
    return this.http.get<BackendCustomer>(`${this.apiUrl}/${customerId}`, { headers })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Create customer
  createCustomer(customer: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, customer, { headers })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Update customer
  updateCustomer(customerId: string | number, customerData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${customerId}`, customerData, { headers })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Delete customer
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

