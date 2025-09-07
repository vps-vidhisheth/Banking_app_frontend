
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
  bank: { name: string } = { name: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.bankId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bankId) {
      this.loadBankName(this.bankId);
    }
  }

  loadBankName(id: string) {
    this.bankService.getBankById(id).subscribe({
      next: (res: any) => {
        this.bank.name = res.name;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bank details.';
        console.error(err);
      }
    });
  }

  onSubmit() {
    this.bankService.updateBank(this.bankId, { name: this.bank.name }).subscribe({
      next: () => {
        this.successMessage = 'Bank updated successfully!';
      },
      error: (err) => {
        this.errorMessage = 'Failed to update bank.';
        console.error(err);
      }
    });
  }
}
