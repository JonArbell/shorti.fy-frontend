import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Login } from '../../dto/login.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  setAut(token: string, role: string): void {
    // console.log(token)
    localStorage.setItem('token', token);

    if (role === 'USER') {
      this.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
    }
  }

  removeAuth() {
    localStorage.clear();
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  logout(): void {
    Swal.fire({
      title: '🔒 Log Out?',
      text: 'You’re about to log out. Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6', // Tailwind blue-500
      cancelButtonColor: '#9ca3af', // Tailwind gray-400
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Cancel',
      background: '#f9fafb',
      color: '#1f2937',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeAuth();
        Swal.fire({
          title: '✅ Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
          confirmButtonColor: '#3b82f6',
          timer: 2000,
          showConfirmButton: false,
          background: '#f9fafb',
          color: '#1f2937',
          toast: true,
          position: 'top-end',
        });
      }
    });
  }

  login(form: Login): Observable<any> {
    return this.http.post(`${environment.AUTHENTICATION_BASE_URL}/login`, form);
  }
}
