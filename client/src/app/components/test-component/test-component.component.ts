import {Component, OnInit} from '@angular/core';
import {ApiRequestsService} from '../../services/api-requests.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  public testValues: any = {};
  public testEntries: any = [];

  constructor(private apiRequestsService: ApiRequestsService) {
  }

  ngOnInit() {

  }

  public getTests(): void {
    this.apiRequestsService.getTests().subscribe(response => this.testEntries = response);
  }

  public onSubmit(): void {
    this.apiRequestsService.postTest(this.testValues).subscribe(response => alert('Successfully added'));
  }
}
