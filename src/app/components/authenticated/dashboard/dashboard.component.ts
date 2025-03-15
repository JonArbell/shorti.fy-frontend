import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Dashboard, DashboardResponse } from '../../../models/dashboard.dto';
import { AuthenticationService } from '../../../security/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  
  dashboardService = inject(DashboardService);
  authService = inject(AuthenticationService);

  ngOnInit(): void {

    // localStorage.removeItem('jwtToken');

    this.dashboardService.getDashBoard()
    .subscribe({
      next : (response) =>{
        this.dashboard.set(response);
      },
      error : (err : any) => {
        console.warn(err);
      },
    });
  }

  dashboard = signal<Dashboard>({overallTotalUrlLinks : 0, totalActiveUrlLinks : 0, totalExpiredUrlLinks: 0, mostClickedUrl : "None"});

} 
