import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddComponent } from './components/contacts/add/add.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ContactsComponent, AddComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule
  ]
})
export class ContactsModule { }
