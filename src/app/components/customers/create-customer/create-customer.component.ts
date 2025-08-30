import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
   styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  // Bind to form
  customer = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'staff', // default role
    isActive: true
  };

  success = '';
  error = '';

  constructor(private customerService: CustomerService) {}

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
    },
    error: (err) => {
      console.error('Backend error:', err);
      this.error = err.error?.message || '❌ Error creating user';
      this.success = '';
    }
  });
}

}
