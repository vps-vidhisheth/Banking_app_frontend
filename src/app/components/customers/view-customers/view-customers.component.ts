

import { Component, OnInit } from '@angular/core';
import { CustomerService, PaginatedResponse } from '../../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface Customer {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  customers: Customer[] = [];
  error = '';
  loading = false;

  page = 1;
  pageSize = 5;
  total = 0;

  searchQuery: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute   
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.warn('No token found. Please login.');
      return;
    }
    this.loadCustomers();
  }

loadCustomers(): void {
  this.loading = true;
  this.error = '';

  const offset = (this.page - 1) * this.pageSize;

  const filters: any = {};
  if (this.searchQuery) {
    filters.search = this.searchQuery;
  }

  this.customerService.getCustomers(this.pageSize, offset, filters).subscribe({
    next: (res: PaginatedResponse) => {
      this.customers = res.data as Customer[];
      this.total = res.total;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching customers:', err);
      this.error = 'Failed to load customers. Please try again later.';
      this.customers = [];
      this.loading = false;
    }
  });
}


applySearch() {
  const filters: any = { search: this.searchQuery };

  this.page = 1;
  const offset = (this.page - 1) * this.pageSize;

  this.customerService.getCustomers(this.pageSize, offset, filters).subscribe({
    next: (res) => {
      this.customers = res.data;
      this.total = res.total;
      this.loading = false;
    },
    error: () => {
      this.error = ' Error fetching customers';
      this.loading = false;
    }
  });
}


  clearSearch(): void {
    this.searchQuery = '';
    this.page = 1;
    this.loadCustomers();
  }

  get totalPages(): number {
    return this.pageSize > 0 ? Math.ceil(this.total / this.pageSize) : 0;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.loadCustomers();
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  prevPage(): void {
    this.goToPage(this.page - 1);
  }

  updateCustomer(customerId: string): void {
    this.router.navigate([`/admin-dashboard/customers/update/${customerId}`]);
  }

  deleteCustomer(customerId: string): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.loading = true;
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        alert('Customer deleted successfully');

        if (this.customers.length === 1 && this.page > 1) {
          this.page--;
        }
        this.loadCustomers();
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
        this.loading = false;
        alert('Failed to delete customer');
      }
    });
  }
}

