

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AccountPayload } from 'src/app/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRefreshService } from 'src/app/components/account/account-refresh.service';



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
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private accountRefresh: AccountRefreshService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      bank_id: ['', [Validators.required]]
    });

    this.route.queryParams.subscribe(params => {
      if (params['bank_id']) {
        this.createForm.patchValue({ bank_id: params['bank_id'] });
      }
    });
  }

  updateUrl(): void {
    const bankId = this.createForm.get('bank_id')?.value || '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { bank_id: bankId },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.createForm.invalid) {
      this.errorMessage = 'Please select a Bank ID.';
      return;
    }

    const payload: AccountPayload = this.createForm.value;

    this.accountService.create(payload).subscribe({
      next: (res) => {
        this.successMessage = `Account created successfully for Bank ID ${payload.bank_id}.`;
        this.createForm.reset();
        this.router.navigate([], { relativeTo: this.route, queryParams: {} });
        this.accountRefresh.triggerRefresh(); 
      },
      error: (err) => {
        console.error('Error creating account:', err);
        this.errorMessage = 'Failed to create account. Please check the Bank ID and try again.';
      }
    });
  }
}
