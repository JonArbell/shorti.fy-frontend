import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/authentication/auth.service';
@Component({
  selector: 'app-side-nav',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {

  constructor(
    private router : Router,
    private authService : AuthService
  ){}


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

        this.authService.isAuthenticated.set(false);
        this.router.navigate(['/']);
        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  }

}
