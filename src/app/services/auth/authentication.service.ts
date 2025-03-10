import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn : boolean = false;

  constructor() { }

  public getIsLoggedIn() : boolean{
    return this.isLoggedIn;
  }

}
