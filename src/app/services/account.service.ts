// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// export interface AccountPayload {
//   customer_id: string;
//   bank_id: string;
// }

// export interface DepositWithdrawPayload {
//   customer_id: string;
//   amount: number;
// }

// export interface TransferPayload {
//   from_account_id: string;
//   to_account_id: string;
//   from_customer_id: string;
//   to_customer_id: string;
//   amount: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AccountService {
//   private apiUrl = 'http://localhost:8080/api/v1/accounts';

//   constructor(private http: HttpClient) {}

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('jwt');
//     if (!token) throw new Error('No JWT token found! Please login first.');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   // ✅ Create new account
//   create(payload: AccountPayload): Observable<any> {
//     return this.http.post(this.apiUrl, payload, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }

//   // ✅ Get all accounts
//   getAll(): Observable<any> {
//     return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }

//   // ✅ Get account by ID
//   getById(id: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }

//   // ✅ Update account
//   update(id: string, payload: AccountPayload): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, payload, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }

//   // ✅ Delete account
//   delete(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }

//   // ✅ Deposit
//   deposit(accountId: string, payload: DepositWithdrawPayload): Observable<any> {
//     return this.http.post(`${this.apiUrl}/${accountId}/deposit`, payload, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }

//   // ✅ Withdraw
//   withdraw(accountId: string, payload: DepositWithdrawPayload): Observable<any> {
//     return this.http.post(`${this.apiUrl}/${accountId}/withdraw`, payload, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }

//   // ✅ Transfer
//   transfer(payload: TransferPayload): Observable<any> {
//     return this.http.post(`${this.apiUrl}/transfer`, payload, { headers: this.getAuthHeaders() })
//       .pipe(catchError(err => throwError(() => err)));
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AccountPayload {
  customer_id: string;
  bank_id: string;
}

export interface DepositWithdrawPayload {
  customer_id: string;
  amount: number;
}

export interface TransferPayload {
  from_account_id: string;
  to_account_id: string;
  from_customer_id: string;
  to_customer_id: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/v1/accounts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('No JWT token found! Please login first.');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Create new account
  create(payload: AccountPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Get all accounts with optional pagination
  // ✅ Get all accounts with optional pagination
getAll(offset: number = 0, limit: number = 2): Observable<any> {
  const params: any = { offset: offset.toString(), limit: limit.toString() };
  return this.http.get(this.apiUrl, { headers: this.getAuthHeaders(), params })
    .pipe(catchError(err => throwError(() => err)));
}


  // ✅ Get account by ID
  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Update account
  update(id: string, payload: AccountPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Delete account
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Deposit
  deposit(accountId: string, payload: DepositWithdrawPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/deposit`, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Withdraw
  withdraw(accountId: string, payload: DepositWithdrawPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/withdraw`, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }

  // ✅ Transfer
  transfer(payload: TransferPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, payload, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => err)));
  }
}
