import { Component, OnInit, signal } from '@angular/core';
import { Url } from '../../../../models/my-urls.dto';
import { MyUrlsService } from '../my-urls.service';

@Component({
  selector: 'app-url-view-details',
  imports: [],
  templateUrl: './url-view-details.component.html'
})
export class UrlViewDetailsComponent implements OnInit{

  constructor(
    private urlService : MyUrlsService
  ){}

  public getUrlView() : Url{
    return this.urlService.getUrlView();
  }

  public exit() : void{
    this.urlService.setUrlView({} as Url); 
    this.urlService.setIsUrlView(false);

    console.log(this.urlService.getUrlView());

  }

  ngOnInit(): void {
    
  }

}
