import { Component, OnInit, signal } from '@angular/core';
import { MyUrlsService } from '../my-urls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyUrlResponse } from '../../../../models/my-urls.dto';

@Component({
  selector: 'app-url-view-details',
  imports: [],
  templateUrl: './url-view-details.component.html'
})
export class UrlViewDetailsComponent implements OnInit{

  constructor(
    private urlService : MyUrlsService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ){}

  url = signal<MyUrlResponse>({} as MyUrlResponse);

  public exit() : void{
    this.urlService.setIsUrlView(false);
    this.url.set({} as MyUrlResponse);
    this.router.navigate(['my-urls']);
  }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe(params => {

      const id = params.get('id');

      this.urlService.getUrlById(Number(id)).subscribe({
        next : (response) =>{
          this.url.set(response);
        },
        error : (error) =>{
          console.error(error);
        }
      });

    });

  }

}
