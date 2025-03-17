import { Component } from '@angular/core';
import { ForgotPasswordService } from '../forgot-password.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-send-code',
  imports: [FormsModule, RouterLink],
  templateUrl: './send-code.component.html'
})
export class SendCodeComponent {

  constructor(
      private forgotPasswordService : ForgotPasswordService
  ){}

  codeModel : string = "";

  public sendCode() : void{
    
    this.forgotPasswordService.sendCode(this.codeModel, this.forgotPasswordService.getEmail())
    .pipe(
          tap((response : any) =>{
            if(response.isAuthorized){
              this.forgotPasswordService.setAuthorizedCode(this.codeModel);
            }
          }),
          catchError((err) => {
            this.forgotPasswordService.setAuthorizedCode('');
            throw new Error(err);
          })
    ).subscribe({
      next : (response) =>{
        console.log(response);
      },
      error : (err) =>{
        console.error(err);
      }
    });
  }
}
