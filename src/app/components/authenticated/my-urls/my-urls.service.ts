import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, first, Observable, shareReplay, tap } from 'rxjs';
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
    return this.http.get<Url>(`${this.localHost}/api/authenticated/urls/${id}`)
    .pipe(
      tap((response) =>{
        this.urlView.set(response);
        this.isUrlView.set(true);
      }),
      catchError((error) =>{
        this.urlView.set({} as Url);
        this.isUrlView.set(false);
        throw new Error(error);
      })
    );
  }

  private urlView = signal<Url>({} as Url);

  public getUrlView() : Url{
    return this.urlView()!;
  }

  public setUrlView(url : Url) : void{
    this.urlView.set(url);
  }

  private isUrlView = signal(false);

  public getIsUrlView() : boolean{
    return this.isUrlView();
  }

  public setIsUrlView(setUrlIsView : boolean) : void{
    this.isUrlView.set(setUrlIsView);
  }

}
