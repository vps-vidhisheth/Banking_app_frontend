import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-bank',
  templateUrl: './create-bank.component.html',
  styleUrls: ['./create-bank.component.css']
})
export class CreateBankComponent {
  bankName: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  private apiUrl = 'http://localhost:8080/api/v1/banks';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  createBank() {
    if (!this.bankName.trim()) {
      this.errorMessage = 'Bank name is required';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const token = localStorage.getItem('jwt');
    if (!token) {
      this.errorMessage = 'Please login first';
      this.isSubmitting = false;
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const payload = { name: this.bankName };

    this.http.post(this.apiUrl, payload, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Bank created successfully!';
        this.bankName = '';
        this.isSubmitting = false;

        // ✅ Navigate to /banks/view after success
        this.router.navigate(['/admin-dashboard/banks/view']);
        // OR if inside /banks route and you want relative navigation:
        // this.router.navigate(['../view'], { relativeTo: this.route });
      },
      error: (err) => {
        console.error('Error creating bank', err);
        this.errorMessage = 'Failed to create bank. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  cancel() {
    // ✅ Navigate to /banks/view when cancel is clicked
    this.router.navigate(['/admin-dashboard/banks/view']);
    // OR use relative navigation if needed:
    // this.router.navigate(['../view'], { relativeTo: this.route });
  }
}
