import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpiredUrlService {

  constructor() { }

  isRouteInExpiredUrl = signal<boolean>(false);
}
