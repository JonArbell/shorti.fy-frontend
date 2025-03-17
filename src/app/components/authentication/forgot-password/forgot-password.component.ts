import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FindEmailService } from './find-email.service';
import { FormsModule } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';
import { FindEmailResponse } from '../../../models/email.dto';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  constructor(
    private findEmailService : FindEmailService
  ){}
  
  email : string = "";

  getEmail = signal("");

  public backToginWithPassword() : void{
    this.getEmail.set("");
  }

  public findEmail() : void{
    this.findEmailService.findEmail(this.email)
    .subscribe({
      next : (response : any) =>{

        this.getEmail.set(response.email);

      },
      error : (err : any) =>{
        console.error(err);
      }
    });
  }

  public generateCode() : void{
    this.findEmailService.generateCode(this.getEmail())
    .subscribe({
      next : (response) =>{
        console.log(response);
      },
      error : (err) =>{
        console.log(err);
      }
    });
  }

}
