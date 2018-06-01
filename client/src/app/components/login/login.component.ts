import { Component, OnInit } from '@angular/core';
import {ApiRequestsService} from "../../services/api-requests.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: any = {};
  constructor( private apiRequestsService: ApiRequestsService,
               public router: Router) { }



  ngOnInit() {
  }

  public onSubmit(){
    console.log(this.loginData);
    this.apiRequestsService.postLogin(this.loginData).subscribe((response) => {
      console.log(response, 'success: ', response.success);
      if (response.success) {
        this.router.navigate(['profile']);
      }
    });

}
