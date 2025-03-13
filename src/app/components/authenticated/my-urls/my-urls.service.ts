import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyUrlsService {

  constructor(
    private http: HttpClient
  ) { }

  private localHost : string = 'http://localhost:8080';

  getMyUrls() : Observable<any>{
    return this.http.get<any>(`${this.localHost}/api/authenticated/my-urls`);
  }

  
}
