import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtmComponent } from './components/atm/atm.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
	{ path: '', redirectTo: 'atm', pathMatch: 'full' },
	{ path: 'atm', component: AtmComponent },
	{ path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
