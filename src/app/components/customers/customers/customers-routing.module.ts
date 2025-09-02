// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CustomersComponent } from './customers.component';

// import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

// const routes: Routes = [
//   { path: '', component: CustomersComponent },
//   { path: 'update/:id', component: UpdateCustomerComponent } // ✅ route for updating
// ];


// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CustomersRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { ViewCustomersComponent } from '../view-customers/view-customers.component';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

const routes: Routes = [
  {
    path: '', // /customers
    component: CustomersComponent,
    children: [
      { path: 'create', component: CreateCustomerComponent },
      { path: 'view', component: ViewCustomersComponent },
      { path: 'update/:id', component: UpdateCustomerComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' } // default to view
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
