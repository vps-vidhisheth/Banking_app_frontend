import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { StaffDashboardComponent } from './components/dashboard/staff-dashboard/staff-dashboard.component';


import { CustomersComponent } from './components/customers/customers/customers.component';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { ViewCustomersComponent } from './components/customers/view-customers/view-customers.component';
import { UpdateCustomerComponent } from './components/customers/update-customer/update-customer.component';

import { BanksComponent } from './components/banks/banks/banks.component';
import { CreateBankComponent } from './components/banks/create-bank/create-bank.component';
import { ViewBankComponent } from './components/banks/view-bank/view-bank.component';
import { UpdateBankComponent } from './components/banks/update-bank/update-bank.component';


import { AdminGuard } from './guards/admin.guard';
import { StaffGuard } from './guards/staff.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

{
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate: [AdminGuard],
  children: [
    {
      path: 'customers',
      loadChildren: () =>
        import('./components/customers/customers/customers.module').then(m => m.CustomersModule)
    },
    {
      path: 'banks',
      loadChildren: () =>
        import('./components/banks/banks/banks.module').then(m => m.BanksModule)
    },
    {
      path: 'ledger',
      loadChildren: () =>
        import('./components/ledger/ledger.module').then(m => m.LedgerModule)
    },
    {
      path: 'transactions',
      loadChildren: () =>
        import('./components/transaction/transaction/transaction.module').then(m => m.TransactionModule)
    },

    { path: '', redirectTo: 'customers/view', pathMatch: 'full' }
  ]
},

{
  path: 'staff-dashboard',
  component: StaffDashboardComponent,
  canActivate: [StaffGuard],
  children: [
    {
      path: 'accounts',
      loadChildren: () =>
        import('./components/account/account.module').then(m => m.AccountModule)
    },
    {
      path: 'ledger',
      loadChildren: () =>
        import('./components/ledger/ledger.module').then(m => m.LedgerModule)
    },
    {
      path: 'transactions',
      loadChildren: () =>
        import('./components/transaction/transaction/transaction.module').then(m => m.TransactionModule)
    },
    { path: '', redirectTo: 'accounts', pathMatch: 'full' } 
  ]
},


{ path: '**', redirectTo: 'login' },


  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
