import { Component, Inject, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // If using [(ngModel)]
import {
  ShortenUrlRequest,
  UpdateUrlRequestDto,
} from '../../../../dto/url.dto';
import { MyUrlsService } from '../../my-urls/my-urls.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-update-url-form',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './update-url-form.component.html',
  styleUrls: ['update-url-form-component.css'],
})
export class UpdateUrlFormComponent implements OnInit {
  updateUrlRequest = signal<UpdateUrlRequestDto>({
    expirationDate: null,
    password: '',
    originalUrl: '',
    id: 0,
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateUrlFormComponent>,
    private myUrlService: MyUrlsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      const id = params['updateUrlId'];
      if (id) {
        this.getUrlById(id);
      }
    });
  }

  isPasswordShow = signal<boolean>(false);

  clickShowPassword(): void {
    this.isPasswordShow.set(!this.isPasswordShow());
  }

  save() {
    this.dialogRef.close(this.updateUrlRequest()); // Send back the entered URL
  }

  cancel() {
    this.dialogRef.close();
    this.isPasswordShow.set(false);
    this.updateUrlRequest.set({
      expirationDate: null,
      password: '',
      originalUrl: '',
      id: 0,
    });
  }

  isAdvancedOptionsClicked = signal<boolean>(false);

  clickAdvancedOption(): void {
    this.isAdvancedOptionsClicked.set(!this.isAdvancedOptionsClicked());
  }

  getUrlById(id: number): void {
    this.myUrlService.getUrlById(id).subscribe({
      next: (response) => {
        this.updateUrlRequest.set(response);
      },
    });
  }
}
