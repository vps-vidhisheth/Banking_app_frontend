import { Component, OnInit } from '@angular/core';
import { 
  AccountService, 
  DepositWithdrawPayload, 
  TransferPayload, 
  PaginatedResponse 
} from '../../../services/account.service';

export interface Account {
  account_id: string;
  customer_id: string;
  bank_id: string;
  bank_name: string;
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
    selectedAccountId!: string;
  showDeposit = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  page = 1;
  pageSize = 5;
  total = 0;
  searchQuery = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }



  loadAccounts(): void {
    this.loading = true;
    this.errorMessage = '';
    const offset = (this.page - 1) * this.pageSize;

    const filters: any = {};
    if (this.searchQuery) {
      filters.account_id = this.searchQuery.trim(); 
    }

    this.accountService.getAccounts(this.pageSize, offset, filters).subscribe({
      next: (res: PaginatedResponse) => {
        this.accounts = res.data;
        this.total = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load accounts';
        this.accounts = [];
        this.loading = false;
      }
    });
  }

applySearch(): void {
  this.page = 1;
  this.loadAccounts();
}

clearSearch(): void {
  this.searchQuery = '';
  this.page = 1;
  this.loadAccounts();
}


  get totalPages(): number {
    return this.pageSize > 0 ? Math.ceil(this.total / this.pageSize) : 0;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.loadAccounts();
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  prevPage(): void {
    this.goToPage(this.page - 1);
  }

  deleteAccount(account_id: string): void {
    if (!confirm('Are you sure you want to delete this account?')) return;

    this.loading = true;
    this.accountService.delete(account_id).subscribe({
      next: () => {
        alert('Account deleted successfully');
        if (this.accounts.length === 1 && this.page > 1) {
          this.page--;
        }
        this.loadAccounts();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert('Failed to delete account');
      }
    });
  }


openDeposit(accountId: string) {
  this.selectedAccountId = accountId;
  this.showDeposit = true;
}

onActionSuccess() {
  this.showDeposit = false;
  this.successMessage = 'Deposit successful!';
  this.loadAccounts();
}

}
