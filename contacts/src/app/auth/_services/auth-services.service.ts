import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthLogin, AuthRegistr} from '../interfaces';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  LoginUrl = `http://localhost:3000/api/login`;
  RegisterUrl = `http://localhost:3000/api/register`;

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient,
              private _router: Router) {
  }

  authLogin(user: AuthLogin) {
    return this._http.post<AuthLogin>(this.LoginUrl, user);
  }

  authRegister(user: AuthRegistr) {
    return this._http.post<AuthRegistr>(this.RegisterUrl, user);
  }

  getAuth() {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') === undefined) {
      return false;
    }
    return true;
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
