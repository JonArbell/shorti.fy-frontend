import { TestBed } from '@angular/core/testing';
import { UrlHomeService } from './url-home.service';


describe('ShortenUrlService', () => {
  let service: UrlHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
