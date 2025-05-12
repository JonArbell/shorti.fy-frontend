import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyUrlsService } from './my-urls.service';

@Component({
  selector: 'app-my-urls',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-urls.component.html',
})
export class MyUrlsComponent implements OnInit{

  constructor(
    private myUrlService : MyUrlsService
  ){

  }

  ngOnInit(): void {
    this.getUrls();
    
  }

  getUrls() : void{
    this.myUrlService.getUrls()
    .subscribe({
      next : (response : MyUrl[])=>{
        this.urls = response;
        this.isLoading.set(false);
      }
    });
  }

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
