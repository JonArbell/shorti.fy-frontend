import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getIsLoggedIn()) {
      return true; // If the user is logged in, allow access
    } else {
      // If not logged in, redirect to login page
      this.router.navigate(['/login']);  // Change '/login' to your login route
      return false;
    }
  }
}
