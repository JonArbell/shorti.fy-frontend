import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { FindEmailComponent } from './find-email/find-email.component';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { SendCodeComponent } from './send-code/send-code.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, FindEmailComponent, GenerateCodeComponent, SendCodeComponent, CreateNewPasswordComponent],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  constructor(
    private forgotPasswordService : ForgotPasswordService
  ){}
  

  public getEmail() : string {
    return this.forgotPasswordService.getEmail();
  }

  public hasGeneratedCode() : boolean{
    return this.forgotPasswordService.getHasGeneratedCode();
  }

  public isAuthorized() : boolean{
    return !!this.forgotPasswordService.getAuthorizedCode();
  }

}
