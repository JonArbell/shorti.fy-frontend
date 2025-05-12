import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyUrlsService {

  constructor(
    private http : HttpClient
  ) { }

  getUrls() : Observable<any>{
    return this.http.get(`${environment.AUTHENTICATED_BASE_URL}/all-urls`);
  }

}
