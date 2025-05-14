import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ExpiredUrlService } from '../../../services/expired-url/expired-url.service';

@Component({
  selector: 'app-expired-url',
  imports: [],
  templateUrl: './expired-url.component.html'
})
export class ExpiredUrlComponent implements OnInit, OnDestroy {

  expiredUrlService = inject(ExpiredUrlService);

    ngOnInit(): void {
      this.expiredUrlService.isRouteInExpiredUrl.set(true);
    }

    ngOnDestroy(): void {
      this.expiredUrlService.isRouteInExpiredUrl.set(false);
    }
}
