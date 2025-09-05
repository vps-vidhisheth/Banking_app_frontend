

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../../services/bank.service';

@Component({
  selector: 'app-update-bank',
  templateUrl: './update-bank.component.html',
  styleUrls: ['./update-bank.component.css']
})
export class UpdateBankComponent implements OnInit {

  bankId: string = '';
  bankName: string = '';
  message: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    // Get bankId from route params
    this.bankId = this.route.snapshot.paramMap.get('id') || '';

    // Pre-fill bank name from query params
    this.route.queryParams.subscribe(params => {
      if (params['bankName']) {
        this.bankName = params['bankName'];
      } else if (this.bankId) {
        // Fetch from backend if query param not available
        this.getBankDetails(this.bankId);
      }
    });
  }

  // Update URL dynamically as user types
  updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { bankName: this.bankName },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  getBankDetails(id: string): void {
    this.loading = true;
    this.bankService.getBankById(id).subscribe({
      next: (bank) => {
        this.bankName = bank.name; // prefill with current name
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching bank', err);
        this.message = 'Failed to fetch bank details';
        this.loading = false;
      }
    });
  }

  updateBank(): void {
    if (!this.bankName.trim()) {
      this.message = 'Bank name cannot be empty';
      return;
    }

    const updatedBank = { name: this.bankName.trim() };

    this.bankService.updateBank(this.bankId, updatedBank).subscribe({
      next: () => {
        this.message = ' Bank updated successfully!';
        setTimeout(() => this.router.navigate(['/admin-dashboard/banks/view']), 1500);
      },
      error: (err) => {
        console.error('Error updating bank', err);
        this.message = ' Failed to update bank';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin-dashboard/banks/view']);
  }
}
