import { Component, OnInit } from '@angular/core';
import {AuthServicesService} from '../../auth/_services/auth-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthServicesService) { }

  public auth: boolean = this._authService.getAuth();
  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
  }
}
