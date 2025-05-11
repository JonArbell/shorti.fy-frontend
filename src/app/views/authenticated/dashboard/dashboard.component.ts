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
      }
    });
  }

  data: UrlData[] = [
    {
      ip: '192.168.1.1',
      originalUrl: 'https://example.com/this-is-a-long-url',
      shortUrl: 'shorti.fy/abc123',
      clicks: 17,
      status: 'Active',
    },
    {

      ip: '172.0.0.2',
      originalUrl: 'https://longdomain.com/test-page?id=xyz',
      shortUrl: 'shorti.fy/xyz789',
      clicks: 0,
      status: 'Expired',
    },
    // ...more mock data
  ];

  pageSize = 10;
  currentPage = 0;

  pagedData: UrlData[] = [];

  ngOnInit(): void {
    this.getDashboard();
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.data.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedData();
  }
  totalItems = 0;

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.updatePagedData();
    }
  }
}

interface Dashboard {
  totalUrlLinks: number;
  activeUrls: number;
  mostClickedUrl: string;
  expiredUrls : number
}

interface UrlData{
  ip: string,
  originalUrl: string,
  shortUrl: string,
  clicks: number,
  status: string,
}