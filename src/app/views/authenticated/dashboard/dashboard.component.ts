import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  isLoading = signal<boolean>(true);

  dashboardData = signal<Dashboard>({
    activeUrls: 0,
    expiredUrls: 0,
    mostClickedUrl: 'None',
    totalUrlLinks: 0,
  });

  getDashboard(): void {
    this.isLoading.set(true);
    this.loadDashboard();
    this.loadRecentVisits();
  }

  loadDashboard(): void {
    // localStorage.clear()
    this.dashboardService.getDashboard().subscribe({
      next: (response: Dashboard) => {
        const dashboard = {
          activeUrls: response.activeUrls,
          expiredUrls: response.expiredUrls,
          mostClickedUrl: response.mostClickedUrl,
          totalUrlLinks: response.totalUrlLinks,
        };

        this.dashboardData.set(dashboard);

        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status !== 401) {
          this.errorLoading(err);
        }
      },
    });
  }

  loadRecentVisits(): void {
    this.dashboardService.getRecentVisits().subscribe({
      next: (response: UrlData[]) => {
        this.pagedData.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status !== 401) {
          this.errorLoading(err);
        }
      },
    });
  }

  errorLoading(err: any): void {
    Swal.fire({
      icon: 'error',
      title: '📊 Dashboard Error',
      text:
        err?.error?.message ||
        'Something went wrong while loading the dashboard data.',
      confirmButtonText: 'Retry',
      confirmButtonColor: '#3b82f6',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#9ca3af',
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.getDashboard();
      }
    });
  }

  pagedData = signal<UrlData[]>([]);

  ngOnInit(): void {
    this.getDashboard();
  }
}

interface Dashboard {
  totalUrlLinks: number;
  activeUrls: number;
  mostClickedUrl: string;
  expiredUrls: number;
}

interface UrlData {
  id: number;
  ipAddress: string;
  originalUrl: string;
  shortenedUrl: string;
  numberOfClicks: number;
  active: boolean;
}
