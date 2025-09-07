import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  transaction_id: string;
  account_id: string;
  related_account_id?: string;
  amount: number;
  type: string;
  note: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/v1/transactions';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('No JWT token found! Please login first.');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTransactions(limit: number, offset: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
