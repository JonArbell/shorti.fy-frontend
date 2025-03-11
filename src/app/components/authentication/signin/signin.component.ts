import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../security/services/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO } from '../../../models/login.dto';
import { first } from 'rxjs';

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

    const loginDTO = this.signinForm.getRawValue() as LoginDTO;

    // this.authService
    //   .logIn(loginDTO)
    //   .pipe(first())
    //   .subscribe({
    //     next : (response : any) =>{

    //       console.log(response);

    //     },
    //     error : (error : any) =>{
    //       console.error(error);
    //     }
    //   });

    console.log(loginDTO);

  }

}
