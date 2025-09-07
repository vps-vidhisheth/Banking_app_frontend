import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';

@NgModule({
  declarations: [
    AccountComponent,
    CreateAccountComponent,
    ViewAccountComponent,
    DepositComponent,
    WithdrawComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
