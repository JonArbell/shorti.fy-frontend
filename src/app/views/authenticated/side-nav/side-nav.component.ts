import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {}
