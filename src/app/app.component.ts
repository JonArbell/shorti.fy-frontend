import { Component, effect, inject, signal } from '@angular/core';
import { AuthenticatedBasePageComponent } from './components/authenticated/authenticated-base-page/authenticated-base-page.component';
import { AuthenticationBasePageComponent } from './components/authentication/authentication-base-page/authentication-base-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthenticationService } from './security/services/authentication.service';
import { FooterComponent } from './components/footer/footer.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AuthenticatedBasePageComponent, AuthenticationBasePageComponent, HeaderComponent, FooterComponent, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isLoggedIn = signal(false);

  private authService = inject(AuthenticationService);

  private titleService = inject(Title);
  
  private activatedRoute = inject(ActivatedRoute);

  private router = inject(Router);

  constructor() {
    // Initialize the signal with the current authentication state
    this.isLoggedIn.set(this.authService.getIsLoggedIn());

    // Automatically update the UI when the login state changes
    effect(() => {
      this.isLoggedIn.set(this.authService.getIsLoggedIn());
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data['title'] || 'Shorti.fy - login or sign up';
      })
    )
    .subscribe(title => 
      this.titleService.setTitle(title));

  }

}
