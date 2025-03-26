import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { MyUrlResponse } from '../../../models/my-urls.dto';

@Injectable({
  providedIn: 'root'
})
export class UrlHomeService {

  constructor(
    private http : HttpClient
  ) { }

  private localHost : string = 'http://localhost:8080';

  public shortenUrl(urlInput : string) : Observable<MyUrlResponse> {

    return this.http.post<any>(`${this.localHost}/api/authenticated/shorten`,{url : urlInput}).pipe(first());

  }


}
