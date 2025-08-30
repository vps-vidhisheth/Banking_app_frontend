import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDashboardComponent } from './staff-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StaffDashboardComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: () =>
          import('../../account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'ledger',
        loadChildren: () =>
          import('../../ledger/ledger.module').then(m => m.LedgerModule),
      },
      { path: '', redirectTo: 'accounts', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffDashboardRoutingModule {}
