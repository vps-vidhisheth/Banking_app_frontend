import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, TransferPayload, Account } from '../../../services/account.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  accountDetails: Account | null = null; 
  transferPayload: { to_account_id: string; amount: number | null } = {
    to_account_id: '',
    amount: null
  };
  message = '';

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const fromAccountId = this.route.snapshot.paramMap.get('accountId') || '';
    if (fromAccountId) {
      this.accountService.getAccountById(fromAccountId).subscribe({
        next: (acc) => this.accountDetails = acc,
        error: (err) => this.message = ' Failed to load account details.'
      });
    }
  }

  onTransfer(): void {
    if (!this.accountDetails) return;

    const amount = this.transferPayload.amount;
    const toId = this.transferPayload.to_account_id?.trim();
    if (!toId || !amount || amount <= 0) {
      this.message = ' Please enter valid details.';
      return;
    }

    const payload: TransferPayload = {
      from_account_id: this.accountDetails.account_id,
      to_account_id: toId,
      amount
    };

    this.accountService.transfer(payload).subscribe({
      next: (res) => {
        this.message = ` Transfer successful! New balance: ${res.balance}`;
        this.transferPayload.amount = null;
        this.transferPayload.to_account_id = '';
      },
      error: (err) => {
        console.error(err);
        this.message = err.error?.message || ' Transfer failed';
      }
    });
  }
}
