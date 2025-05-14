import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService : DashboardService
  ){}

  isLoading = signal<boolean>(true);

  dashboardData = signal<Dashboard>({
    activeUrls : 0,
    expiredUrls : 0,
    mostClickedUrl : "None",
    totalUrlLinks : 0
  });

  getDashboard() : void{
    // localStorage.clear()
    this.dashboardService.getDashboard()
    .subscribe({
      next : (response : Dashboard) =>{
        const dashboard = {
          activeUrls : response.activeUrls,
          expiredUrls : response.expiredUrls,
          mostClickedUrl : response.mostClickedUrl,
          totalUrlLinks : response.totalUrlLinks
        };

       this.dashboardData.set(dashboard);

       this.isLoading.set(false)
      }
    });
  }

  getRecentVisits() : void{
    this.dashboardService.getRecentVisits()
    .subscribe({
      next : (response : UrlData[]) =>{
        this.pagedData.set(response);
        this.isLoading.set(false);
      }
    })
  }

  pagedData = signal<UrlData[]>([]);

  ngOnInit(): void {
    this.getDashboard();
    this.getRecentVisits();

  }

}

interface Dashboard {
  totalUrlLinks: number;
  activeUrls: number;
  mostClickedUrl: string;
  expiredUrls : number
}

interface UrlData{
  id : number,
  ipAddress: string,
  originalUrl: string,
  shortenedUrl: string,
  numberOfClicks: number,
  active: boolean,
}
