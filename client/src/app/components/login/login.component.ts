import { Component, OnInit } from '@angular/core';
import {ApiRequestsService} from "../../services/api-requests.service";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: any = {};
  constructor( private apiRequestsService: ApiRequestsService,
               public router: Router,
               private authService: AuthService) { }

  ngOnInit() {
  }

  public onLoginSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password);
  }
}
