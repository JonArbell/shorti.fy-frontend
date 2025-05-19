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
  constructor(private homeService: HomeService) {}

  longUrl = signal<string>('');

  isLoading = signal<boolean>(false);

  result = signal('No result yet');

  shortenUrl(): void {
    if (this.longUrl().length === 0) return;

    const form: ShortenUrlRequest = {
      originalUrl: this.longUrl(),
    };

    this.isLoading.set(true);

    this.homeService.shortenUrl(form).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'URL Shortened 🎉',
          html: `Your link is ready: <br><strong>${response.shortUrl}</strong>`,
          confirmButtonText: 'Copy & Close',
          confirmButtonColor: '#3b82f6',
        }).then(() => {
          navigator.clipboard.writeText(
            `${this.domain()}/${response.shortUrl}`
          );
        });

        this.isLoading.set(false);

        this.result.set(response.shortUrl);

        this.longUrl.set('');
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid URL Format',
          text: err.error.message,
          confirmButtonText: 'Got it!',
        });

        this.isLoading.set(false);
      },
    });
  }

  domain(): string {
    const baseUrl = environment.AUTHENTICATED_BASE_URL;

    return `${baseUrl.slice(0, baseUrl.indexOf('/api'))}`;
  }

  isClicked = signal<boolean>(false);

  copyLink(event: Event): void {
    const text = (event.target as HTMLButtonElement).innerText;

    if (this.result() === 'No result yet') return;

    navigator.clipboard.writeText(`${this.domain()}/${text}`).then(() => {
      this.isClicked.set(true);
    });
  }
}
