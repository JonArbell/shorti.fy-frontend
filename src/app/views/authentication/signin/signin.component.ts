import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: [
        'arbell_lopit@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['angaslopit', [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn(): void {
    const email = this.form.get('email');

    const password = this.form.get('password');

    console.log(`Email : ${email?.value}\nPass : ${password?.value}`);

    if (
      email?.value === 'arbell_lopit@gmail.com' &&
      password?.value === 'angaslopit'
    ) {
      this.authService.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
    }
  }
}
