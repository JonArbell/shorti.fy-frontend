import { Component, effect, Signal, signal } from '@angular/core';
import { AuthenticationBaseComponent } from './views/authentication/authentication-base/authentication-base.component';

import { AuthenticatedBaseComponent } from './views/authenticated/authenticated-base/authenticated-base.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/authentication/auth.service';
import { RouterOutlet } from '@angular/router';
import { ExpiredUrlService } from './services/expired-url/expired-url.service';


@Component({
  selector: 'app-root',
  imports: [AuthenticationBaseComponent, AuthenticatedBaseComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isAuthenticated!: Signal<boolean>;

  constructor(
    private authService: AuthService,
    private expiredUrlService : ExpiredUrlService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.isRouteInExpiredUrl = this.expiredUrlService.isRouteInExpiredUrl;
  }

  isRouteInExpiredUrl!: Signal<boolean>;


}


