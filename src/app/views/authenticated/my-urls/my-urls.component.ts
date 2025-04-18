import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-urls',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-urls.component.html',
})
export class MyUrlsComponent {

  urls: MyUrl[] = [
    { id: 1, shortUrl: 'goo.gl', originalUrl: 'https://google.com', maxClicks: 150 },
    { id: 2, shortUrl: 'fb.com', originalUrl: 'https://facebook.com', maxClicks: 300 },
    { id: 3, shortUrl: 'twtr.com', originalUrl: 'https://twitter.com', maxClicks: 50 },
    { id: 4, shortUrl: 'insta.com', originalUrl: 'https://instagram.com', maxClicks: 400 },
    { id: 5, shortUrl: 'lnkd.in', originalUrl: 'https://linkedin.com', maxClicks: 75 },
    { id: 6, shortUrl: 'yt.be', originalUrl: 'https://youtube.com', maxClicks: 120 },
    { id: 7, shortUrl: 'github.io', originalUrl: 'https://github.com', maxClicks: 90 },
    { id: 8, shortUrl: 'reddit.com', originalUrl: 'https://reddit.com', maxClicks: 60 },
    { id: 9, shortUrl: 'pin.it', originalUrl: 'https://pinterest.com', maxClicks: 200 },
    { id: 10, shortUrl: 'snap.ly', originalUrl: 'https://snapchat.com', maxClicks: 110 },
    { id: 11, shortUrl: 'spoti.fi', originalUrl: 'https://spotify.com', maxClicks: 80 },
    { id: 12, shortUrl: 'netf.li', originalUrl: 'https://netflix.com', maxClicks: 220 }
  ];

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
  deleteUrl(id: number) {
    alert(`Deleted URL with ID: ${id}`);
  }

  updateUrl(id: number) {
    alert(`Updated URL with ID: ${id}`);
  }

  viewFullInfo(id: number) {
    alert(`View full info for URL with ID: ${id}`);
  }
}

interface MyUrl{
  id : number
  shortUrl : string
  originalUrl : string
  maxClicks : number
}
