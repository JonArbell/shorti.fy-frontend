import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../security/services/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestDTO, LogInResponse } from '../../../models/login.dto';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit{
  
  ngOnInit(): void {
    // localStorage.removeItem('jwtToken');
  }

  private authService = inject(AuthenticationService);

  signinForm = new FormGroup({
    email: new FormControl('test.this.email@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('asdsdfsdf', [Validators.required, Validators.minLength(8)]),
  });
  
  public login() : void{

    const loginDTO = this.signinForm.getRawValue() as LoginRequestDTO;

    this.authService
      .logIn(loginDTO)
      .subscribe();

  }

}
