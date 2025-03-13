import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { LoginRequestDTO } from '../../dtos/login.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private localHost : string = 'http://localhost:8080';

  private isLoggedIn = signal(false);

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

  public logout() : void{
    localStorage.removeItem('jwtToken');
    this.isLoggedIn.set(false);
    this.router.navigate(['/']);
  }
 
  public logIn(body : LoginRequestDTO) : Observable<any>{
    return this.httpClient
    .post<any>(`${this.localHost}/api/authentication/login`,body)
    .pipe(shareReplay(1));
  }

}
