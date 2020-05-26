import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AuthGuard } from '../auth.guard';
import { AddComponent } from './components/contacts/add/add.component';


const routes: Routes = [
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'contacts/add', component: AddComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
