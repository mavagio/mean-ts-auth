import { Component, OnInit } from '@angular/core';
import {ApiRequestsService} from "../../services/api-requests.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public testEntries: any = [];
  public userData: any = {};

  constructor(private apiRequestsService: ApiRequestsService,
              private authService: AuthService) { }

  ngOnInit() {
    this.apiRequestsService.getUser(this.authService.getUserId()).subscribe(response => {
      this.userData = response.local;
      this.userData.id = this.authService.getUserId();
    });
  }

  logout() {
    this.authService.logout();
  }

  public getTests(): void {
    this.apiRequestsService.getTests().subscribe(response => this.testEntries = response);
  }
}
