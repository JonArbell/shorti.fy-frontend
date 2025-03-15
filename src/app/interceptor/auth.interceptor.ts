import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../security/services/authentication.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthenticationService);
  
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401){
        authService.logout()
        .subscribe({
          next : (response : any) =>{

            console.log(`Response : ${JSON.stringify(response)}`);
            authService.setLogOut();
          },
          error : (err : any) =>{
            console.error(`Response : ${JSON.stringify(err)}`);
          }
        });
      } else if (error.status === 0){
        authService.setLogOut();
      }
        
      return throwError(() => error);
    })
  );
};
