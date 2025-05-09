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
  constructor(
    private http: HttpClient,
    private router : Router
  ) {}

  isAuthenticated = signal<boolean>(localStorage.getItem('token') !== null);

  logout() : void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Blue
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();

        this.isAuthenticated.set(false);
        this.router.navigate(['/']);
        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  }

  login(form : Login) : Observable<any>{

    return this.http.post(`${environment.AUTHENTICATION_BASE_URL}/login`,form);

  }

}
