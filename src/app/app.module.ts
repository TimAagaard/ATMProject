import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtmComponent } from './components/atm/atm.component';
import { AdminComponent } from './components/admin/admin.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AtmComponent,
    AdminComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
