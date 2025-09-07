import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, DepositWithdrawPayload, Account } from '../../../services/account.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositPayload: { account_id: string; amount: number | null } = {
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
    this.route.paramMap.subscribe(params => {
      this.depositPayload.account_id = params.get('accountId') || '';

      if (this.depositPayload.account_id) {
        this.accountService.getAccountById(this.depositPayload.account_id).subscribe({
          next: (acc) => this.accountDetails = acc,
          error: (err) => console.error('Error fetching account:', err)
        });
      }
    });
  }

  onDeposit(): void {
    if (!this.depositPayload.amount || this.depositPayload.amount <= 0) {
      this.message = ' Please enter a valid amount.';
      return;
    }

    const payload: DepositWithdrawPayload = {
      amount: this.depositPayload.amount
    };

    this.accountService.deposit(this.depositPayload.account_id, payload).subscribe({
      next: (res) => {
        this.message = ` Deposit successful! New balance: ${res.balance}`;
        this.depositPayload.amount = null;

        // Update the displayed balance
        if (this.accountDetails) {
          this.accountDetails.balance = res.balance;
        }
      },
      error: (err) => {
        console.error(err);
        this.message = err.error?.message || ' Deposit failed. Please try again.';
      }
    });
  }
}
