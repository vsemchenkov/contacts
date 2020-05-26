import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../../auth/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactsServicesService {
  userId: string;
  users: any;
  contactsUrl: string;
  contactUrl: string;
  contactDeleteUrl: string;

  constructor(private _http: HttpClient) { }
  getContacts(user_id) {
    this.contactsUrl = `http://localhost:3000/api/contacts/${user_id}`;
    return this._http.post<Contact>(this.contactsUrl, this.users);
  }
  addContact(user_id, contact: Contact) {
    this.contactUrl = `http://localhost:3000/api/contacts/add/${user_id}`;
    return this._http.post<Contact>(this.contactUrl, contact);
  }
  deleteContact(contactId: string) {
    this.contactDeleteUrl = `http://localhost:3000/api/contacts/delete/${contactId}`;
    return this._http.post<any>(this.contactDeleteUrl, { _id: contactId});
  }
  editContact(contactId: string, contact: any) {
    this.contactDeleteUrl = `http://localhost:3000/api/contacts/edit/${contactId}`;
    return this._http.post<any>(this.contactDeleteUrl, contact);
  }

}
