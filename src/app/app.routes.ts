import { Routes } from '@angular/router';
import { SigninComponent } from './views/authentication/signin/signin.component';
import { ForgotPasswordComponent } from './views/authentication/forgot-password/forgot-password.component';
import { DashboardComponent } from './views/authenticated/dashboard/dashboard.component';
import { HomeComponent } from './views/authenticated/home/home.component';
import { MyUrlsComponent } from './views/authenticated/my-urls/my-urls.component';
import { canActivateAuthGuard } from './guard/can-activate-auth.guard';
import { guestGuard } from './guard/guest.guard';
import { ExpiredUrlComponent } from './views/expired-url/expired-url/expired-url.component';
import { requiredParamGuard } from './guard/required-param.guard';

export const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
    canActivate : [guestGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate : [guestGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate : [canActivateAuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate : [canActivateAuthGuard]
  },
  {
    path: 'my-urls',
    component: MyUrlsComponent,
    canActivate : [canActivateAuthGuard]
  },
  {
    path : 'expired-url',
    component : ExpiredUrlComponent,
    canActivate : [requiredParamGuard]
  }
];
