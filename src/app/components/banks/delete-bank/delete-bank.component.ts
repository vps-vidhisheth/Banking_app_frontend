import { Component } from '@angular/core';
import { BankService } from '../../../services/bank.service'; // adjust path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-bank',
  templateUrl: './delete-bank.component.html',
  styleUrls: ['./delete-bank.component.css']
})
export class DeleteBankComponent {
  bankId: string = '';   // input from user
  message: string = '';  // success/error feedback

  constructor(private bankService: BankService, private router: Router) {}

  onDelete() {
    if (!this.bankId) {
      this.message = '⚠️ Please enter a Bank ID to delete.';
      return;
    }

    this.bankService.deleteBank(this.bankId).subscribe({
      next: () => {
        this.message = '✅ Bank deleted successfully!';
        setTimeout(() => {
          this.router.navigate(['/banks']); // redirect back to banks list
        }, 1000);
      },
      error: (err) => {
        console.error('Error deleting bank:', err);
        this.message = '❌ Failed to delete bank. Try again.';
      }
    });
  }
}
