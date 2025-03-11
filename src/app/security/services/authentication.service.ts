import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../../models/login.dto';

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
    return this.isLoggedIn();
  }

  public logIn(body : LoginDTO) : Observable<any>{
    return this.httpClient.post<any>(`${this.localHost}/api/authentication/login`,body);
  }

}
