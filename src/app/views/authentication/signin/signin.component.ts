import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
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

    if(email?.invalid && password?.invalid){
      Swal.fire({
        icon : 'error',
        title : 'Oops',
        text : 'Please enter valid email and password'
      });
      return;
    }

    const form = {
      "email" : email?.value,
      "password" : password?.value
    }

    this.authService.login(form)
    .subscribe({
      next : (response : any) =>{

        const token = response.token;

        const username : any = jwtDecode(token).sub;

        const role : any = jwtDecode(token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome, ${username}!`,
          showConfirmButton: false,
          timer: 2000 
        });
        
        this.authService.setAut(token, role.scope);

      },
      error : (err : any) =>{

        console.log(err.message)

        Swal.fire({
          icon : 'error',
          title : 'Oops',
          text : err.error.UsernameNotFoundException??'Something went wrong!'
        })
      }
    });

  }
}
