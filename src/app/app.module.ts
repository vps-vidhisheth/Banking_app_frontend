// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';

// import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';

// // Feature modules
// import { CustomersModule } from './components/customers/customers/customers.module';
// import { BanksModule } from './components/banks/banks/banks.module';
// import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
// import { StaffDashboardComponent } from './components/dashboard/staff-dashboard/staff-dashboard.component';
// import { ViewLedgerComponent } from './components/ledger/view-ledger/view-ledger.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     AdminDashboardComponent,
//     StaffDashboardComponent,
//     ViewLedgerComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     HttpClientModule,
//     CustomersModule,
//     BanksModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// Feature modules
import { CustomersModule } from './components/customers/customers/customers.module';
import { BanksModule } from './components/banks/banks/banks.module';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { StaffDashboardComponent } from './components/dashboard/staff-dashboard/staff-dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LedgerModule } from './components/ledger/ledger.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    StaffDashboardComponent
    // Removed ViewLedgerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CustomersModule,
    BanksModule,
      LedgerModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // ✅ Very important
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
