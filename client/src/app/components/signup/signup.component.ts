import {Component, OnInit} from '@angular/core';
import {ApiRequestsService} from "../../services/api-requests.service";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupData: any = {};

  constructor(private apiRequestsService: ApiRequestsService,
              public router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  public onSignUpSubmit() {
    this.authService.createUser(this.signupData.email, this.signupData.password);
  }
}
