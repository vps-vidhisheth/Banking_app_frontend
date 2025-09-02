// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CustomerService, BackendCustomer } from '../../../services/customer.service';

// @Component({
//   selector: 'app-update-customer',
//   templateUrl: './update-customer.component.html',
//   styleUrls: ['./update-customer.component.css']
// })
// export class UpdateCustomerComponent implements OnInit {
//   customerId!: string; 
//   customer: any = {
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     role: ''
//   };
//   errorMessage: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private customerService: CustomerService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.customerId = this.route.snapshot.paramMap.get('id') || '';
//     if (this.customerId) {
//       this.loadCustomer();
//     } else {
//       this.errorMessage = 'Invalid customer ID';
//     }
//   }

//   // ✅ Load customer by ID
//   loadCustomer(): void {
//     this.customerService.getCustomerById(this.customerId).subscribe({
//       next: (res: BackendCustomer) => {
//         this.customer = {
//           first_name: res.FirstName || res.first_name || '',
//           last_name: res.LastName || res.last_name || '',
//           email: res.Email || res.email || '',
//           password: '', // ⚠️ Password is not fetched from backend
//           role: res.Role || res.role || ''
//         };
//       },
//       error: (err) => {
//         console.error('Error loading customer:', err);
//         this.errorMessage = 'Failed to load customer';
//       }
//     });
//   }

//   // ✅ Update customer
//   updateCustomer(): void {
//     if (!this.customerId) return;

//     this.customerService.updateCustomer(this.customerId, this.customer).subscribe({
//       next: () => {
//         alert('✅ Customer updated successfully');
//        this.router.navigate(['/admin-dashboard/customers/view']);

//       },
//       error: (err) => {
//         console.error('Error updating customer:', err);
//         this.errorMessage = 'Failed to update customer';
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, BackendCustomer } from '../../../services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customerId!: string;
  customer: any = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: ''
  };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';

    // 1️⃣ Pre-fill from query params if present
    this.route.queryParams.subscribe(params => {
      if (params['first_name']) this.customer.first_name = params['first_name'];
      if (params['last_name']) this.customer.last_name = params['last_name'];
      if (params['email']) this.customer.email = params['email'];
      if (params['role']) this.customer.role = params['role'];
    });

    // 2️⃣ Load from backend if ID is valid
    if (this.customerId) {
      this.loadCustomer();
    } else {
      this.errorMessage = 'Invalid customer ID';
    }
  }

  // Load customer from backend
  loadCustomer(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (res: BackendCustomer) => {
        this.customer = {
          first_name: res.FirstName || res.first_name || this.customer.first_name,
          last_name: res.LastName || res.last_name || this.customer.last_name,
          email: res.Email || res.email || this.customer.email,
          password: '', // password is never fetched
          role: res.Role || res.role || this.customer.role
        };
      },
      error: (err) => {
        console.error('Error loading customer:', err);
        this.errorMessage = 'Failed to load customer';
      }
    });
  }

  // Update URL as user types
  updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        first_name: this.customer.first_name,
        last_name: this.customer.last_name,
        email: this.customer.email,
        role: this.customer.role
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  // Update customer
  updateCustomer(): void {
    if (!this.customerId) return;

    this.customerService.updateCustomer(this.customerId, this.customer).subscribe({
      next: () => {
        alert('✅ Customer updated successfully');
        this.router.navigate(['/admin-dashboard/customers/view']);
      },
      error: (err) => {
        console.error('Error updating customer:', err);
        this.errorMessage = 'Failed to update customer';
      }
    });
  }
}
