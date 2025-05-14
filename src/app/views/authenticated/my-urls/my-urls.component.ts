import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyUrlsService } from './my-urls.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-urls',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-urls.component.html',
})
export class MyUrlsComponent implements OnInit {
  constructor(private myUrlService: MyUrlsService) {}

  ngOnInit(): void {
    this.getUrls();
  }

  getUrls(): void {
    this.myUrlService.getUrls().subscribe({
      next: (response: MyUrl[]) => {
        this.urls = response;
        this.isLoading.set(false);
      },
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
    this.myUrlService.deleteUrl(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'URL Deleted',
          text: 'The URL has been successfully removed from your list.',
          timer: 2000,
          showConfirmButton: false,
        });

        this.getUrls();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Deletion Failed',
          text: 'Something went wrong while trying to delete the URL. Please try again.',
        });
        console.error('Delete error:', error);
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

  // Action handlers

  updateUrl(id: number) {
    alert(`Updated URL with ID: ${id}`);
  }

  viewFullInfo(id: number) {
    alert(`View full info for URL with ID: ${id}`);
  }
}

interface MyUrl {
  id: number;
  shortUrl: string;
  originalUrl: string;
  maxClicks: number;
}
