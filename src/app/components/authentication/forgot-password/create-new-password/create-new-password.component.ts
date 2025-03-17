import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password.service';
import { NewPasswordRequest } from '../../../../models/forgot-password.dto';

@Component({
  selector: 'app-create-new-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-new-password.component.html'
})
export class CreateNewPasswordComponent {

  constructor(
        private forgotPasswordService : ForgotPasswordService
  ){}

  createNewPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public submitNewPassword() : void{
    
    const passwordValue = this.createNewPasswordForm.controls.password.value;
    const confirmPassword = this.createNewPasswordForm.controls.confirmPassword.value;

    if(passwordValue === confirmPassword && this.createNewPasswordForm.valid){

      const newPasswordRequest : NewPasswordRequest = {
        password : passwordValue!,
        email : this.forgotPasswordService.getEmail()
      }

      this.forgotPasswordService.submitNewPassword(newPasswordRequest)
      .subscribe({
        next : (response) =>{
          console.log(response);

          if(response.isPasswordChanged)
            alert('Your password has been successfully changed! You can now log in with your new password.');

        },
        error : (err) =>{
          console.error(err);
        }
      });
    }

  }

  public backToLoginWithPassword() : void{
    this.forgotPasswordService.setEmail('');
    this.forgotPasswordService.setGeneratedCode(false);
    this.forgotPasswordService.setAuthorizedCode('');
  }

}
