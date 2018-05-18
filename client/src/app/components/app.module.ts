import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';
import {TestComponentComponent} from '../test-component/test-component.component';
import {ApiRequestsService} from '../services/api-requests.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {ConfigurationService} from '../services/configuration.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    ApiRequestsService,
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
