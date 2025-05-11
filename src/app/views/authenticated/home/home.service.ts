import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShortenUrlRequest } from '../../../dto/url.dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http : HttpClient
  ) { }

  shortenUrl(form: ShortenUrlRequest) : Observable<any>{
    return this.http.post(`${environment.AUTHENTICATED_BASE_URL}/shorten-url`,form);
  }



}

