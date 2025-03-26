import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, first, map, Observable, shareReplay, tap } from 'rxjs';
import { MyUrlResponse } from '../../../models/my-urls.dto';

@Injectable({
  providedIn: 'root'
})
export class MyUrlsService {

  constructor(
    private http: HttpClient
  ) { }

  private localHost : string = 'http://localhost:8080';

  public getMyUrls() : Observable<MyUrlResponse[]>{
    return this.http.get<MyUrlResponse[]>(`${this.localHost}/api/authenticated/my-urls`);
  }

  public deleteUrlById(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.localHost}/api/authenticated/urls/delete/${id}`)
    .pipe(first());
  }

  public getUrlById(id : number) : Observable<MyUrlResponse>{
    return this.http.get<MyUrlResponse>(`${this.localHost}/api/authenticated/urls/${id}`)
    .pipe(
      tap((response) =>{
        this.isUrlView.set(true);

      }),
      catchError((error) =>{
        this.isUrlView.set(false);
        throw new Error(error);
      })
    );
  }

  private isUrlView = signal(false);

  public getIsUrlView() : boolean{
    return this.isUrlView();
  }

  public setIsUrlView(setUrlIsView : boolean) : void{
    this.isUrlView.set(setUrlIsView);
  }

}
