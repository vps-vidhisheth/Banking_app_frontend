import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent {
  menuOptions = [
    { label: 'Accounts', value: 'accounts' },
    { label: 'Ledger', value: 'ledger' },
    { label: 'Transactions', value: 'transactions' }
  ];

  constructor(private router: Router) {}

navigateTo(event: Event) {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  if (value) {
    // Navigate relative to staff-dashboard
    this.router.navigate([`/staff-dashboard/${value}`]);
  }
}


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
