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
    this.bankId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bankId) {
      this.getBankDetails(this.bankId);
    }
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
        this.message = '❌ Failed to fetch bank details';
        this.loading = false;
      }
    });
  }

  updateBank(): void {
    if (!this.bankName.trim()) {
      this.message = 'Bank name cannot be empty';
      return;
    }

    const updatedBank = { name: this.bankName };

    this.bankService.updateBank(this.bankId, updatedBank).subscribe({
      next: () => {
        this.message = '✅ Bank updated successfully!';
        setTimeout(() => this.router.navigate(['/admin-dashboard/banks/viewview']), 1500);
      },
      error: (err) => {
        console.error('Error updating bank', err);
        this.message = '❌ Failed to update bank';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin-dashboard/banks/viewview']);
  }
}
