

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Bank {
  bank_id: string;
  name: string;
  abbreviation?: string;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private apiUrl = 'http://localhost:8080/api/v1/banks';

  constructor(private http: HttpClient) { }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  getBanks(limit: number = 10, offset: number = 0, search?: string): Observable<{ data: Bank[], total: number }> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<{ data: Bank[], total: number }>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  getBankById(id: string): Observable<Bank> {
    return this.http.get<Bank>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }


  createBank(bank: Partial<Bank>): Observable<Bank> {
    return this.http.post<Bank>(this.apiUrl, bank, { headers: this.getAuthHeaders() });
  }


  updateBank(id: string, bank: Partial<Bank>): Observable<Bank> {
    return this.http.put<Bank>(`${this.apiUrl}/${id}`, bank, { headers: this.getAuthHeaders() });
  }


  deleteBank(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }


  getAllBanks(): Observable<Bank[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}?limit=1000&offset=0`; 

    return this.http.get<{ data: Bank[] }>(url, { headers })
      .pipe(map(res => res.data));
  }
}
