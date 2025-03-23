import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, first, Observable, tap, throwError } from 'rxjs';
import { LoginRequestDTO, LogInResponse } from '../../models/login.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private localHost : string = 'http://localhost:8080';

  private isLoggedIn = signal(!!localStorage.getItem('jwtToken'));

  constructor(
    private httpClient : HttpClient,
    private router : Router
  ) { }

  public getIsLoggedIn() : boolean{
    return this.isLoggedIn();
  }

  public setLogOut() : void{
    localStorage.removeItem('jwtToken');
    this.isLoggedIn.set(false);
    this.router.navigate(['/']);
  }

  public logout() : Observable<any>{

    const token = localStorage.getItem('jwtToken');

    const panis = {token : token};

    console.log(`Panis : ${panis}`);

    return this.httpClient.post<any>(`${this.localHost}/api/authenticated/logout`,panis)
    .pipe(
      first()
    );
  }
 
  public logIn(body : LoginRequestDTO) : Observable<LogInResponse>{
    return this.httpClient
    .post<LogInResponse>(`${this.localHost}/api/authentication/login`,body)
    .pipe(
      first(),
      tap((response) =>{

        localStorage.setItem('jwtToken',response.jwtToken);
        this.isLoggedIn.set(true);
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
