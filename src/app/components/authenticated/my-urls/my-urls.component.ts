import { Component, inject, signal } from '@angular/core';
import { MyUrlsService } from './my-urls.service';
import { MyUrls } from '../../../models/my-urls.dto';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-my-urls',
  imports: [CommonModule, RouterOutlet, RouterModule ],
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
