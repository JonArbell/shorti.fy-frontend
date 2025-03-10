import { Routes } from '@angular/router';
import { DashboardComponent } from './components/authenticated/dashboard/dashboard.component';
import { HomeComponent } from './components/authenticated/home/home.component';
import { MyUrlsComponent } from './components/authenticated/my-urls/my-urls.component';
import { CanActivateGuard } from './security/guard/canActivate/canActivate';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';

export const routes: Routes = [
    {
        path : '',
        component : SigninComponent
    },
    {
        path : 'sign-up',
        component : SignupComponent
    },

    {
        path : '',
        redirectTo : 'home',
        pathMatch : 'full'
    },
    {
        path : 'home',
        component : HomeComponent,
        canActivate : [CanActivateGuard]
    },
    {
        path : 'dashboard',
        component : DashboardComponent,
        canActivate : [CanActivateGuard]
    },
    {
        path : 'my-urls',
        component : MyUrlsComponent,
        canActivate : [CanActivateGuard]
    }

];
