import { Component } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-base',
  imports: [RouterOutlet],
  templateUrl: './authentication-base.component.html',
})
export class AuthenticationBaseComponent {}
