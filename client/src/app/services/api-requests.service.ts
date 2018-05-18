import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class ApiRequestsService {

  private testEndpoint = 'test/';
  private actionUrl: string;

  constructor(private http: HttpClient,
              private configurationService: ConfigurationService) {
    this.actionUrl = `${configurationService.apiHost}${configurationService.apiPrefix}`;
  }

  getTests(): Observable<any> {
    return this.http.get<any>(this.actionUrl + this.testEndpoint);
  }

  postTest(jsonBody): Observable<void> {
    return this.http.post<void>(this.actionUrl + this.testEndpoint, jsonBody);
  }
}
