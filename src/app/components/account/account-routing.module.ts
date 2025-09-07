import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component'; // ✅ Import

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'create', component: CreateAccountComponent },
      { path: 'view', component: ViewAccountComponent },
      { path: 'deposit/:accountId', component: DepositComponent }, 
      { path: 'withdraw/:accountId', component: WithdrawComponent },
       { path: 'transfer/:accountId', component: TransferComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
