import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { LoginRequestDTO } from '../../dtos/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn = signal(false);

  private localHost : string = 'http://localhost:8080';

  constructor(
    private httpClient : HttpClient
  ) { }

  public getIsLoggedIn() : boolean{
    return !this.isLoggedIn();
  }

  public logout() : void{
    localStorage.removeItem('jwtToken');
  }

  public setToken(token : string) : void{
    localStorage.setItem('jwtToken',token);
  }


  public logIn(body : LoginRequestDTO) : Observable<any>{
    return this.httpClient
    .post<any>(`${this.localHost}/api/authentication/login`,body)
    .pipe(shareReplay(1));
  }

}
