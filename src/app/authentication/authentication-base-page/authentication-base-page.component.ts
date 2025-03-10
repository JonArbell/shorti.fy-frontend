import { Component } from '@angular/core';
import { SigninSignupComponent } from '../signin-signup/signin-signup.component';

@Component({
  selector: 'app-authentication-base-page',
  imports: [SigninSignupComponent],
  templateUrl: './authentication-base-page.component.html'
})
export class AuthenticationBasePageComponent {

}
