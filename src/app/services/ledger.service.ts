// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Ledger {
//   ledger_id: string;
//   account_id: string;
//   bank_from_id: string;
//   bank_to_id: string;
//   amount: number;
//   transaction_type: string;
//   entry_type: string;
//   description: string;
//   created_at: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class LedgerService {
//   private apiUrl = 'http://localhost:8080/api/ledger'; 

//   constructor(private http: HttpClient) {}

//   getAllLedgers(): Observable<Ledger[]> {
//     return this.http.get<Ledger[]>(this.apiUrl);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ledger {
  ledger_id: string;
  bank_from_id: string;
  bank_to_id: string;
  amount: number;
  transaction_type: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private apiUrl = 'http://localhost:8080/api/v1/ledgers';

  constructor(private http: HttpClient) {}  // ✅ Assign http to this.http

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('No JWT token found! Please login first.');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getLedgers(limit: number, offset: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<any>(this.apiUrl, { headers, params });  // ✅ Use this.http
  }
}
