import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/authentication/auth.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        Swal.fire({
          icon: 'warning',
          title: '⏳ Session Expired',
          html: `
            <p class="text-sm text-gray-600">
              For security reasons, your session has expired. <br/>
              Please log in again to continue.
            </p>
          `,
          confirmButtonText: 'Okay',
          confirmButtonColor: '#3b82f6', // Tailwind blue-500
          background: '#fff',
          color: '#111827', // Tailwind gray-900
          backdrop: `
            rgba(0, 0, 0, 0.4)
            left top
            no-repeat
          `,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          authService.removeAuth();
          // Optionally redirect to login page here
        });
      }

      return throwError(() => error);
    })
  );
};
