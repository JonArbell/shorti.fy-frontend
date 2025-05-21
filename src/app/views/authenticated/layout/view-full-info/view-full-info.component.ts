import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UrlResponseDto } from '../../../../dto/url.dto';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from 'ng-qrcode';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-full-info',
  imports: [CommonModule, QrCodeComponent],
  templateUrl: './view-full-info.component.html',
})
export class ViewFullInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewFullInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UrlResponseDto,
  ) {}
  ngOnInit(): void {
    this.urlFullInfo.set(this.data);
  }
  urlFullInfo = signal<UrlResponseDto>({
    id: 0,
    expirationDate: null,
    active: false,
    maxClick: null,
    originalUrl: '',
    password: '',
    shortUrl: '',
    totalClicked: null,
    visitorResponseDtoList: [],
  });

  redirectDomain = environment.REDIRECT_BASE_URL;

  isPasswordShow = signal<boolean>(false);

  clickShowPassword(): void {
    this.isPasswordShow.set(!this.isPasswordShow());
  }

  @ViewChild('qrCodeContainer', { static: false }) qrCodeContainer!: ElementRef;

  downloadQRCode() {
    const canvas: HTMLCanvasElement | null =
      this.qrCodeContainer.nativeElement.querySelector('canvas');
    if (!canvas) {
      console.error('Canvas not found!');
      return;
    }
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
  }
}
