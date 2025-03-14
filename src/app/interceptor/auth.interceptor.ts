import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../security/services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthenticationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 0) 
        authService.logout();

      return throwError(() => error);
    })
  );
};
