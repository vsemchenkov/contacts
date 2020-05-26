import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServicesService } from '../../_services/auth-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private _authServices: AuthServicesService,
              private _router: Router) { }

  OnSubmit(f: NgForm) {
    this._authServices.authRegister(f.value)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.user_id);
        this._router.navigate(['profile']);
        },
        error => {
        console.log(error);
        });
  }
  ngOnInit(): void {
  }

}
