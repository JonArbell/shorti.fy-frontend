import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LogoutService } from './logout.service';

@Component({
  selector: 'app-logout',
  imports: [CommonModule],
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  private logoutService = inject(LogoutService);

  isLogoutClicked = signal(false);

  ngOnInit(): void {
    this.isLogoutClicked.set(true);
    console.log("Logout component initialized");
  }

  closeLogoutForm() : void{
    this.isLogoutClicked.set(false);
    this.logoutService.closeLogoutForm();
  }

  clickYes() : void{
    this.logoutService.logout().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
