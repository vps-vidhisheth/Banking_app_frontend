import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Bank {
  bank_id: string;
  name: string;
  abbreviation: string;
  is_active: boolean;
}

interface PaginatedResponse {
  data: Bank[];
  total: number;
  limit: number;
  offset: number;
}

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css']
})
export class ViewBankComponent implements OnInit {
  banks: Bank[] = [];
  error = '';
  loading = false;

  page = 1;
  pageSize = 5; 
  total = 0;

  private apiUrl = 'http://localhost:8080/api/v1/banks';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBanks();
  }


  searchQuery: string = '';

loadBanks(): void {
  this.loading = true;
  this.error = '';

  const token = localStorage.getItem('jwt');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  const offset = (this.page - 1) * this.pageSize;
  let params = new HttpParams()
    .set('limit', this.pageSize.toString())
    .set('offset', offset.toString());

  if (this.searchQuery) {
    params = params.set('search', this.searchQuery); 
  }

  this.http.get<PaginatedResponse>(this.apiUrl, { headers, params }).subscribe({
    next: (res) => {
      this.banks = res.data;
      this.total = res.total;
      this.loading = false;
    },
    error: (err) => {
      console.error('❌ Error fetching banks:', err);
      this.error = 'Failed to load banks. Please try again later.';
      this.banks = [];
      this.loading = false;
    }
  });
}

applySearch(): void {
  this.page = 1;
  this.loadBanks();
}

clearSearch(): void {
  this.searchQuery = '';
  this.page = 1;
  this.loadBanks();
}


  get totalPages(): number {
    return this.pageSize > 0 ? Math.ceil(this.total / this.pageSize) : 0;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.loadBanks();
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  prevPage(): void {
    this.goToPage(this.page - 1);
  }


updateBank(bankId: string): void {
  this.router.navigate(['/admin-dashboard/banks/update', bankId]);
}


  deleteBank(bankId: string): void {
    if (!confirm('Are you sure you want to delete this bank?')) return;

    const token = localStorage.getItem('jwt');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.loading = true;
    this.http.delete(`${this.apiUrl}/${bankId}`, { headers }).subscribe({
      next: () => {
        alert('Bank deleted successfully ');

        if (this.banks.length === 1 && this.page > 1) {
          this.page--;
        }
        this.loadBanks();
      },
      error: (err) => {
        console.error(' Error deleting bank:', err);
        this.loading = false;
        alert('Failed to delete bank');
      }
    });
  }
}
