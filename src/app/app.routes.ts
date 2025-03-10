import { Routes } from '@angular/router';
import { DashboardComponent } from './authenticated/dashboard/dashboard.component';
import { HomeComponent } from './authenticated/home/home.component';
import { MyUrlsComponent } from './authenticated/my-urls/my-urls.component';
import { AppComponent } from './app.component';
import { CanActivateGuard } from './security/guard/canActivate/canActivate';

export const routes: Routes = [

    {
        path : '',
        component : AppComponent
    },
    {
        path : 'home',
        component : HomeComponent,
        canActivate : [CanActivateGuard]
    }
    ,
    {
        path : 'dashboard',
        component : DashboardComponent,
        canActivate : [CanActivateGuard]
    }
    ,
    {
        path : 'my-urls',
        component : MyUrlsComponent,
        canActivate : [CanActivateGuard]
    }

];
