import { TestBed } from '@angular/core/testing';

import { ShortenUrlService } from './shorten-url.service';

describe('ShortenUrlService', () => {
  let service: ShortenUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortenUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
