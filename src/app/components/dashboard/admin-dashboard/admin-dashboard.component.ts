import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  menuOptions = [
    { label: 'Customers', value: 'customers' },
    { label: 'Banks', value: 'banks' }
  ];

  constructor(private router: Router) {}

navigateTo(event: Event) {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  if (value) {
    // Include parent path
    this.router.navigate([`/admin-dashboard/${value}`]);
  }
}



  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
