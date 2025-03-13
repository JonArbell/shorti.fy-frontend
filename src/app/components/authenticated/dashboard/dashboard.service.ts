import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  http = inject(HttpClient);

  private localHost : string = 'http://localhost:8080';

  getDashBoard() : Observable<any>{
    return this.http.get<any>(`${this.localHost}/api/authenticated/dashboard`);
  }

}
