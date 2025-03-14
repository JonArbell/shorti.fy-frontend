import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { DashboardResponse } from '../../../models/dashboard.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http : HttpClient
  ){

  }

  private localHost : string = 'http://localhost:8080';

  getDashBoard() : Observable<DashboardResponse>{
    return this.http.get<DashboardResponse>(`${this.localHost}/api/authenticated/dashboard`);
  }

}
