import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyUrlsService } from './my-urls.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUrlFormComponent } from '../layout/update-url-form/update-url-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
  ShortenUrlRequest,
  UpdateUrlRequestDto,
  UrlResponseDto,
} from '../../../dto/url.dto';
import { ViewFullInfoComponent } from '../layout/view-full-info/view-full-info.component';

@Component({
  selector: 'app-my-urls',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-urls.component.html',
})
export class MyUrlsComponent implements OnInit {
  constructor(
    private myUrlService: MyUrlsService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  openUpdateUrlDialog(id: number) {
    const dialogRef = this.dialog.open(UpdateUrlFormComponent, {
      width: '400px',
    });

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { updateUrlId: id },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

    dialogRef.afterClosed().subscribe((result: UpdateUrlRequestDto) => {
      if (result) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to update the URL?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3b82f6', // Tailwind blue-500
          cancelButtonColor: '#d1d5db', // Tailwind gray-300
          confirmButtonText: 'Yes, update it!',
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            this.updateUrl(result);
          }
        });
      } else {
        this.removeQueryParam();
      }
    });
  }

  openViewFullInfoUrlDialog(id: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { viewFullInfo: id },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

    this.getUrlFullInfo(id);
  }

  getUrlFullInfo(id: number): void {
    this.myUrlService.getUrlById(id).subscribe({
      next: (response: UrlResponseDto) => {
        const dialog = this.dialog.open(ViewFullInfoComponent, {
          width: '400px',
          data: response,
        });

        dialog.afterClosed().subscribe(() => {
          this.removeQueryParam();
        });
      },
    });
  }

  removeQueryParam(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
      replaceUrl: true,
    });
  }

  updateUrl(result: UpdateUrlRequestDto): void {
    this.isLoading.set(true);

    console.log(result);

    if (result.maxClick === null) result.maxClick = 0;

    this.myUrlService
      .updateUrl(result)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.removeQueryParam();
        })
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '✅ URL Updated Successfully',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#f0fdf4', // light green background
            color: '#15803d', // green text
          });

          this.getUrls();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: '❌ Update Failed',
            text:
              err?.error?.message ||
              'Something went wrong while updating the URL. Please try again.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#fef2f2', // light red background
            color: '#b91c1c', // red text
          });
        },
      });
  }

  ngOnInit(): void {
    this.getUrls();
  }

  getUrls(): void {
    this.isLoading.set(true);

    this.myUrlService.getUrls().subscribe({
      next: (response: MyUrl[]) => {
        this.urls = response;
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);

        if (err.status !== 401) {
          this.errorLoading(err);
        }
      },
    });
  }

  errorLoading(err: any): void {
    Swal.fire({
      icon: 'error',
      title: '🚫 Failed to Load URLs',
      text:
        err?.error?.message || 'Something went wrong while fetching your URLs.',
      confirmButtonText: 'Retry',
      confirmButtonColor: '#3b82f6', // Tailwind blue-500
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#9ca3af', // Tailwind gray-400
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.getUrls(); // Retry
      }
    });
  }

  redirectDomain = environment.REDIRECT_BASE_URL;

  isLoading = signal<boolean>(true);

  urls: MyUrl[] = [];

  page = 1;
  pageSize = 9;

  // Calculate the total number of pages
  get totalPages() {
    return Math.ceil(this.urls.length / this.pageSize);
  }

  // Get the URLs to display for the current page
  get paginatedUrls() {
    const start = (this.page - 1) * this.pageSize;
    return this.urls.slice(start, start + this.pageSize);
  }

  showDeleteModal(id: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete method here
        this.deleteUrl(id);
      }
    });
  }

  deleteUrl(id: number): void {
    this.isLoading.set(true);

    this.myUrlService.deleteUrl(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'URL Removed 🗑️',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#f0fdf4', // soft green background
          color: '#15803d', // green text
        });

        this.getUrls();
        this.isLoading.set(false);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Whoops 😬',
          text:
            error?.error?.message ||
            'Failed to delete the URL. Please try again.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#fef2f2', // soft red background
          color: '#b91c1c', // red text
        });

        console.error('Delete error:', error);
        this.isLoading.set(false);
      },
    });
  }

  // Go to next page
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  // Go to previous page
  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}

interface MyUrl {
  id: number;
  shortUrl: string;
  originalUrl: string;
  maxClicks: number;
}
