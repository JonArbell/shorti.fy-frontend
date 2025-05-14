import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { catchError, map, of } from 'rxjs';

export const requiredParamGuard: CanActivateFn = (route, state) => {

  const urlParam = route.queryParamMap.get('url');

  const router = inject(Router);

  if (!urlParam) {
    console.log('Walang param');
    router.navigate(['/']);
    return false;
  }

  const http = inject(HttpClient);
  const domain = environment.AUTHENTICATED_BASE_URL.slice(0, environment.AUTHENTICATED_BASE_URL.indexOf('/authenticated'));

  return http.get(`${domain}/validate-url/${urlParam}`).pipe(
    map((response: any) => {
      console.log(`Is Expired ? ${response.isExpired}`);
      return response.isExpired;
    }),
    catchError((err) => {
      console.log(err);
      return of(false);
    })
  );
};
