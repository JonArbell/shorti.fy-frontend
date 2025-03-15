import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { first, Observable, shareReplay } from 'rxjs';
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

  public setLogIn(token : string) : void{
    localStorage.setItem('jwtToken',token);
    this.isLoggedIn.set(true);
    this.router.navigate(['/home']);
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
    .pipe(first());
  }
 
  public logIn(body : LoginRequestDTO) : Observable<LogInResponse>{
    return this.httpClient
    .post<LogInResponse>(`${this.localHost}/api/authentication/login`,body)
    .pipe(first());
  }

}
