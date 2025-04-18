import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  lastScrollTop = 0; // To store the last scroll position
  isMobileView: boolean = false;

  constructor() {}

  ngOnInit() {
    // Check if the device is mobile (sm or smaller)
    this.isMobileView = window.innerWidth <= 640; // sm breakpoint is 640px
  }

  // Detect window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = window.innerWidth <= 640;
  }

  // Detect scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (!this.isMobileView) return; // Skip if not on mobile

    const header = document.getElementById('header')!;
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      // If scrolling down, hide the header
      header.classList.add('transform', '-translate-y-full');
    } else {
      // If scrolling up, show the header
      header.classList.remove('transform', '-translate-y-full');
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Avoid negative scroll position
  }
}
