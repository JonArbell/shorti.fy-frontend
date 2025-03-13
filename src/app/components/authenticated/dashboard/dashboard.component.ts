import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardResponse } from '../../../dtos/dashboard.dto';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  
  dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.dashboardService.getDashBoard()
    .subscribe({
      next : (response : DashboardResponse) =>{

        this.totalUrlLinks.set(response.overallTotalUrlLinks);
        this.totalActiveUrlLinks.set(response.totalActiveUrlLinks);
        this.totalExpiredUrlLinks.set(response.totalExpiredUrlLinks);
        this.mostClickedUrl.set(response.mostClickedUrl);

      },
      error : (err) => {
        console.warn(err);
      },
    });
  }

  totalUrlLinks = signal(0)
  totalActiveUrlLinks = signal(0)
  totalExpiredUrlLinks = signal(0)
  mostClickedUrl = signal("None")

} 
