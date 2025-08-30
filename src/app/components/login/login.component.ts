import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        // Save token and role
        this.authService.saveToken(res.token);

        const role = this.authService.getRole();

        // Redirect based on role
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'staff') {
          this.router.navigate(['/staff-dashboard']);
        } else {
          this.errorMessage = 'Unauthorized role';
        }
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Invalid email or password';
      }
    });
  }
}
