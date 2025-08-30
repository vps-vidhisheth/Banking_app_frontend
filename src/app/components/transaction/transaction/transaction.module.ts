import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionRoutingModule } from './transaction-routing.module';
import { ViewTransactionComponent } from '../viewtransaction/viewtransaction.component';


@NgModule({
  declarations: [ViewTransactionComponent],
  imports: [
    CommonModule,
    FormsModule,
    TransactionRoutingModule
  ]
})
export class TransactionModule { }
