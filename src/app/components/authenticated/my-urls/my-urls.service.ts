import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, Observable, shareReplay } from 'rxjs';
import { MyUrlsResponse, Url } from '../../../models/my-urls.dto';

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

  public deleteUrlById(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.localHost}/api/authenticated/urls/delete/${id}`)
    .pipe(first());
  }

  public getUrlById(id : number) : Observable<Url>{
    return this.http.get<Url>(`${this.localHost}/api/authenticated/urls/${id}`);
  }
  
}
