import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthServicesService} from '../../_services/auth-services.service';
import { NgForm, NgModel } from '@angular/forms';
import { AuthLogin } from '../../interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthServicesService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(f: NgForm) {
    this._auth.authLogin(f.value)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.user_id);
        this._router.navigate(['profile']);
      }, error => {
        console.log(error);
      });
  }

}
