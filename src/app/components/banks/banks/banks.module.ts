import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BanksComponent } from './banks.component';
import { CreateBankComponent } from '../create-bank/create-bank.component';
import { ViewBankComponent } from '../view-bank/view-bank.component';
import { UpdateBankComponent } from '../update-bank/update-bank.component';
import { DeleteBankComponent } from '../delete-bank/delete-bank.component';

const routes: Routes = [
  { path: '', component: BanksComponent },        // /admin-dashboard/banks
  { path: 'view', component: ViewBankComponent }, // /admin-dashboard/banks/view
  { path: 'create', component: CreateBankComponent },
  { path: 'update/:id', component: UpdateBankComponent }
];

@NgModule({
  declarations: [
    BanksComponent,
    CreateBankComponent,
    ViewBankComponent,
    UpdateBankComponent,
    DeleteBankComponent
  ],
  imports: [
    CommonModule,
    FormsModule,           // ✅ Needed for ngModel
    RouterModule.forChild(routes)
  ]
})
export class BanksModule {}
