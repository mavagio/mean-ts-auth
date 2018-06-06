import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {TestComponentComponent} from "./test-component/test-component.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponentComponent},
  { path: '**', component: PageNotFoundComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
