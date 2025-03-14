import { Component, inject, signal } from '@angular/core';
import { MyUrlsService } from './my-urls.service';
import { MyUrlsResponse } from '../../../dtos/my-urls.dto';

@Component({
  selector: 'app-my-urls',
  imports: [],
  templateUrl: './my-urls.component.html'
})
export class MyUrlsComponent {

  myUrlService = inject(MyUrlsService);

  urls = signal<MyUrlsResponse[]>([]);

  ngOnInit(): void {
    this.myUrlService.getMyUrls()
    .subscribe({
      next : (response : MyUrlsResponse[]) =>{

        this.urls.set(response);

      },
      error : (err : any) => {
        console.warn(err);
      },
    });
  }

}
