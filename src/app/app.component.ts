import { Component, OnInit, signal } from '@angular/core';
import { AuthenticatedBasePageComponent } from './authenticated/authenticated-base-page/authenticated-base-page.component';
import { AuthenticationBasePageComponent } from './authentication/authentication-base-page/authentication-base-page.component';
import { HeaderComponent } from './authenticated/header/header.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [AuthenticatedBasePageComponent, AuthenticationBasePageComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  isLoggedIn = signal(false);

  constructor(
    private authService : AuthenticationService,
    private router : Router
  ){}

  ngOnInit(): void {

    this.isLoggedIn.set(this.authService.getIsLoggedIn());

  }

}
