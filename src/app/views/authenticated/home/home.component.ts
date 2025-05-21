import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { ShortenUrlRequest } from '../../../dto/url.dto';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private homeService: HomeService) {}

  requestDto = signal<ShortenUrlRequest>({
    maxClick: null,
    originalUrl: '',
    password: '',
    expirationDate: null,
  });

  isAdvancedOptionsClicked = signal<boolean>(false);

  clickAdvancedOption(): void {
    this.isAdvancedOptionsClicked.set(!this.isAdvancedOptionsClicked());
  }

  isLoading = signal<boolean>(false);

  result = signal('No result yet');

  shortenUrl(): void {
    if (this.requestDto().originalUrl.length === 0) return;

    this.isLoading.set(true);

    if (this.requestDto().maxClick === null) this.requestDto().maxClick = 0;

    this.homeService
      .shortenUrl(this.requestDto())
      .pipe(
        finalize(() => {
          this.requestDto.set({
            maxClick: null,
            originalUrl: '',
            password: '',
            expirationDate: null,
          });

          this.isLoading.set(false);
          this.isAdvancedOptionsClicked.set(false);
        }),
      )
      .subscribe({
        next: (response: any) => {
          // Success toast
          Swal.fire({
            icon: 'success',
            title: 'URL Shortened 🎉',
            text: 'Short link copied to clipboard!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#f0fdf4',
            color: '#15803d',
          });

          navigator.clipboard.writeText(
            `${this.domain()}/${response.shortUrl}`,
          );

          this.result.set(response.shortUrl);
        },
        error: (err: any) => {
          // Error toast
          Swal.fire({
            icon: 'error',
            title: 'Oops! Something went wrong 😬',
            text: err?.error?.message || 'Invalid URL format. Try again.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#fef2f2',
            color: '#b91c1c',
          });

          this.isLoading.set(false);
        },
      });
  }

  showAdvancedOptions = signal<boolean>(false);

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
