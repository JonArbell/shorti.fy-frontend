import { TestBed } from '@angular/core/testing';

import { MyUrlsService } from './my-urls.service';

describe('MyUrlsService', () => {
  let service: MyUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
