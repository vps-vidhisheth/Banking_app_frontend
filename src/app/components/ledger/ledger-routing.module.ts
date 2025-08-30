import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLedgerComponent } from './view-ledger/view-ledger.component';

const routes: Routes = [
  { path: '', component: ViewLedgerComponent } // default route for LedgerModule
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerRoutingModule {}
