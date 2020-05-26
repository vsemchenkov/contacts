import { Component, OnInit } from '@angular/core';
import {ContactsServicesService} from '../../_services/contacts-services.service';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';
import {fromEvent, Subject} from 'rxjs';
import {map, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contacts: any;
  public userId: string;
  public editor = false;
  public search;
  public term: string;
  public filterData;

  private contact: object;

  // tslint:disable-next-line:variable-name
  constructor(private _contacts: ContactsServicesService,
              // tslint:disable-next-line:variable-name
              private _router: Router) { }
  ngOnInit(): void {
    this.getUserId();
    this._contacts.getContacts(this.userId)
      .subscribe(res => {
        this.contacts = res;
      },
        error => {
        console.log(error);
        });
  }
  getUserId() {
    this.userId = localStorage.getItem('user_id');
  }

  deleteContact(contactId: string) {
    this._contacts.deleteContact(contactId)
      .subscribe(res => {
        console.log(res);
      },
        error => {
        console.log(error);
        });
  }

  deleteIndex(i) {
    this.contacts.splice(i, 1);
  }

  getEditor() {
    if (!this.editor) {
      this.editor = true;
    } else {
      this.editor = false;
    }
  }
  // tslint:disable-next-line:variable-name
  editContact(id, user_id, name, tel) {
    this._contacts.editContact(id, { 'name': name, 'tel': tel, 'user_id': user_id })
      .subscribe(res => {
      },
        error => {
        console.log(error);
        });
  }
}
