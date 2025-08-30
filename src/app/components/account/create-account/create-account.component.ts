import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AccountPayload } from 'src/app/services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      customer_id: ['', [Validators.required]],
      bank_id: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.createForm.invalid) {
      this.errorMessage = 'Please fill in both Customer ID and Bank ID.';
      return;
    }

    const payload: AccountPayload = this.createForm.value;

    this.accountService.create(payload).subscribe({
      next: (res) => {
        this.successMessage = `Account created successfully for Customer ID ${payload.customer_id} and Bank ID ${payload.bank_id}.`;
        this.createForm.reset();
      },
      error: (err) => {
        console.error('Error creating account:', err);
        this.errorMessage = 'Failed to create account. Please check the IDs and try again.';
      }
    });
  }
}
