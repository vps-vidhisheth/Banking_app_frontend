import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Match backend field names (snake_case)
export interface Ledger {
  ledger_id: string;
  account_id: string;
  bank_from_id: string;
  bank_to_id: string;
  amount: number;
  transaction_type: string;
  entry_type: string;
  description: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private apiUrl = 'http://localhost:8080/api/ledger'; 

  constructor(private http: HttpClient) {}

  getAllLedgers(): Observable<Ledger[]> {
    return this.http.get<Ledger[]>(this.apiUrl);
  }
}
