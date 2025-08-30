// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface Transaction {
//   transaction_id: string;
//   account_id: string;
//   related_account_id?: string;
//   amount: number;
//   type: string;
//   note: string;
//   created_at: string;
// }

// @Component({
//   selector: 'app-viewtransaction',
//   templateUrl: './viewtransaction.component.html',
//   styleUrls: ['./viewtransaction.component.css']
// })
// export class ViewTransactionComponent implements OnInit {

//   transactions: Transaction[] = [];
//   errorMessage: string = '';

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.fetchTransactions();
//   }

//   fetchTransactions(): void {
//     this.http.get<any>('http://localhost:8080/api/v1/transactions')
//       .subscribe({
//         next: (response) => {
//           // Handle paginated response
//           this.transactions = response.data || [];
//         },
//         error: (err) => {
//           console.error(err);
//           this.errorMessage = 'Failed to load transactions';
//         }
//       });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Transaction {
  transaction_id: string;
  account_id: string;
  related_account_id?: string;
  amount: number;
  type: string;
  note: string;
  created_at: string;
}

@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  limit = 5;                       // how many records per page
  offset = 0;                      // current starting index
  totalTransactions = 0;           // backend total count
  errorMessage = '';               // error handling

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.http
      .get<any>(`http://localhost:8080/api/v1/transactions?limit=${this.limit}&offset=${this.offset}`)
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.transactions = response.data;
            this.totalTransactions = response.total || 0;
            this.errorMessage = '';
          } else {
            this.transactions = [];
            this.errorMessage = 'No transactions found';
          }
        },
        error: () => {
          this.transactions = [];
          this.errorMessage = 'Failed to load transactions';
        }
      });
  }

  nextPage(): void {
    if (this.offset + this.limit < this.totalTransactions) {
      this.offset += this.limit;
      this.fetchTransactions();
    }
  }

  prevPage(): void {
    if (this.offset - this.limit >= 0) {
      this.offset -= this.limit;
      this.fetchTransactions();
    }
  }

  // ✅ total pages based on total records
  get totalPages(): number {
    return Math.ceil(this.totalTransactions / this.limit) || 1;
  }

  // ✅ current page number
  get currentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }
}
