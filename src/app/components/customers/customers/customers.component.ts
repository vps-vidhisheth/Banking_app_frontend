import { Component, OnInit } from '@angular/core';
import { CustomerService, PaginatedResponse } from 'src/app/services/customer.service';

export interface Customer {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  error = '';
  page = 1;
  pageSize = 5;
  total = 0;
  loading = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = '';

    const offset = (this.page - 1) * this.pageSize;

    this.customerService.getCustomers(this.pageSize, offset).subscribe({
      next: (res: PaginatedResponse) => {
        this.customers = res.data as Customer[];
        this.total = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.error(' Error fetching customers:', err);
        this.error = 'Failed to load customers. Please try again later.';
        this.customers = [];
        this.loading = false;
      }
    });
  }

  get totalPages(): number {
    return this.pageSize > 0 ? Math.ceil(this.total / this.pageSize) : 0;
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCustomers();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCustomers();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadCustomers();
    }
  }
}
