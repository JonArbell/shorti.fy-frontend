import { Routes } from '@angular/router';
import { AuthenticatedBasePageComponent } from './authenticated/authenticated-base-page/authenticated-base-page.component';
import { DashboardComponent } from './authenticated/dashboard/dashboard.component';
import { HomeComponent } from './authenticated/home/home.component';
import { MyUrlsComponent } from './authenticated/my-urls/my-urls.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',  
    },
    {
        path : '',
        component : AuthenticatedBasePageComponent,
        children : [
            {
                path : 'home',
                component : HomeComponent
            },
            {
                path : 'dashboard',
                component : DashboardComponent
            },
            {
                path : 'my-urls',
                component : MyUrlsComponent
            }
        ]
    }

];
