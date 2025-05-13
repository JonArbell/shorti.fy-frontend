import { TestBed } from '@angular/core/testing';

import { ExpiredUrlService } from './expired-url.service';

describe('ExpiredUrlService', () => {
  let service: ExpiredUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpiredUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
