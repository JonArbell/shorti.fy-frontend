import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // ✅ correct way
import { AuthService } from '../services/authentication/auth.service';
import Swal from 'sweetalert2';

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');

  const authService = inject(AuthService);

  if (token) {
    try {
      const decoded: any = jwtDecode(token);

      const isExpired = Date.now() / 1000 > decoded.exp;

      if (decoded.scope === 'USER' && !isExpired) {
        return true;
      }

      if (isExpired) {
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again to continue.',
          confirmButtonText: 'Log In',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed || result.dismiss) authService.removeAuth();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: "You don't have permission to access this page.",
          confirmButtonText: 'Go Back',
          allowOutsideClick: false,
        });
      }

      authService.removeAuth();
      return false;
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Session Error',
        text: 'Your session is invalid or has expired. Please log in again.',
        confirmButtonText: 'Go to Login',
      });
      authService.removeAuth();
      return false;
    }
  }

  Swal.fire({
    icon: 'warning',
    title: 'Not Logged In',
    text: 'Please log in to continue.',
  });

  authService.removeAuth();
  return false;
};
