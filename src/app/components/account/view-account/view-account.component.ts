// import { Component, OnInit } from '@angular/core';
// import { AccountService, DepositWithdrawPayload, TransferPayload } from '../../../services/account.service';

// interface Account {
//   account_id: string;    // Match backend JSON
//   customer_id: string;
//   bank_id: string;
//   balance: number;
//   created_at?: string;
// }

// @Component({
//   selector: 'app-view-account',
//   templateUrl: './view-account.component.html',
//   styleUrls: ['./view-account.component.css']
// })
// export class ViewAccountComponent implements OnInit {
//   accounts: Account[] = [];
//   loading = false;
//   errorMessage = '';
//   successMessage = '';

//   constructor(private accountService: AccountService) {}

//   ngOnInit(): void {
//     this.loadAccounts();
//   }

//   loadAccounts(): void {
//     this.loading = true;
//     this.accountService.getAll().subscribe({
//       next: (res: any) => {
//         this.accounts = res.data || res;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Failed to load accounts.';
//         this.loading = false;
//       }
//     });
//   }

//   deleteAccount(account_id: string) {
//     if (!confirm('Are you sure you want to delete this account?')) return;
//     this.accountService.delete(account_id).subscribe({
//       next: () => {
//         this.successMessage = 'Account deleted successfully!';
//         this.loadAccounts();
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Failed to delete account.';
//       }
//     });
//   }

//   deposit(account_id: string) {
//     const account = this.accounts.find(acc => acc.account_id === account_id);
//     if (!account) return;

//     const amount = Number(prompt('Enter amount to deposit:'));
//     if (isNaN(amount) || amount <= 0) return;

//     const payload: DepositWithdrawPayload = { customer_id: account.customer_id, amount };
//     this.accountService.deposit(account_id, payload).subscribe({
//       next: () => {
//         this.successMessage = 'Deposit successful!';
//         this.loadAccounts();
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Deposit failed.';
//       }
//     });
//   }

//   withdraw(account_id: string) {
//     const account = this.accounts.find(acc => acc.account_id === account_id);
//     if (!account) return;

//     const amount = Number(prompt('Enter amount to withdraw:'));
//     if (isNaN(amount) || amount <= 0) return;

//     const payload: DepositWithdrawPayload = { customer_id: account.customer_id, amount };
//     this.accountService.withdraw(account_id, payload).subscribe({
//       next: () => {
//         this.successMessage = 'Withdrawal successful!';
//         this.loadAccounts();
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Withdrawal failed.';
//       }
//     });
//   }

//   transfer() {
//     const fromAccId = prompt('Enter FROM Account ID:');
//     const toAccId = prompt('Enter TO Account ID:');
//     const amount = Number(prompt('Enter amount to transfer:'));
//     if (!fromAccId || !toAccId || isNaN(amount) || amount <= 0) return;

//     const fromAccount = this.accounts.find(acc => acc.account_id === fromAccId);
//     const toAccount = this.accounts.find(acc => acc.account_id === toAccId);
//     if (!fromAccount || !toAccount) return;

//     const payload: TransferPayload = {
//       from_account_id: fromAccId,
//       to_account_id: toAccId,
//       from_customer_id: fromAccount.customer_id,
//       to_customer_id: toAccount.customer_id,
//       amount
//     };

//     this.accountService.transfer(payload).subscribe({
//       next: () => {
//         this.successMessage = 'Transfer successful!';
//         this.loadAccounts();
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Transfer failed.';
//       }
//     });
//   }

//   updateAccount(account_id: string) {
//     const account = this.accounts.find(acc => acc.account_id === account_id);
//     if (!account) return;

//     const bankId = prompt('Enter new Bank ID:');
//     if (!bankId) return;

//     this.accountService.update(account_id, { customer_id: account.customer_id, bank_id: bankId }).subscribe({
//       next: () => {
//         this.successMessage = 'Account updated successfully!';
//         this.loadAccounts();
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Account update failed.';
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { AccountService, DepositWithdrawPayload, TransferPayload } from '../../../services/account.service';

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
export class ViewAccountComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Pagination variables
  limit = 2;       // accounts per page
  offset = 0;      // current page offset
  total = 0;       // total accounts from backend
  totalPages = 1;  // calculated total pages

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.accountService.getAll(this.offset, this.limit).subscribe({
      next: (res: any) => {
        this.accounts = res.data || [];
        this.total = res.total || this.accounts.length; // backend should return total count
        this.totalPages = Math.ceil(this.total / this.limit);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load accounts.';
        this.loading = false;
      }
    });
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

    const payload: DepositWithdrawPayload = { customer_id: account.customer_id, amount };
    this.accountService.deposit(account_id, payload).subscribe({
      next: () => {
        this.successMessage = 'Deposit successful!';
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Deposit failed.';
      }
    });
  }

  withdraw(account_id: string) {
    const account = this.accounts.find(acc => acc.account_id === account_id);
    if (!account) return;

    const amount = Number(prompt('Enter amount to withdraw:'));
    if (isNaN(amount) || amount <= 0) return;

    const payload: DepositWithdrawPayload = { customer_id: account.customer_id, amount };
    this.accountService.withdraw(account_id, payload).subscribe({
      next: () => {
        this.successMessage = 'Withdrawal successful!';
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Withdrawal failed.';
      }
    });
  }

  transfer() {
    const fromAccId = prompt('Enter FROM Account ID:');
    const toAccId = prompt('Enter TO Account ID:');
    const amount = Number(prompt('Enter amount to transfer:'));
    if (!fromAccId || !toAccId || isNaN(amount) || amount <= 0) return;

    const fromAccount = this.accounts.find(acc => acc.account_id === fromAccId);
    const toAccount = this.accounts.find(acc => acc.account_id === toAccId);
    if (!fromAccount || !toAccount) return;

    const payload: TransferPayload = {
      from_account_id: fromAccId,
      to_account_id: toAccId,
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
        this.errorMessage = 'Transfer failed.';
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
