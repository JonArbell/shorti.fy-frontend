import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private http : HttpClient,
    private location : Location,
    private router : Router
  ) { }

  private localHost : string = 'http://localhost:8080';

  
  logout() : Observable<any>{
    return this.http.post<any>(`${this.localHost}/api/authenticated/logout`, {token : localStorage.getItem('jwtToken')})
    .pipe(
      tap((response) => {

        if(response.message === 'success'){
          localStorage.removeItem('jwtToken');
          this.router.navigate(['/home']);
        }
      })
    );
  }


  closeLogoutForm() : void{
    this.location.back();
  }

}
