import { Component, effect, signal } from '@angular/core';
import { AuthenticationBaseComponent } from './views/authentication/authentication-base/authentication-base.component';
import { AuthService } from './services/authentication/auth.service';
import { AuthenticatedBaseComponent } from './views/authenticated/authenticated-base/authenticated-base.component';

@Component({
  selector: 'app-root',
  imports: [AuthenticationBaseComponent, AuthenticatedBaseComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isAuthenticated = signal<boolean>(false);

  constructor(private authService: AuthService) {
    this.isAuthenticated.set(this.authService.isAuthenticated());

    // Automatically update the UI when the login state changes
    effect(() => {
      this.isAuthenticated.set(this.authService.isAuthenticated());
    });
  }
}
