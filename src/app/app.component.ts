import { Component, OnInit, signal } from '@angular/core';
import { AuthenticatedBasePageComponent } from './components/authenticated/authenticated-base-page/authenticated-base-page.component';
import { AuthenticationBasePageComponent } from './components/authentication/authentication-base-page/authentication-base-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthenticationService } from './security/services/authentication.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [AuthenticatedBasePageComponent, AuthenticationBasePageComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  isLoggedIn = signal(false);

  constructor(
    private authService : AuthenticationService
  ){}

  ngOnInit(): void {

    this.isLoggedIn.set(this.authService.getIsLoggedIn());

  }

}
