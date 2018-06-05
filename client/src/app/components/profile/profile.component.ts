import { Component, OnInit } from '@angular/core';
import {ApiRequestsService} from "../../services/api-requests.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public testEntries: any = [];

  constructor(private apiRequestsService: ApiRequestsService) { }

  ngOnInit() {

  }

  logout() {
    localStorage.clear();
  }

  public getTests(): void {
    this.apiRequestsService.getTests().subscribe(response => this.testEntries = response);
  }
}
