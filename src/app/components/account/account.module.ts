import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Add this
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

@NgModule({
  declarations: [
    AccountComponent,
    CreateAccountComponent,
    ViewAccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Add here
    AccountRoutingModule
  ]
})
export class AccountModule { }
