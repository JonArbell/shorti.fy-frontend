import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { FindEmailResponse } from '../../../models/email.dto';
import { NewPasswordRequest } from '../../../models/forgot-password.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private http : HttpClient,
    private router : Router
  ) { }

  private localHost : string = 'http://localhost:8080/api';

  public findEmail(email : string) : Observable<FindEmailResponse>{
    return this.http.get<FindEmailResponse>(`${this.localHost}/find-email/${email}`)
    .pipe(
      tap((response) => {
        this.setEmail(response.email);
      }),
      catchError((err) =>{
        this.setEmail('');
        throw new Error(err);
      })
    );
  }

  public generateCode(email : string) : Observable<any> {
    return this.http.post<any>(`${this.localHost}/generate-code`,{email : email})
    .pipe(
      tap((response) => {
        this.hasGeneratedCode.set(response.message === 'success');
      }),
      catchError((err) =>{
        this.hasGeneratedCode.set(false)
        throw new Error(err);
      })
    );
  }

  public submitNewPassword(newPasswordRequest : NewPasswordRequest) : Observable<any> {
    return this.http.put<any>(`${this.localHost}/forgot-password?code=${this.getAuthorizedCode()}`,newPasswordRequest)
    .pipe(
      tap((response) =>{
        if(response.isPasswordChanged)
          this.router.navigate(['/']);
      })
    );
  }

  public sendCode(code : string, email : string ) : Observable<any>{
    return this.http.post<any>(`${this.localHost}/forgot-password/${email}`,{code : code});
  }

  private authorizedCode = signal('');

  public setAuthorizedCode(code : string) : void{
    this.authorizedCode.set(code);
  }

  public getAuthorizedCode() : string{
    return this.authorizedCode();
  }

  private email = signal('');
  
  public setEmail(email : string) : void{
    this.email.set(email);
  }

  public getEmail() : string{
    return this.email();
  }

  private hasGeneratedCode = signal(false);

  public getHasGeneratedCode() : boolean{
    return this.hasGeneratedCode();
  }


}
