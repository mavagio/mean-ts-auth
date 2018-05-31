import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';
import {TestComponentComponent} from './test-component/test-component.component';
import {ApiRequestsService} from '../services/api-requests.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {ConfigurationService} from '../services/configuration.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    routing,
  ],
  providers: [
    RouterModule,
    ApiRequestsService,
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
