import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { ViewCustomersComponent } from '../view-customers/view-customers.component';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      { path: 'create', component: CreateCustomerComponent },
      { path: 'view', component: ViewCustomersComponent },
      { path: 'update/:id', component: UpdateCustomerComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomerComponent,
    ViewCustomersComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomersModule {}
