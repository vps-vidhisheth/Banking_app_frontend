import { Component, OnInit } from '@angular/core'; 
import { CustomerService } from '../../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-create-customer',
//   templateUrl: './create-customer.component.html',
//    styleUrls: ['./create-customer.component.css']
// })
// export class CreateCustomerComponent {
//   // Bind to form
//   customer = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     role: 'staff', // default role
//     isActive: true
//   };

//   success = '';
//   error = '';

//   constructor(private customerService: CustomerService) {}

//  createCustomer() {
//   const newCustomer = {
//     first_name: this.customer.firstName.trim(),
//     last_name: this.customer.lastName.trim(),
//     email: this.customer.email.trim(),
//     password: this.customer.password,
//     role: this.customer.role,
//     is_active: this.customer.isActive
//   };

//   this.customerService.createCustomer(newCustomer).subscribe({
//     next: (res) => {
//       this.success = 'User created successfully ✅';
//       this.error = '';
//       this.customer = { firstName: '', lastName: '', email: '', password: '', role: 'staff', isActive: true };
//     },
//     error: (err) => {
//       console.error('Backend error:', err);
//       this.error = err.error?.message || '❌ Error creating user';
//       this.success = '';
//     }
//   });
// }

// }

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customer = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'staff',
    isActive: true
  };

  success = '';
  error = '';

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Pre-fill form from query params
    this.route.queryParams.subscribe(params => {
      this.customer.firstName = params['firstName'] || '';
      this.customer.lastName = params['lastName'] || '';
      this.customer.email = params['email'] || '';
      this.customer.role = params['role'] || 'staff';
      this.customer.isActive = params['isActive'] === 'false' ? false : true;
    });
  }

  // Update URL as user types
  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email,
        role: this.customer.role,
        isActive: this.customer.isActive
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  createCustomer() {
    const newCustomer = {
      first_name: this.customer.firstName.trim(),
      last_name: this.customer.lastName.trim(),
      email: this.customer.email.trim(),
      password: this.customer.password,
      role: this.customer.role,
      is_active: this.customer.isActive
    };

    this.customerService.createCustomer(newCustomer).subscribe({
      next: (res) => {
        this.success = 'User created successfully ✅';
        this.error = '';
        this.customer = { firstName: '', lastName: '', email: '', password: '', role: 'staff', isActive: true };
        // Clear URL after submission
        this.router.navigate([], { relativeTo: this.route, queryParams: {} });
      },
      error: (err) => {
        console.error('Backend error:', err);
        this.error = err.error?.message || '❌ Error creating user';
        this.success = '';
      }
    });
  }
}
