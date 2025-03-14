import { Component, inject, signal } from '@angular/core';
import { MyUrlsService } from './my-urls.service';
import { MyUrls, MyUrlsResponse } from '../../../models/my-urls.dto';

@Component({
  selector: 'app-my-urls',
  imports: [],
  templateUrl: './my-urls.component.html'
})
export class MyUrlsComponent {

  myUrlService = inject(MyUrlsService);

  urls = signal<MyUrls[]>([]);

  ngOnInit(): void {
    this.myUrlService.getMyUrls()
    .subscribe({
      next : (response) =>{

        this.urls.set(response);

      },
      error : (err : any) => {
        console.warn(err);
      },
    });
  }

}
