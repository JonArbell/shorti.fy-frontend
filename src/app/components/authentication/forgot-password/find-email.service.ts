import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { FindEmailResponse } from '../../../models/email.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FindEmailService {

  constructor(
    private http : HttpClient,
    private router : Router
  ) { }

  private localHost : string = 'http://localhost:8080';

  public findEmail(email : string) : Observable<FindEmailResponse>{
    return this.http.get<FindEmailResponse>(`${this.localHost}/api/find-email/${email}`);
  }

  public generateCode(email : string) : Observable<any> {
    return this.http.post<any>(`${this.localHost}/api/generate-code`,{email : email})
    .pipe(
      tap((response) =>{

        if(response.message === 'success'){
          this.router.navigate(['/']);
        }

      }),
      catchError((error) => {
        throw Error(error);
      })
    );
  }

}
