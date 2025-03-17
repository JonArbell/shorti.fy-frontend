import { Component } from '@angular/core';
import { ForgotPasswordService } from '../forgot-password.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generate-code',
  imports: [RouterLink],
  templateUrl: './generate-code.component.html'
})
export class GenerateCodeComponent {

  constructor(
      private forgotPasswordService : ForgotPasswordService
  ){}

  public backToginWithPassword() : void{
    
  }

  public getEmail() : string{
    return this.forgotPasswordService.getEmail();
  }

  public generateCode() : void{
    this.forgotPasswordService.generateCode(this.forgotPasswordService.getEmail())
    .subscribe({
      next : (response) =>{
        console.log(response);
      },
      error : (err) =>{
        console.error(err);
      }
    });
  }
}
