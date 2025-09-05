import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  customerId: string | null = null; 
  isDeleting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (!this.customerId) {
      this.errorMessage = 'Invalid customer ID';
    }
  }

  confirmDelete(): void {
    if (!this.customerId) return;

    this.isDeleting = true;
    this.customerService.deleteCustomer(this.customerId).subscribe({
      next: () => {
        alert('Customer deleted successfully ');
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        this.isDeleting = false;
        console.error('Error deleting customer:', err);
        this.errorMessage = 'Failed to delete customer. Please try again.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
