import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-authenticated-base',
  imports: [
    RouterOutlet,
    FooterComponent,
    SideNavComponent,
    HeaderComponent,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './authenticated-base.component.html',
})
export class AuthenticatedBaseComponent {}
