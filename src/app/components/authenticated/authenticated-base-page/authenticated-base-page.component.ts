import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authenticated-base-page',
  imports: [RouterOutlet,SideNavComponent],
  templateUrl: './authenticated-base-page.component.html'
})
export class AuthenticatedBasePageComponent {

}
