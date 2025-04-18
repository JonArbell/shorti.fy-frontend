import { Routes } from '@angular/router';
import { SigninComponent } from './views/authentication/signin/signin.component';
import { ForgotPasswordComponent } from './views/authentication/forgot-password/forgot-password.component';
import { DashboardComponent } from './views/authenticated/dashboard/dashboard.component';
import { HomeComponent } from './views/authenticated/home/home.component';
import { MyUrlsComponent } from './views/authenticated/my-urls/my-urls.component';

export const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'my-urls',
    component: MyUrlsComponent,
  },
];
