import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../security/services/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { LoginRequestDTO, LogInResponse } from '../../../dtos/login.dto';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  private authService = inject(AuthenticationService);

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  
  public login() : void{

    const loginDTO = this.signinForm.getRawValue() as LoginRequestDTO;

    this.authService
      .logIn(loginDTO)
      .pipe(first())
      .subscribe({
        next : (response : LogInResponse) =>{

          this.authService.setToken(response.jwtToken);

        },
        error : (error : any) =>{
          console.error(error);
        }
      });

  }

}
