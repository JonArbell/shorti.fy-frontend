import { TestBed } from '@angular/core/testing';

import { FindEmailService } from './find-email.service';

describe('FindEmailService', () => {
  let service: FindEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
