import { Component, OnInit } from '@angular/core';
import {ApiRequestsService} from "../../services/api-requests.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupData: any = {};
  constructor(private apiRequestsService: ApiRequestsService) { }

  ngOnInit() {
  }

  public onSubmit(){
    console.log(this.signupData);
    this.apiRequestsService.postSignup(this.signupData).subscribe(response => console.log(response));
  }
}
