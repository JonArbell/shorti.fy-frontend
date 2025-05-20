import { Component, signal } from '@angular/core';
import { UpdateUrlFormComponent } from '../update-url-form/update-url-form.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-full-info',
  imports: [],
  templateUrl: './view-full-info.component.html',
})
export class ViewFullInfoComponent {
  constructor(public dialogRef: MatDialogRef<ViewFullInfoComponent>) {}

  isPasswordShow = signal<boolean>(false);

  clickShowPassword(): void {
    this.isPasswordShow.set(!this.isPasswordShow());
  }
}
