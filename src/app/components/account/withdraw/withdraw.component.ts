import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, DepositWithdrawPayload, Account } from '../../../services/account.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawPayload: { account_id: string; amount: number | null } = {
    account_id: '',
    amount: null
  };

  accountDetails: Account | null = null;
  message: string = '';

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get account ID from route params
    this.route.paramMap.subscribe(params => {
      this.withdrawPayload.account_id = params.get('accountId') || '';
      if (this.withdrawPayload.account_id) {
        this.fetchAccountDetails(this.withdrawPayload.account_id);
      }
    });
  }

  // ✅ Fetch latest account details from backend
  fetchAccountDetails(accountId: string) {
    this.accountService.getAccountById(accountId).subscribe({
      next: (acc) => this.accountDetails = acc,
      error: (err) => console.error('Error fetching account:', err)
    });
  }

  // ✅ Handle withdrawal
  onWithdraw(): void {
    if (!this.withdrawPayload.amount || this.withdrawPayload.amount <= 0) {
      this.message = '⚠️ Please enter a valid amount.';
      return;
    }

    const payload: DepositWithdrawPayload = {
      amount: this.withdrawPayload.amount
    };

    this.accountService.withdraw(this.withdrawPayload.account_id, payload).subscribe({
      next: (res) => {
        this.message = `✅ Withdrawal successful!`;
        this.withdrawPayload.amount = null;

        // Update balance by refetching from backend
        this.fetchAccountDetails(this.withdrawPayload.account_id);
      },
      error: (err) => {
        console.error(err);
        this.message = err.error?.message || '❌ Withdrawal failed. Please try again.';
      }
    });
  }
}
