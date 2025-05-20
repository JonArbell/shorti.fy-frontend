import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { AuthService } from '../services/authentication/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const autService = inject(AuthService);

  try {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded: any = jwtDecode(token);

      const isExpired = Date.now() / 1000 > decoded.exp;

      console.log(isExpired);

      if (!isExpired) {
        router.navigate(['/dashboard']);
        return false;
      }

      autService.removeAuth();
    }
  } catch (e: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: e.message,
    });
  }

  return true;
};
