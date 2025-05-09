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

    if(email?.invalid && password?.invalid){
      Swal.fire({
        icon : 'error',
        title : 'Oops',
        text : 'Please enter valid email and password'
      });
    }

    const form = {
      "email" : email?.value,
      "password" : password?.value
    }

    this.authService.login(form)
    .subscribe({
      next : (response : any) =>{

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome, ${response.username}!`, // Customize with user's name if available
          showConfirmButton: false,
          timer: 1500 
        });
        
        this.authService.setAut(response.token);
        this.router.navigate(['/dashboard']);
      },
      error : (err : any) =>{
        Swal.fire({
          icon : 'error',
          title : 'Oops',
          text : err.message
        })
      }
    });

  }
}
