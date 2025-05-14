import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { ShortenUrlRequest } from '../../../dto/url.dto';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private homeService : HomeService
  ){}

  longUrl: string = '';

  isLoading = signal<boolean>(false);

  result = signal('No result yet');

  shortenUrl(): void {
    
    if(this.longUrl.length === 0) return;

    const form : ShortenUrlRequest = {
      originalUrl : this.longUrl
    }

    this.isLoading.set(true)

    this.homeService.shortenUrl(form)
    .subscribe({
      next : (response : any) =>{
        Swal.fire({
          icon: 'success',
          title: 'Shortened URL!',
          text: 'Successfully shortened the url!',
          timer: 2000,
          showConfirmButton: false
        });
        this.isLoading.set(false)
        this.result.set(response.shortUrl)
      },
      error : (err : any) =>{

        if('Invalid URL format' === err.error.error){
          Swal.fire({
          icon: 'error',
          title: 'Invalid URL Format',
          text: 'Please enter a valid URL starting with http:// or https://',
          confirmButtonText: 'Got it!',
        });
        }

        this.isLoading.set(false)
      }
    });
    
  }

  isClicked = signal<boolean>(false);

  copyLink(event: Event): void {
    const text = (event.target as HTMLButtonElement).innerText;

    if (this.result() === 'No result yet') return;

    const baseUrl = environment.AUTHENTICATED_BASE_URL;

    navigator.clipboard.writeText(`${baseUrl.slice(0,baseUrl.indexOf('/api'))}/${text}`).then(() => {
      this.isClicked.set(true);
    });
  }
}
