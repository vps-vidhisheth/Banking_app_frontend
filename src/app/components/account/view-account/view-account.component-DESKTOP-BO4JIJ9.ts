
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService, DepositWithdrawPayload, TransferPayload } from '../../../services/account.service';
import { AccountRefreshService } from 'src/app/components/account/account-refresh.service';


interface Account {
  account_id: string;
  customer_id: string;
  bank_id: string;
  balance: number;
  created_at?: string;
}

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  limit = 5;
  offset = 0;
  total = 0;
  totalPages = 1;
  search = '';

  private refreshSub!: Subscription;

  constructor(
    private accountService: AccountService,
    private accountRefresh: AccountRefreshService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();

    // Subscribe to account refresh notifications
    this.refreshSub = this.accountRefresh.refresh$.subscribe(() => {
      this.loadAccounts();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }

  loadAccounts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.accountService.getAll(this.offset, this.limit, this.search).subscribe({
      next: (res: any) => {
        this.accounts = res.data || [];
        if (res.pagination) {
          this.total = res.pagination.total;
          this.limit = res.pagination.limit;
          this.offset = res.pagination.offset;
          this.totalPages = Math.ceil(this.total / this.limit);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load accounts.';
        this.loading = false;
      }
    });
  }

  // Search by account_id
  searchAccounts(): void {
    this.offset = 0; // reset to first page
    this.loadAccounts();
  }

  prevPage(): void {
    if (this.offset === 0) return;
    this.offset -= this.limit;
    this.loadAccounts();
  }

  nextPage(): void {
    if (this.offset + this.limit >= this.total) return;
    this.offset += this.limit;
    this.loadAccounts();
  }

  deleteAccount(account_id: string) {
    if (!confirm('Are you sure you want to delete this account?')) return;
    this.accountService.delete(account_id).subscribe({
      next: () => {
        this.successMessage = 'Account deleted successfully!';
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to delete account.';
      }
    });
  }

  deposit(account_id: string) {
    const account = this.accounts.find(acc => acc.account_id === account_id);
    if (!account) return;
    const amount = Number(prompt('Enter amount to deposit:'));
    if (isNaN(amount) || amount <= 0) return;

    const payload: DepositWithdrawPayload = { amount, customer_id: account.customer_id };
    this.accountService.deposit(account_id, payload).subscribe({
      next: () => {
        this.successMessage = 'Deposit successful!';
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Deposit failed.';
      }
    });
  }

  withdraw(account_id: string) {
    const account = this.accounts.find(acc => acc.account_id === account_id);
    if (!account) return;
    const amount = Number(prompt('Enter amount to withdraw:'));
    if (isNaN(amount) || amount <= 0) return;

    const payload: DepositWithdrawPayload = { amount, customer_id: account.customer_id };
    this.accountService.withdraw(account_id, payload).subscribe({
      next: () => {
        this.successMessage = 'Withdrawal successful!';
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Withdrawal failed.';
      }
    });
  }

  transfer() {
    const fromAccId = prompt('Enter FROM Account ID:');
    const toAccId = prompt('Enter TO Account ID:');
    const amount = Number(prompt('Enter amount to transfer:'));
    if (!fromAccId || !toAccId || isNaN(amount) || amount <= 0) {
      alert('Invalid input!');
      return;
    }

    const fromAccount = this.accounts.find(acc => acc.account_id === fromAccId.trim());
    const toAccount = this.accounts.find(acc => acc.account_id === toAccId.trim());
    if (!fromAccount || !toAccount) {
      alert('Invalid account IDs!');
      return;
    }

    const payload: TransferPayload = {
      from_account_id: fromAccount.account_id,
      to_account_id: toAccount.account_id,
      from_customer_id: fromAccount.customer_id,
      to_customer_id: toAccount.customer_id,
      amount
    };

    this.accountService.transfer(payload).subscribe({
      next: () => {
        this.successMessage = 'Transfer successful!';
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Transfer failed.';
      }
    });
  }

  updateAccount(account_id: string) {
    const account = this.accounts.find(acc => acc.account_id === account_id);
    if (!account) return;
    const bankId = prompt('Enter new Bank ID:');
    if (!bankId) return;

    this.accountService.update(account_id, { customer_id: account.customer_id, bank_id: bankId }).subscribe({
      next: () => {
        this.successMessage = 'Account updated successfully!';
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Account update failed.';
      }
    });
  }
}
