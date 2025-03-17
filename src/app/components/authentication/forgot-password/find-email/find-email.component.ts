import { Component } from '@angular/core';
import { ForgotPasswordService } from '../forgot-password.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-find-email',
  imports: [FormsModule, RouterLink],
  templateUrl: './find-email.component.html'
})
export class FindEmailComponent {

  constructor(
      private forgotPasswordService : ForgotPasswordService
  ){}

  email : string = "";

  public findEmail() : void{
    this.forgotPasswordService.findEmail(this.email)
    .subscribe({
      next : (response) =>{

        console.log(response);

      },
      error : (err : any) =>{
        console.error(err);
      }
    });
  }

}
