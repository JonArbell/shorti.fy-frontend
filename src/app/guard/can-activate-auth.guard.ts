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

      // console.log(decoded)

      if (decoded.scope === 'USER') {
        return true;
      }

      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You\'re not allowed.',
        confirmButtonText: 'Go Back'
      }).then(() => {
        authService.removeAuth(); 
      });

      return false;

    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Session Error',
        text: 'Your session is invalid or has expired. Please log in again.',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        authService.removeAuth(); 
      });
      return false;
    }
  }

  Swal.fire({
    icon: 'warning',
    title: 'Not Logged In',
    text: 'Please log in to continue.',
  }).then(() => {
    authService.removeAuth();

  });

  return false;
};

