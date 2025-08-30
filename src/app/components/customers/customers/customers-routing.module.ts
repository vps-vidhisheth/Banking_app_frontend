import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';

import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'update/:id', component: UpdateCustomerComponent } // ✅ route for updating
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
