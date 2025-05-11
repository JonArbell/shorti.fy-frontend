import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/authentication/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)

  return next(req).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 401){
         Swal.fire({
          icon: 'error',
          title: 'Session expired',
          text: 'Please log in again.',
          showConfirmButton: true,
        }).then(() => {
          authService.removeAuth();
        })
      }

      return throwError(() => error);
    })
  );
};
