import { Component, inject, signal } from '@angular/core';
import { MyUrlsService } from './my-urls.service';
import { MyUrls, MyUrlsResponse } from '../../../models/my-urls.dto';
import { UrlViewDetailsComponent } from './url-view-details/url-view-details.component';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-my-urls',
  imports: [UrlViewDetailsComponent, CommonModule],
  templateUrl: './my-urls.component.html'
})
export class MyUrlsComponent {

  myUrlService = inject(MyUrlsService);

  urls = signal<MyUrls[]>([]);

  public deleteUrlById(id : number) : void{

    this.myUrlService.deleteUrlById(id)
    .subscribe({
      next : (response : any) =>{
        console.log(response);
        this.getMyUrls();
      },
      error : (err : any) =>{
        console.error(err);
      }
    });

  }

  public isUrlView() : boolean{
    return this.myUrlService.getIsUrlView();
  };

  public getUrl(id : number) : void{
    this.myUrlService.getUrlById(id)
    .subscribe({
      next : (response) =>{

        console.log(response);

      },
      error : (err) => {
        console.warn(err);
      }
    });
  }

  public getMyUrls() : void{
    this.myUrlService.getMyUrls()
    .subscribe({
      next : (response ) =>{
        
        console.log(response);

        this.urls.set(response);

      },
      error : (err : any) => {
        console.warn(err);
      }
    });
  }

  ngOnInit(): void {
    this.getMyUrls();
  }

}
