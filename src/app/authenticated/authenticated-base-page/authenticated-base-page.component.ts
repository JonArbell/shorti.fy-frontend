import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-authenticated-base-page',
  imports: [RouterOutlet,HeaderComponent,SideNavComponent, FooterComponent],
  templateUrl: './authenticated-base-page.component.html'
})
export class AuthenticatedBasePageComponent {

}
