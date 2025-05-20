import { Component, Inject, OnInit, signal } from '@angular/core';
import { UpdateUrlFormComponent } from '../update-url-form/update-url-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UrlResponseDto } from '../../../../dto/url.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-full-info',
  imports: [CommonModule],
  templateUrl: './view-full-info.component.html',
})
export class ViewFullInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewFullInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UrlResponseDto
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

  isPasswordShow = signal<boolean>(false);

  clickShowPassword(): void {
    this.isPasswordShow.set(!this.isPasswordShow());
  }
}
