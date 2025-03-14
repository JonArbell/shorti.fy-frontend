import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { MyUrlsResponse } from '../../../models/my-urls.dto';

@Injectable({
  providedIn: 'root'
})
export class MyUrlsService {

  constructor(
    private http: HttpClient
  ) { }

  private localHost : string = 'http://localhost:8080';

  public getMyUrls() : Observable<MyUrlsResponse[]>{
    return this.http.get<MyUrlsResponse[]>(`${this.localHost}/api/authenticated/my-urls`);
  }
  
}
