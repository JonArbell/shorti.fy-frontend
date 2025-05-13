import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { requiredParamGuard } from './required-param.guard';

describe('requiredParamGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => requiredParamGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
