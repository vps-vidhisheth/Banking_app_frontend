

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Account {
  account_id: string;
  bank_id: string;
  customer_id?: string;
  balance: number;
  is_active: boolean;
}

export interface PaginatedResponse<T = any> {
  total: number;
  limit: number;
  offset: number;
  data: T[];
}

export interface DepositWithdrawPayload {
  amount: number;
}

export interface TransferPayload {
  from_account_id: string;
  to_account_id: string;
  amount: number;
}

export interface AccountPayload {
  bank_id: string; 
  customer_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/v1/accounts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('No JWT token found! Please login first.');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  getAccounts(limit: number, offset: number, filters: { bank_id?: string; account_id?: string; search?: string } = {}): Observable<PaginatedResponse<Account>> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (filters.bank_id) params = params.set('bank_id', filters.bank_id);


    if (filters.account_id) {
      params = params.set('search', filters.account_id); 
    } else if (filters.search) {
      params = params.set('search', filters.search);
    }

    return this.http.get<PaginatedResponse<Account>>(this.baseUrl, { headers: this.getAuthHeaders(), params })
      .pipe(catchError(err => throwError(() => err)));
  }


  getAccountById(account_id: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${account_id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

  create(payload: AccountPayload): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }


  deposit(account_id: string, payload: DepositWithdrawPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${account_id}/deposit`, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }


  withdraw(account_id: string, payload: DepositWithdrawPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${account_id}/withdraw`, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }


  transfer(payload: TransferPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transfer`, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }


  delete(account_id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${account_id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }
}

