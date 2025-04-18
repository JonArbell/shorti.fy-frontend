import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
@Component({
  selector: 'app-side-nav',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {

  constructor(
    private authService : AuthService
  ){}


  logout() : void{
    this.authService.logout();
  }

}
