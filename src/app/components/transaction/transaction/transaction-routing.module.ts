import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTransactionComponent } from '../viewtransaction/viewtransaction.component';


const routes: Routes = [
  { path: '', component: ViewTransactionComponent } // lazy-load at /transactions
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
