import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UpdateUrlRequestDto } from '../../../dto/url.dto';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyUrlsService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  getUrls(): Observable<any> {
    return this.http.get(`${environment.AUTHENTICATED_BASE_URL}/all-urls`);
  }

  deleteUrl(id: number): Observable<any> {
    return this.http.delete(
      `${environment.AUTHENTICATED_BASE_URL}/delete-url/${id}`
    );
  }

  updateUrl(update: UpdateUrlRequestDto): Observable<any> {
    return this.http.put(
      `${environment.AUTHENTICATED_BASE_URL}/update-url/${update.id}`,
      update
    );
  }

  getUrlById(id: number): Observable<any> {
    return this.http.get(`${environment.AUTHENTICATED_BASE_URL}/my-urls/${id}`);
  }
}
