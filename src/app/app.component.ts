import { Component, effect, inject, signal } from '@angular/core';
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
export class AppComponent {

  isLoggedIn = signal(false);

  authService = inject(AuthenticationService)

  constructor() {
    // Initialize the signal with the current authentication state
    this.isLoggedIn.set(this.authService.getIsLoggedIn());

    // Automatically update the UI when the login state changes
    effect(() => {
      this.isLoggedIn.set(this.authService.getIsLoggedIn());
    });
  }

}
