

// view-ledger.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Ledger {
  ledger_id: string;
  bank_from_id: string;
  bank_to_id: string;
  amount: number;
  transaction_type: string;
  created_at?: string;
}

@Component({
  selector: 'app-view-ledger',
  templateUrl: './view-ledger.component.html',
  styleUrls: ['./view-ledger.component.css']
})
export class ViewLedgerComponent implements OnInit {

  ledgers: Ledger[] = [];
  limit = 2; // number of records per page
  offset = 0; // starting point
  totalLedgers = 0; // total ledgers from backend
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLedgers();
  }

  fetchLedgers(): void {
    this.http.get<any>(`http://localhost:8080/api/v1/ledgers?limit=${this.limit}&offset=${this.offset}`)
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.ledgers = response.data;
            this.totalLedgers = response.total || 0; // assuming backend sends total count
          } else {
            this.errorMessage = 'No ledger data found';
          }
        },
        error: (err) => {
          console.error('Error fetching ledgers:', err);
          this.errorMessage = 'Failed to load ledger records.';
        }
      });
  }

  nextPage(): void {
    if (this.offset + this.limit < this.totalLedgers) {
      this.offset += this.limit;
      this.fetchLedgers();
    }
  }

  prevPage(): void {
    if (this.offset - this.limit >= 0) {
      this.offset -= this.limit;
      this.fetchLedgers();
    }
  }
}
