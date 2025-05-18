import { Component, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // If using [(ngModel)]

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
export class UpdateUrlFormComponent {
  url = signal<string>('');

  constructor(public dialogRef: MatDialogRef<UpdateUrlFormComponent>) {}

  save() {
    this.dialogRef.close(this.url()); // Send back the entered URL
  }

  cancel() {
    this.dialogRef.close(); // Just close without saving
  }
}
