import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  ngOnInit(): void {
    // if(!localStorage.getItem('jwtToken'))
    //   window.location.href = '/';
  }

  // urlHomeService = inject(UrlHomeService);

  longUrl: string = '';

  result = signal('No result yet');

  shortenUrl(): void {
    console.log(`Long url : ${this.longUrl}`);

    // if(this.longUrl !== '' || this.longUrl !== null)
    //   this.urlHomeService.shortenUrl(this.longUrl)
    //   .subscribe({
    //     next : (response : any) =>{
    //       this.result.set(response.shortUrl);
    //     },
    //     error : (err : any) =>{
    //       console.error(JSON.stringify(err));
    //     }
    //   });
  }

  public isClicked = false;

  private timeOutId: any;

  public copyLink(event: Event): void {
    const text = (event.target as HTMLButtonElement).innerText;

    if (this.result() === 'No result yet') return;

    navigator.clipboard.writeText(text).then(() => {
      this.isClicked = true;
    });
  }
}
