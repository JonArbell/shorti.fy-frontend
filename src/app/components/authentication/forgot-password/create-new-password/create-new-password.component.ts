import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password.service';

@Component({
  selector: 'app-create-new-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-new-password.component.html'
})
export class CreateNewPasswordComponent {

  constructor(
        private forgotPasswordService : ForgotPasswordService
  ){}

  password : string = "";

  confirmPassword : string = "";

  public submitNewPassword() : void{

  }


}
