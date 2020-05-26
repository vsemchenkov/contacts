import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../../../../auth/_services/auth-services.service';
import { NgForm, NgModel } from '@angular/forms';
import {ContactsServicesService} from '../../../_services/contacts-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public userIds = localStorage.getItem('user_id');
  constructor(private _contactsServices: ContactsServicesService,
              private _router: Router) { }

  ngOnInit(): void {
    console.log(this.userIds);
  }

  OnSubmit(f: NgForm) {
    this._contactsServices.addContact(this.userIds, f.value)
      .subscribe(res => {
        this._router.navigate(['contacts']);
        },
        error => {
        console.log(error);
        });
  }
}
