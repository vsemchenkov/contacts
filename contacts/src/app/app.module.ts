import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthServicesService } from './auth/_services/auth-services.service';
import { ContactsServicesService } from './contacts/_services/contacts-services.service';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { ContactsRoutingModule } from './contacts/contacts-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth.guard';
import {ProfileModule} from './profile/profile.module';
import {ProfileRoutingModule} from './profile/profile-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AuthRoutingModule,
    ContactsModule,
    ContactsRoutingModule,
    ProfileModule,
    ProfileRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [ AuthServicesService, ContactsServicesService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
