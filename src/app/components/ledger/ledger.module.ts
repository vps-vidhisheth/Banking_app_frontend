import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewLedgerComponent } from './view-ledger/view-ledger.component';
import { LedgerRoutingModule } from './ledger-routing.module';

@NgModule({
  declarations: [ViewLedgerComponent],
  imports: [
    CommonModule,
    FormsModule,
    LedgerRoutingModule
  ]
})
export class LedgerModule {}
