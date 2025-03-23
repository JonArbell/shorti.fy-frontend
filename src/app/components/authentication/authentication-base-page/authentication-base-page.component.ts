import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-base-page',
  imports: [RouterOutlet],
  templateUrl: './authentication-base-page.component.html'
})
export class AuthenticationBasePageComponent implements OnInit{

  ngOnInit(): void {
    // localStorage.setItem('jwtToken','');
  }

}
